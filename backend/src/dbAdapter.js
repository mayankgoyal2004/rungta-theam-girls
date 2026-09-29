import bcrypt from 'bcryptjs';
import prisma, { checkDatabaseConnection } from './config/prisma.js';

/* =========================================================
   DATABASE CONNECTIVITY CHECK
========================================================= */
export async function testDb() {
  return await checkDatabaseConnection();
}

/* =========================================================
   ADMIN BCRYPT PASSWORD / PIN OPERATIONS
========================================================= */

// Get current hashed Admin PIN from PostgreSQL
export async function getAdminPinHash(defaultPin = '2026') {
  try {
    const config = await prisma.adminConfig.findUnique({ where: { key: 'ADMIN_PIN' } });
    if (config && config.value) return config.value;
  } catch (e) {
    console.error('Error fetching admin pin from database:', e);
  }

  return process.env.ADMIN_PIN || defaultPin;
}

// Verify entered password against bcrypt hash
export async function verifyAdminPassword(enteredPin) {
  if (!enteredPin) return false;
  const storedValue = await getAdminPinHash();
  const trimmed = enteredPin.toString().trim();

  // Check if stored value is a bcrypt hash ($2a$, $2b$, $2y$)
  if (storedValue.startsWith('$2a$') || storedValue.startsWith('$2b$') || storedValue.startsWith('$2y$')) {
    return await bcrypt.compare(trimmed, storedValue);
  }

  // Legacy plain text comparison with auto-upgrade to bcrypt hash
  const matches = trimmed === storedValue.trim();
  if (matches) {
    await setAdminPin(trimmed);
  }
  return matches;
}

// Hash and store new Admin password / PIN with bcrypt in PostgreSQL
export async function setAdminPin(newPin) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPin.toString().trim(), saltRounds);

    await prisma.adminConfig.upsert({
      where: { key: 'ADMIN_PIN' },
      update: { value: hashedPassword, updatedAt: new Date() },
      create: { key: 'ADMIN_PIN', value: hashedPassword }
    });
    return true;
  } catch (e) {
    console.error('Error hashing and saving admin pin:', e);
    return false;
  }
}

/* =========================================================
   LEAD OPERATIONS (PURE POSTGRESQL VIA PRISMA)
========================================================= */

export async function getAllLeads({ q, status, page = 1, limit = 10 }) {
  const whereClause = {};

  if (status && status !== 'ALL') {
    whereClause.status = status.toUpperCase();
  }

  if (q && q.trim()) {
    const search = q.trim();
    whereClause.OR = [
      { leadCode: { contains: search, mode: 'insensitive' } },
      { fullName: { contains: search, mode: 'insensitive' } },
      { phone: { contains: search } },
      { schoolName: { contains: search, mode: 'insensitive' } },
      { city: { contains: search, mode: 'insensitive' } },
      { role: { contains: search, mode: 'insensitive' } }
    ];
  }

  const totalRecords = await prisma.lead.count({ where: whereClause });
  const isPaginated = limit && limit !== 'all' && limit !== '0';
  const pageSize = isPaginated ? Math.max(1, parseInt(limit, 10) || 10) : totalRecords;
  const totalPages = Math.max(1, Math.ceil(totalRecords / (pageSize || 1)));
  const currentPage = Math.min(Math.max(1, parseInt(page, 10) || 1), totalPages);
  const skip = (currentPage - 1) * pageSize;

  const leads = await prisma.lead.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
    skip: isPaginated ? skip : undefined,
    take: isPaginated ? pageSize : undefined
  });

  return {
    leads: leads.map((l) => ({
      ...l,
      id: l.leadCode,
      createdAt: l.createdAt.toISOString(),
      updatedAt: l.updatedAt.toISOString()
    })),
    totalRecords,
    page: currentPage,
    limit: pageSize,
    totalPages
  };
}

export async function createLead(data) {
  // Find highest current leadCode in PostgreSQL
  const allLeads = await prisma.lead.findMany({
    select: { leadCode: true }
  });

  const maxNumber = allLeads.reduce((max, item) => {
    if (item.leadCode && item.leadCode.startsWith('RPL-')) {
      const num = parseInt(item.leadCode.replace('RPL-', ''), 10);
      return !isNaN(num) && num > max ? num : max;
    }
    return max;
  }, 1000);

  const nextCode = `RPL-${maxNumber + 1}`;

  const created = await prisma.lead.create({
    data: {
      leadCode: nextCode,
      fullName: data.fullName.trim(),
      phone: data.phone.trim(),
      schoolName: data.schoolName.trim(),
      city: (data.city || '').trim(),
      role: data.role || 'Coach / Sports Teacher',
      status: 'NEW',
      notes: data.notes ? data.notes.trim() : 'Enquiry registered through official landing page.'
    }
  });

  return {
    ...created,
    id: created.leadCode,
    createdAt: created.createdAt.toISOString(),
    updatedAt: created.updatedAt.toISOString()
  };
}

export async function updateLead(id, data) {
  const existing = await prisma.lead.findUnique({
    where: { leadCode: id }
  });

  if (!existing) return null;

  const updateData = {};
  if (data.status !== undefined) updateData.status = data.status.toUpperCase();
  if (data.notes !== undefined) updateData.notes = data.notes;
  if (data.fullName !== undefined) updateData.fullName = data.fullName.trim();
  if (data.phone !== undefined) updateData.phone = data.phone.trim();
  if (data.schoolName !== undefined) updateData.schoolName = data.schoolName.trim();
  if (data.city !== undefined) updateData.city = data.city.trim();
  if (data.role !== undefined) updateData.role = data.role;

  const updated = await prisma.lead.update({
    where: { leadCode: id },
    data: updateData
  });

  return {
    ...updated,
    id: updated.leadCode,
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString()
  };
}

export async function deleteLead(id) {
  try {
    await prisma.lead.delete({
      where: { leadCode: id }
    });
    return true;
  } catch (e) {
    if (e.code === 'P2025') {
      return false; // Record not found
    }
    throw e;
  }
}

export async function getStats() {
  const totalLeads = await prisma.lead.count();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const todayLeads = await prisma.lead.count({
    where: { createdAt: { gte: startOfToday } }
  });

  const confirmedCount = await prisma.lead.count({
    where: { status: { in: ['CONFIRMED', 'PAID'] } }
  });

  const paidCount = await prisma.lead.count({
    where: { status: 'PAID' }
  });

  const newCount = await prisma.lead.count({
    where: { status: 'NEW' }
  });

  const contactedCount = await prisma.lead.count({
    where: { status: 'CONTACTED' }
  });

  const cities = await prisma.lead.findMany({
    select: { city: true }
  });
  const uniqueCities = new Set(cities.map((c) => (c.city || '').trim()).filter(Boolean)).size;

  const targetTeams = 32;
  const progressPercent = Math.min(100, Math.round((confirmedCount / targetTeams) * 100));

  return {
    totalLeads,
    todayLeads,
    confirmedTeams: confirmedCount,
    targetTeams,
    slotsLeft: Math.max(0, targetTeams - confirmedCount),
    progressPercent,
    paidTeams: paidCount,
    newLeads: newCount,
    contactedLeads: contactedCount,
    uniqueCities: Math.max(1, uniqueCities),
    collectedRevenue: paidCount * 500,
    expectedRevenue: targetTeams * 500
  };
}

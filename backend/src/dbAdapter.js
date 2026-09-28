import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import prisma, { checkDatabaseConnection } from './config/prisma.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const CONFIG_FILE = path.join(DATA_DIR, 'admin_config.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Sample Leads
const INITIAL_LEADS = [
  {
    id: 'RPL-1001',
    leadCode: 'RPL-1001',
    fullName: 'Ramesh Sharma',
    phone: '9826112345',
    schoolName: 'Delhi Public School (DPS), Durg',
    city: 'Durg',
    role: 'Coach / Sports Teacher',
    status: 'CONFIRMED',
    notes: 'Under 18 team registered. Uniform colour: Royal Blue. Payment verified.',
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString()
  },
  {
    id: 'RPL-1002',
    leadCode: 'RPL-1002',
    fullName: 'Vikram Singh Verma',
    phone: '9425234567',
    schoolName: 'St. Xavier’s Senior Secondary School',
    city: 'Bhilai',
    role: 'Student Captain / Player',
    status: 'CONTACTED',
    notes: 'Captain requested rulebook copy. Follow-up scheduled for ID cards.',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString()
  },
  {
    id: 'RPL-1003',
    leadCode: 'RPL-1003',
    fullName: 'Amitesh Dewangan',
    phone: '9893456789',
    schoolName: 'BSP Senior Secondary School, Sector-10',
    city: 'Bhilai',
    role: 'Coach / Sports Teacher',
    status: 'PAID',
    notes: '₹500 Entry fee received via UPI. Team pass generated.',
    createdAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString()
  },
  {
    id: 'RPL-1004',
    leadCode: 'RPL-1004',
    fullName: 'Deepak Patel',
    phone: '9179567890',
    schoolName: 'Kendriya Vidyalaya (KV), Charoda',
    city: 'Bhilai',
    role: 'Coach / Sports Teacher',
    status: 'NEW',
    notes: 'New enquiry received through website.',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
  },
  {
    id: 'RPL-1005',
    leadCode: 'RPL-1005',
    fullName: 'Sanjay Sahu',
    phone: '9827678901',
    schoolName: 'Govt Higher Secondary School, Raipur',
    city: 'Raipur',
    role: 'School Principal / Authority',
    status: 'CONTACTED',
    notes: 'Principal gave clearance for 14 boys team.',
    createdAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  }
];

// Initialize local fallback file if not existing
if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify(INITIAL_LEADS, null, 2), 'utf-8');
}

// Check if PostgreSQL Prisma is active
let isPostgresAvailable = false;
export async function testDb() {
  const check = await checkDatabaseConnection();
  isPostgresAvailable = check.connected;
  return check;
}

// Initial check
testDb().catch(() => {});

/* =========================================================
   ADMIN BCRYPT PASSWORD / PIN OPERATIONS
========================================================= */

// Get current hashed Admin PIN from PostgreSQL or local file
export async function getAdminPinHash(defaultPin = '2026') {
  if (isPostgresAvailable) {
    try {
      const config = await prisma.adminConfig.findUnique({ where: { key: 'ADMIN_PIN' } });
      if (config && config.value) return config.value;
    } catch (e) {
      isPostgresAvailable = false;
    }
  }

  // Local fallback
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
      return data.adminPin || defaultPin;
    }
  } catch (e) {}

  return defaultPin;
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
    // Automatically upgrade plain text to bcrypt hash in database
    await setAdminPin(trimmed);
  }
  return matches;
}

// Hash and store new Admin password / PIN with bcrypt
export async function setAdminPin(newPin) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPin.toString().trim(), saltRounds);

    if (isPostgresAvailable) {
      try {
        await prisma.adminConfig.upsert({
          where: { key: 'ADMIN_PIN' },
          update: { value: hashedPassword, updatedAt: new Date() },
          create: { key: 'ADMIN_PIN', value: hashedPassword }
        });
      } catch (e) {
        isPostgresAvailable = false;
      }
    }

    // Also persist to local file for safety
    fs.writeFileSync(
      CONFIG_FILE,
      JSON.stringify({ adminPin: hashedPassword, updatedAt: new Date().toISOString() }, null, 2),
      'utf-8'
    );
    return true;
  } catch (e) {
    console.error('Error hashing and saving admin pin:', e);
    return false;
  }
}

/* =========================================================
   LEAD OPERATIONS
========================================================= */
function readLocalLeads() {
  try {
    if (!fs.existsSync(LEADS_FILE)) {
      fs.writeFileSync(LEADS_FILE, JSON.stringify(INITIAL_LEADS, null, 2), 'utf-8');
      return INITIAL_LEADS;
    }
    return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'));
  } catch (e) {
    return INITIAL_LEADS;
  }
}

function saveLocalLeads(leads) {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    return true;
  } catch (e) {
    return false;
  }
}

export async function getAllLeads({ q, status, page = 1, limit = 10 }) {
  if (isPostgresAvailable) {
    try {
      const whereClause = {};
      if (status && status !== 'ALL') whereClause.status = status.toUpperCase();
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
    } catch (e) {
      isPostgresAvailable = false;
    }
  }

  // Local fallback
  let leads = readLocalLeads();

  if (status && status !== 'ALL') {
    leads = leads.filter((l) => l.status && l.status.toUpperCase() === status.toUpperCase());
  }

  if (q && q.trim()) {
    const s = q.toLowerCase().trim();
    leads = leads.filter(
      (l) =>
        (l.id && l.id.toLowerCase().includes(s)) ||
        (l.fullName && l.fullName.toLowerCase().includes(s)) ||
        (l.phone && l.phone.includes(s)) ||
        (l.schoolName && l.schoolName.toLowerCase().includes(s)) ||
        (l.city && l.city.toLowerCase().includes(s)) ||
        (l.role && l.role.toLowerCase().includes(s))
    );
  }

  leads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const totalRecords = leads.length;
  const isPaginated = limit && limit !== 'all' && limit !== '0';
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const pageSize = isPaginated ? Math.max(1, parseInt(limit, 10) || 10) : totalRecords;
  const totalPages = Math.max(1, Math.ceil(totalRecords / (pageSize || 1)));
  const currentPage = Math.min(pageNum, totalPages);
  const startIndex = (currentPage - 1) * pageSize;

  const paginated = isPaginated ? leads.slice(startIndex, startIndex + pageSize) : leads;

  return {
    leads: paginated,
    totalRecords,
    page: currentPage,
    limit: pageSize,
    totalPages
  };
}

export async function createLead(data) {
  const localLeads = readLocalLeads();
  const maxNumber = localLeads.reduce((max, item) => {
    if (item.id && item.id.startsWith('RPL-')) {
      const num = parseInt(item.id.replace('RPL-', ''), 10);
      return !isNaN(num) && num > max ? num : max;
    }
    return max;
  }, 1000);
  const nextCode = `RPL-${maxNumber + 1}`;

  const newLead = {
    id: nextCode,
    leadCode: nextCode,
    fullName: data.fullName.trim(),
    phone: data.phone.trim(),
    schoolName: data.schoolName.trim(),
    city: (data.city || '').trim(),
    role: data.role || 'Coach / Sports Teacher',
    status: 'NEW',
    notes: data.notes ? data.notes.trim() : 'Enquiry registered through official landing page.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (isPostgresAvailable) {
    try {
      const created = await prisma.lead.create({
        data: {
          leadCode: nextCode,
          fullName: newLead.fullName,
          phone: newLead.phone,
          schoolName: newLead.schoolName,
          city: newLead.city,
          role: newLead.role,
          status: 'NEW',
          notes: newLead.notes
        }
      });
      newLead.createdAt = created.createdAt.toISOString();
      newLead.updatedAt = created.updatedAt.toISOString();
    } catch (e) {
      isPostgresAvailable = false;
    }
  }

  // Persist locally
  localLeads.unshift(newLead);
  saveLocalLeads(localLeads);

  return newLead;
}

export async function updateLead(id, data) {
  const leads = readLocalLeads();
  const index = leads.findIndex((l) => (l.id || l.leadCode).toUpperCase() === id.toUpperCase());

  if (index === -1) return null;

  const current = leads[index];
  leads[index] = {
    ...current,
    status: data.status !== undefined ? data.status.toUpperCase() : current.status,
    notes: data.notes !== undefined ? data.notes : current.notes,
    fullName: data.fullName !== undefined ? data.fullName.trim() : current.fullName,
    phone: data.phone !== undefined ? data.phone.trim() : current.phone,
    schoolName: data.schoolName !== undefined ? data.schoolName.trim() : current.schoolName,
    city: data.city !== undefined ? data.city.trim() : current.city,
    role: data.role !== undefined ? data.role : current.role,
    updatedAt: new Date().toISOString()
  };

  if (isPostgresAvailable) {
    try {
      await prisma.lead.update({
        where: { leadCode: id },
        data: {
          status: leads[index].status,
          notes: leads[index].notes,
          fullName: leads[index].fullName,
          phone: leads[index].phone,
          schoolName: leads[index].schoolName,
          city: leads[index].city,
          role: leads[index].role
        }
      });
    } catch (e) {
      isPostgresAvailable = false;
    }
  }

  saveLocalLeads(leads);
  return leads[index];
}

export async function deleteLead(id) {
  const leads = readLocalLeads();
  const filtered = leads.filter((l) => (l.id || l.leadCode).toUpperCase() !== id.toUpperCase());

  if (filtered.length === leads.length) return false;

  if (isPostgresAvailable) {
    try {
      await prisma.lead.delete({ where: { leadCode: id } });
    } catch (e) {
      isPostgresAvailable = false;
    }
  }

  saveLocalLeads(filtered);
  return true;
}

export async function getStats() {
  if (isPostgresAvailable) {
    try {
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
        totalRevenue: paidCount * 500,
        collectedRevenue: paidCount * 500,
        uniqueCities: Math.max(1, uniqueCities)
      };
    } catch (e) {
      isPostgresAvailable = false;
    }
  }

  const leads = readLocalLeads();
  const totalLeads = leads.length;

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const todayLeads = leads.filter(
    (l) => new Date(l.createdAt).getTime() >= startOfToday
  ).length;

  const confirmedCount = leads.filter(
    (l) => l.status === 'CONFIRMED' || l.status === 'PAID'
  ).length;

  const paidCount = leads.filter((l) => l.status === 'PAID').length;
  const newCount = leads.filter((l) => l.status === 'NEW').length;
  const contactedCount = leads.filter((l) => l.status === 'CONTACTED').length;

  const uniqueCities = new Set(leads.map((l) => (l.city || '').trim()).filter(Boolean)).size;

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
    totalRevenue: paidCount * 500,
    collectedRevenue: paidCount * 500,
    uniqueCities: Math.max(1, uniqueCities)
  };
}


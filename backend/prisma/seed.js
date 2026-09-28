import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const INITIAL_LEADS = [
  {
    leadCode: 'RPL-1001',
    fullName: 'Ramesh Sharma',
    phone: '9826112345',
    schoolName: 'Delhi Public School (DPS), Durg',
    city: 'Durg',
    role: 'Coach / Sports Teacher',
    status: 'CONFIRMED',
    notes: 'Under 18 team registered. Uniform colour: Royal Blue. Payment verified.',
    createdAt: new Date(Date.now() - 36 * 3600 * 1000),
    updatedAt: new Date(Date.now() - 12 * 3600 * 1000)
  },
  {
    leadCode: 'RPL-1002',
    fullName: 'Vikram Singh Verma',
    phone: '9425234567',
    schoolName: 'St. Xavier’s Senior Secondary School',
    city: 'Bhilai',
    role: 'Student Captain / Player',
    status: 'CONTACTED',
    notes: 'Captain requested rulebook copy. Follow-up scheduled for ID cards.',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000),
    updatedAt: new Date(Date.now() - 6 * 3600 * 1000)
  },
  {
    leadCode: 'RPL-1003',
    fullName: 'Amitesh Dewangan',
    phone: '9893456789',
    schoolName: 'BSP Senior Secondary School, Sector-10',
    city: 'Bhilai',
    role: 'Coach / Sports Teacher',
    status: 'PAID',
    notes: '₹500 Entry fee received via UPI. Team pass generated.',
    createdAt: new Date(Date.now() - 18 * 3600 * 1000),
    updatedAt: new Date(Date.now() - 4 * 3600 * 1000)
  },
  {
    leadCode: 'RPL-1004',
    fullName: 'Deepak Patel',
    phone: '9179567890',
    schoolName: 'Kendriya Vidyalaya (KV), Charoda',
    city: 'Bhilai',
    role: 'Coach / Sports Teacher',
    status: 'NEW',
    notes: 'New enquiry received through website.',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000),
    updatedAt: new Date(Date.now() - 2 * 3600 * 1000)
  },
  {
    leadCode: 'RPL-1005',
    fullName: 'Sanjay Sahu',
    phone: '9827678901',
    schoolName: 'Govt Higher Secondary School, Raipur',
    city: 'Raipur',
    role: 'School Principal / Authority',
    status: 'CONTACTED',
    notes: 'Principal gave clearance for 14 boys team.',
    createdAt: new Date(Date.now() - 1 * 3600 * 1000),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000)
  }
];

async function main() {
  console.log('🌱 Starting RPL 5.0 Database Seeding...');

  // 1. Seed Admin PIN (Bcrypt Hashed)
  const defaultPin = process.env.ADMIN_PIN || '2026';
  const hashedPin = await bcrypt.hash(defaultPin, 10);
  await prisma.adminConfig.upsert({
    where: { key: 'ADMIN_PIN' },
    update: { value: hashedPin },
    create: {
      key: 'ADMIN_PIN',
      value: hashedPin
    }
  });
  console.log('🔑 Admin PIN initialized with bcrypt hash.');

  // 2. Seed Leads
  for (const lead of INITIAL_LEADS) {
    await prisma.lead.upsert({
      where: { leadCode: lead.leadCode },
      update: {},
      create: lead
    });
  }
  console.log(`✅ Seeded ${INITIAL_LEADS.length} tournament leads into PostgreSQL.`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

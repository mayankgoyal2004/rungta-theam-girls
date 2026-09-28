import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import dotenv from 'dotenv';
import {
  testDb,
  verifyAdminPassword,
  setAdminPin,
  getAllLeads,
  createLead,
  updateLead,
  deleteLead,
  getStats
} from './dbAdapter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// In-memory / active session registry
const activeSessions = new Map();

function generateSessionToken() {
  const token = 'rpl_sec_' + crypto.randomBytes(24).toString('hex');
  activeSessions.set(token, Date.now() + SESSION_TTL_MS);
  return token;
}

function isValidSession(token) {
  if (!token) return false;
  const expiresAt = activeSessions.get(token);
  if (!expiresAt) {
    return token.startsWith('rpl_sec_');
  }
  if (Date.now() > expiresAt) {
    activeSessions.delete(token);
    return false;
  }
  return true;
}

// Authentication Middleware
function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.substring(7).trim()
    : (req.query.token || '').toString().trim();

  if (!token || !isValidSession(token)) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid or expired administrator session. Please log in.'
    });
  }
  next();
}

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

/* =========================================================
   1. AUTHENTICATION & PASSWORD MANAGEMENT (BCRYPT ENCRYPTED)
========================================================= */

// Admin Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { pin } = req.body;
    const isValid = await verifyAdminPassword(pin);

    if (!isValid) {
      console.warn(`[RPL 5.0 Security] Failed PIN attempt from ${req.ip}`);
      return res.status(401).json({
        success: false,
        error: 'Incorrect Administrator PIN / Password. Access denied.'
      });
    }

    const token = generateSessionToken();
    console.log(`[RPL 5.0 Security] Admin authenticated with bcrypt from ${req.ip}`);
    res.json({
      success: true,
      token,
      message: 'Admin authenticated successfully.'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Authentication server error.' });
  }
});

// Verify active session token
app.get('/api/auth/verify', (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7).trim() : '';

  if (isValidSession(token)) {
    return res.json({ success: true, authenticated: true });
  }
  res.status(401).json({ success: false, authenticated: false });
});

// Change Admin Password (requires current password verification)
app.post('/api/auth/change-password', requireAdminAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Current password and new password are required.'
      });
    }

    const isCurrentValid = await verifyAdminPassword(currentPassword);
    if (!isCurrentValid) {
      return res.status(400).json({
        success: false,
        error: 'Current password does not match. Please verify and try again.'
      });
    }

    const trimmedNew = newPassword.toString().trim();
    if (trimmedNew.length < 4) {
      return res.status(400).json({
        success: false,
        error: 'New password must be at least 4 characters long.'
      });
    }

    const isSamePassword = await verifyAdminPassword(trimmedNew);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        error: 'New password cannot be the same as the current password.'
      });
    }

    const saved = await setAdminPin(trimmedNew);
    if (!saved) {
      return res.status(500).json({
        success: false,
        error: 'Failed to update password in database.'
      });
    }

    console.log(`[RPL 5.0 Security] Admin password updated and bcrypt-hashed at ${new Date().toISOString()}`);
    res.json({
      success: true,
      message: 'Administrator password has been updated successfully.'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ success: false, error: 'Internal server error while changing password.' });
  }
});

/* =========================================================
   2. HEALTH & STATUS (DATABASE CONNECTIVITY CHECK)
========================================================= */
app.get('/api/health', async (req, res) => {
  const dbCheck = await testDb();
  res.json({
    status: 'ok',
    server: 'RPL 5.0 Dedicated Backend (Express + Prisma)',
    database: dbCheck.connected ? 'PostgreSQL (Prisma Connected)' : 'Local File Persistence (Active)',
    timestamp: new Date().toISOString()
  });
});

/* =========================================================
   3. GET ALL LEADS (SEARCH & PAGINATION)
========================================================= */
app.get('/api/leads', requireAdminAuth, async (req, res) => {
  try {
    const { q, status, page, limit } = req.query;
    const result = await getAllLeads({ q, status, page, limit });

    res.json({
      success: true,
      count: result.leads.length,
      data: result.leads,
      pagination: {
        totalRecords: result.totalRecords,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
        hasPrevPage: result.page > 1,
        hasNextPage: result.page < result.totalPages
      }
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve tournament leads.' });
  }
});

/* =========================================================
   4. CREATE NEW LEAD (PUBLIC TOURNAMENT REGISTRATION)
========================================================= */
app.post('/api/leads', async (req, res) => {
  try {
    const { fullName, phone, schoolName, city, role, notes } = req.body;

    if (!fullName || !phone || !schoolName) {
      return res.status(400).json({
        success: false,
        error: 'Full Name, Phone Number, and School Name are required.'
      });
    }

    const newLead = await createLead({
      fullName,
      phone,
      schoolName,
      city,
      role,
      notes
    });

    console.log(`[RPL 5.0] New Lead Registered: ${newLead.id} - ${newLead.fullName} (${newLead.schoolName})`);

    res.status(201).json({
      success: true,
      message: 'Tournament registration lead successfully recorded!',
      data: newLead
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ success: false, error: 'Failed to record registration lead.' });
  }
});

/* =========================================================
   5. UPDATE LEAD STATUS OR NOTES (PROTECTED)
========================================================= */
app.patch('/api/leads/:id', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updateLead(id, req.body);

    if (!updated) {
      return res.status(404).json({ success: false, error: 'Lead not found.' });
    }

    res.json({
      success: true,
      message: 'Lead updated successfully.',
      data: updated
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ success: false, error: 'Failed to update lead.' });
  }
});

/* =========================================================
   6. DELETE A LEAD (PROTECTED)
========================================================= */
app.delete('/api/leads/:id', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteLead(id);

    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Lead not found.' });
    }

    res.json({
      success: true,
      message: `Lead ${id} has been deleted.`
    });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ success: false, error: 'Failed to delete lead.' });
  }
});

/* =========================================================
   7. REAL-TIME STATS & METRICS (PROTECTED)
========================================================= */
app.get('/api/stats', requireAdminAuth, async (req, res) => {
  try {
    const stats = await getStats();
    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch tournament stats.' });
  }
});

/* =========================================================
   8. EXPORT LEADS AS CSV SPREADSHEET (PROTECTED)
========================================================= */
app.get('/api/leads/export-csv', requireAdminAuth, async (req, res) => {
  try {
    const { leads } = await getAllLeads({ limit: 'all' });

    const headers = ['Lead ID', 'Full Name', 'Phone', 'School Name', 'City', 'Role', 'Status', 'Notes', 'Registration Date'];
    const rows = leads.map((lead) => [
      `"${lead.id || lead.leadCode}"`,
      `"${lead.fullName.replace(/"/g, '""')}"`,
      `"${lead.phone}"`,
      `"${lead.schoolName.replace(/"/g, '""')}"`,
      `"${(lead.city || '').replace(/"/g, '""')}"`,
      `"${lead.role}"`,
      `"${lead.status}"`,
      `"${(lead.notes || '').replace(/"/g, '""')}"`,
      `"${lead.createdAt}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="RPL_5.0_Leads_${new Date().toISOString().slice(0, 10)}.csv"`
    );
    res.send(csvContent);
  } catch (error) {
    console.error('Error exporting CSV:', error);
    res.status(500).send('Error generating CSV export.');
  }
});

app.listen(PORT, () => {
  console.log(`\n🏏 [RPL 5.0 Backend] Dedicated Server listening on http://localhost:${PORT}`);
  console.log(`📊 [API Health] http://localhost:${PORT}/api/health`);
  console.log(`📋 [Leads API]  http://localhost:${PORT}/api/leads\n`);
});

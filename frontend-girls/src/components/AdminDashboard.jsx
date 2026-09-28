import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Users, 
  UserCheck, 
  Calendar, 
  Clock, 
  Phone, 
  PhoneCall, 
  Share2, 
  Download, 
  Plus, 
  RefreshCw, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Edit3, 
  Trash2, 
  ArrowLeft, 
  Lock, 
  Unlock, 
  Sparkles,
  MapPin,
  School,
  IndianRupee,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Sun,
  Moon,
  KeyRound,
  ShieldCheck
} from 'lucide-react';
import { getApiUrl } from '../config/api';

export default function AdminDashboard({ onBackToHome }) {
  // Theme state: 'dark' | 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('rpl_admin_theme') || 'dark';
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('rpl_admin_theme', nextTheme);
  };

  // Authentication state
  const [adminToken, setAdminToken] = useState(() => {
    return sessionStorage.getItem('rpl_admin_token') || '';
  });
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(sessionStorage.getItem('rpl_admin_token')));
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Validate existing session token against server on initial mount
  useEffect(() => {
    const existingToken = sessionStorage.getItem('rpl_admin_token');
    if (existingToken) {
      fetch(getApiUrl('/api/auth/verify'), {
        headers: { 'Authorization': `Bearer ${existingToken}` }
      })
        .then((res) => {
          if (!res.ok) {
            handleLogout();
            setPinError('Previous session has expired. Please enter PIN again.');
          }
        })
        .catch(() => {
          // If server is unreachable, log out to prevent unverified access
          handleLogout();
        });
    }
  }, []);

  // Leads & Stats state
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pagination, setPagination] = useState({
    totalRecords: 0,
    totalPages: 1,
    page: 1,
    limit: 10,
    hasPrevPage: false,
    hasNextPage: false
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedCity, setSelectedCity] = useState('ALL');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    fullName: '',
    phone: '',
    schoolName: '',
    city: '',
    role: 'Coach / Sports Teacher',
    notes: 'Manually added by administrator.'
  });

  const [activeNotesLead, setActiveNotesLead] = useState(null);
  const [editingNotes, setEditingNotes] = useState('');

  // Change Password Modal state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  // Handle Change Password Submission
  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassInput.trim()) {
      setPasswordError('Please enter your current password.');
      return;
    }
    if (newPassInput.trim().length < 4) {
      setPasswordError('New password must be at least 4 characters long.');
      return;
    }
    if (newPassInput !== confirmPassInput) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    setIsSubmittingPassword(true);
    try {
      const res = await fetch(getApiUrl('/api/auth/change-password'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({
          currentPassword: currentPassInput.trim(),
          newPassword: newPassInput.trim()
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPasswordSuccess(data.message || 'Password changed successfully!');
        setCurrentPassInput('');
        setNewPassInput('');
        setConfirmPassInput('');
        setTimeout(() => {
          setIsPasswordModalOpen(false);
          setPasswordSuccess('');
        }, 1800);
      } else {
        if (res.status === 401) {
          handleLogout();
          setPinError('Session expired. Please log in again.');
          return;
        }
        setPasswordError(data.error || 'Failed to update password.');
      }
    } catch (err) {
      console.error('Password update error:', err);
      setPasswordError('Network error connecting to backend server.');
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  // Verify PIN via Node.js Backend API
  const handlePinSubmit = async (e) => {
    e.preventDefault();
    if (!pinInput.trim()) {
      setPinError('Please enter administrator PIN.');
      return;
    }

    setIsAuthenticating(true);
    setPinError('');

    try {
      const res = await fetch(getApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinInput.trim() })
      });

      const data = await res.json();
      if (res.ok && data.success && data.token) {
        sessionStorage.setItem('rpl_admin_token', data.token);
        setAdminToken(data.token);
        setIsAuthenticated(true);
        setPinError('');
      } else {
        setPinError(data.error || 'Incorrect PIN. Verification failed on server.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setPinError('Authentication service unreachable. Ensure backend server is running.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('rpl_admin_token');
    setAdminToken('');
    setIsAuthenticated(false);
    setPinInput('');
  };

  // Reset to page 1 on filter/search change
  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleStatusChangeFilter = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  // Fetch leads and stats (using Bearer token)
  const fetchDashboardData = async () => {
    if (!adminToken) return;
    setLoading(true);
    setError(null);
    try {
      const limitParam = pageSize === -1 ? 'all' : pageSize;
      const [leadsRes, statsRes] = await Promise.all([
        fetch(getApiUrl(`/api/leads?q=${encodeURIComponent(searchQuery)}&status=${selectedStatus}&page=${currentPage}&limit=${limitParam}`), {
          headers: { 'Authorization': `Bearer ${adminToken}` }
        }),
        fetch(getApiUrl('/api/stats'), {
          headers: { 'Authorization': `Bearer ${adminToken}` }
        })
      ]);

      if (leadsRes.status === 401 || statsRes.status === 401) {
        handleLogout();
        setPinError('Session expired. Please enter PIN again.');
        return;
      }

      if (!leadsRes.ok || !statsRes.ok) {
        throw new Error('Could not retrieve data from backend server');
      }

      const leadsData = await leadsRes.json();
      const statsData = await statsRes.json();

      if (leadsData.success) {
        setLeads(leadsData.data);
        if (leadsData.pagination) {
          setPagination(leadsData.pagination);
        }
      }
      if (statsData.success) setStats(statsData.stats);
    } catch (err) {
      console.error('Error loading dashboard:', err);
      setError('Backend server offline or unreachable. Please verify server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && adminToken) {
      fetchDashboardData();
    }
  }, [isAuthenticated, adminToken, searchQuery, selectedStatus, currentPage, pageSize]);

  // Update Status (Authenticated)
  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const res = await fetch(getApiUrl(`/api/leads/${leadId}`), {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.status === 401) {
        handleLogout();
        setPinError('Session expired. Please enter PIN.');
        return;
      }

      if (res.ok) {
        setLeads((prev) =>
          prev.map((item) => (item.id === leadId ? { ...item, status: newStatus } : item))
        );
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status on server.');
    }
  };

  // Save Notes (Authenticated)
  const handleSaveNotes = async () => {
    if (!activeNotesLead) return;
    try {
      const res = await fetch(getApiUrl(`/api/leads/${activeNotesLead.id}`), {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ notes: editingNotes })
      });

      if (res.status === 401) {
        handleLogout();
        setPinError('Session expired. Please enter PIN.');
        return;
      }

      if (res.ok) {
        setLeads((prev) =>
          prev.map((item) => (item.id === activeNotesLead.id ? { ...item, notes: editingNotes } : item))
        );
        setActiveNotesLead(null);
      }
    } catch (err) {
      console.error('Error saving notes:', err);
      alert('Failed to save notes.');
    }
  };

  // Delete Lead (Authenticated)
  const handleDeleteLead = async (leadId, leadName) => {
    if (!window.confirm(`Are you sure you want to delete lead ${leadId} (${leadName})?`)) {
      return;
    }
    try {
      const res = await fetch(getApiUrl(`/api/leads/${leadId}`), {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${adminToken}`
        }
      });

      if (res.status === 401) {
        handleLogout();
        setPinError('Session expired. Please enter PIN.');
        return;
      }

      if (res.ok) {
        setLeads((prev) => prev.filter((item) => item.id !== leadId));
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Error deleting lead:', err);
      alert('Failed to delete lead.');
    }
  };

  // Add Lead Manually (Authenticated)
  const handleAddLeadSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(getApiUrl('/api/leads'), {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(newLeadForm)
      });

      const data = await res.json();
      if (data.success) {
        setIsAddModalOpen(false);
        setNewLeadForm({
          fullName: '',
          phone: '',
          schoolName: '',
          city: '',
          role: 'Coach / Sports Teacher',
          notes: 'Manually added by administrator.'
        });
        fetchDashboardData();
      } else {
        alert(data.error || 'Failed to add lead');
      }
    } catch (err) {
      console.error('Error creating lead:', err);
      alert('Error connecting to backend server.');
    }
  };

  // Export CSV (Authenticated via token query)
  const handleExportCSV = () => {
    window.open(getApiUrl(`/api/leads/export-csv?token=${encodeURIComponent(adminToken)}`), '_blank');
  };

  // WhatsApp quick link
  const openWhatsAppChat = (lead) => {
    const text = encodeURIComponent(
      `Hello ${lead.fullName},\n\n` +
      `Greetings from *Sanjay Rungta Group of Institutions, Bhilai* regarding *Rungta Premier League 5.0 (RPL)*.\n\n` +
      `We have received your registration for *${lead.schoolName}* (Lead ID: ${lead.id}).\n\n` +
      `Would you like us to share the tournament match schedule, rulebook, and team reporting guidelines?`
    );
    window.open(`https://wa.me/91${lead.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  /* =========================================================
     1. PIN LOGIN SCREEN
  ========================================================= */
  if (!isAuthenticated) {
    return (
      <div className={`admin-lock-screen admin-theme-${theme}`}>
        <div className="admin-lock-card">
          <div className="admin-lock-icon-wrap">
            <Lock className="w-8 h-8 text-amber-400" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-1">
            <img src="/rpl-crest-3d.png" alt="RPL Crest" className="h-10 w-auto" />
            <span className="font-heading font-black text-2xl tracking-wider text-white">RPL 5.0</span>
          </div>

          <h2 className="admin-lock-title">TOURNAMENT CRM PORTAL</h2>
          <p className="admin-lock-subtitle">Enter Administrator PIN to access leads & registrations.</p>

          <form onSubmit={handlePinSubmit} className="admin-lock-form">
            <div className="admin-pin-group">
              <input
                type="password"
                maxLength={12}
                autoFocus
                placeholder="Enter Administrator Access PIN"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="admin-pin-input"
              />
            </div>

            {pinError && <p className="admin-pin-error">{pinError}</p>}

            <button type="submit" className="admin-lock-btn" disabled={isAuthenticating}>
              <Unlock className="w-4 h-4" />
              <span>{isAuthenticating ? 'Verifying on Server...' : 'Unlock Admin Portal'}</span>
            </button>

            <button
              type="button"
              onClick={onBackToHome}
              className="admin-back-home-btn"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to RPL 5.0 Landing Page</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* =========================================================
     2. AUTHENTICATED ADMIN DASHBOARD
  ========================================================= */
  const uniqueCities = Array.from(new Set(leads.map((l) => l.city || 'Bhilai')));

  const filteredLeads = selectedCity === 'ALL'
    ? leads
    : leads.filter((l) => (l.city || '').toUpperCase() === selectedCity.toUpperCase());

  return (
    <div className={`admin-dashboard-root admin-theme-${theme}`}>
      
      {/* TOPBAR / HEADER */}
      <header className="admin-header">
        <div className="container-custom admin-header-inner">
          
          <div className="admin-header-brand">
            <button onClick={onBackToHome} className="admin-header-back-btn" title="Return to Landing Page">
              <ArrowLeft className="w-4 h-4" />
              <span>Landing Page</span>
            </button>
            <div className="h-5 w-[1px] bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <img src="/rpl-crest-3d.png" alt="RPL 5.0" className="h-9 w-auto" />
              <div>
                <h1 className="admin-brand-title">RPL 5.0 CRM</h1>
                <span className="admin-brand-sub">LEADS & TEAM REGISTRATIONS</span>
              </div>
            </div>
          </div>

          <div className="admin-header-actions">
            
            {/* THEME TOGGLE (DARK / LIGHT) */}
            <button
              onClick={toggleTheme}
              className="admin-btn-theme"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            <button onClick={fetchDashboardData} className="admin-btn-secondary" title="Refresh Live Data">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button onClick={handleExportCSV} className="admin-btn-export" title="Export to Excel / CSV">
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button onClick={() => setIsAddModalOpen(true)} className="admin-btn-primary">
              <Plus className="w-4 h-4" />
              <span>Add Lead</span>
            </button>

            <button
              onClick={() => {
                setIsPasswordModalOpen(true);
                setPasswordError('');
                setPasswordSuccess('');
                setCurrentPassInput('');
                setNewPassInput('');
                setConfirmPassInput('');
              }}
              className="admin-btn-secondary"
              title="Change Administrator Password"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Change Password</span>
            </button>

            <button onClick={handleLogout} className="admin-btn-logout" title="Lock Dashboard">
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </header>

      {/* DASHBOARD BODY */}
      <main className="container-custom admin-main-content">
        
        {/* STATS OVERVIEW CARDS */}
        <div className="admin-stats-grid">
          
          {/* 1. TOTAL LEADS */}
          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span className="admin-stat-label">TOTAL LEADS</span>
              <div className="admin-stat-icon-wrap bg-blue-500/10 text-blue-400">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="admin-stat-val">{stats ? stats.totalLeads : leads.length}</div>
            <div className="admin-stat-footer text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>+{stats ? stats.todayLeads : 0} registered today</span>
            </div>
          </div>

          {/* 2. CONFIRMED TEAMS (OUT OF 32) */}
          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span className="admin-stat-label">CONFIRMED TEAMS</span>
              <div className="admin-stat-icon-wrap bg-emerald-500/10 text-emerald-400">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="admin-stat-val flex items-baseline gap-1.5">
              <span>{stats ? stats.confirmedTeams : 0}</span>
              <span className="text-sm font-semibold text-slate-400">/ 32 Goal</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden border border-slate-700">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, ((stats ? stats.confirmedTeams : 0) / 32) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* 3. PAID / VERIFIED */}
          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span className="admin-stat-label">ENTRY FEES PAID</span>
              <div className="admin-stat-icon-wrap bg-amber-500/10 text-amber-400">
                <IndianRupee className="w-5 h-5" />
              </div>
            </div>
            <div className="admin-stat-val flex items-baseline gap-1">
              <span>₹{(stats?.collectedRevenue ?? stats?.totalRevenue ?? 0).toLocaleString()}</span>
              <span className="text-xs text-slate-400 font-normal">collected</span>
            </div>
            <div className="admin-stat-footer text-slate-300">
              <span>{stats?.paidTeams ?? 0} teams completed payment</span>
            </div>
          </div>

          {/* 4. CITIES REPRESENTED */}
          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span className="admin-stat-label">CITIES REPRESENTED</span>
              <div className="admin-stat-icon-wrap bg-purple-500/10 text-purple-400">
                <MapPin className="w-5 h-5" />
              </div>
            </div>
            <div className="admin-stat-val">{stats?.uniqueCities ?? uniqueCities.length}</div>
            <div className="admin-stat-footer text-slate-300">
              <span>Bhilai, Durg, Raipur & more</span>
            </div>
          </div>

        </div>

        {/* ERROR NOTICE IF BACKEND NOT CONNECTED */}
        {error && (
          <div className="admin-error-banner">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <div className="flex-1 text-sm">{error}</div>
            <button onClick={fetchDashboardData} className="text-xs underline font-bold hover:text-white">
              Retry Connection
            </button>
          </div>
        )}

        {/* TOOLBAR: SEARCH & STATUS TABS */}
        <div className="admin-toolbar-card">
          
          <div className="admin-search-wrap">
            <Search className="admin-search-icon" />
            <input
              type="text"
              placeholder="Search by school, contact name, phone, or city..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="admin-search-input"
            />
            {searchQuery && (
              <button onClick={() => handleSearchChange('')} className="admin-search-clear">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* STATUS TABS */}
          <div className="admin-status-tabs">
            {[
              { id: 'ALL', label: 'All Leads' },
              { id: 'NEW', label: 'New' },
              { id: 'CONTACTED', label: 'Contacted' },
              { id: 'CONFIRMED', label: 'Confirmed' },
              { id: 'PAID', label: 'Paid' },
              { id: 'CANCELLED', label: 'Cancelled' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleStatusChangeFilter(tab.id)}
                className={`admin-status-tab ${selectedStatus === tab.id ? 'active' : ''}`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

        </div>

        {/* LEADS DATA TABLE */}
        <div className="admin-table-card">
          <div className="admin-table-header-row">
            <div className="flex items-center gap-2">
              <h3 className="admin-table-title">Registered Leads</h3>
              <span className="admin-table-count">({pagination.totalRecords} total records)</span>
            </div>
            
            {/* Quick City filter */}
            {uniqueCities.length > 1 && (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">City:</span>
                <select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="admin-select-sm"
                >
                  <option value="ALL">All Cities</option>
                  {uniqueCities.map((city) => (
                    <option key={city} value={city}>{city || 'N/A'}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="admin-table-responsive">
            <table className="admin-leads-table">
              <thead>
                <tr>
                  <th>Lead ID</th>
                  <th>Contact Person</th>
                  <th>School / Institution</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Quick Contact</th>
                  <th>Notes</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="admin-empty-table">
                      <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                        <Users className="w-10 h-10 text-slate-600 mb-2" />
                        <p className="font-semibold text-base">No registrations found</p>
                        <p className="text-xs text-slate-500 mt-1">Try changing search keyword or status filter.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="admin-table-row">
                      
                      {/* 1. ID & DATE */}
                      <td>
                        <div className="admin-lead-id">{lead.id}</div>
                        <div className="admin-lead-date">
                          {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </td>

                      {/* 2. CONTACT PERSON */}
                      <td>
                        <strong className="admin-lead-name">{lead.fullName}</strong>
                        <div className="admin-lead-role-pill">{lead.role}</div>
                      </td>

                      {/* 3. SCHOOL NAME */}
                      <td>
                        <div className="admin-lead-school">{lead.schoolName}</div>
                      </td>

                      {/* 4. CITY */}
                      <td>
                        <span className="admin-city-badge">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {lead.city || 'N/A'}
                        </span>
                      </td>

                      {/* 5. STATUS DROPDOWN */}
                      <td>
                        <select
                          value={lead.status || 'NEW'}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`admin-status-select status-${(lead.status || 'NEW').toLowerCase()}`}
                        >
                          <option value="NEW">🔵 New Lead</option>
                          <option value="CONTACTED">🟡 Contacted</option>
                          <option value="CONFIRMED">🟢 Confirmed</option>
                          <option value="PAID">⭐ Paid (₹500)</option>
                          <option value="CANCELLED">⚪ Cancelled</option>
                        </select>
                      </td>

                      {/* 6. QUICK CONTACT (WHATSAPP + CALL) */}
                      <td>
                        <div className="admin-quick-contact-btns">
                          <button
                            onClick={() => openWhatsAppChat(lead)}
                            className="admin-btn-wa-icon"
                            title="Chat on WhatsApp"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </button>

                          <a
                            href={`tel:${lead.phone}`}
                            className="admin-btn-phone-icon"
                            title="Call Phone Number"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>{lead.phone}</span>
                          </a>
                        </div>
                      </td>

                      {/* 7. NOTES */}
                      <td>
                        <button
                          onClick={() => {
                            setActiveNotesLead(lead);
                            setEditingNotes(lead.notes || '');
                          }}
                          className="admin-notes-btn"
                          title="View / Edit Notes"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                          <span className="truncate max-w-[120px]">
                            {lead.notes || 'Add Notes...'}
                          </span>
                        </button>
                      </td>

                      {/* 8. DELETE */}
                      <td>
                        <button
                          onClick={() => handleDeleteLead(lead.id, lead.fullName)}
                          className="admin-delete-btn"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION BAR */}
          <div className="admin-pagination-bar">
            
            {/* Left: Summary & Page Size */}
            <div className="admin-pag-left">
              <span className="admin-pag-info">
                Showing{' '}
                <strong>
                  {pagination.totalRecords === 0
                    ? 0
                    : (pagination.page - 1) * pagination.limit + 1}
                </strong>{' '}
                to{' '}
                <strong>
                  {Math.min(pagination.page * pagination.limit, pagination.totalRecords)}
                </strong>{' '}
                of <strong>{pagination.totalRecords}</strong> leads
              </span>

              <div className="admin-pag-size-wrap">
                <span className="text-slate-400 text-xs">Per page:</span>
                <select
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(parseInt(e.target.value, 10))}
                  className="admin-select-sm"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={-1}>All</option>
                </select>
              </div>
            </div>

            {/* Right: Page Navigation */}
            {pagination.totalPages > 1 && (
              <div className="admin-pag-nav">
                
                {/* First Page */}
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="admin-pag-btn"
                  title="First Page"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </button>

                {/* Prev Page */}
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={!pagination.hasPrevPage}
                  className="admin-pag-btn"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page Number Pills */}
                <div className="admin-pag-numbers">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                    .filter((p) => {
                      if (pagination.totalPages <= 7) return true;
                      if (p === 1 || p === pagination.totalPages) return true;
                      return Math.abs(p - currentPage) <= 1;
                    })
                    .map((p, idx, arr) => {
                      const showEllipsisBefore = idx > 0 && p - arr[idx - 1] > 1;
                      return (
                        <React.Fragment key={p}>
                          {showEllipsisBefore && <span className="admin-pag-ellipsis">...</span>}
                          <button
                            onClick={() => setCurrentPage(p)}
                            className={`admin-pag-page-btn ${currentPage === p ? 'active' : ''}`}
                          >
                            {p}
                          </button>
                        </React.Fragment>
                      );
                    })}
                </div>

                {/* Next Page */}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
                  disabled={!pagination.hasNextPage}
                  className="admin-pag-btn"
                  title="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Last Page */}
                <button
                  onClick={() => setCurrentPage(pagination.totalPages)}
                  disabled={currentPage === pagination.totalPages}
                  className="admin-pag-btn"
                  title="Last Page"
                >
                  <ChevronsRight className="w-4 h-4" />
                </button>

              </div>
            )}

          </div>

        </div>

      </main>

      {/* =========================================================
          3. ADD LEAD MANUALLY MODAL
      ========================================================= */}
      {isAddModalOpen && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card max-w-md">
            
            <div className="admin-modal-header">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-400" />
                <h3 className="font-heading text-xl font-bold text-white uppercase">ADD NEW TEAM LEAD</h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLeadSubmit} className="admin-modal-body">
              <div className="admin-form-group">
                <label className="admin-form-label">Contact Person Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Coach / Captain / Teacher Name"
                  value={newLeadForm.fullName}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, fullName: e.target.value })}
                  className="admin-form-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="admin-form-group">
                  <label className="admin-form-label">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="admin-form-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">City / District *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bhilai / Raipur"
                    value={newLeadForm.city}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, city: e.target.value })}
                    className="admin-form-input"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">School / Institution Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DPS Durg / St. Xavier's"
                  value={newLeadForm.schoolName}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, schoolName: e.target.value })}
                  className="admin-form-input"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Team Role</label>
                <select
                  value={newLeadForm.role}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, role: e.target.value })}
                  className="admin-form-input"
                >
                  <option value="Coach / Sports Teacher">Coach / Sports Teacher</option>
                  <option value="Student Captain / Player">Student Captain / Player</option>
                  <option value="School Principal / Authority">School Principal / Authority</option>
                  <option value="Parent / Team Guardian">Parent / Team Guardian</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Follow-up Notes</label>
                <textarea
                  rows={2}
                  placeholder="Enter any discussion notes..."
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  className="admin-form-input text-xs"
                />
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="admin-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  Save Registration Lead
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* =========================================================
          4. EDIT NOTES MODAL
      ========================================================= */}
      {activeNotesLead && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card max-w-md">
            
            <div className="admin-modal-header">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-400" />
                <h3 className="font-heading text-lg font-bold text-white uppercase">
                  NOTES: {activeNotesLead.id} - {activeNotesLead.fullName}
                </h3>
              </div>
              <button onClick={() => setActiveNotesLead(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="text-xs text-slate-400">
                School: <strong className="text-slate-200">{activeNotesLead.schoolName}</strong>
              </div>
              <textarea
                rows={4}
                placeholder="Log team requirements, jersey colour, payment method, or follow-up details..."
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                className="admin-form-input text-sm"
              />

              <div className="admin-modal-actions">
                <button
                  onClick={() => setActiveNotesLead(null)}
                  className="admin-btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNotes}
                  className="admin-btn-primary"
                >
                  Save Notes
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================
          5. CHANGE ADMIN PASSWORD MODAL
      ========================================================= */}
      {isPasswordModalOpen && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card max-w-md">
            
            <div className="admin-modal-header">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h3 className="font-heading text-lg font-bold text-white uppercase">
                  CHANGE ADMIN PASSWORD / PIN
                </h3>
              </div>
              <button 
                onClick={() => {
                  setIsPasswordModalOpen(false);
                  setPasswordError('');
                  setPasswordSuccess('');
                }} 
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleChangePasswordSubmit} className="admin-modal-body">
              
              {passwordError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-xs text-red-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              {passwordSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center gap-2 text-xs text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{passwordSuccess}</span>
                </div>
              )}

              <div className="admin-form-group">
                <label className="admin-form-label">Current Password / PIN *</label>
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="Enter current password"
                  value={currentPassInput}
                  onChange={(e) => setCurrentPassInput(e.target.value)}
                  className="admin-form-input"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">New Password / PIN * (Min 4 chars)</label>
                <input
                  type="password"
                  required
                  minLength={4}
                  placeholder="Enter new password"
                  value={newPassInput}
                  onChange={(e) => setNewPassInput(e.target.value)}
                  className="admin-form-input"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Confirm New Password / PIN *</label>
                <input
                  type="password"
                  required
                  minLength={4}
                  placeholder="Re-enter new password"
                  value={confirmPassInput}
                  onChange={(e) => setConfirmPassInput(e.target.value)}
                  className="admin-form-input"
                />
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="admin-btn-secondary"
                  disabled={isSubmittingPassword}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn-primary"
                  disabled={isSubmittingPassword}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{isSubmittingPassword ? 'Verifying & Saving...' : 'Update Password'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

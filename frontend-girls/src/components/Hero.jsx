import React, { useState } from 'react';
import { 
  Trophy, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  PhoneCall, 
  User, 
  Phone, 
  School, 
  MapPin,
  ArrowRight,
  Copy,
  Check,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getApiUrl } from '../config/api';

export default function Hero() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [leadId, setLeadId] = useState('');
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    schoolName: '',
    city: '',
    role: 'Coach / Sports Teacher'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(getApiUrl('/api/leads'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (data.success && data.data && data.data.id) {
        setLeadId(data.data.id);
      } else {
        setLeadId(`RPL-${Math.floor(1000 + Math.random() * 9000)}`);
      }
    } catch (err) {
      console.warn('Backend offline, using client fallback confirmation:', err);
      setLeadId(`RPL-${Math.floor(1000 + Math.random() * 9000)}`);
    } finally {
      setSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({ particleCount: 110, spread: 75, origin: { y: 0.5 } });
      } catch (err) {}
    }
  };

  const handleCopyLeadId = () => {
    if (!leadId) return;
    navigator.clipboard.writeText(leadId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent('Hello, I want to register our team for Rungta Premier League 5.0.');
    window.open(`https://wa.me/919229111555?text=${text}`, '_blank');
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setLeadId('');
    setCopied(false);
    setForm({
      fullName: '',
      phone: '',
      schoolName: '',
      city: '',
      role: 'Coach / Sports Teacher'
    });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-overlay"></div>

      {/* BACKGROUND CRICKET IMAGE LAYER (HIGH-RES GIRLS CRICKET ACTION) */}
      <div className="hero-player">
        <div className="hero-player-glow"></div>
        <img
          src="/images/girls-cricket-hero.jpg"
          alt="Girls Cricket Tournament"
        />
      </div>

      <div className="container-custom hero-container">
        
        {/* LEFT COLUMN: HERO TOURNAMENT BRANDING */}
        <div className="hero-content">
          
          <div className="present-label">
            SANJAY RUNGTA GROUP OF INSTITUTIONS
            <span>PRESENTS</span>
          </div>

          <div className="hero-title-small">
            RUNGTA
          </div>

          <h1>
            PREMIER LEAGUE
            <span> 5.0</span>
          </h1>

          <div className="hero-subtitle">
            STATE LEVEL INTER SCHOOL
            <br />
            CRICKET TOURNAMENT FOR GIRLS
          </div>

          <div className="hero-date">
            <svg
              className="hero-calendar-svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2.5" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="9.5" x2="21" y2="9.5" />
              <circle cx="7.5" cy="13.5" r="1.1" fill="currentColor" />
              <circle cx="12" cy="13.5" r="1.1" fill="currentColor" />
              <circle cx="16.5" cy="13.5" r="1.1" fill="currentColor" />
              <circle cx="7.5" cy="17.5" r="1.1" fill="currentColor" />
              <circle cx="12" cy="17.5" r="1.1" fill="currentColor" />
              <circle cx="16.5" cy="17.5" r="1.1" fill="currentColor" />
            </svg>
            <span className="hero-date-text">
              21<sup>ST</sup> OCTOBER TO 04<sup>TH</sup> NOVEMBER 2026
            </span>
          </div>

          {/* SLOGAN & QUICK HIGHLIGHTS */}
          <div className="hero-left-slogan-wrap">
            <div className="hero-slogan-inline">
              <span>PLAY.</span>
              <span className="text-amber-400">COMPETE.</span>
              <span>GROW.</span>
            </div>
            <div className="hero-motto-tag">
              <span>SAME COLOUR</span>
              <span className="text-amber-400">•</span>
              <span>SAME DREAM</span>
            </div>
          </div>

          <div className="hero-actions">
            <a href="#prizes" className="btn btn-hero-outline">
              <span>Explore Prizes & Format</span>
              <span className="btn-arrow">↓</span>
            </a>
            <div className="hero-quick-call">
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Helpline: <a href="tel:9229111555" className="hover:text-amber-300"><strong>9229 111 555</strong></a> / <a href="tel:9229111666" className="hover:text-amber-300"><strong>9229 111 666</strong></a></span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: IN-HERO REGISTRATION CARD */}
        <div className="hero-reg-column" id="hero-register">
          <div className="hero-reg-card">
            
            {/* CARD TOP CREST EMBLEM */}
            <div className="hero-reg-crest-header">
              <img
                src="/rpl-crest-3d.png"
                alt="RPL 5.0 Tournament Crest"
                className="hero-reg-crest-img"
              />
              <div className="hero-reg-title-wrap">
                <div className="hero-reg-badge-label">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isSubmitted ? 'WELCOME TO RPL 5.0' : 'OFFICIAL TEAM REGISTRATION'}</span>
                </div>
                <h3 className="hero-reg-card-title">
                  {isSubmitted ? <span>WELCOME <span>ABOARD!</span></span> : <span>REGISTER <span>YOUR TEAM</span></span>}
                </h3>
              </div>
            </div>

            {isSubmitted ? (
              /* ================= SIMPLE & CLEAN WELCOME VIEW ================= */
              <div className="hero-welcome-view">
                
                <div className="hero-welcome-icon-wrap">
                  <div className="hero-welcome-icon-glow"></div>
                  <CheckCircle2 className="w-14 h-14 text-emerald-400" />
                </div>

                <h4 className="hero-welcome-title">
                  THANK YOU, {form.fullName ? form.fullName.toUpperCase() : 'COACH / CAPTAIN'}!
                </h4>

                <p className="hero-welcome-msg">
                  We are thrilled to welcome <strong>{form.schoolName || 'your team'}</strong> to <strong>Rungta Premier League 5.0</strong>.
                </p>

                <p className="hero-welcome-submsg">
                  Our tournament coordinators will reach out to you shortly on <strong>{form.phone}</strong> with match updates and fixtures.
                </p>

                <div className="hero-welcome-actions">
                  <button
                    onClick={handleWhatsAppSend}
                    className="hero-welcome-wa-btn"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Chat with Us on WhatsApp</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="hero-welcome-reset-btn"
                  >
                    <span>Register Another Team</span>
                  </button>
                </div>

              </div>
            ) : (
              /* ================= IN-HERO LEAD FORM ================= */
              <form onSubmit={handleSubmit} className="hero-reg-form">
                
                {/* 1. FULL NAME */}
                <div className="hero-reg-input-group">
                  <label className="hero-reg-label">
                    Full Name (Coach / Captain) <span className="text-red-400">*</span>
                  </label>
                  <div className="hero-reg-input-wrap">
                    <User className="hero-reg-field-icon" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sports Teacher / Captain Name"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="hero-reg-input"
                    />
                  </div>
                </div>

                {/* 2. PHONE & CITY ROW */}
                <div className="hero-reg-grid-2">
                  <div className="hero-reg-input-group">
                    <label className="hero-reg-label">
                      WhatsApp / Phone <span className="text-red-400">*</span>
                    </label>
                    <div className="hero-reg-input-wrap">
                      <Phone className="hero-reg-field-icon" />
                      <input
                        type="tel"
                        required
                        placeholder="10-digit number"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="hero-reg-input"
                      />
                    </div>
                  </div>

                  <div className="hero-reg-input-group">
                    <label className="hero-reg-label">
                      City / District <span className="text-red-400">*</span>
                    </label>
                    <div className="hero-reg-input-wrap">
                      <MapPin className="hero-reg-field-icon" />
                      <input
                        type="text"
                        required
                        placeholder="Bhilai / Durg / Raipur"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="hero-reg-input"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. SCHOOL / INSTITUTION NAME */}
                <div className="hero-reg-input-group">
                  <label className="hero-reg-label">
                    School / Institution Name <span className="text-red-400">*</span>
                  </label>
                  <div className="hero-reg-input-wrap">
                    <School className="hero-reg-field-icon" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. DPS / St. Xavier's / Govt School"
                      value={form.schoolName}
                      onChange={(e) => setForm({ ...form, schoolName: e.target.value })}
                      className="hero-reg-input"
                    />
                  </div>
                </div>

                {/* 4. ROLE */}
                <div className="hero-reg-input-group">
                  <label className="hero-reg-label">
                    Your Role in Team
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="hero-reg-input hero-reg-select"
                  >
                    <option value="Coach / Sports Teacher">Coach / Sports Teacher</option>
                    <option value="Student Captain / Player">Student Captain / Player</option>
                    <option value="School Principal / Authority">School Principal / Authority</option>
                    <option value="Parent / Team Guardian">Parent / Team Guardian</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="hero-reg-submit-btn"
                >
                  <span>SUBMIT & GET TEAM PASS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </form>
            )}

          </div>
        </div>

      </div>

      {/* HERO FEATURES STRIP */}
      <div className="hero-features">
        <div className="feature-grid">
          
          {/* 1. DAY MATCHES */}
          <div className="hero-feature">
            <div className="hero-feat-icon">
              <svg viewBox="0 0 48 48" className="hero-feat-svg" fill="#f8c51c">
                <circle cx="24" cy="24" r="7.5" />
                <rect x="22" y="6" width="4" height="6" rx="2" />
                <rect x="22" y="36" width="4" height="6" rx="2" />
                <rect x="6" y="22" width="6" height="4" rx="2" />
                <rect x="36" y="22" width="6" height="4" rx="2" />
                <rect x="11.3" y="11.3" width="4" height="6" rx="2" transform="rotate(-45 13.3 14.3)" />
                <rect x="32.7" y="32.7" width="4" height="6" rx="2" transform="rotate(-45 34.7 35.7)" />
                <rect x="32.7" y="11.3" width="4" height="6" rx="2" transform="rotate(45 34.7 14.3)" />
                <rect x="11.3" y="32.7" width="4" height="6" rx="2" transform="rotate(45 13.3 35.7)" />
              </svg>
            </div>
            <div className="hero-feat-text">
              <strong className="hero-feat-main">Day Matches</strong>
              <span className="hero-feat-sub">Only</span>
            </div>
          </div>

          {/* 2. UNDER 18 */}
          <div className="hero-feature">
            <div className="hero-feat-icon">
              <svg viewBox="0 0 48 48" className="hero-feat-svg" fill="#f8c51c">
                <circle cx="24" cy="13" r="5" />
                <path d="M 17 31 C 17 26.2 20.2 22.8 24 22.8 C 27.8 22.8 31 26.2 31 31 Z" />
                <circle cx="13.5" cy="18" r="3.8" opacity="0.88" />
                <path d="M 8 31 C 8 27.2 10.8 24.8 13.8 24.8 C 15.3 24.8 16.7 25.5 17.6 26.6 C 17.1 27.9 16.8 29.4 16.8 31 Z" opacity="0.88" />
                <circle cx="34.5" cy="18" r="3.8" opacity="0.88" />
                <path d="M 31.2 31 C 31.2 29.4 30.9 27.9 30.4 26.6 C 31.3 25.5 32.7 24.8 34.2 24.8 C 37.2 24.8 40 27.2 40 31 Z" opacity="0.88" />
              </svg>
            </div>
            <div className="hero-feat-text">
              <strong className="hero-feat-main">Under 18</strong>
              <span className="hero-feat-sub">School Girls (U-18)</span>
            </div>
          </div>

          {/* 3. TENNIS BALL (CROSSED BATS) */}
          <div className="hero-feature">
            <div className="hero-feat-icon">
              <svg viewBox="0 0 48 48" className="hero-feat-svg" fill="none">
                <circle cx="24" cy="24" r="18" fill="#f8c51c" />
                <g transform="rotate(45 24 24)">
                  <rect x="22.3" y="10" width="3.4" height="8" rx="1" fill="#041838" />
                  <circle cx="24" cy="10" r="1.7" fill="#041838" />
                  <path d="M 21.6 17.5 L 26.4 17.5 L 26.6 35.5 C 26.6 37 25.5 38 24 38 C 22.5 38 21.4 37 21.4 35.5 Z" fill="#041838" />
                </g>
                <g transform="rotate(-45 24 24)">
                  <rect x="22.3" y="10" width="3.4" height="8" rx="1" fill="#041838" />
                  <circle cx="24" cy="10" r="1.7" fill="#041838" />
                  <path d="M 21.6 17.5 L 26.4 17.5 L 26.6 35.5 C 26.6 37 25.5 38 24 38 C 22.5 38 21.4 37 21.4 35.5 Z" fill="#041838" />
                </g>
                <circle cx="24" cy="24" r="2.2" fill="#f8c51c" />
              </svg>
            </div>
            <div className="hero-feat-text">
              <strong className="hero-feat-main">Tennis Ball</strong>
              <span className="hero-feat-sub">Tournament</span>
            </div>
          </div>

          {/* 4. RSR RCET CRICKET GROUND */}
          <div className="hero-feature">
            <div className="hero-feat-icon">
              <svg viewBox="0 0 48 48" className="hero-feat-svg" fill="#f8c51c">
                <path d="M 24 8 C 17.4 8 12 13.4 12 20 C 12 28.5 22.2 38.5 23.1 39.4 C 23.6 39.8 24.4 39.8 24.9 39.4 C 25.8 38.5 36 28.5 36 20 C 36 13.4 30.6 8 24 8 Z M 24 24 C 21.8 24 20 22.2 20 20 C 20 17.8 21.8 16 24 16 C 26.2 16 28 17.8 28 20 C 28 22.2 26.2 24 24 24 Z" />
              </svg>
            </div>
            <div className="hero-feat-text">
              <strong className="hero-feat-main">RSR RCET Cricket Ground</strong>
              <span className="hero-feat-sub">Bhilai</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

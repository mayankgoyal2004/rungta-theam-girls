import React, { useState } from 'react';
import { 
  X, 
  Trophy, 
  User, 
  Phone, 
  School, 
  MapPin, 
  CheckCircle2, 
  Share2, 
  PhoneCall, 
  Send,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RegistrationModal({ isOpen, onClose }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    schoolName: '',
    city: 'Bhilai',
    role: 'Coach / Sports Teacher'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (err) {}
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `🏏 *RUNGTA PREMIER LEAGUE 5.0 - NEW LEAD / ENQUIRY*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Name:* ${form.fullName}\n` +
      `📞 *Phone:* ${form.phone}\n` +
      `🏫 *School/College:* ${form.schoolName}\n` +
      `📍 *City:* ${form.city}\n` +
      `👔 *Role:* ${form.role}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Hello, I would like to get tournament details and register our team for RPL 5.0.`
    );
    window.open(`https://wa.me/919229111555?text=${text}`, '_blank');
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="reg-modal-overlay">
      <div className="reg-modal-box max-w-lg">
        
        {/* TOP ACCENT STRIP */}
        <div className="reg-modal-stripe"></div>

        {/* CLOSE BUTTON */}
        <button
          onClick={handleReset}
          aria-label="Close"
          className="reg-modal-close"
        >
          <X className="w-5 h-5 text-slate-500" />
        </button>

        {isSubmitted ? (
          /* ================= SUCCESS CONFIRMATION ================= */
          <div className="reg-success-view">
            <div className="reg-success-icon-wrap">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>

            <span className="reg-success-badge">
              ENQUIRY SUBMITTED SUCCESSFULLY
            </span>

            <h3 className="reg-success-title">
              THANK YOU, {form.fullName.toUpperCase()}!
            </h3>

            <p className="reg-success-desc">
              We have received your enquiry for <strong>Rungta Premier League 5.0</strong>. Our tournament desk will connect with you shortly on <strong>{form.phone}</strong>.
            </p>

            {/* QUICK LEAD SUMMARY CARD */}
            <div className="reg-pass-card">
              <div className="reg-pass-top">
                <div>
                  <span className="reg-pass-tag">LEAD REFERENCE</span>
                  <h4 className="reg-pass-school">{form.schoolName || 'School Team'}</h4>
                </div>
                <div className="reg-pass-token-box">
                  <span className="reg-pass-token-label">LOCATION</span>
                  <span className="reg-pass-token-val text-sm">{form.city}</span>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-1.5 pt-1">
                <p><strong>Contact Person:</strong> {form.fullName} ({form.role})</p>
                <p><strong>Phone Number:</strong> {form.phone}</p>
                <p><strong>Tournament Dates:</strong> 21 Oct – 04 Nov 2026</p>
                <p><strong>Venue:</strong> RSR RCET Cricket Ground, Bhilai</p>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="reg-success-actions">
              <button
                onClick={handleWhatsAppSend}
                className="reg-btn-whatsapp"
              >
                <Share2 className="w-4 h-4" />
                <span>Chat on WhatsApp (Instant Reply)</span>
              </button>

              <a
                href="tel:9229111555"
                className="reg-btn-close-modal flex items-center justify-center gap-1.5 text-center"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Helpline</span>
              </a>
            </div>
          </div>
        ) : (
          /* ================= LEAD FORM ================= */
          <div className="reg-modal-content">
            
            {/* HEADER */}
            <div className="reg-modal-header">
              <div className="reg-header-pill">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>RPL 5.0 • TOURNAMENT ENQUIRY</span>
              </div>
              <h3 className="reg-main-title">
                GET TOURNAMENT <span>DETAILS</span>
              </h3>
              <p className="reg-sub-text">
                Fill this quick form to receive registration guidelines, rulebook & team entry pass.
              </p>
            </div>

            {/* LEAD FORM */}
            <form onSubmit={handleSubmit} className="reg-form-body">
              
              {/* 1. FULL NAME */}
              <div className="reg-form-group">
                <label className="reg-form-label">
                  Your Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Coach / Captain / Teacher Name"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="reg-form-input"
                />
              </div>

              {/* 2. PHONE NUMBER & CITY */}
              <div className="reg-form-row">
                <div className="reg-form-group">
                  <label className="reg-form-label">
                    WhatsApp / Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="reg-form-input"
                  />
                </div>

                <div className="reg-form-group">
                  <label className="reg-form-label">
                    City / District <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bhilai / Durg / Raipur"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="reg-form-input"
                  />
                </div>
              </div>

              {/* 3. SCHOOL / INSTITUTION NAME */}
              <div className="reg-form-group">
                <label className="reg-form-label">
                  School / Institution Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. St. Xavier's / DPS / Govt Higher Secondary"
                  value={form.schoolName}
                  onChange={(e) => setForm({ ...form, schoolName: e.target.value })}
                  className="reg-form-input"
                />
              </div>

              {/* 4. ROLE */}
              <div className="reg-form-group">
                <label className="reg-form-label">
                  You Are A
                </label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="reg-form-input reg-select"
                >
                  <option value="Coach / Sports Teacher">Coach / Sports Teacher</option>
                  <option value="Student Captain / Player">Student Captain / Player</option>
                  <option value="School Principal / Authority">School Principal / Authority</option>
                  <option value="Parent / Team Guardian">Parent / Team Guardian</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* QUICK HIGHLIGHT */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 flex items-center justify-between text-xs text-amber-950">
                <span className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Entry Fee: ₹500 / Team
                </span>
                <span className="text-slate-600 font-semibold">
                  Cash Prizes: ₹37,100 + Scholarships
                </span>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="reg-submit-btn"
              >
                <span>SUBMIT ENQUIRY & GET PASS</span>
                <Send className="w-4 h-4" />
              </button>

              <p className="text-center text-[11px] text-slate-500 mt-1">
                Need immediate help? Call RPL Helpline: <a href="tel:9229111555" className="text-red-600 font-bold hover:underline">9229 111 555</a> / <a href="tel:9229111666" className="text-red-600 font-bold hover:underline">9229 111 666</a>
              </p>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}

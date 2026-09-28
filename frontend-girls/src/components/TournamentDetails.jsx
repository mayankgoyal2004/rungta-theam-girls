import React from 'react';
import { Users, Sun, Calendar, MapPin, Phone, Award, Shield } from 'lucide-react';

export default function TournamentDetails() {
  return (
    <section className="section details-section" id="tournament">
      <div className="container-custom">
        
        {/* SECTION HEADING */}
        <div className="section-heading center">
          <h2 className="prizes-main-title">
            TOURNAMENT <span>DETAILS</span>
          </h2>
          <p className="prizes-subtitle">
            OFFICIAL FORMAT, ROUNDS & SCHEDULE
          </p>
        </div>

        {/* 7-CARD DETAILS GRID */}
        <div className="tournament-details-grid">
          
          {/* 1. Age Group */}
          <div className="td-card">
            <div className="td-icon-wrap">
              <Users className="td-icon text-red-600" strokeWidth={2.2} />
            </div>
            <h3 className="td-title">UNDER 18 YEARS</h3>
            <p className="td-sub">Inter-School Girls</p>
          </div>

          {/* 2. Day Matches */}
          <div className="td-card">
            <div className="td-icon-wrap">
              <Sun className="td-icon text-red-600" strokeWidth={2.2} />
            </div>
            <h3 className="td-title">DAY MATCHES ONLY</h3>
            <p className="td-sub">Natural Daylight Play</p>
          </div>

          {/* 3. Tennis Ball */}
          <div className="td-card">
            <div className="td-icon-wrap">
              <svg className="td-icon-svg" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="16" fill="#c4db00" stroke="#a3b800" strokeWidth="1.5" />
                <path d="M7 9C13 13 13 23 7 27" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                <path d="M29 9C23 13 23 23 29 27" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="td-title">PLAYED WITH TENNIS BALL</h3>
            <p className="td-sub">New ball each inning</p>
          </div>

          {/* 4. Match Overs & Rounds Format */}
          <div className="td-card border-red-200 bg-red-50/20">
            <div className="td-icon-wrap">
              <span className="td-icon-number text-red-600">5•6•6</span>
            </div>
            <h3 className="td-title">MATCH ROUNDS</h3>
            <p className="td-sub text-slate-800 font-bold">
              Prelims: <span className="text-red-600">5 Ov</span><br />
              Semi: <span className="text-red-600">6 Ov</span> | Final: <span className="text-red-600">6 Ov</span>
            </p>
          </div>

          {/* 5. Tournament Dates */}
          <div className="td-card">
            <div className="td-icon-wrap">
              <Calendar className="td-icon text-red-600" strokeWidth={2.2} />
            </div>
            <h3 className="td-title td-date-title">
              17 NOV 2026<br />to<br />22 NOV 2026
            </h3>
            <p className="td-sub">Tournament Dates</p>
          </div>

          {/* 6. Venue */}
          <div className="td-card">
            <div className="td-icon-wrap">
              <MapPin className="td-icon text-red-600" strokeWidth={2.2} />
            </div>
            <h3 className="td-title td-venue-title">
              Sanjay Rungta Group of Institutions,<br />
              Cricket Ground,<br />
              Bhilai
            </h3>
            <p className="td-sub">Official Venue</p>
          </div>

          {/* 7. Registration Contact */}
          <div className="td-card">
            <div className="td-icon-wrap">
              <Phone className="td-icon text-red-600" strokeWidth={2.2} />
            </div>
            <h3 className="td-title td-phone-title">
              <a href="tel:9229111555" className="hover:text-red-600 transition-colors">9229 111 555</a>
              <br />
              <a href="tel:9229111666" className="hover:text-red-600 transition-colors">9229 111 666</a>
            </h3>
            <p className="td-sub">Helpline & Registration</p>
          </div>

        </div>

      </div>
    </section>
  );
}

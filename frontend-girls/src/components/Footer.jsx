import React from 'react';

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container-custom">
        
        {/* MAIN 5-COLUMN / SECTION FOOTER GRID */}
        <div className="footer-grid-ref">
          
          {/* 1. BRAND / LOTUS LOGO */}
          <div className="footer-brand-col">
            <a href="#home" className="footer-logo-link">
              <img
                src="/rungta_footer_logo_white.png"
                alt="Sanjay Rungta Group - Let the minds bloom"
                className="footer-rungta-logo"
              />
            </a>
          </div>

          {/* 2. QUICK LINKS */}
          <div className="footer-links-col">
            <h3 className="footer-heading">QUICK LINKS</h3>
            <ul className="footer-nav-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#prizes">Prizes</a></li>
              <li><a href="#scholarships">Scholarships</a></li>
              <li><a href="#entry-fee">Entry Fee</a></li>
              <li><a href="#tournament">Tournament</a></li>
              <li><a href="#rules">Rules</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* 3. CONTACT FOR REGISTRATION */}
          <div className="footer-contact-col">
            <h3 className="footer-heading">CONTACT FOR REGISTRATION</h3>
            <div className="footer-phone-box">
              {/* SOLID WHITE PHONE ICON */}
              <div className="footer-phone-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>

              <div className="footer-phone-numbers">
                <a href="tel:9229111555" className="footer-phone-link">
                  9229 111 555
                </a>
                <a href="tel:9229111666" className="footer-phone-link">
                  9229 111 666
                </a>
              </div>
            </div>
          </div>

          {/* 4. VENUE */}
          <div className="footer-venue-col">
            <h3 className="footer-heading">VENUE</h3>
            <div className="footer-venue-box">
              {/* SOLID WHITE PIN ICON */}
              <div className="footer-venue-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                  <path fillRule="evenodd" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" clipRule="evenodd" />
                </svg>
              </div>

              <div className="footer-venue-text">
                <p>Sanjay Rungta Group of Institutions,</p>
                <p>RSR RCET Cricket Ground,</p>
                <p>Bhilai.</p>
              </div>
            </div>
          </div>

          {/* 5. SCRIPT TAGLINE: Where Every Run Writes History */}
          <div className="footer-tagline-col">
            <div className="footer-script-wrap">
              <span className="footer-script-line1">Where</span>
              <span className="footer-script-line2">Every Run</span>
              <span className="footer-script-line3">Writes History</span>
            </div>
          </div>

        </div>

        {/* FOOTER BOTTOM BAR */}
        <div className="footer-bottom-ref">
          <span className="footer-copyright">
            © 2026 Rungta Premier League. All Rights Reserved.
          </span>

          <span className="footer-initiative">
            A SANJAY RUNGTA GROUP OF INSTITUTIONS INITIATIVE
          </span>
        </div>

      </div>
    </footer>
  );
}

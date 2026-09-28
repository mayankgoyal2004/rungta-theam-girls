import React, { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, Award, HeartHandshake, Phone, Globe } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* =========================================================
           TOP BAR WITH PROFESSIONAL SPORTS ICONS
      ========================================================= */}
      <div className="topbar">
        <div className="container-custom topbar-inner">
          <div className="topbar-left flex items-center gap-2 font-medium">
            <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Sanjay Rungta Group of Institutions, Bhilai</span>
          </div>

          <div className="topbar-right flex items-center gap-4 sm:gap-6">
            <span className="hidden md:flex items-center gap-1.5 text-slate-200">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Education</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-200">
              <Award className="w-3.5 h-3.5 text-red-400" />
              <span>Excellence</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-200">
              <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
              <span>Evolving Lives</span>
            </span>

            <div className="flex items-center gap-3 border-l border-white/20 pl-4">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Phone className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <a href="tel:9229111555" className="hover:text-white transition-colors">9229 111 555</a>
                <span className="text-white/40">,</span>
                <a href="tel:9229111666" className="hover:text-white transition-colors">9229 111 666</a>
              </div>
              <span className="text-white/20 hidden sm:inline">|</span>
              <a
                href="https://www.rungtacolleges.com"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-amber-400 transition-colors"
                title="Visit Official Campus Website"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>www.rungtacolleges.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
           NAVBAR WITH SRGI & 3D RPL 5.0 CREST LOGO
      ========================================================= */}
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container-custom nav-inner">
          
          {/* BRAND WITH BOTH LOGOS */}
          <a href="#home" className="brand flex items-center gap-3 group">
            <img
              src="/SRGI LOGO.png"
              alt="Sanjay Rungta Group of Institutions"
              className="srgi-nav-logo"
            />
            <div className="h-8 w-[1.5px] bg-slate-200 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <img
                src="/rpl-crest-3d.png"
                alt="Rungta Premier League 5.0"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </a>

          {/* NAV MENU */}
          <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <a 
              href="#home" 
              onClick={() => setMobileMenuOpen(false)}
              className="active"
            >
              Home
            </a>
            <a 
              href="#prizes" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Prizes
            </a>
            <a 
              href="#scholarships" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Scholarships
            </a>
            <a 
              href="#entry-fee" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Entry Fee
            </a>
            <a 
              href="#tournament" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Tournament
            </a>
            <a 
              href="#rules" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Rules
            </a>
            <a 
              href="#gallery" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
          </nav>

          {/* REGISTER CTA */}
          <a
            href="#hero-register"
            className="btn btn-primary nav-btn"
          >
            Register Your Team
            <span>→</span>
          </a>

          {/* MOBILE MENU BUTTON */}
          <button
            className="mobile-menu-btn"
            id="mobileMenuBtn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

        </div>
      </header>
    </>
  );
}

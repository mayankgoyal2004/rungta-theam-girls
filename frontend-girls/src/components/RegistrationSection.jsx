import React from 'react';

export default function RegistrationSection() {
  return (
    <section className="registration-section" id="register">
      <div className="registration-overlay"></div>

      <div className="container-custom registration-inner">
        <div className="reg-left-slogan">
          <span className="slogan-gold">DON'T JUST WATCH.</span>
          <span className="slogan-white">BE A PART OF IT.</span>
        </div>

        <div className="registration-center">
          <h2 className="reg-title">
            READY TO PLAY?
          </h2>

          <p className="reg-subtitle">
            REGISTER YOUR TEAM <span className="reg-sub-gold">NOW AND BE A PART OF RUNGTA PREMIER LEAGUE 5.0</span>
          </p>

          <a
            href="#hero-register"
            className="btn btn-hero-primary reg-btn-glow"
          >
            <span>Register Your Team</span>
            <span className="btn-arrow">↑</span>
          </a>
        </div>

        <div className="registration-ball-space">
          {/* Visual space showcasing the cricket ball on grass from background */}
        </div>
      </div>
    </section>
  );
}

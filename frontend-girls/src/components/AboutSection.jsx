import React from 'react';

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="container-custom about-grid">
        
        <div className="about-content">
          <span className="section-label">
            MORE THAN A GAME
          </span>

          <h2>
            ABOUT THE <span>TOURNAMENT</span>
          </h2>

          <p>
            Rungta Women's Premier League (RWPL) 2.0 is a district level inter school cricket tournament for girls, organized by Sanjay Rungta Group of Institutions, Bhilai.
          </p>

          <p>
            RWPL 2.0 aims to provide a competitive platform for young talent, promote sportsmanship and encourage a healthy, active lifestyle among school students.
          </p>

          <div className="about-points">
            <div>
              <strong>01</strong>
              <span>Talent</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Discipline</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Leadership</span>
            </div>

            <div>
              <strong>04</strong>
              <span>Teamwork</span>
            </div>
          </div>
        </div>

        <div className="about-image">
          <img
            src="/images/ground-facility.jpg"
            alt="Students and sports"
          />

          <div className="about-image-overlay">
            <strong>
              WHERE <span>CHAMPIONS</span> BEGIN
            </strong>
          </div>
        </div>

      </div>
    </section>
  );
}

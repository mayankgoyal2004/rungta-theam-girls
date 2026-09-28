import React from 'react';

export default function TournamentFormat() {
  return (
    <section className="schedule-section" id="schedule">
      <div className="container-custom">
        
        <div className="section-heading">
          <span className="section-label" style={{ color: 'var(--gold)' }}>
            PLAN YOUR GAME
          </span>

          <h2>
            TOURNAMENT <span>FORMAT</span>
          </h2>
        </div>

        <div className="timeline">
          
          <div className="timeline-item">
            <div className="timeline-number">
              01
            </div>

            <div className="timeline-content">
              <span>17 NOVEMBER 2026</span>
              <h3>Tournament Begins</h3>
              <p>
                Opening matches and tournament kick-off at Sanjay Rungta Cricket Ground.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-number">
              02
            </div>

            <div className="timeline-content">
              <span>KNOCKOUT PRELIMS</span>
              <h3>5 Overs Per Match</h3>
              <p>
                Fast-paced knockout cricket format. Only winning squads advance.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-number">
              03
            </div>

            <div className="timeline-content">
              <span>SEMI FINAL</span>
              <h3>6 Overs Per Side</h3>
              <p>
                Extended 6-over contest. Teams report 30 minutes before match time.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-number">
              04
            </div>

            <div className="timeline-content">
              <span>22 NOVEMBER 2026</span>
              <h3>Grand Final (6 Overs)</h3>
              <p>
                Championship 6-over finale and grand cash prize distribution celebration.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

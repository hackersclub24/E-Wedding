'use client';

import React from 'react';

export default function FamilySection() {
  return (
    <section id="invitation" className="royal-card section-padding">
      <div className="card-corner corner-tl"></div>
      <div className="card-corner corner-tr"></div>
      <div className="card-corner corner-bl"></div>
      <div className="card-corner corner-br"></div>

      <div className="section-header">
        <div className="section-pretitle">The Sacred Union</div>
        <h3 className="section-main-title">Auspicious Wedding Ceremony</h3>
        <div className="section-title-divider">
          <div className="title-line"></div>
          <div className="title-diamond">❖</div>
          <div className="title-line"></div>
        </div>
      </div>

      <div className="invitation-letter">
        <div className="grandparent-portrait-container">
          <div className="grandparent-portrait-frame">
            <div className="grandparent-portrait-inner">
              <img
                src="/assets/sumitra_devi.jpeg"
                alt="Sh. Sumitra Devi"
                className="grandparent-portrait-img"
              />
            </div>
            <div className="grandparent-portrait-tag">Grandmother's Blessing</div>
          </div>
        </div>

        <div className="grandparents-blessing">
          Sh. Sumitra Devi
        </div>
        <div className="grandparents-sub">
          (W/o Late Sh. Jagdish Chand Bhati)
        </div>

        <p className="invitation-quote-body">
          cordially invites you to grace the auspicious occasion of the<br />
          <strong style={{ color: 'var(--color-maroon)', fontFamily: 'var(--font-royal)', fontSize: '1.3rem' }}>
            Wedding Ceremony
          </strong><br />
          of their beloved grand son
        </p>

        {/* Bride & Groom Family Grid */}
        <div className="family-pair-grid">
          {/* Groom Side */}
          <div className="family-column">
            <div className="family-side-title">The Royal Groom</div>
            <div className="person-name-highlight">Aditya</div>
            <div className="parents-detail">
              S/o <strong>Mrs. Poonam & Mr. Harinder Singh Bhati</strong>
            </div>
            <div className="residence-detail">
              Grandson of Late Sh. Jagdish Chand Bhati & Sh. Sumitra Devi
            </div>
          </div>

          {/* Connector */}
          <div className="family-connector">with</div>

          {/* Bride Side */}
          <div className="family-column">
            <div className="family-side-title">The Royal Bride</div>
            <div className="person-name-highlight">Ritika</div>
            <div className="parents-detail">
              D/o <strong>Mrs. Rajbala & Sh. Devender Solanki</strong>
            </div>
            <div className="residence-detail">
              R/o Panna Vihar, Palwal
            </div>
          </div>
        </div>

        {/* Ancestral Residence Note */}
        <div className="ancestral-residence-box">
          <span>🏛️</span>
          <span>Celebration at their residence: <strong>Vill Kaurali, Ballabgarh (Faridabad)</strong></span>
        </div>
      </div>
    </section>
  );
}

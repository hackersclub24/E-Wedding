'use client';

import React from 'react';

export default function WeddingProgramme({ onOpenQR }) {
  return (
    <section id="events" className="royal-card section-padding">
      <div className="card-corner corner-tl"></div>
      <div className="card-corner corner-tr"></div>
      <div className="card-corner corner-bl"></div>
      <div className="card-corner corner-br"></div>

      <div className="section-header">
        <div className="section-pretitle">Celebration Schedule</div>
        <h3 className="section-main-title">Wedding Programme</h3>
        <div className="section-title-divider">
          <div className="title-line"></div>
          <div className="title-diamond">❖</div>
          <div className="title-line"></div>
        </div>
      </div>

      <div className="events-container">
        {/* EVENT 1: LAGAN-SAGAI */}
        <div className="event-card">
          <div className="event-card-header">
            <span className="event-badge">Day 1</span>
            <div className="event-date-pill">Tuesday, 17th November, 2026</div>
            <h4 className="event-title-main">Lagan-Sagai & Dinner</h4>
          </div>

          <div className="event-card-body">
            <ul className="event-schedule-list">
              <li className="schedule-item">
                <span className="schedule-ceremony">
                  <span>🪔</span> Lagan-Sagai Ceremony
                </span>
                <span className="schedule-time">3.00 pm</span>
              </li>
              <li className="schedule-item">
                <span className="schedule-ceremony">
                  <span>🍽️</span> Royal Dinner
                </span>
                <span className="schedule-time">6.00 pm</span>
              </li>
            </ul>

            <div className="venue-info-box">
              <div className="venue-label">Venue Location</div>
              <div className="venue-name">Mohan Vatika</div>
              <div className="venue-address">Near CNG Pump, Atali, Ballabgarh</div>
            </div>

            {/* Scanned QR Code preview */}
            <div className="venue-qr-preview">
              <img
                src="/assets/qr_mohan_vatika.png"
                alt="Scan for Mohan Vatika Location"
                className="venue-qr-img"
                onClick={() =>
                  onOpenQR(
                    'Mohan Vatika',
                    'Near CNG Pump, Atali, Ballabgarh',
                    '/assets/qr_mohan_vatika.png',
                    'https://maps.app.goo.gl/iZfixgkj4K1bGB2z6'
                  )
                }
              />
              <div
                className="venue-qr-text"
                onClick={() =>
                  onOpenQR(
                    'Mannat Farms',
                    'Main Wedding Venue: Panna Vihar, Palwal, Haryana',
                    '/assets/qr_mannat_farms.png',
                    'https://maps.app.goo.gl/dtAxVPVnK5Dfj4NA8'
                  )
                }
                style={{ cursor: 'pointer' }}
              >
                <div className="venue-qr-title">Instant Google Maps QR</div>
                <div className="venue-qr-sub">Tap QR to enlarge or scan with mobile</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="event-actions-grid">
              <a
                href="https://maps.app.goo.gl/iZfixgkj4K1bGB2z6"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-royal"
              >
                📍 Open Map
              </a>
              <a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Lagan-Sagai:+Aditya+weds+Ritika+(%23RitKaAdi)&dates=20261117T093000Z/20261117T173000Z&details=Lagan-Sagai+at+3:00+PM+followed+by+Dinner+at+6:00+PM.&location=Mohan+Vatika,+Near+CNG+Pump,+Atali,+Ballabgarh"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-royal"
              >
                📅 Add to Cal
              </a>
            </div>
          </div>
        </div>

        {/* EVENT 2: WEDDING DAY & BARAT */}
        <div className="event-card">
          <div className="event-card-header">
            <span className="event-badge">The Wedding</span>
            <div className="event-date-pill">Saturday, 21st November, 2026</div>
            <h4 className="event-title-main">Shubh Vivah & Barat</h4>
          </div>

          <div className="event-card-body">
            <ul className="event-schedule-list">
              <li className="schedule-item">
                <span className="schedule-ceremony">
                  <span>🐎</span> Ghurchari
                </span>
                <span className="schedule-time">4.00 pm</span>
              </li>
              <li className="schedule-item">
                <span className="schedule-ceremony">
                  <span>🎺</span> Departure of Barat
                </span>
                <span className="schedule-time">5.00 pm</span>
              </li>
            </ul>

            <div className="venue-info-box">
              <div className="venue-label">Main Wedding Venue</div>
              <div className="venue-name">Mannat Farms</div>
              <div className="venue-address">Panna Vihar, Palwal, Hr. (Haryana)</div>
            </div>

            {/* Scanned QR Code preview */}
            <div className="venue-qr-preview">
              <img
                src="/assets/qr_mannat_farms.png"
                alt="Scan for Mannat Farms Location"
                className="venue-qr-img"
                onClick={() =>
                  onOpenQR(
                    'Mannat Farms',
                    'Panna Vihar, Palwal, Haryana',
                    '/assets/qr_mannat_farms.png',
                    'https://maps.app.goo.gl/dtAxVPVnK5Dfj4NA8'
                  )
                }
              />
              <div
                className="venue-qr-text"
                onClick={() =>
                  onOpenQR(
                    'Mannat Farms',
                    'Main Wedding Venue: Panna Vihar, Palwal, Haryana',
                    '/assets/qr_mannat_farms.png',
                    'https://maps.app.goo.gl/dtAxVPVnK5Dfj4NA8'
                  )
                }
                style={{ cursor: 'pointer' }}
              >
                <div className="venue-qr-title">Instant Google Maps QR</div>
                <div className="venue-qr-sub">Tap QR to enlarge or scan with mobile</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="event-actions-grid">
              <a
                href="https://maps.app.goo.gl/dtAxVPVnK5Dfj4NA8"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-royal"
              >
                📍 Open Map
              </a>
              <a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding:+Aditya+weds+Ritika+(%23RitKaAdi)&dates=20261121T103000Z/20261121T213000Z&details=Ghurchari+at+4:00+PM,+Departure+of+Barat+at+5:00+PM,+followed+by+Varmala+and+Pheras+at+Mannat+Farms.&location=Mannat+Farms,+Panna+Vihar,+Palwal,+Haryana"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-royal"
              >
                📅 Add to Cal
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

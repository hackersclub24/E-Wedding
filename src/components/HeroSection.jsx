'use client';

import React, { useState, useEffect } from 'react';

export default function HeroSection({ guestName }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    // Saturday, November 21, 2026 16:00:00 IST (+05:30)
    const target = new Date('2026-11-21T16:00:00+05:30').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000)
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <>
      <section id="hero" className="royal-card hero-section">
        <div className="card-corner corner-tl"></div>
        <div className="card-corner corner-tr"></div>
        <div className="card-corner corner-bl"></div>
        <div className="card-corner corner-br"></div>

        {/* Sacred Invocation */}
        <div className="ganesha-header">
          <img src="/assets/kalash_gold.svg" alt="Auspicious Kalash" className="ganesha-icon-img" style={{ transform: 'scaleX(-1)' }} />
          <div>
            <div className="ganesha-mantra">॥ श्री गणेशाय नमः ॥</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-maroon-dark)', letterSpacing: '1px' }}>
              !! Om Shree Ganeshay Namah !!
            </div>
          </div>
          <img src="/assets/kalash_gold.svg" alt="Auspicious Kalash" className="ganesha-icon-img" />
        </div>

        <p className="ganesha-shlok-sub">
          "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥"
        </p>

        {guestName && (
          <div style={{ marginBottom: '16px', fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-maroon)' }}>
            Warmly Welcoming <span style={{ color: 'var(--color-gold-dark)', fontWeight: 700 }}>{guestName}</span> & Family
          </div>
        )}

        {/* Ornate Palace Arch Motif with Hanging Bells (from video frame 8) */}
        <div className="palace-arch-header">
          <svg className="palace-arch-svg" viewBox="0 0 400 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 50 C 70 10, 130 10, 190 25 C 195 27, 205 27, 210 25 C 270 10, 330 10, 390 50" stroke="#c99738" strokeWidth="2" strokeDasharray="3 3"/>
            <path d="M30 52 C 85 18, 140 18, 195 30 C 200 31, 205 31, 210 30 C 265 18, 320 18, 370 52" stroke="#d4af37" strokeWidth="1.2"/>
            {/* Hanging Bells / Kalgi Tassels */}
            <circle cx="200" cy="32" r="4" fill="#c99738" />
            <line x1="200" y1="36" x2="200" y2="48" stroke="#c99738" strokeWidth="1.5" />
            <polygon points="196,48 204,48 202,56 198,56" fill="#c99738" />
            
            <circle cx="120" cy="18" r="3.5" fill="#c99738" />
            <line x1="120" y1="21" x2="120" y2="33" stroke="#c99738" strokeWidth="1.2" />
            <polygon points="117,33 123,33 121,40 119,40" fill="#c99738" />

            <circle cx="280" cy="18" r="3.5" fill="#c99738" />
            <line x1="280" y1="21" x2="280" y2="33" stroke="#c99738" strokeWidth="1.2" />
            <polygon points="277,33 283,33 281,40 279,40" fill="#c99738" />
          </svg>
        </div>

        {/* Couple Hashtag Badge */}
        <div className="couple-hashtag-pill">
          <span>✦</span>
          <span>#RitKaAdi</span>
          <span>✦</span>
        </div>

        <h2 className="main-invitation-title">Wedding Invitation</h2>
        <div className="main-date-line">On Saturday, 21st November, 2026</div>

        {/* Couple Typography */}
        <div className="couple-names-display">
          <span className="groom-name">Aditya</span>
          <span className="weds-script">weds</span>
          <span className="bride-name">Ritika</span>
        </div>

        {/* Centerpiece Artwork Showcase */}
        <div className="hero-art-showcase">
          {/* Divine Lord Ganesha Medallion */}
          <div className="art-frame-gold" title="Divine Blessings - Lord Ganesha">
            <img src="/assets/ganesha_blessing.jpg" alt="Divine Lord Ganesha Auspicious Blessing" />
            <div className="art-caption-sub">Divine Blessings</div>
          </div>

          {/* Ghibli Bride & Groom Royal Portrait */}
          <div className="ghibli-couple-portrait-wrapper" id="couple" title="Aditya & Ritika (#RitKaAdi)">
            <div className="ghibli-portrait-inner">
              <img
                src="/assets/ghibli_couple.jpg"
                alt="Aditya & Ritika - Royal Wedding Couple"
                className="ghibli-couple-img"
              />
            </div>
            <div className="couple-portrait-badge">#RitKaAdi • 21.11.2026</div>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div className="countdown-box">
          <div className="countdown-title">
            <span>⏳</span>
            <span>Counting Down to the Auspicious Moment</span>
            <span>⏳</span>
          </div>
          <div className="countdown-grid">
            <div className="countdown-card">
              <div className="countdown-num">{pad(timeLeft.days)}</div>
              <div className="countdown-label">Days</div>
            </div>
            <div className="countdown-card">
              <div className="countdown-num">{pad(timeLeft.hours)}</div>
              <div className="countdown-label">Hours</div>
            </div>
            <div className="countdown-card">
              <div className="countdown-num">{pad(timeLeft.mins)}</div>
              <div className="countdown-label">Minutes</div>
            </div>
            <div className="countdown-card">
              <div className="countdown-num">{pad(timeLeft.secs)}</div>
              <div className="countdown-label">Seconds</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Day Has Arrived Banner (from Video Frame 10) */}
      <div className="the-day-arrived-banner">
        <h3 className="the-day-title">The Day Has Arrived!</h3>
        <p className="the-day-subtitle">We can't wait to celebrate this sacred union with you</p>
      </div>
    </>
  );
}

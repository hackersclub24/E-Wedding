'use client';

import React from 'react';
import confetti from 'canvas-confetti';

export default function BalManuhaar() {
  const handleBurst = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ffd700', '#b8142a', '#e88998', '#c99738']
    });
  };

  return (
    <section id="bal-manuhaar" className="bal-manuhaar-card" onClick={handleBurst}>
      <div className="bal-icons-row">
        <img src="/assets/shehnai.png" alt="Shehnai & Dhol" className="bal-icon-img" />
        <img src="/assets/baraat.png" alt="Royal Baraat Procession" className="bal-baraat-img" />
        <img src="/assets/shehnai.png" alt="Shehnai & Dhol" className="bal-icon-img" style={{ transform: 'scaleX(-1)' }} />
      </div>

      <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-gold-dark)', marginBottom: '8px' }}>
        ✦ Bal Manuhaar ✦
      </div>

      <div className="bal-verse-hindi">
        ढोलक बजेगा, ठुमका लगाएंगे,<br />
        अपने चाचू / भाई की शादी में सबको नचाएंगे!
      </div>

      <div className="bal-verse-hinglish">
        "Dholak Bajayenga, Thumka Lagayenge,<br />
        Apne Chachu/Bhai ki Shadi mein Sabko Nachayenge :"
      </div>

      <div className="bal-names">
        ✨ Yatika, Bhargav, Dimpal ✨
      </div>
    </section>
  );
}

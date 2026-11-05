'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function EnvelopeOpening({ guestName, isOpen, onOpen }) {
  // phases: 'closed' | 'opening' | 'opened'
  const [phase, setPhase] = useState(isOpen ? 'opened' : 'closed');

  useEffect(() => {
    if (!isOpen && phase === 'opened') {
      setPhase('closed');
    }
  }, [isOpen, phase]);

  const handleOpen = () => {
    if (phase !== 'closed') return;
    setPhase('opening');

    // Confetti shower with gold, rose, and royal maroon
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#ffd700', '#c99738', '#f8d0c8', '#680e1b', '#ffffff']
      });
    } catch (e) {
      // ignore
    }

    // Trigger audio autoplay immediately on this user click gesture
    if (onOpen) {
      onOpen();
    }

    // Allow card to slowly and gracefully slide up (1.8s), then smoothly transition into site
    setTimeout(() => {
      setPhase('opened');
    }, 2400);
  };

  // Immediate skip to main site
  const handleSkip = (e) => {
    if (e) e.stopPropagation();
    if (onOpen) onOpen();
    setPhase('opened');
  };

  return (
    <div
      className={`splash-overlay ${phase === 'opened' ? 'splash-hidden' : ''}`}
      aria-hidden={phase === 'opened'}
    >
      {/* Background ambient lighting */}
      <div className="splash-ambient-glow"></div>

      {/* The Royal Envelope Experience */}
      <div
        className={`splash-envelope-phone-canvas ${phase === 'opening' ? 'is-opening' : ''}`}
        onClick={phase === 'closed' ? handleOpen : undefined}
      >
        {/* Layer 0: Backing with metallic gold foil */}
        <div className="envelope-interior-backing"></div>

        {/* Layer 2: The Rising Wedding Card (Slides up slowly from inside) */}
        <div className="envelope-sliding-card">
          {/* Scalloped Palace Arch & Hanging Bells */}
          <div className="card-palace-arch-wrapper">
            <img
              src="/assets/palace_arch_bells.svg"
              alt="Palace Arch & Temple Bells"
              className="card-palace-arch-img"
            />
          </div>

          {/* Sacred Invocation */}
          <div className="card-shree-ganesh">॥ श्री गणेशाय नमः ॥</div>

          {/* Couple Names */}
          <div className="card-names-block">
            <span className="card-name">ADITYA</span>
            <span className="card-ampersand">&amp;</span>
            <span className="card-name">RITIKA</span>
          </div>

          {/* Sub-proclamation */}
          <div className="card-event-badge">
            <span className="card-badge-line"></span>
            <span className="card-badge-text">SHUBH VIVAH</span>
            <span className="card-badge-line"></span>
          </div>

          {/* Ghibli Couple Portrait Centerpiece in Archway */}
          <div className="card-ghibli-frame-container">
            <div className="card-ghibli-frame">
              <img
                src="/assets/ghibli_couple.jpg"
                alt="Aditya & Ritika"
                className="card-ghibli-img"
              />
            </div>
          </div>

          <div className="card-hashtag">#RitKaAdi</div>

          {/* Personalized Guest Honor */}
          <div className="card-guest-greeting">
            <div className="card-guest-prefix">Cordially Invited</div>
            <div className="card-guest-name">
              {guestName || 'Respected Family & Friends'}
            </div>
          </div>
        </div>

        {/* Layer 3: Front Pocket (Keeps bottom of card nestled inside) */}
        <div className="envelope-pocket-front">
          <div className="envelope-pocket-texture"></div>
          <div className="envelope-pocket-gold-rim"></div>
        </div>

        {/* Layer 5: 3D Hinged Top Flap */}
        <div className={`envelope-top-flap-3d ${phase === 'opening' ? 'flap-flipped' : ''}`}>
          <div className="flap-face flap-front">
            <div className="flap-front-embossed-bg"></div>
          </div>
          <div className="flap-face flap-back">
            <div className="flap-gold-foil-bg"></div>
          </div>
        </div>

        {/* Layer 10: 3D Gold Wax Seal (at center apex) */}
        <div
          className={`wax-seal-component ${phase === 'opening' ? 'seal-lifted' : ''}`}
          onClick={phase === 'closed' ? handleOpen : undefined}
          title="Tap Wax Seal to Open Invitation"
        >
          <div className="wax-seal-pulse-halo"></div>
          <div className="wax-seal-disc">
            <img
              src="/assets/gold_wax_seal.svg"
              alt="Aditya & Ritika Gold Wax Seal"
              className="wax-seal-svg-img"
            />
          </div>
        </div>

        {/* Tap Prompt */}
        {phase === 'closed' && (
          <div className="envelope-tap-instruction">
            <div className="tap-pill">
              <span className="tap-sparkle">✨</span>
              <span>Tap Wax Seal to Open</span>
              <span className="tap-sparkle">✨</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Skip Button at top-right */}
      {phase !== 'opened' && (
        <button
          type="button"
          className="splash-skip-button"
          onClick={handleSkip}
          aria-label="Skip to main invitation"
        >
          Enter Site →
        </button>
      )}
    </div>
  );
}

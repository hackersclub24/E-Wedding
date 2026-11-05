'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function EnvelopeOpening({ guestName, isOpen, onOpen }) {
  // phases: 'closed' | 'opening' | 'revealed' | 'opened'
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
        particleCount: 60,
        spread: 70,
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

    // Sequence the flap flip and card slide-out
    setTimeout(() => {
      setPhase('revealed');
    }, 600);

    setTimeout(() => {
      setPhase('opened');
    }, 2800);
  };

  // If fully opened and closed, allow quick dismiss or skip
  const handleSkip = (e) => {
    e.stopPropagation();
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

      {/* Main Envelope Experience Container */}
      <div
        className={`splash-envelope-phone-canvas ${phase !== 'closed' ? 'is-opening' : ''} ${phase === 'revealed' || phase === 'opened' ? 'is-revealed' : ''}`}
        onClick={phase === 'closed' ? handleOpen : undefined}
      >
        {/* =========================================================
            LAYER 1: The Inside Cavity & The Rising Wedding Card
            ========================================================= */}
        <div className="envelope-interior-chamber">
          {/* Deep gold foil lining inside the envelope backing */}
          <div className="envelope-interior-backing"></div>

          {/* The Luxury Wedding Card (Slides up out of the envelope) */}
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

            {/* Couple Names matching video typography */}
            <div className="card-names-block">
              <span className="card-name">ADITYA</span>
              <span className="card-ampersand">&amp;</span>
              <span className="card-name">RITIKA</span>
            </div>

            {/* Sub-proclamation */}
            <div className="card-event-badge">
              <span className="card-badge-line"></span>
              <span className="card-badge-text">WEDDING DAY</span>
              <span className="card-badge-line"></span>
            </div>
            <div className="card-save-date">• SAVE THE DATE •</div>

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

            {/* Wedding Date */}
            <div className="card-wedding-date-proclamation">
              Saturday, 21st November 2026
            </div>
            <div className="card-hashtag">#RitKaAdi</div>

            {/* Personalized Guest Honor */}
            <div className="card-guest-greeting">
              <div className="card-guest-prefix">Cordially Invited</div>
              <div className="card-guest-name">
                {guestName || 'Respected Family & Friends'}
              </div>
            </div>

            {/* Bottom Palace Domes, Perched Peacocks & Ceremonial Elephant */}
            <div className="card-palace-bottom-wrapper">
              <img
                src="/assets/palace_bottom_decor.svg"
                alt="Palace Terrace, Peacocks & Royal Elephant"
                className="card-palace-bottom-img"
              />
            </div>
          </div>
        </div>

        {/* =========================================================
            LAYER 2: The Envelope Pocket (Sides & Bottom Flaps)
            ========================================================= */}
        <div className="envelope-pocket-housing">
          {/* 3D Embossed Botanical Paper Surface */}
          <div className="envelope-embossed-bg"></div>

          {/* Left Flap fold seam */}
          <div className="envelope-side-flap-left"></div>

          {/* Right Flap fold seam */}
          <div className="envelope-side-flap-right"></div>

          {/* Bottom Flap fold seam */}
          <div className="envelope-bottom-flap"></div>
        </div>

        {/* =========================================================
            LAYER 3: The 3D Hinged Top Flap with Gold Wax Seal
            ========================================================= */}
        <div className={`envelope-top-flap-3d ${phase !== 'closed' ? 'flap-flipped' : ''}`}>
          {/* Front Face: Embossed Blush Pink Paper */}
          <div className="flap-face flap-front">
            <div className="flap-front-embossed-bg"></div>
            <div className="flap-v-shadow"></div>
          </div>

          {/* Back Face: Gleaming Metallic Gold Foil (revealed when flipped 180deg) */}
          <div className="flap-face flap-back">
            <div className="flap-gold-foil-bg"></div>
            <div className="flap-gold-shimmer"></div>
          </div>

          {/* Center 3D Gold Wax Seal (Attached to the flap tip) */}
          <div
            className={`wax-seal-component ${phase !== 'closed' ? 'seal-lifted' : ''}`}
            title="Tap Wax Seal to Open Invitation"
          >
            {/* Ambient golden pulse ring */}
            <div className="wax-seal-pulse-halo"></div>

            {/* 3D Gold Wax Seal SVG */}
            <div className="wax-seal-disc">
              <img
                src="/assets/gold_wax_seal.svg"
                alt="Aditya & Ritika Gold Wax Seal"
                className="wax-seal-svg-img"
              />
            </div>
          </div>
        </div>

        {/* Tap to open invitation prompt */}
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

      {/* Quick Skip Button positioned cleanly at top-right of the screen */}
      {phase === 'closed' && (
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

'use client';

import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function DateScratchCard({ onRevealed }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const [percent, setPercent] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  // Initialize canvas with luxury gold foil
  const initFoil = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    ctx.globalCompositeOperation = 'source-over';

    // Rich metallic gold gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#bf953f');
    grad.addColorStop(0.25, '#fcf6ba');
    grad.addColorStop(0.5, '#b38728');
    grad.addColorStop(0.75, '#fbf5b7');
    grad.addColorStop(1, '#aa771c');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative foil pattern / border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(12, 12, width - 24, height - 24);
    ctx.setLineDash([]);

    // Sparkle foil texture dots
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    for (let i = 0; i < 90; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      ctx.beginPath();
      ctx.arc(rx, ry, Math.random() * 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Foil text badge
    ctx.fillStyle = '#4a0910';
    ctx.font = 'bold 13px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('✦ ROYAL WEDDING INVITATION ✦', width / 2, height / 2 - 28);

    ctx.font = 'bold 18px Georgia, serif';
    ctx.fillText('✨ SCRATCH TO REVEAL DATE ✨', width / 2, height / 2);

    ctx.font = 'italic 13px sans-serif';
    ctx.fillStyle = '#680e1b';
    ctx.fillText('Use finger or mouse to scratch the gold foil', width / 2, height / 2 + 26);

    setIsScratched(false);
    setPercent(0);
  };

  useEffect(() => {
    initFoil();
    const handleResize = () => {
      if (!isScratched) initFoil();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if (e.clientX !== undefined) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
      screenX: clientX,
      screenY: clientY
    };
  };

  const scratch = (x, y, screenX, screenY) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    // Spawn tiny golden glitter sparks
    if (screenX && screenY && Math.random() > 0.4) {
      const newSparkle = { id: Date.now() + Math.random(), x: screenX, y: screenY };
      setSparkles((prev) => [...prev.slice(-12), newSparkle]);
    }

    checkProgress();
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;
    let transparent = 0;
    const totalSamples = 300;
    const step = Math.floor(data.length / (totalSamples * 4));

    for (let i = 0; i < data.length; i += step * 4) {
      if (data[i + 3] === 0) {
        transparent++;
      }
    }

    const currentPercent = Math.min(100, Math.round((transparent / totalSamples) * 100));
    setPercent(currentPercent);

    // If 40% scratched, clear all and celebrate!
    if (currentPercent >= 40 && !isScratched) {
      revealAll();
    }
  };

  const revealAll = () => {
    setIsScratched(true);
    setPercent(100);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    // Celebratory confetti burst!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c99738', '#ffd700', '#680e1b', '#e88998', '#ffffff']
    });

    if (onRevealed) onRevealed();
  };

  const handleStart = (e) => {
    setIsDrawing(true);
    const pos = getPos(e);
    scratch(pos.x, pos.y, pos.screenX, pos.screenY);
  };

  const handleMove = (e) => {
    if (!isDrawing) return;
    const pos = getPos(e);
    scratch(pos.x, pos.y, pos.screenX, pos.screenY);
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  return (
    <section id="scratch-card" className="royal-card section-padding" style={{ textAlign: 'center' }}>
      <div className="card-corner corner-tl"></div>
      <div className="card-corner corner-tr"></div>
      <div className="card-corner corner-bl"></div>
      <div className="card-corner corner-br"></div>

      <div className="section-header">
        <div className="section-pretitle">Interactive Wedding Reveal</div>
        <h3 className="section-main-title">Save Our Date</h3>
        <div className="section-title-divider">
          <div className="title-line"></div>
          <div className="title-diamond">❖</div>
          <div className="title-line"></div>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '6px' }}>
          Scratch off the royal gold foil with your finger or mouse to unveil the wedding date!
        </p>
      </div>

      <div
        ref={containerRef}
        className="scratch-card-wrapper"
        style={{
          position: 'relative',
          maxWidth: '520px',
          height: '240px',
          margin: '0 auto',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 12px 35px rgba(74, 9, 16, 0.16)',
          border: '2px solid var(--color-gold)',
          background: 'radial-gradient(circle at center, #ffffff 0%, #faf3e8 100%)',
          userSelect: 'none',
          touchAction: 'none'
        }}
      >
        {/* UNDERNEATH LAYER: THE REVEALED WEDDING DATE */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px 20px',
            background: 'radial-gradient(circle at center, #fffef9 0%, #faefe0 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '1rem', color: 'var(--color-gold)' }}>🪔</span>
            <span style={{ fontFamily: 'var(--font-royal)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', color: 'var(--color-gold-dark)' }}>
              SHUBH VIVAH DATE
            </span>
            <span style={{ fontSize: '1rem', color: 'var(--color-gold)' }}>🪔</span>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-royal)',
              fontSize: 'clamp(1.4rem, 4vw, 2.1rem)',
              fontWeight: 800,
              color: 'var(--color-maroon)',
              lineHeight: 1.15,
              textShadow: '0 2px 4px rgba(104, 14, 27, 0.15)'
            }}
          >
            Saturday, 21st November 2026
          </div>

          <div style={{ fontFamily: 'var(--font-script)', fontSize: '1.6rem', color: 'var(--color-gold)', margin: '2px 0' }}>
            Aditya weds Ritika
          </div>

          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>
            🐴 Ghurchari 4:00 PM • Barat Departure 5:00 PM
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--color-maroon-dark)', marginTop: '2px' }}>
            📍 Mannat Farms, Panna Vihar, Palwal, Haryana
          </div>

          <div
            style={{
              display: 'inline-block',
              background: 'var(--gold-gradient)',
              color: 'var(--color-maroon-dark)',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '3px 12px',
              borderRadius: '999px',
              marginTop: '6px'
            }}
          >
            #RitKaAdi • You Are Cordially Invited!
          </div>
        </div>

        {/* TOP LAYER: CANVAS WITH SHIMMERING GOLD FOIL */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            cursor: isScratched ? 'default' : 'crosshair',
            transition: 'opacity 0.6s ease',
            opacity: isScratched ? 0 : 1,
            pointerEvents: isScratched ? 'none' : 'auto'
          }}
        />
      </div>

      {/* Dynamic Progress & Controls */}
      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        {!isScratched ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-maroon)' }}>
              Scratched: {percent}%
            </span>
            <div style={{ width: '120px', height: '6px', background: '#e0d5c1', borderRadius: '4px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${percent}%`,
                  height: '100%',
                  background: 'var(--gold-gradient)',
                  transition: 'width 0.2s ease'
                }}
              />
            </div>
            <button
              onClick={revealAll}
              className="btn-gold-royal"
              style={{ padding: '4px 12px', fontSize: '0.75rem' }}
            >
              Reveal Date
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-maroon)' }}>
              🎉 Date Revealed: 21st November 2026!
            </span>
            <a
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding:+Aditya+weds+Ritika+(%23RitKaAdi)&dates=20261121T103000Z/20261121T213000Z&details=Aditya+weds+Ritika+Wedding+Ceremony+at+Mannat+Farms,+Palwal.&location=Mannat+Farms,+Panna+Vihar,+Palwal,+Haryana"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-royal"
              style={{ padding: '6px 14px', fontSize: '0.8rem' }}
            >
              📅 Save to Google Calendar
            </a>
            <button
              onClick={initFoil}
              className="btn-gold-royal"
              style={{ padding: '6px 14px', fontSize: '0.8rem' }}
            >
              🔄 Scratch Again
            </button>
          </div>
        )}
      </div>

      {/* Floating Sparkles from Scratching */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          style={{
            position: 'fixed',
            left: s.x,
            top: s.y,
            width: '6px',
            height: '6px',
            background: '#ffd700',
            borderRadius: '50%',
            boxShadow: '0 0 8px #ffd700',
            pointerEvents: 'none',
            zIndex: 1000,
            animation: 'sparkleFade 0.7s forwards'
          }}
        />
      ))}
    </section>
  );
}

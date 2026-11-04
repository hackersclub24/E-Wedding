'use client';

import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function ThreeCircleScratchCard({ onAllRevealed }) {
  const canvasRefs = [useRef(null), useRef(null), useRef(null)];
  const [scratched, setScratched] = useState([false, false, false]);
  const [percents, setPercents] = useState([0, 0, 0]);
  const [activeCanvasIdx, setActiveCanvasIdx] = useState(null);
  const [sparkles, setSparkles] = useState([]);
  const [allUnlocked, setAllUnlocked] = useState(false);

  const circlesData = [
    { label: 'MONTH', value: 'NOV', sub: 'November' },
    { label: 'DAY', value: '21', sub: 'Saturday' },
    { label: 'YEAR', value: '2026', sub: 'Auspicious' }
  ];

  // Draw 3D convex metallic gold foil on each circular canvas
  const initCircleCanvas = (idx) => {
    const canvas = canvasRefs[idx].current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 110;
    canvas.width = size;
    canvas.height = size;

    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, size, size);

    // Circular clipping path
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
    ctx.clip();

    // 3D convex gold sphere gradient matching the video
    const grad = ctx.createRadialGradient(
      size * 0.35, size * 0.35, size * 0.05,
      size * 0.5, size * 0.5, size * 0.5
    );
    grad.addColorStop(0, '#fff6d6'); // Specular highlight
    grad.addColorStop(0.25, '#ffd25e');
    grad.addColorStop(0.65, '#c9922e');
    grad.addColorStop(1, '#825611'); // Deep gold rim shadow

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Subtle metallic noise / glitter texture
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    for (let i = 0; i < 40; i++) {
      const rx = Math.random() * size;
      const ry = Math.random() * size;
      ctx.beginPath();
      ctx.arc(rx, ry, Math.random() * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Inner embossed border ring
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 6, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  };

  const initAllCircles = () => {
    for (let i = 0; i < 3; i++) {
      initCircleCanvas(i);
    }
    setScratched([false, false, false]);
    setPercents([0, 0, 0]);
    setAllUnlocked(false);
  };

  useEffect(() => {
    initAllCircles();
  }, []);

  const getCanvasPos = (canvas, e) => {
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
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
      screenX: clientX,
      screenY: clientY
    };
  };

  const scratchCircle = (idx, x, y, screenX, screenY) => {
    if (scratched[idx]) return;
    const canvas = canvasRefs[idx].current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.fill();

    // Glitter sparks on scratch
    if (screenX && screenY && Math.random() > 0.4) {
      const newSpark = { id: Date.now() + Math.random(), x: screenX, y: screenY };
      setSparkles((prev) => [...prev.slice(-10), newSpark]);
    }

    checkCircleProgress(idx);
  };

  const checkCircleProgress = (idx) => {
    if (scratched[idx]) return;
    const canvas = canvasRefs[idx].current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    let transparent = 0;
    const totalSamples = 160;
    const step = Math.floor(data.length / (totalSamples * 4));

    for (let i = 0; i < data.length; i += step * 4) {
      if (data[i + 3] === 0) {
        transparent++;
      }
    }

    const currentPercent = Math.min(100, Math.round((transparent / totalSamples) * 100));
    setPercents((prev) => {
      const copy = [...prev];
      copy[idx] = currentPercent;
      return copy;
    });

    // Auto-reveal circle if scratched > 35%
    if (currentPercent >= 35) {
      revealSingleCircle(idx);
    }
  };

  const revealSingleCircle = (idx) => {
    const canvas = canvasRefs[idx].current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    setScratched((prev) => {
      const copy = [...prev];
      copy[idx] = true;

      // Check if all 3 circles are now revealed!
      if (copy[0] && copy[1] && copy[2] && !allUnlocked) {
        setAllUnlocked(true);
        triggerUnlockCelebration();
      }
      return copy;
    });

    setPercents((prev) => {
      const copy = [...prev];
      copy[idx] = 100;
      return copy;
    });
  };

  const triggerUnlockCelebration = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#c9922e', '#ffffff', '#e88998', '#8b1828']
    });

    if (onAllRevealed) onAllRevealed();
  };

  const revealAllNow = () => {
    for (let i = 0; i < 3; i++) {
      revealSingleCircle(i);
    }
    setAllUnlocked(true);
  };

  const handleStart = (idx, e) => {
    setActiveCanvasIdx(idx);
    const pos = getCanvasPos(canvasRefs[idx].current, e);
    scratchCircle(idx, pos.x, pos.y, pos.screenX, pos.screenY);
  };

  const handleMove = (idx, e) => {
    if (activeCanvasIdx !== idx) return;
    const pos = getCanvasPos(canvasRefs[idx].current, e);
    scratchCircle(idx, pos.x, pos.y, pos.screenX, pos.screenY);
  };

  const handleEnd = () => {
    setActiveCanvasIdx(null);
  };

  return (
    <section id="scratch-card" className="three-circle-reveal-section">
      <div className="reveal-inner-card">
        {/* Top Text from Video */}
        <div className="reveal-top-subtitle">
          SCRATCH ALL THREE CIRCLES TO CONTINUE
        </div>

        <h2 className="reveal-main-title">
          Reveal
        </h2>

        <div className="reveal-bottom-subtitle">
          SCRATCH TO DISCOVER THE DATE
        </div>

        {/* 3 Circular Scratch Coins Grid */}
        <div className="scratch-circles-container">
          {circlesData.map((c, idx) => (
            <div key={c.label} className="scratch-circle-wrapper">
              <div className="circle-coin-frame">
                {/* Underneath Layer: Revealed Value */}
                <div className="circle-underneath-layer">
                  <span className="circle-value-text">{c.value}</span>
                  <span className="circle-sub-text">{c.sub}</span>
                </div>

                {/* Top Canvas Layer: 3D Metallic Gold Coin */}
                <canvas
                  ref={canvasRefs[idx]}
                  className={`scratch-canvas-coin ${scratched[idx] ? 'cleared' : ''}`}
                  onMouseDown={(e) => handleStart(idx, e)}
                  onMouseMove={(e) => handleMove(idx, e)}
                  onMouseUp={handleEnd}
                  onMouseLeave={handleEnd}
                  onTouchStart={(e) => handleStart(idx, e)}
                  onTouchMove={(e) => handleMove(idx, e)}
                  onTouchEnd={handleEnd}
                />
              </div>

              {/* Label underneath circle: MONTH / DAY / YEAR */}
              <div className="circle-label-text">
                {c.label}
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Status / Actions */}
        <div className="reveal-status-box">
          {!allUnlocked ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#c9922e', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Scratch each gold coin with your finger or mouse
              </span>
              <button onClick={revealAllNow} className="btn-reveal-quick">
                Quick Reveal
              </button>
            </div>
          ) : (
            <div className="reveal-unlocked-banner">
              <div style={{ fontSize: '1.25rem', fontFamily: 'var(--font-royal)', color: '#f3df95', marginBottom: '4px' }}>
                ✨ 21ST NOVEMBER 2026 ✨
              </div>
              <div style={{ fontSize: '0.85rem', color: '#ffffff', opacity: 0.9, marginBottom: '14px' }}>
                Aditya weds Ritika • Shubh Vivah
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding:+Aditya+weds+Ritika+(%23RitKaAdi)&dates=20261121T103000Z/20261121T213000Z&details=Aditya+weds+Ritika+Wedding+Ceremony+at+Mannat+Farms,+Palwal.&location=Mannat+Farms,+Panna+Vihar,+Palwal,+Haryana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-royal"
                  style={{ padding: '8px 18px', fontSize: '0.82rem' }}
                >
                  📅 Save to Calendar
                </a>
                <button
                  onClick={initAllCircles}
                  className="btn-scratch-again"
                >
                  🔄 Scratch Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Sparkles */}
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


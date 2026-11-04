'use client';

import React, { useRef, useEffect } from 'react';

export default function PetalsRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const count = window.innerWidth < 768 ? 20 : 36;
    const petals = [];

    const createPetal = (w, h, randomY = false) => ({
      x: Math.random() * w,
      y: randomY ? Math.random() * h : -20 - Math.random() * 40,
      size: 10 + Math.random() * 14,
      speedY: 0.8 + Math.random() * 1.4,
      speedX: -0.6 + Math.random() * 1.2,
      rotation: Math.random() * 360,
      rotationSpeed: -1.5 + Math.random() * 3,
      flip: Math.random() * 360,
      flipSpeed: 1 + Math.random() * 2,
      colorIndex: Math.floor(Math.random() * 4),
      opacity: 0.5 + Math.random() * 0.4
    });

    for (let i = 0; i < count; i++) {
      petals.push(createPetal(canvas.width, canvas.height, true));
    }

    const petalColors = [
      { outer: '#b8142a', inner: '#780a19' }, // Velvet Red
      { outer: '#d94158', inner: '#9c1429' }, // Crimson Rose
      { outer: '#e88998', inner: '#c2485c' }, // Soft Blush
      { outer: '#e0b354', inner: '#ab7e22' }  // Gold sparkle
    ];

    const drawPetal = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.scale(Math.cos((p.flip * Math.PI) / 180), 1);
      ctx.globalAlpha = p.opacity;

      const col = petalColors[p.colorIndex % petalColors.length];
      const radGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, p.size);
      radGrad.addColorStop(0, col.outer);
      radGrad.addColorStop(1, col.inner);

      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.8, p.size * 0.9, p.size * 0.5, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.5, -p.size * 0.8, -p.size * 0.8, 0, -p.size);
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.015) * 0.8 + p.speedX;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        if (p.y > canvas.height + 25) {
          petals[i] = createPetal(canvas.width, canvas.height, false);
        }
        drawPetal(p);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="petals-canvas" />;
}

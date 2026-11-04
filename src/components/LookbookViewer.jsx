'use client';

import React, { useState } from 'react';

const pages = [
  { num: 1, title: 'Page 1: Invitation Cover & Radha Krishna Frame', src: '/assets/card_page_1.jpg' },
  { num: 2, title: 'Page 2: Royal Couple Portrait & #RitKaAdi', src: '/assets/card_page_2.jpg' },
  { num: 3, title: 'Page 3: Wedding Programme & Events Schedule', src: '/assets/card_page_3.jpg' },
  { num: 4, title: 'Page 4: Family Details, RSVP & Compliments', src: '/assets/card_page_4.jpg' }
];

export default function LookbookViewer({ onOpenLightbox }) {
  const [currentPage, setCurrentPage] = useState(0);

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pages.length);
  };

  return (
    <section id="lookbook" className="royal-card lookbook-section">
      <div className="card-corner corner-tl"></div>
      <div className="card-corner corner-tr"></div>
      <div className="card-corner corner-bl"></div>
      <div className="card-corner corner-br"></div>

      <div className="section-header">
        <div className="section-pretitle">The Original Keepsake</div>
        <h3 className="section-main-title">Printed Wedding Card Lookbook</h3>
        <div className="section-title-divider">
          <div className="title-line"></div>
          <div className="title-diamond">❖</div>
          <div className="title-line"></div>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '6px' }}>
          Flip through all 4 authentic pages of our physical wedding card. Tap the image to zoom.
        </p>
      </div>

      <div className="lookbook-viewer">
        <div className="lookbook-main-image-container">
          <img
            src={pages[currentPage].src}
            alt={pages[currentPage].title}
            className="lookbook-main-image"
            onClick={() => onOpenLightbox(pages[currentPage].src, pages[currentPage].title)}
          />
        </div>

        <div className="lookbook-controls-bar">
          <button onClick={prevPage} className="lookbook-page-btn">
            ← Prev Page
          </button>
          <span className="lookbook-page-indicator">
            Page {pages[currentPage].num} of 4
          </span>
          <button onClick={nextPage} className="lookbook-page-btn">
            Next Page →
          </button>
        </div>

        <div style={{ marginTop: '14px' }}>
          <a
            href="/assets/wedding_invitation.pdf"
            download="Aditya_Ritika_Wedding_Card.pdf"
            className="btn-gold-royal"
            style={{ display: 'inline-flex', fontSize: '0.85rem', padding: '8px 18px' }}
          >
            📥 Download Official Printed Card (PDF)
          </a>
        </div>

        <div className="lookbook-thumbnails-row">
          {pages.map((p, idx) => (
            <button
              key={p.num}
              onClick={() => setCurrentPage(idx)}
              className={`thumb-btn ${idx === currentPage ? 'active' : ''}`}
              title={p.title}
            >
              <img src={p.src} alt={`Thumbnail ${p.num}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

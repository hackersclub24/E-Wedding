'use client';

import React from 'react';

export default function VenueQRModal({ data, onClose }) {
  if (!data || !data.isOpen) return null;

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Close">
          ✕
        </button>

        {data.type === 'qr' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-royal)', color: 'var(--color-maroon)', fontSize: '1.3rem', marginBottom: '4px' }}>
              {data.title}
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
              {data.sub}
            </p>
            <div style={{ background: '#ffffff', padding: '12px', display: 'inline-block', border: '2px solid var(--color-gold)', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
              <img
                src={data.imgSrc}
                alt="Venue QR Code"
                style={{ width: '220px', height: '220px', objectFit: 'contain', display: 'block' }}
              />
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '18px' }}>
              Scan with phone camera or tap below to open navigation
            </p>
            {data.linkUrl && (
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <a
                  href={data.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-royal"
                  style={{ padding: '10px 20px' }}
                >
                  📍 Open Google Maps
                </a>
              </div>
            )}
          </div>
        )}

        {data.type === 'lightbox' && (
          <div>
            <h4 style={{ fontFamily: 'var(--font-royal)', color: 'var(--color-maroon)', fontSize: '1.05rem', marginBottom: '12px' }}>
              {data.title}
            </h4>
            <div style={{ maxHeight: '75vh', overflowY: 'auto', borderRadius: '8px' }}>
              <img
                src={data.imgSrc}
                alt={data.title}
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

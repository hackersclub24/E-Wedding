'use client';

import React, { useState } from 'react';

export default function ShareTools() {
  const [customGuest, setCustomGuest] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!customGuest.trim()) return;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    const url = `${origin}${path}?guest=${encodeURIComponent(customGuest.trim())}`;
    setGeneratedUrl(url);
    setCopied(false);
  };

  const handleCopy = () => {
    if (!generatedUrl) return;
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWA = () => {
    if (!generatedUrl) return;
    const waMsg = encodeURIComponent(
      `🌸 *Wedding Invitation: Aditya weds Ritika (#RitKaAdi)* 🌸\n\n` +
      `Dear *${customGuest.trim()}*,\n` +
      `We cordially invite you and your family to grace the auspicious wedding ceremony of Aditya & Ritika.\n\n` +
      `🗓️ *Lagan-Sagai:* 17th November 2026 at Mohan Vatika\n` +
      `💍 *Wedding:* 21st November 2026 at Mannat Farms\n\n` +
      `✨ *Open Your Royal Invitation here:* \n${generatedUrl}\n\n` +
      `Warm Regards,\n` +
      `*Th. Harinder Singh Bhati & Bhati Family*\n` +
      `Vill Kaurali, Ballabgarh`
    );
    window.open(`https://wa.me/?text=${waMsg}`, '_blank');
  };

  const handleDirectShare = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const text = encodeURIComponent(
      `🌸 *Wedding Invitation: Aditya weds Ritika (#RitKaAdi)* 🌸\n\n` +
      `You are cordially invited to celebrate our wedding on 17th & 21st November 2026!\n` +
      `View interactive digital card, itinerary, and venue details:\n${currentUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <section className="share-host-bar">
      <h4 style={{ fontFamily: 'var(--font-royal)', color: 'var(--color-maroon)', fontSize: '1.25rem', marginBottom: '6px' }}>
        Personalize & Share This Invitation
      </h4>
      <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto 16px auto' }}>
        Create a customized royal invitation link addressed personally to your relatives or friends with their name displayed on the royal wax envelope.
      </p>

      <div style={{ display: 'flex', maxWidth: '480px', margin: '0 auto', gap: '8px' }}>
        <input
          type="text"
          className="form-input"
          placeholder="Type guest name (e.g. Verma Family)"
          style={{ flex: 1 }}
          value={customGuest}
          onChange={(e) => setCustomGuest(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          className="btn-primary-royal"
          style={{ whiteSpace: 'nowrap' }}
        >
          Generate Link
        </button>
      </div>

      {generatedUrl && (
        <div style={{ maxWidth: '480px', margin: '16px auto 0 auto' }}>
          <input
            type="text"
            className="form-input"
            readOnly
            style={{ fontSize: '0.8rem', textAlign: 'center', marginBottom: '8px', background: '#fff' }}
            value={generatedUrl}
          />
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <button onClick={handleCopy} className="btn-gold-royal">
              {copied ? 'Copied to Clipboard! ✓' : 'Copy Link'}
            </button>
            <button
              onClick={handleShareWA}
              className="btn-primary-royal"
              style={{ background: '#25D366', borderColor: '#128C7E' }}
            >
              Share on WhatsApp
            </button>
          </div>
        </div>
      )}

      <div className="share-buttons-row">
        <button onClick={handleDirectShare} className="btn-gold-royal">
          📲 Share Wedding Invite on WhatsApp
        </button>
      </div>
    </section>
  );
}

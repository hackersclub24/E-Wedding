'use client';

import React, { useState, useEffect } from 'react';

const HOST_PIN = '2026';

export default function ShareTools() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [customGuest, setCustomGuest] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if URL has ?host=2026 or ?admin=2026 or ?host=true
    const params = new URLSearchParams(window.location.search);
    const hostParam = params.get('host');
    const adminParam = params.get('admin');

    if (hostParam === HOST_PIN || adminParam === HOST_PIN || hostParam === 'true') {
      setIsUnlocked(true);
      sessionStorage.setItem('host_unlocked', HOST_PIN);
      return;
    }

    // Check existing session
    if (sessionStorage.getItem('host_unlocked') === HOST_PIN) {
      setIsUnlocked(true);
    }
  }, []);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput.trim() === HOST_PIN) {
      setIsUnlocked(true);
      sessionStorage.setItem('host_unlocked', HOST_PIN);
      setShowPinModal(false);
      setPinInput('');
      setPinError('');
    } else {
      setPinError('Incorrect PIN. Please try again.');
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem('host_unlocked');
  };

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

  // If host mode is not unlocked, show only clean guest view with discreet host access
  if (!isUnlocked) {
    return (
      <div style={{ textAlign: 'center', margin: '28px 0 16px 0' }}>
        <div style={{ marginBottom: '14px' }}>
          <button onClick={handleDirectShare} className="btn-gold-royal" style={{ fontSize: '0.9rem', padding: '10px 22px' }}>
            📲 Share Wedding Card on WhatsApp
          </button>
        </div>

        <button
          onClick={() => setShowPinModal(true)}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(104, 14, 27, 0.45)',
            fontSize: '0.78rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '4px 8px',
            borderRadius: '4px',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-maroon)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(104, 14, 27, 0.45)')}
        >
          <span>🔒</span> Host / Family Access
        </button>

        {showPinModal && (
          <div className="pin-modal-overlay" onClick={() => setShowPinModal(false)}>
            <div className="pin-modal-content" onClick={(e) => e.stopPropagation()}>
              <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>👑</div>
              <h4 style={{ fontFamily: 'var(--font-royal)', color: 'var(--color-maroon)', fontSize: '1.25rem', marginBottom: '6px' }}>
                Host & Family Access
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                Enter the 4-digit PIN to access the guest invitation generator.
              </p>
              <form onSubmit={handlePinSubmit}>
                <input
                  type="password"
                  maxLength={4}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError('');
                  }}
                  placeholder="PIN"
                  className="form-input"
                  style={{
                    textAlign: 'center',
                    fontSize: '1.3rem',
                    letterSpacing: '6px',
                    maxWidth: '160px',
                    margin: '0 auto 10px auto'
                  }}
                  autoFocus
                />
                {pinError && (
                  <div style={{ color: '#b8142a', fontSize: '0.82rem', marginBottom: '10px', fontWeight: 600 }}>
                    {pinError}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  <button type="submit" className="btn-primary-royal" style={{ padding: '8px 22px' }}>
                    Unlock
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPinModal(false);
                      setPinError('');
                      setPinInput('');
                    }}
                    className="btn-gold-royal"
                    style={{ padding: '8px 16px' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // UNLOCKED HOST GENERATOR
  return (
    <section className="share-host-bar">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span
          style={{
            background: 'linear-gradient(135deg, #ffd700, #c99738)',
            color: '#2e050b',
            fontSize: '0.72rem',
            fontWeight: 800,
            padding: '3px 12px',
            borderRadius: '12px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
        >
          👑 Host Mode Active (PIN: {HOST_PIN})
        </span>
        <button
          onClick={handleLock}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-maroon)',
            fontSize: '0.8rem',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          🔒 Lock Generator
        </button>
      </div>

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

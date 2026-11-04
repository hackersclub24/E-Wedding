'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const defaultBlessings = [
  {
    name: 'Solanki Family (Palwal)',
    relation: "Bride's Family",
    text: 'Wishing Aditya and Ritika a lifetime of eternal love, happiness, laughter, and beautiful moments together!',
    time: 'Blessings'
  },
  {
    name: 'Yatika, Bhargav & Dimpal',
    relation: 'Bal Manuhaar',
    text: "Chachu & Bhabhi ki shadi mein dholak bajaenge aur khoob nachange! Can't wait for 17th & 21st November! ❤️",
    time: 'Excited'
  },
  {
    name: 'Bhati Family (Vill Kaurali)',
    relation: "Groom's Family",
    text: 'May Lord Ganesha and Radha Krishna shower their divine blessings on Aditya & Ritika as they begin this sacred journey.',
    time: 'Blessings'
  }
];

export default function RSVPForm() {
  const [blessings, setBlessings] = useState(defaultBlessings);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState('Both Events (17th & 21st Nov)');
  const [guests, setGuests] = useState('2');
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      const local = localStorage.getItem('ritkaadi_blessings');
      if (local) {
        setBlessings(JSON.parse(local));
      }
    } catch (e) {}
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newBlessing = {
      name: name.trim(),
      relation: `Attending: ${attendance} (${guests} Guests)`,
      text: message.trim() || 'Heartiest congratulations and best wishes for the wedding!',
      time: 'Just now'
    };

    const updated = [newBlessing, ...blessings];
    setBlessings(updated);

    try {
      localStorage.setItem('ritkaadi_blessings', JSON.stringify(updated));
    } catch (e) {}

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#c99738', '#ffd700', '#680e1b', '#e88998']
    });

    const waText = encodeURIComponent(
      `Namaste Harinder Singh Bhati Ji! 🙏\n\n` +
      `*RSVP for Aditya & Ritika Wedding (#RitKaAdi)*\n` +
      `*From:* ${name.trim()}\n` +
      `*Attending:* ${attendance}\n` +
      `*Guests joining:* ${guests}\n` +
      (phone.trim() ? `*Contact:* ${phone.trim()}\n` : '') +
      (message.trim() ? `*Wishes:* "${message.trim()}"\n\n` : '\n') +
      `Heartiest congratulations to the Bhati & Solanki families! Looking forward to celebrating together! ✨🎉`
    );

    const sendWA = window.confirm(
      `Thank you ${name.trim()}! Your RSVP & blessings have been recorded.\n\n` +
      `Would you like to send this confirmation to the Bhati family on WhatsApp now?`
    );

    if (sendWA) {
      window.open(`https://wa.me/919560216660?text=${waText}`, '_blank');
    }

    setName('');
    setPhone('');
    setMessage('');
  };

  return (
    <section id="guestbook" className="royal-card section-padding">
      <div className="card-corner corner-tl"></div>
      <div className="card-corner corner-tr"></div>
      <div className="card-corner corner-bl"></div>
      <div className="card-corner corner-br"></div>

      <div className="section-header">
        <div className="section-pretitle">Guestbook & Wishes</div>
        <h3 className="section-main-title">Send Your Blessings & RSVP</h3>
        <div className="section-title-divider">
          <div className="title-line"></div>
          <div className="title-diamond">❖</div>
          <div className="title-line"></div>
        </div>
      </div>

      <div className="rsvp-section-layout">
        {/* RSVP Form */}
        <div className="rsvp-form-card">
          <h4 style={{ fontFamily: 'var(--font-royal)', color: 'var(--color-maroon)', fontSize: '1.15rem', marginBottom: '18px' }}>
            Confirm Your Attendance
          </h4>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="rsvp-name">
                Your Full Name / Family Name *
              </label>
              <input
                type="text"
                id="rsvp-name"
                className="form-input"
                placeholder="e.g. Ramesh Sharma & Family"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="rsvp-phone">
                Phone / WhatsApp Number (Optional)
              </label>
              <input
                type="tel"
                id="rsvp-phone"
                className="form-input"
                placeholder="e.g. 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="rsvp-attendance">
                Attending Events *
              </label>
              <select
                id="rsvp-attendance"
                className="form-select"
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
              >
                <option value="Both Events (17th & 21st Nov)">Attending Both Events (17th & 21st Nov)</option>
                <option value="Wedding Day Only (21st Nov)">Wedding Day Only (21st Nov)</option>
                <option value="Lagan-Sagai Only (17th Nov)">Lagan-Sagai Only (17th Nov)</option>
                <option value="Sending Warm Blessings from Afar">Sending Warm Blessings from Afar</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="rsvp-guests">
                Number of Guests Joining
              </label>
              <select
                id="rsvp-guests"
                className="form-select"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                <option value="1">1 Person</option>
                <option value="2">2 Persons</option>
                <option value="3">3 Persons</option>
                <option value="4">4 Persons</option>
                <option value="5+">5+ Family Members</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="rsvp-message">
                Warm Wishes & Blessings for Aditya & Ritika
              </label>
              <textarea
                id="rsvp-message"
                rows={3}
                className="form-textarea"
                placeholder="Write your heartfelt blessing or message for the couple..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn-primary-royal"
              style={{ width: '100%', padding: '12px', fontSize: '0.95rem', justifyContent: 'center' }}
            >
              💌 Submit RSVP & Blessings
            </button>
          </form>
        </div>

        {/* Live Blessings Wall */}
        <div className="blessings-wall-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ fontFamily: 'var(--font-royal)', color: 'var(--color-maroon)', fontSize: '1.15rem' }}>
              Live Blessings Wall
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-gold-dark)', fontWeight: 700 }}>
              #RitKaAdi
            </span>
          </div>

          <div className="blessings-scroll-area">
            {blessings.map((b, i) => (
              <div key={i} className="blessing-item">
                <div className="blessing-author-row">
                  <span className="blessing-author">{b.name}</span>
                  <span className="blessing-time">{b.time}</span>
                </div>
                <p className="blessing-text">"{b.text}"</p>
                {b.relation && <span className="blessing-status-tag">{b.relation}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

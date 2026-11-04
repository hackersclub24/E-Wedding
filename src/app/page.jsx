'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import EnvelopeOpening from '../components/EnvelopeOpening';
import AudioPlayer from '../components/AudioPlayer';
import PetalsRain from '../components/PetalsRain';
import HeroSection from '../components/HeroSection';
import ThreeCircleScratchCard from '../components/ThreeCircleScratchCard';
import FamilySection from '../components/FamilySection';
import WeddingProgramme from '../components/WeddingProgramme';
import BalManuhaar from '../components/BalManuhaar';
import LookbookViewer from '../components/LookbookViewer';
import HonorRoll from '../components/HonorRoll';
import RSVPForm from '../components/RSVPForm';
import ShareTools from '../components/ShareTools';
import VenueQRModal from '../components/VenueQRModal';

function WeddingContent() {
  const searchParams = useSearchParams();
  const rawGuest = searchParams.get('guest');
  const [guestName, setGuestName] = useState('');
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const audioRef = useRef(null);

  const [modalData, setModalData] = useState({
    isOpen: false,
    type: null,
    title: '',
    sub: '',
    imgSrc: ''
  });

  useEffect(() => {
    if (rawGuest && rawGuest.trim() !== '') {
      setGuestName(rawGuest.trim());
    }
  }, [rawGuest]);

  const handleOpenEnvelope = () => {
    setEnvelopeOpen(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleReopenEnvelope = (e) => {
    e.preventDefault();
    setEnvelopeOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQR = (title, sub, qrSrc, mapUrl) => {
    setModalData({
      isOpen: true,
      type: 'qr',
      title,
      sub,
      imgSrc: qrSrc,
      linkUrl: mapUrl
    });
  };

  const handleOpenLightbox = (src, title) => {
    setModalData({
      isOpen: true,
      type: 'lightbox',
      title,
      sub: '',
      imgSrc: src
    });
  };

  const closeModal = () => {
    setModalData((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      {/* Falling Rose Petals Canvas */}
      <PetalsRain />

      {/* 3D Wax-Sealed Royal Envelope Experience */}
      <EnvelopeOpening
        guestName={guestName}
        isOpen={envelopeOpen}
        onOpen={handleOpenEnvelope}
      />

      {/* Floating Audio Controller (Song: Love Story x Golden Brown Piano Slowed) */}
      <AudioPlayer ref={audioRef} />

      {/* Top Navigation Bar */}
      <header className="top-nav-bar">
        <a href="#hero" className="nav-brand">
          <div className="nav-monogram-circle">AR</div>
          <span className="nav-hashtag">#RitKaAdi</span>
        </a>

        <ul className="nav-links">
          <li><a href="#hero" className="nav-link">Home</a></li>
          <li><a href="#scratch-card" className="nav-link">Reveal Date</a></li>
          <li><a href="#couple" className="nav-link">The Couple</a></li>
          <li><a href="#invitation" className="nav-link">Family</a></li>
          <li><a href="#events" className="nav-link">Programme</a></li>
          <li><a href="#bal-manuhaar" className="nav-link">Bal Manuhaar</a></li>
          <li><a href="#lookbook" className="nav-link">Original Card</a></li>
          <li><a href="#honor-roll" className="nav-link">RSVP</a></li>
          <li><a href="#guestbook" className="nav-link">Blessings</a></li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={handleReopenEnvelope}
            className="nav-link"
            style={{ border: '1px solid var(--color-gold)', background: 'transparent', cursor: 'pointer' }}
          >
            ✉️ Envelope
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="main-wrapper">
        {/* Section 1: Hero Proclamation & Couple Centerpiece */}
        <HeroSection guestName={guestName} />

        {/* Section 2: THE 3-CIRCLE DATE SCRATCH COMPONENT (Exact from Video) */}
        <ThreeCircleScratchCard />

        {/* Section 3: Family Invitation & Lineage (Grandparents' Blessings) */}
        <FamilySection />

        {/* Section 4: Wedding Programme & Sacred Ceremonies (Mohan Vatika & Mannat Farms) */}
        <WeddingProgramme onOpenQR={handleOpenQR} />

        {/* Section 5: Bal Manuhaar (Kids Special Invitation Corner) */}
        <BalManuhaar />

        {/* Section 6: Authentic 4-Page Card Lookbook */}
        <LookbookViewer onOpenLightbox={handleOpenLightbox} />

        {/* Section 7: Family Honor Roll & Direct Call/WhatsApp Directory */}
        <HonorRoll />

        {/* Section 8: Interactive RSVP & Live Blessings Wall */}
        <RSVPForm />

        {/* Section 9: Host Tool (Personalized Link Generator) */}
        <ShareTools />
      </main>

      {/* Royal Footer */}
      <footer className="royal-footer">
        <div className="footer-monogram">AR</div>
        <div className="footer-blessing">Aditya & Ritika</div>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dark)', marginBottom: '6px' }}>
          Saturday, 21st November, 2026 • Vill Kaurali, Ballabgarh (Faridabad)
        </p>
        <p className="footer-copyright">
          Crafted with love for the Bhati & Solanki Families • #RitKaAdi
        </p>
      </footer>

      {/* Venue QR & Image Lightbox Modal */}
      <VenueQRModal data={modalData} onClose={closeModal} />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '50px', color: '#680e1b' }}>Loading Royal Invitation...</div>}>
      <WeddingContent />
    </Suspense>
  );
}

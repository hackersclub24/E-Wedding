'use client';

import React from 'react';

export default function HonorRoll() {
  return (
    <section id="honor-roll" className="royal-card section-padding">
      <div className="card-corner corner-tl"></div>
      <div className="card-corner corner-tr"></div>
      <div className="card-corner corner-bl"></div>
      <div className="card-corner corner-br"></div>

      <div className="section-header">
        <div className="section-pretitle">Distinguished Family</div>
        <h3 className="section-main-title">R.S.V.P. & With Best Compliments</h3>
        <div className="section-title-divider">
          <div className="title-line"></div>
          <div className="title-diamond">❖</div>
          <div className="title-line"></div>
        </div>
      </div>

      <div className="honor-roll-grid">
        {/* RSVP Column */}
        <div className="honor-column-card">
          <h4 className="honor-column-title">R.S.V.P.</h4>
          <ul className="names-list">
            <li><span className="name-bullet">✦</span> <span>Th. Pratap Singh Bhati</span></li>
            <li><span className="name-bullet">✦</span> <span>Th. Rupesh Singh Bhati <span className="honor-designation">(Member)</span></span></li>
            <li><span className="name-bullet">✦</span> <span>Th. Surender Singh Bhati</span></li>
            <li><span className="name-bullet">✦</span> <span>Th. Rajender Singh Bhati</span></li>
            <li><span className="name-bullet">✦</span> <span>Th. Rajkumar Singh Bhati</span></li>
            <li><span className="name-bullet">✦</span> <span>Th. Gopal Singh Bhati <span className="honor-designation">(Airforce)</span></span></li>
            <li><span className="name-bullet">✦</span> <span>Th. Ranpal Singh Bhati, Th. Hari Singh Babu</span></li>
            <li><span className="name-bullet">✦</span> <span>Th. Sunil Singh Bhati <span className="honor-designation">(Numberdar)</span></span></li>
            <li><span className="name-bullet">✦</span> <span>Th. Aman Bhati</span></li>
          </ul>
        </div>

        {/* Best Compliments Column */}
        <div className="honor-column-card">
          <h4 className="honor-column-title">With Best Compliments From</h4>
          <ul className="names-list">
            <li><span className="name-bullet">✦</span> <span>Pushpender Bhati</span></li>
            <li><span className="name-bullet">✦</span> <span>Vinod Bhati, Arun Bhati</span></li>
            <li><span className="name-bullet">✦</span> <span>Sandeep Bhati, Kuldeep Bhati</span></li>
            <li><span className="name-bullet">✦</span> <span>Netrapal Bhati, Kaushlender Bhati</span></li>
            <li><span className="name-bullet">✦</span> <span>Ashish Bhati, Narender Bhati</span></li>
            <li><span className="name-bullet">✦</span> <span>Vikrant Bhati, Harsh Bhati</span></li>
            <li><span className="name-bullet">✦</span> <span>Ritik Bhati, Kunal Bhati</span></li>
            <li style={{ fontWeight: 700, color: 'var(--color-maroon)', marginTop: '6px' }}>
              <span className="name-bullet">❦</span> <span>& All Bhati Family</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Direct Contact & Host Calling Cards */}
      <div className="contacts-showcase">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-royal)', fontWeight: 700, color: 'var(--color-maroon)', fontSize: '1.1rem' }}>
            From / For Inquiries & Assistance
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            H.No.-141/1, Vill Kaurali, Ballabgarh (Faridabad)
          </div>
        </div>

        <div className="contacts-grid">
          {/* Contact 1 */}
          <div className="contact-card-item">
            <div className="contact-info-text">
              <div className="contact-name-title">Th. Harinder Singh Bhati</div>
              <div className="contact-number-val">+91 9560216660</div>
            </div>
            <div className="contact-actions-mini">
              <a href="tel:+919560216660" className="btn-icon-circle btn-icon-call" title="Call">📞</a>
              <a
                href="https://wa.me/919560216660?text=Namaste%20Harinder%20Singh%20Ji!%20Regarding%20Aditya%20%26%20Ritika's%20Wedding%20(%23RitKaAdi)..."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon-circle btn-icon-wa"
                title="WhatsApp"
              >
                💬
              </a>
            </div>
          </div>

          {/* Contact 2 */}
          <div className="contact-card-item">
            <div className="contact-info-text">
              <div className="contact-name-title">Th. Pushpender Singh Bhati</div>
              <div className="contact-number-val">+91 9711066699</div>
            </div>
            <div className="contact-actions-mini">
              <a href="tel:+919711066699" className="btn-icon-circle btn-icon-call" title="Call">📞</a>
              <a
                href="https://wa.me/919711066699?text=Namaste%20Pushpender%20Singh%20Ji!%20Regarding%20Aditya%20%26%20Ritika's%20Wedding%20(%23RitKaAdi)..."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon-circle btn-icon-wa"
                title="WhatsApp"
              >
                💬
              </a>
            </div>
          </div>

          {/* Contact 3 */}
          <div className="contact-card-item">
            <div className="contact-info-text">
              <div className="contact-name-title">Bhati Residence Contact</div>
              <div className="contact-number-val">+91 9560216605</div>
            </div>
            <div className="contact-actions-mini">
              <a href="tel:+919560216605" className="btn-icon-circle btn-icon-call" title="Call">📞</a>
              <a
                href="https://wa.me/919560216605?text=Namaste!%20Regarding%20Aditya%20%26%20Ritika's%20Wedding%20(%23RitKaAdi)..."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon-circle btn-icon-wa"
                title="WhatsApp"
              >
                💬
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

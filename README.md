# Royal Wedding Invitation — Aditya weds Ritika (#RitKaAdi)

A luxury **Next.js** digital wedding invitation web application inspired by the modern **FOLDÈ Wedding** signature experience featured on YouTube/Instagram, featuring the viral **Save The Date Scratch Card** and the romantic piano soundtrack requested by the user.

---

## 🌟 What's New & Key Highlights

### 1. 🎵 User's Requested Soundtrack Integrated
- **Song**: [*Love Story x Golden Brown - Piano Version (Slowed + Reverb | Looped)*](https://youtu.be/KBreV4XUUcQ?si=0V7AAiPVKfipxy1o)
- Audio files included in `/public/audio/wedding_song.m4a` and `/public/audio/wedding_song.webm` for 100% universal browser compatibility (iOS Safari, Android Chrome, Windows, Mac).
- Interactive vinyl disc controller with real-time rotating animation and dancing equalizer bars.
- Automatically starts playing when the guest unseals the 3D wax envelope.

### 2. 🪔 Save The Date Scratch Card ("The Date Scratch Thing")
- Located right below the Hero Section: **`#scratch-card`**.
- An interactive royal card covered in a shimmering **metallic gold foil layer** with gold sparkle dust.
- **Scratch Physics**: Guests drag their finger on mobile or mouse on desktop to scratch off the foil.
- **Glitter Particles**: Golden sparks emit from the touch/cursor position while scratching.
- **Dynamic Percentage Tracker**: Shows real-time scratched percentage (e.g. `Scratched: 38%`).
- **Grand Reveal**:
  - Once ~40% is scratched, the remaining foil automatically clears with a burst of celebratory **confetti**!
  - Unveils the sacred date:
    - **Saturday, 21st November 2026**
    - **Aditya weds Ritika (#RitKaAdi)**
    - **Ghurchari 4:00 PM • Barat Departure 5:00 PM**
    - **Mannat Farms, Panna Vihar, Palwal, Haryana**
  - Includes quick action buttons: **[📅 Save to Google Calendar]** and **[🔄 Scratch Again]**!

### 3. ✉️ 3D Digital Wax-Sealed Envelope (Signature FOLDÈ Style)
- Fullscreen royal maroon envelope with gold embossed borders and a 3D Wax Seal stamped with `#RitKaAdi` & `AR` monogram.
- Dynamic guest name salutation (*"A Royal Invitation For: Respected Family & Friends"* or customized via URL query `?guest=...`).
- Tapping the wax seal triggers a 3D flap flip, the invitation card slides upward, celebratory confetti bursts, and the romantic piano soundtrack starts playing.
- Sticky "✉️ Envelope" button in the top navigation bar to seal and view the envelope again at any time.

### 4. 🏛️ Complete Authentic Wedding Card Content (4 Pages)
- **The Royal Couple**:
  - Groom: **Aditya** (S/o Mrs. Poonam & Mr. Harinder Singh Bhati | Grandson of Sh. Sumitra Devi & Late Sh. Jagdish Chand Bhati)
  - Bride: **Ritika** (D/o Mrs. Rajbala & Sh. Devender Solanki | R/o Panna Vihar, Palwal)
  - Residence: *Vill Kaurali, Ballabgarh (Faridabad)*
- **Wedding Programme (Interactive Events)**:
  - **Lagan-Sagai & Dinner**: Tuesday, 17th November 2026 (3:00 PM Lagan-Sagai, 6:00 PM Dinner) at **Mohan Vatika**, Near CNG Pump, Atali, Ballabgarh. Direct Google Maps link ([Maps Pin](https://maps.app.goo.gl/iZfixgkj4K1bGB2z6)) and venue QR code.
  - **Wedding Day & Barat**: Saturday, 21st November 2026 (4:00 PM Ghurchari at Kaurali, 5:00 PM Departure of Barat) at **Mannat Farms**, Panna Vihar, Palwal, Haryana. Direct Google Maps link ([Maps Pin](https://maps.app.goo.gl/dtAxVPVnK5Dfj4NA8)) and venue QR code.
- **Bal Manuhaar**:
  - *"ढोलक बजेगा, ठुमका लगाएंगे, अपने चाचू / भाई की शादी में सबको नचाएंगे!"* — **Yatika, Bhargav, Dimpal** with interactive confetti burst.
- **Printed Card Lookbook**:
  - 4-page interactive digital flipbook displaying the physical card pages with thumbnail navigation, zoom modal, and a PDF download button (`/assets/wedding_invitation.pdf`).
- **Family Directory & RSVP**:
  - Full **R.S.V.P.** list (Th. Pratap Singh Bhati, Th. Rupesh Singh Bhati, Th. Surender Singh Bhati, Th. Rajender Singh Bhati, Th. Rajkumar Singh Bhati, Th. Gopal Singh Bhati, Th. Ranpal Singh Bhati, Th. Hari Singh Babu, Th. Sunil Singh Bhati, Th. Aman Bhati).
  - Full **With Best Compliments** list (Pushpender Bhati, Vinod Bhati, Arun Bhati, Sandeep Bhati, Kuldeep Bhati, Netrapal Bhati, Kaushlender Bhati, Ashish Bhati, Narender Bhati, Vikrant Bhati, Harsh Bhati, Ritik Bhati, Kunal Bhati & All Bhati Family).
  - One-tap phone call and WhatsApp buttons for:
    - Th. Harinder Singh Bhati (`+91 9560216660`)
    - Th. Pushpender Singh Bhati (`+91 9711066699`)
    - Bhati Residence Contact (`+91 9560216605`)
- **Interactive RSVP & Live Blessings Wall**:
  - Guests can submit RSVPs, attendances, and blessings that appear immediately on the live wall and prompt to send a pre-formatted WhatsApp message to the family.
- **Host Tool (Personalized Link Generator)**:
  - Host can type any guest name (e.g. *"Sharma Family"*) to generate a link `?guest=Sharma+Family` and share directly to WhatsApp.

---

## 💻 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Frontend**: React 18
- **Audio**: HTML5 Audio with Dual-Format (AAC/M4A & WebM)
- **Canvas Effects**: HTML5 2D Canvas Scratch Engine & Falling Rose Petals Canvas
- **Confetti**: `canvas-confetti`

---

## 🚀 Running the Project Locally

```bash
# 1. Navigate to the project directory
cd d:\nonu

# 2. Start the Next.js development server
npm run dev

# 3. Open in your browser
# http://localhost:3000
```

To create a production build and run it:
```bash
npm run build
npm start
```

---

## 🌐 Deploy to Vercel (1-Click Free Hosting)

1. Push this repository to GitHub or drag the folder to [Vercel](https://vercel.com).
2. Vercel automatically detects Next.js and deploys your website with global CDN, custom domain support, and SSL!

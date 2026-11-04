/* ==========================================================================
   #RitKaAdi - Interactive Wedding Web Application
   Crafted with luxury animations, Web Audio API, and mobile-first experience
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initPersonalizedGuest();
    initEnvelope();
    initPetalsCanvas();
    initCountdown();
    initMusicControls();
    initLookbook();
    initModals();
    initRSVP();
    initShareTools();
});

/* ==========================================================================
   1. PERSONALIZED GUEST DETECTION (URL Query Param)
   ========================================================================== */
function initPersonalizedGuest() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('guest');
    const guestDisplayEl = document.getElementById('envelope-guest-name');
    const heroGuestDisplayEl = document.getElementById('hero-guest-salutation');

    if (guestName && guestName.trim() !== '') {
        const decoded = decodeURIComponent(guestName.replace(/\+/g, ' '));
        if (guestDisplayEl) guestDisplayEl.textContent = decoded;
        if (heroGuestDisplayEl) {
            heroGuestDisplayEl.innerHTML = `Warmly Welcoming <span class="guest-highlight">${escapeHtml(decoded)}</span> & Family`;
            heroGuestDisplayEl.style.display = 'block';
        }
    }
}

function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[m]);
}

/* ==========================================================================
   2. ROYAL ENVELOPE OPENING ANIMATION (MATCHING VIRAL VIDEO)
   ========================================================================== */
function initEnvelope() {
    const overlay = document.getElementById('envelope-overlay');
    const wrapper = document.getElementById('envelope-wrapper');
    const topFlap = document.getElementById('envelope-top-flap');
    const waxSeal = document.getElementById('wax-seal-btn');
    const skipBtn = document.getElementById('splash-skip-btn');
    const tapHint = document.getElementById('envelope-tap-hint');
    const reopenBtn = document.getElementById('reopen-envelope-btn');

    if (!overlay || !wrapper) return;

    let isOpening = false;

    function openEnvelope() {
        if (isOpening) return;
        isOpening = true;

        wrapper.classList.add('is-opening');
        if (topFlap) topFlap.classList.add('flap-flipped');
        if (waxSeal) waxSeal.classList.add('seal-lifted');
        if (tapHint) tapHint.style.display = 'none';
        if (skipBtn) skipBtn.style.display = 'none';

        triggerConfetti(window.innerWidth / 2, window.innerHeight / 2);

        if (window.weddingMusic) {
            window.weddingMusic.play();
        }

        setTimeout(() => {
            wrapper.classList.add('is-revealed');
        }, 600);

        setTimeout(() => {
            overlay.classList.add('splash-hidden');
            burstPetals();
            isOpening = false;
        }, 2800);
    }

    if (waxSeal) waxSeal.addEventListener('click', openEnvelope);
    wrapper.addEventListener('click', (e) => {
        if (!wrapper.classList.contains('is-opening')) {
            openEnvelope();
        }
    });

    if (skipBtn) {
        skipBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.weddingMusic) window.weddingMusic.play();
            overlay.classList.add('splash-hidden');
        });
    }

    if (reopenBtn) {
        reopenBtn.addEventListener('click', (e) => {
            e.preventDefault();
            wrapper.classList.remove('is-opening', 'is-revealed');
            if (topFlap) topFlap.classList.remove('flap-flipped');
            if (waxSeal) waxSeal.classList.remove('seal-lifted');
            overlay.classList.remove('splash-hidden');
            if (tapHint) tapHint.style.display = 'block';
            if (skipBtn) skipBtn.style.display = 'block';
            isOpening = false;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/* ==========================================================================
   3. FALLING ROSE PETALS ANIMATION CANVAS
   ========================================================================== */
let petals = [];
let petalAnimationId = null;
let petalsEnabled = true;

function initPetalsCanvas() {
    const canvas = document.getElementById('petals-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Create 32 realistic rose petal particles
    const petalCount = window.innerWidth < 768 ? 20 : 36;
    petals = [];
    for (let i = 0; i < petalCount; i++) {
        petals.push(createPetal(canvas.width, canvas.height, true));
    }

    function createPetal(w, h, randomY = false) {
        return {
            x: Math.random() * w,
            y: randomY ? Math.random() * h : -20 - Math.random() * 40,
            size: 10 + Math.random() * 14,
            speedY: 0.8 + Math.random() * 1.4,
            speedX: -0.6 + Math.random() * 1.2,
            rotation: Math.random() * 360,
            rotationSpeed: -1.5 + Math.random() * 3,
            flip: Math.random() * 360,
            flipSpeed: 1 + Math.random() * 2,
            colorIndex: Math.floor(Math.random() * 3), // deep rose, blush pink, gold sparkle
            opacity: 0.5 + Math.random() * 0.4
        };
    }

    const petalColors = [
        { outer: '#b8142a', inner: '#780a19' }, // Velvet Red
        { outer: '#d94158', inner: '#9c1429' }, // Crimson Rose
        { outer: '#e88998', inner: '#c2485c' }, // Soft Blush
        { outer: '#e0b354', inner: '#ab7e22' }  // Gold leaf sparkle
    ];

    function drawPetal(p) {
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
        // Realistic curved rose petal path
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.8, p.size * 0.9, p.size * 0.5, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.5, -p.size * 0.8, -p.size * 0.8, 0, -p.size);
        ctx.fill();

        ctx.restore();
    }

    function render() {
        if (!petalsEnabled) return;
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

        petalAnimationId = requestAnimationFrame(render);
    }

    render();

    // Petal burst function for events
    window.burstPetals = function() {
        for (let i = 0; i < 25; i++) {
            petals.push({
                x: window.innerWidth * 0.5 + (Math.random() - 0.5) * 200,
                y: window.innerHeight * 0.3 + (Math.random() - 0.5) * 100,
                size: 12 + Math.random() * 16,
                speedY: 1.5 + Math.random() * 2,
                speedX: (Math.random() - 0.5) * 4,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 6,
                flip: Math.random() * 360,
                flipSpeed: 2 + Math.random() * 3,
                colorIndex: Math.floor(Math.random() * 4),
                opacity: 0.9
            });
        }
    };
}

/* ==========================================================================
   4. LIVE COUNTDOWN TO THE WEDDING CEREMONY
   ========================================================================== */
function initCountdown() {
    // Target: Saturday, November 21, 2026, 16:00:00 (Ghurchari & Barat Departure) IST (+05:30)
    const weddingDate = new Date('2026-11-21T16:00:00+05:30').getTime();

    const daysEl = document.getElementById('count-days');
    const hoursEl = document.getElementById('count-hours');
    const minsEl = document.getElementById('count-mins');
    const secsEl = document.getElementById('count-secs');

    if (!daysEl) return;

    function update() {
        const now = new Date().getTime();
        const diff = weddingDate - now;

        if (diff <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minsEl.textContent = '00';
            secsEl.textContent = '00';
            const countTitle = document.querySelector('.countdown-title');
            if (countTitle) countTitle.innerHTML = '✨ Auspicious Wedding Celebrations in Progress! ✨';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minsEl.textContent = String(minutes).padStart(2, '0');
        secsEl.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

/* ==========================================================================
   5. MUSIC CONTROLS & VINYL SPIN
   ========================================================================== */
function initMusicControls() {
    const vinylBtn = document.getElementById('music-toggle-btn');
    const musicInfo = document.getElementById('music-info-text');
    const musicStatus = document.getElementById('music-status-label');

    if (!vinylBtn) return;

    function handleToggle() {
        if (!window.weddingMusic) return;
        window.weddingMusic.toggle();
    }

    vinylBtn.addEventListener('click', handleToggle);
    if (musicInfo) musicInfo.addEventListener('click', handleToggle);

    if (window.weddingMusic) {
        window.weddingMusic.onStateChange = (playing) => {
            if (playing) {
                vinylBtn.classList.add('spinning');
                if (musicStatus) musicStatus.textContent = 'Playing Shehnai & Flute ♪';
            } else {
                vinylBtn.classList.remove('spinning');
                if (musicStatus) musicStatus.textContent = 'Music Paused';
            }
        };
    }
}

/* ==========================================================================
   6. 4-PAGE AUTHENTIC CARD LOOKBOOK (FLIPBOOK VIEWER)
   ========================================================================== */
function initLookbook() {
    const pages = [
        {
            num: 1,
            title: "Page 1: Invitation Cover & Radha Krishna Frame",
            src: "assets/card_page_1.jpg"
        },
        {
            num: 2,
            title: "Page 2: Royal Couple Portrait & #RitKaAdi",
            src: "assets/card_page_2.jpg"
        },
        {
            num: 3,
            title: "Page 3: Wedding Programme & Events Schedule",
            src: "assets/card_page_3.jpg"
        },
        {
            num: 4,
            title: "Page 4: Family Details, RSVP & Compliments",
            src: "assets/card_page_4.jpg"
        }
    ];

    let currentPage = 0;
    const mainImg = document.getElementById('lookbook-image');
    const pageIndicator = document.getElementById('lookbook-indicator');
    const prevBtn = document.getElementById('lookbook-prev-btn');
    const nextBtn = document.getElementById('lookbook-next-btn');
    const thumbBtns = document.querySelectorAll('.thumb-btn');

    if (!mainImg) return;

    function setPage(index) {
        currentPage = (index + pages.length) % pages.length;
        mainImg.style.opacity = '0';

        setTimeout(() => {
            mainImg.src = pages[currentPage].src;
            mainImg.alt = pages[currentPage].title;
            mainImg.style.opacity = '1';
        }, 150);

        if (pageIndicator) {
            pageIndicator.textContent = `Page ${pages[currentPage].num} of 4`;
        }

        thumbBtns.forEach((btn, idx) => {
            btn.classList.toggle('active', idx === currentPage);
        });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => setPage(currentPage - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => setPage(currentPage + 1));

    thumbBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => setPage(idx));
    });

    // Touch swipe support for mobile lookbook
    let touchStartX = 0;
    mainImg.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    mainImg.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 40) {
            if (diff > 0) setPage(currentPage - 1);
            else setPage(currentPage + 1);
        }
    }, { passive: true });

    // Click to enlarge in lightbox
    mainImg.addEventListener('click', () => {
        openImageLightbox(pages[currentPage].src, pages[currentPage].title);
    });
}

/* ==========================================================================
   7. MODALS (QR CODE VIEWER & LIGHTBOX)
   ========================================================================== */
function initModals() {
    const modal = document.getElementById('app-modal');
    const modalClose = document.getElementById('modal-close-btn');

    if (!modal) return;

    function closeModal() {
        modal.classList.remove('active');
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    window.openQRModal = function(title, venue, qrSrc, mapUrl) {
        const modalContent = document.getElementById('modal-dynamic-content');
        if (!modalContent) return;

        modalContent.innerHTML = `
            <h3 style="font-family: var(--font-royal); color: var(--color-maroon); font-size: 1.3rem; margin-bottom: 4px;">${title}</h3>
            <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 16px;">${venue}</p>
            <div style="background: #ffffff; padding: 12px; display: inline-block; border: 2px solid var(--color-gold); border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 20px;">
                <img src="${qrSrc}" alt="Venue QR Code" style="width: 220px; height: 220px; object-fit: contain; display: block;" />
            </div>
            <p style="font-size: 0.8rem; color: var(--color-text-muted); margin-bottom: 18px;">Scan with phone camera or tap below to open navigation</p>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <a href="${mapUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary-royal" style="padding: 10px 20px;">
                    📍 Open Google Maps
                </a>
            </div>
        `;
        modal.classList.add('active');
    };

    window.openImageLightbox = function(src, title) {
        const modalContent = document.getElementById('modal-dynamic-content');
        if (!modalContent) return;

        modalContent.innerHTML = `
            <h4 style="font-family: var(--font-royal); color: var(--color-maroon); font-size: 1.05rem; margin-bottom: 12px;">${title}</h4>
            <div style="max-height: 75vh; overflow-y: auto; border-radius: 8px;">
                <img src="${src}" alt="${title}" style="width: 100%; height: auto; display: block; border-radius: 8px;" />
            </div>
        `;
        modal.classList.add('active');
    };
}

/* ==========================================================================
   8. INTERACTIVE RSVP & DIGITAL BLESSINGS WALL
   ========================================================================== */
function initRSVP() {
    const form = document.getElementById('wedding-rsvp-form');
    const blessingsList = document.getElementById('blessings-scroll-area');

    // Default pre-seeded loving blessings from family
    const defaultBlessings = [
        {
            name: "Solanki Family (Palwal)",
            relation: "Bride's Family",
            text: "Wishing Aditya and Ritika a lifetime of eternal love, happiness, laughter, and beautiful moments together!",
            time: "Blessings"
        },
        {
            name: "Yatika, Bhargav & Dimpal",
            relation: "Bal Manuhaar",
            text: "Chachu & Bhabhi ki shadi mein dholak bajaenge aur khoob nachange! Can't wait for 17th & 21st November! ❤️",
            time: "Excited"
        },
        {
            name: "Bhati Family (Vill Kaurali)",
            relation: "Groom's Family",
            text: "May Lord Ganesha and Radha Krishna shower their divine blessings on Aditya & Ritika as they begin this sacred journey.",
            time: "Blessings"
        }
    ];

    // Load from localStorage or initialize defaults
    let storedWishes = [];
    try {
        const local = localStorage.getItem('ritkaadi_blessings');
        if (local) {
            storedWishes = JSON.parse(local);
        } else {
            storedWishes = defaultBlessings;
            localStorage.setItem('ritkaadi_blessings', JSON.stringify(storedWishes));
        }
    } catch(e) {
        storedWishes = defaultBlessings;
    }

    function renderBlessings() {
        if (!blessingsList) return;
        blessingsList.innerHTML = storedWishes.map(item => `
            <div class="blessing-item">
                <div class="blessing-author-row">
                    <span class="blessing-author">${escapeHtml(item.name)}</span>
                    <span class="blessing-time">${escapeHtml(item.time || 'Blessing')}</span>
                </div>
                <p class="blessing-text">"${escapeHtml(item.text)}"</p>
                ${item.relation ? `<span class="blessing-status-tag">${escapeHtml(item.relation)}</span>` : ''}
            </div>
        `).join('');
    }

    renderBlessings();

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('rsvp-name').value.trim();
            const phone = document.getElementById('rsvp-phone').value.trim();
            const attendance = document.getElementById('rsvp-attendance').value;
            const guests = document.getElementById('rsvp-guests').value;
            const message = document.getElementById('rsvp-message').value.trim();

            if (!name) {
                alert('Please enter your name.');
                return;
            }

            const newBlessing = {
                name: name,
                relation: `Attending: ${attendance} (${guests} Guests)`,
                text: message || "Heartiest congratulations and best wishes for the wedding!",
                time: "Just now"
            };

            storedWishes.unshift(newBlessing);
            try {
                localStorage.setItem('ritkaadi_blessings', JSON.stringify(storedWishes));
            } catch(e) {}

            renderBlessings();
            triggerConfetti(window.innerWidth / 2, window.innerHeight / 2);

            // Confirmation & WhatsApp prompt
            const waText = encodeURIComponent(
                `Namaste Harinder Singh Bhati Ji! 🙏\n\n` +
                `*RSVP for Aditya & Ritika Wedding (#RitKaAdi)*\n` +
                `*From:* ${name}\n` +
                `*Attending:* ${attendance}\n` +
                `*Guests joining:* ${guests}\n` +
                (phone ? `*Contact:* ${phone}\n` : '') +
                (message ? `*Wishes:* "${message}"\n\n` : '\n') +
                `Heartiest congratulations to the Bhati & Solanki families! Looking forward to celebrating together! ✨🎉`
            );

            const sendWA = confirm(
                `Thank you ${name}! Your RSVP & blessings have been recorded.\n\n` +
                `Would you like to send this confirmation to the Bhati family on WhatsApp now?`
            );

            if (sendWA) {
                window.open(`https://wa.me/919560216660?text=${waText}`, '_blank');
            }

            form.reset();
        });
    }
}

/* ==========================================================================
   9. SHARE TOOLS & PERSONALIZED LINK GENERATOR
   ========================================================================== */
function initShareTools() {
    const generateBtn = document.getElementById('btn-generate-guest-link');
    const customInput = document.getElementById('guest-name-custom-input');
    const resultBox = document.getElementById('generated-link-container');
    const copyBtn = document.getElementById('copy-guest-link-btn');
    const shareWABtn = document.getElementById('share-wa-guest-btn');

    if (generateBtn && customInput) {
        generateBtn.addEventListener('click', () => {
            const val = customInput.value.trim();
            if (!val) {
                alert('Please enter guest name (e.g. "Sharma Family" or "Dr. Verma")');
                return;
            }

            const baseUrl = window.location.origin + window.location.pathname;
            const personalizedUrl = `${baseUrl}?guest=${encodeURIComponent(val)}`;

            if (resultBox) {
                resultBox.style.display = 'block';
                const inputField = document.getElementById('generated-url-field');
                if (inputField) inputField.value = personalizedUrl;
            }

            if (copyBtn) {
                copyBtn.onclick = () => {
                    navigator.clipboard.writeText(personalizedUrl);
                    copyBtn.textContent = 'Copied to Clipboard! ✓';
                    setTimeout(() => copyBtn.textContent = 'Copy Link', 2000);
                };
            }

            if (shareWABtn) {
                shareWABtn.onclick = () => {
                    const waMsg = encodeURIComponent(
                        `🌸 *Wedding Invitation: Aditya weds Ritika (#RitKaAdi)* 🌸\n\n` +
                        `Dear *${val}*,\n` +
                        `We cordially invite you and your family to grace the auspicious wedding ceremony of Aditya & Ritika.\n\n` +
                        `🗓️ *Lagan-Sagai:* 17th November 2026 at Mohan Vatika\n` +
                        `💍 *Wedding:* 21st November 2026 at Mannat Farms\n\n` +
                        `✨ *Open Your Royal Invitation here:* \n${personalizedUrl}\n\n` +
                        `Warm Regards,\n` +
                        `*Th. Harinder Singh Bhati & Bhati Family*\n` +
                        `Vill Kaurali, Ballabgarh`
                    );
                    window.open(`https://wa.me/?text=${waMsg}`, '_blank');
                };
            }
        });
    }

    // Direct WhatsApp share for the website
    const directShareBtn = document.getElementById('direct-wa-share');
    if (directShareBtn) {
        directShareBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = window.location.href;
            const text = encodeURIComponent(
                `🌸 *Wedding Invitation: Aditya weds Ritika (#RitKaAdi)* 🌸\n\n` +
                `You are cordially invited to celebrate our wedding on 17th & 21st November 2026!\n` +
                `View interactive digital card, itinerary, and venue details:\n${url}`
            );
            window.open(`https://wa.me/?text=${text}`, '_blank');
        });
    }
}

/* ==========================================================================
   10. CALENDAR INTEGRATION (.ICS & GOOGLE CALENDAR)
   ========================================================================== */
window.downloadICalendar = function(eventName, startDateStr, endDateStr, location, description) {
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//RitKaAdi Wedding//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `SUMMARY:${eventName}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${location}`,
        `DTSTART:${startDateStr}`,
        `DTEND:${endDateStr}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${eventName.replace(/[^a-zA-Z0-9]/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

/* ==========================================================================
   11. CELEBRATORY CONFETTI SPARKLE ENGINE
   ========================================================================== */
function triggerConfetti(centerX, centerY) {
    const colors = ['#d4af37', '#ffd700', '#b8142a', '#e88998', '#ffffff'];
    const count = 40;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'confetti-burst-particle';
        document.body.appendChild(particle);

        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 6 + Math.random() * 8;
        const angle = Math.random() * Math.PI * 2;
        const dist = 50 + Math.random() * 180;
        const targetX = Math.cos(angle) * dist;
        const targetY = Math.sin(angle) * dist + 80; // gravity bias

        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: ${size}px;
            height: ${size * (Math.random() > 0.5 ? 1 : 1.6)}px;
            background: ${color};
            border-radius: ${Math.random() > 0.4 ? '50%' : '2px'};
            z-index: 1100;
            pointer-events: none;
            box-shadow: 0 0 6px ${color};
            transition: transform 1.2s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 1.2s;
        `;

        requestAnimationFrame(() => {
            particle.style.transform = `translate(${targetX}px, ${targetY}px) rotate(${Math.random() * 720}deg)`;
            particle.style.opacity = '0';
        });

        setTimeout(() => {
            particle.remove();
        }, 1300);
    }
}


// Royal Indian Wedding Audio Synthesizer (Shenai & Bansuri Raag with Tanpura Drone)
// Web Audio API implementation with 0 external dependencies, instant loading, and zero CORS issues.

class WeddingMusicEngine {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.volume = 0.45;
        this.masterGain = null;
        this.melodyTimer = null;
        this.droneOscillators = [];
        this.analyser = null;
        this.currentNoteIndex = 0;
        this.onStateChange = null;

        // Indian classical Raag Yaman / Wedding Mangal Dhwani notes (frequencies in Hz based on C#4 root)
        // Root Sa = 277.18 Hz (C#4)
        this.notes = {
            'Sa_low': 138.59,
            'Pa_low': 207.65,
            'Ni_low': 261.63,
            'Sa': 277.18,
            'Re': 311.13,
            'Ga': 349.23,
            'Ma_tivra': 369.99,
            'Pa': 415.30,
            'Dha': 466.16,
            'Ni': 523.25,
            'Sa_high': 554.37,
            'Re_high': 622.25,
            'Ga_high': 698.46
        };

        // Auspicious wedding melodic sequence (Shenai / Bansuri traditional phrase)
        this.score = [
            { note: 'Sa', dur: 1.2 },
            { note: 'Re', dur: 0.6 },
            { note: 'Ga', dur: 1.4 },
            { note: 'Ma_tivra', dur: 0.8 },
            { note: 'Pa', dur: 1.8 },
            { note: 'Dha', dur: 0.8 },
            { note: 'Ni', dur: 1.0 },
            { note: 'Sa_high', dur: 2.2 },
            { note: 'Ni', dur: 0.8 },
            { note: 'Dha', dur: 0.8 },
            { note: 'Pa', dur: 1.6 },
            { note: 'Ga', dur: 1.0 },
            { note: 'Ma_tivra', dur: 0.8 },
            { note: 'Ga', dur: 1.2 },
            { note: 'Re', dur: 1.0 },
            { note: 'Sa', dur: 2.5 },
            // Second phrase: Swar Mangal
            { note: 'Pa_low', dur: 1.0 },
            { note: 'Ni_low', dur: 1.0 },
            { note: 'Sa', dur: 1.6 },
            { note: 'Ga', dur: 1.4 },
            { note: 'Re', dur: 0.8 },
            { note: 'Ga', dur: 1.8 },
            { note: 'Pa', dur: 2.0 },
            { note: 'Ni', dur: 1.2 },
            { note: 'Sa_high', dur: 1.8 },
            { note: 'Re_high', dur: 0.8 },
            { note: 'Sa_high', dur: 2.4 },
            { note: 'Pa', dur: 1.4 },
            { note: 'Ga', dur: 1.2 },
            { note: 'Re', dur: 1.0 },
            { note: 'Sa', dur: 3.0 }
        ];
    }

    init() {
        if (this.ctx) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);

        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 64;

        // Warm subtle reverb simulation via stereo delay and feedback
        this.delayL = this.ctx.createDelay();
        this.delayL.delayTime.value = 0.28;
        this.delayR = this.ctx.createDelay();
        this.delayR.delayTime.value = 0.36;

        this.feedbackL = this.ctx.createGain();
        this.feedbackL.gain.value = 0.32;
        this.feedbackR = this.ctx.createGain();
        this.feedbackR.gain.value = 0.28;

        this.delayFilter = this.ctx.createBiquadFilter();
        this.delayFilter.type = 'lowpass';
        this.delayFilter.frequency.value = 1800;

        // Routing
        this.masterGain.connect(this.ctx.destination);
        this.masterGain.connect(this.analyser);
        this.masterGain.connect(this.delayL);
        this.masterGain.connect(this.delayR);

        this.delayL.connect(this.delayFilter);
        this.delayR.connect(this.delayFilter);
        this.delayFilter.connect(this.feedbackL);
        this.delayFilter.connect(this.feedbackR);
        this.feedbackL.connect(this.delayL);
        this.feedbackR.connect(this.delayR);
        this.delayFilter.connect(this.ctx.destination);
    }

    startDrone() {
        // Indian Tanpura drone: Root Sa, Fifth Pa, Octave Sa
        const droneFrequencies = [
            { f: this.notes.Sa_low, gain: 0.08, type: 'triangle' },
            { f: this.notes.Pa_low, gain: 0.05, type: 'sine' },
            { f: this.notes.Sa, gain: 0.04, type: 'triangle' },
            { f: this.notes.Pa, gain: 0.02, type: 'sine' }
        ];

        droneFrequencies.forEach(item => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();

            osc.type = item.type;
            osc.frequency.setValueAtTime(item.f, this.ctx.currentTime);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800, this.ctx.currentTime);

            gain.gain.setValueAtTime(item.gain * this.volume, this.ctx.currentTime);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);

            osc.start();
            this.droneOscillators.push({ osc, gain });
        });
    }

    playFluteNote(freq, duration) {
        if (!this.isPlaying || !this.ctx) return;

        const now = this.ctx.currentTime;
        
        // Shenai / Bansuri dual oscillator for rich woody reed resonance
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        // Bansuri tone uses triangle + slight saw, Shehnai uses mild bandpass
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(freq, now);

        osc2.type = 'sawtooth';
        osc2.frequency.setValueAtTime(freq * 1.002, now); // subtle detune chorusing

        // Expressive vibrato (5 Hz pitch oscillation)
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(5.2, now);
        lfoGain.gain.setValueAtTime(freq * 0.012, now); // vibrato depth
        lfo.connect(osc1.frequency);
        lfo.connect(osc2.frequency);
        lfo.start(now + 0.2); // vibrato begins naturally after note attack

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, now);
        filter.Q.value = 2.5;

        // Envelope: soft breathing attack, warm sustain, gentle release
        const attack = 0.22;
        const release = 0.35;
        const sustainLevel = 0.22 * this.volume;

        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.linearRampToValueAtTime(sustainLevel, now + attack);
        noteGain.gain.setValueAtTime(sustainLevel, now + duration - release);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc1.start(now);
        osc2.start(now);

        const stopTime = now + duration + 0.1;
        osc1.stop(stopTime);
        osc2.stop(stopTime);
        lfo.stop(stopTime);
    }

    playMelodyStep() {
        if (!this.isPlaying) return;

        const step = this.score[this.currentNoteIndex];
        const freq = this.notes[step.note];
        this.playFluteNote(freq, step.dur);

        this.currentNoteIndex = (this.currentNoteIndex + 1) % this.score.length;

        // Schedule next note with a tiny micro-pause
        const delayMs = step.dur * 1000 * 0.94;
        this.melodyTimer = setTimeout(() => {
            this.playMelodyStep();
        }, delayMs);
    }

    play() {
        this.init();
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        if (this.isPlaying) return;
        this.isPlaying = true;

        // Fade in master volume
        this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
        this.masterGain.gain.linearRampToValueAtTime(1.0, this.ctx.currentTime + 1.2);

        this.startDrone();
        this.playMelodyStep();

        if (this.onStateChange) this.onStateChange(true);
    }

    pause() {
        if (!this.isPlaying) return;
        this.isPlaying = false;

        if (this.melodyTimer) {
            clearTimeout(this.melodyTimer);
            this.melodyTimer = null;
        }

        if (this.masterGain && this.ctx) {
            this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
            this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
            this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.6);

            setTimeout(() => {
                this.droneOscillators.forEach(d => {
                    try { d.osc.stop(); } catch(e) {}
                });
                this.droneOscillators = [];
            }, 700);
        }

        if (this.onStateChange) this.onStateChange(false);
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    setVolume(val) {
        this.volume = Math.max(0, Math.min(1, val));
        if (this.masterGain && this.ctx) {
            this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        }
    }
}

// Global instance
window.weddingMusic = new WeddingMusicEngine();


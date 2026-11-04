'use client';

import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';

const AudioPlayer = forwardRef((props, ref) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Audio play request interrupted or requires user gesture:', err);
      });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  useImperativeHandle(ref, () => ({
    play,
    pause,
    toggle,
    isPlaying
  }));

  return (
    <>
      {/* HTML5 Audio with User-Requested Song: Love Story x Golden Brown (Piano Slowed + Reverb) */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/audio/wedding_song.m4a" type="audio/mp4" />
        <source src="/audio/wedding_song.webm" type="audio/webm" />
      </audio>

      {/* Floating Audio Controller Widget */}
      <div className="floating-audio-widget" title="Song: Love Story x Golden Brown (Piano Version)">
        <div
          className={`vinyl-disc ${isPlaying ? 'spinning' : ''}`}
          onClick={toggle}
          title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          <div className="vinyl-center"></div>
        </div>

        <div className="music-info" onClick={toggle}>
          <div className="music-title">
            <span>Love Story Piano</span>
            <div className="equalizer-bars">
              <div className="eq-bar" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}></div>
              <div className="eq-bar" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}></div>
              <div className="eq-bar" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}></div>
              <div className="eq-bar" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}></div>
            </div>
          </div>
          <span className="music-status">
            {isPlaying ? 'Playing • Slowed + Reverb ♪' : 'Tap to Play Music ♪'}
          </span>
        </div>
      </div>
    </>
  );
});

AudioPlayer.displayName = 'AudioPlayer';
export default AudioPlayer;

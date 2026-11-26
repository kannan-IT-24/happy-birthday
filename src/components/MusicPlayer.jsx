import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

const MUSIC_SRC = '/assets/music/birthday-music.mp3';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioFailed, setAudioFailed] = useState(false);
  const audioRef = useRef(null);
  const userPausedRef = useRef(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.65;
    audioRef.current = audio;

    const handleCanPlay = () => {
      setAudioFailed(false);
    };

    const handleError = () => {
      setAudioFailed(true);
    };

    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('error', handleError);

    // Handle browser autoplay restrictions: start music on first user interaction
    const startOnFirstInteraction = () => {
      if (startedRef.current || userPausedRef.current) return;
      startedRef.current = true;

      if (audioRef.current && !audioRef.current.error) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // If blocked or failed, allow retry on next click
            startedRef.current = false;
          });
      } else {
        soundEngine.startRomanticBGM();
        setIsPlaying(true);
      }

      window.removeEventListener('pointerdown', startOnFirstInteraction);
      window.removeEventListener('keydown', startOnFirstInteraction);
    };

    window.addEventListener('pointerdown', startOnFirstInteraction, { passive: true });
    window.addEventListener('keydown', startOnFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', startOnFirstInteraction);
      window.removeEventListener('keydown', startOnFirstInteraction);
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.pause();
      soundEngine.stopRomanticBGM();
    };
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      userPausedRef.current = true;
      if (!audioFailed && audioRef.current) {
        audioRef.current.pause();
      } else {
        soundEngine.stopRomanticBGM();
      }
      setIsPlaying(false);
    } else {
      userPausedRef.current = false;
      startedRef.current = true;
      if (!audioFailed && audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            soundEngine.startRomanticBGM();
            setIsPlaying(true);
          });
      } else {
        soundEngine.startRomanticBGM();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}
    >
      <div
        className="glass-panel"
        style={{
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderRadius: '50px',
          border: '1px solid rgba(244, 114, 182, 0.35)',
          boxShadow: isPlaying ? '0 8px 24px rgba(236, 72, 153, 0.35)' : 'none'
        }}
      >
        <button
          onClick={togglePlay}
          title={isPlaying ? 'Pause Music' : 'Play Romantic Music'}
          style={{
            background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            border: 'none',
            color: '#fff',
            width: 38,
            height: 38,
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(236, 72, 153, 0.45)'
          }}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
        </button>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '11px', color: '#f472b6', fontWeight: 600, letterSpacing: '0.5px' }}>
            {isPlaying ? 'NOW PLAYING' : 'BIRTHDAY MUSIC'}
          </span>
          <span style={{ fontSize: '12px', color: '#f8fafc', opacity: 0.9, display: 'flex', alignItems: 'center', gap: 5 }}>
            {isPlaying && (
              <span style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 12 }}>
                <span style={{ width: 2, height: 8, background: '#f472b6', animation: 'flicker 0.6s infinite alternate' }} />
                <span style={{ width: 2, height: 12, background: '#c4b5fd', animation: 'flicker 0.4s infinite alternate' }} />
                <span style={{ width: 2, height: 6, background: '#f3d58d', animation: 'flicker 0.8s infinite alternate' }} />
              </span>
            )}
            {!audioFailed ? 'Birthday Melody' : 'Celestial Celesta'}
          </span>
        </div>

        <button
          onClick={toggleMute}
          title={isMuted ? 'Unmute' : 'Mute'}
          style={{
            background: 'transparent',
            border: 'none',
            color: isMuted ? '#64748b' : '#f472b6',
            cursor: 'pointer',
            padding: 4
          }}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </div>
  );
}

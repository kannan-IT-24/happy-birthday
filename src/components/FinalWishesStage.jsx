import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, RotateCcw, Cake } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEngine';

export default function FinalWishesStage({ config, userProfile, onReplay }) {
  const finalPhotos = config.finalPhotos || [config.wishes.photoUrl];
  const [photoIdx, setPhotoIdx] = useState(0);

  useEffect(() => {
    if (finalPhotos.length <= 1) return;
    const timer = setInterval(() => {
      setPhotoIdx((prev) => (prev + 1) % finalPhotos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [finalPhotos.length]);
  useEffect(() => {
    soundEngine.playSparkle();

    // Fireworks & Confetti burst sequence
    const duration = 4.5 * 1000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }

      // Fireworks left and right
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random() * 0.4, y: Math.random() * 0.5 },
        colors: ['#ff2a85', '#ffd700', '#00d2ff', '#a855f7', '#ffffff']
      });
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: 0.6 + Math.random() * 0.4, y: Math.random() * 0.5 },
        colors: ['#ff70a6', '#ffd700', '#00f2fe', '#ffffff']
      });
    }, 550);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 16px 50px',
        position: 'relative',
        zIndex: 10,
        textAlign: 'center'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{ maxWidth: '820px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {/* Birthday Person's Photograph with Royal Glowing Halo */}
        <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 28px' }}>
          {/* Glowing Halo */}
          <div
            style={{
              position: 'absolute',
              inset: -14,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 42, 133, 0.6), rgba(255, 215, 0, 0.4), transparent 70%)',
              filter: 'blur(16px)',
              animation: 'pulseGlow 2.5s infinite ease-in-out'
            }}
          />

          <div
            onClick={() => finalPhotos.length > 1 && setPhotoIdx((prev) => (prev + 1) % finalPhotos.length)}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid #f3d58d',
              boxShadow: '0 0 30px rgba(243, 213, 141, 0.45)',
              cursor: finalPhotos.length > 1 ? 'pointer' : 'default'
            }}
          >
            <img
              src={finalPhotos[photoIdx]}
              alt="Birthday Girl Final Portrait"
              style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', transition: 'opacity 0.5s ease' }}
            />
          </div>

          {finalPhotos.length > 1 && (
            <div
              style={{
                position: 'absolute',
                bottom: '-18px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px'
              }}
            >
              {finalPhotos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPhotoIdx(idx)}
                  aria-label={`View final portrait ${idx + 1}`}
                  style={{
                    width: photoIdx === idx ? '20px' : '8px',
                    height: '8px',
                    borderRadius: '9999px',
                    border: 'none',
                    background: photoIdx === idx ? '#f3d58d' : 'rgba(255,255,255,0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    padding: 0
                  }}
                />
              ))}
            </div>
          )}

          <div
            style={{
              position: 'absolute',
              top: -12,
              right: 14,
              fontSize: '32px',
              filter: 'drop-shadow(0 0 10px #ffd700)'
            }}
          >
            👑
          </div>
        </div>

        {/* EXACT REQUIRED HEADING FOR HER */}
        <motion.h1
          animate={{ scale: [1, 1.015, 1] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="font-romantic text-glow-pink"
          style={{
            fontSize: 'clamp(1.95rem, 4.5vw, 2.85rem)',
            color: '#f472b6',
            marginBottom: '8px',
            lineHeight: 1.2
          }}
        >
          ONCE AGAIN, HAPPY BIRTHDAY, {(userProfile.herName || userProfile.specialNickname || 'BEAUTIFUL').toUpperCase()}! ❤️
        </motion.h1>

        {userProfile.specialNickname && userProfile.herName && (
          <p style={{ color: '#c4b5fd', fontSize: '1rem', marginBottom: '22px' }}>
            For my dearest <span style={{ color: '#f3d58d', fontWeight: 600 }}>{userProfile.specialNickname}</span> ✨
          </p>
        )}

        {/* Card with Clean Readable Messages for Her */}
        <div
          className="glass-panel-glow"
          style={{
            padding: 'clamp(24px, 5vw, 38px)',
            borderRadius: '26px',
            border: '1px solid rgba(244, 114, 182, 0.35)',
            marginBottom: '36px',
            maxWidth: '720px'
          }}
        >
          <p
            style={{
              fontSize: '1.1rem',
              color: '#f8fafc',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}
          >
            May your life be filled with happiness, success, endless opportunities, and beautiful memories.
          </p>

          <p
            style={{
              fontSize: '1.08rem',
              color: '#f3d58d',
              fontWeight: 500,
              lineHeight: 1.8,
              marginBottom: '16px'
            }}
          >
            Thank you for being a special part of my journey.
          </p>

          <p
            className="font-serif"
            style={{
              fontSize: '1.12rem',
              color: '#e2e8f0',
              lineHeight: 1.8,
              marginBottom: '20px',
              fontStyle: 'italic'
            }}
          >
            "No matter how many pages this website has, the memories we share will always be my favourite story."
          </p>

          <p
            style={{
              fontSize: '1.08rem',
              color: '#c4b5fd',
              fontWeight: 600,
              letterSpacing: '0.3px',
              marginBottom: '24px'
            }}
          >
            Keep smiling, keep shining, and never stop being you!
          </p>

          {/* CELEBRATION CALLOUT */}
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(139, 92, 246, 0.22))',
              border: '1px solid rgba(243, 213, 141, 0.45)'
            }}
          >
            <h2
              className="font-romantic text-glow-gold"
              style={{ fontSize: 'clamp(1.65rem, 4vw, 2.2rem)', color: '#f3d58d', margin: 0 }}
            >
              HAPPY BIRTHDAY, {userProfile.herName || 'MY ANGEL'}! 🎂❤️
            </h2>
          </div>
        </div>

        {/* REPLAY OUR JOURNEY BUTTON */}
        <motion.button
          onClick={onReplay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="btn-magical"
          style={{ fontSize: '1.15rem', padding: '16px 48px' }}
        >
          <RotateCcw size={20} />
          <span>REPLAY OUR JOURNEY</span>
        </motion.button>
      </motion.div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEngine';

export default function CandleStage({ userProfile, onNext }) {
  const [isBlown, setIsBlown] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);

  const handleBlowCandle = () => {
    if (isBlown) return;

    soundEngine.playCandleBlow();
    setIsBlown(true);
    setShowSmoke(true);

    // Trigger realistic sparkles and confetti explosion
    setTimeout(() => {
      soundEngine.playSparkle();

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff2a85', '#ffd700', '#00d2ff', '#a855f7', '#ffffff']
      });

      // Side cannons
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff70a6', '#ffd700', '#ffffff']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#a855f7', '#00d2ff', '#ffffff']
      });
    }, 400);

    // Fade out smoke after a few seconds
    setTimeout(() => {
      setShowSmoke(false);
    }, 3500);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 20px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ maxWidth: '640px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {/* Title */}
        <h1
          className="font-romantic text-glow-pink"
          style={{ fontSize: 'clamp(1.85rem, 4.5vw, 2.65rem)', color: '#f472b6', marginBottom: '10px' }}
        >
          Make a Birthday Wish, {userProfile.herName || 'Birthday Girl'} 🕯️
        </h1>

        <p
          style={{
            fontSize: '1.05rem',
            color: '#e2e8f0',
            marginBottom: '36px',
            maxWidth: '500px',
            lineHeight: '1.65'
          }}
        >
          "Close your eyes, make a beautiful wish, and blow the candle... ❤️"
        </p>

        {/* Birthday Cake and Interactive Candle Container */}
        <div
          style={{
            position: 'relative',
            width: '280px',
            height: '240px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: '40px',
            cursor: !isBlown ? 'pointer' : 'default'
          }}
          onClick={handleBlowCandle}
        >
          {/* Flame & Wick */}
          <div
            className="candle-container"
            style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}
          >
            {/* Animated Flame */}
            {!isBlown ? (
              <motion.div
                title="Tap to blow out the candle!"
                whileHover={{ scale: 1.15 }}
                className="flame"
              />
            ) : null}

            {/* Smoke Particles after flame goes out */}
            {showSmoke && (
              <div style={{ position: 'relative', width: '1px', height: '1px' }}>
                <div className="smoke-particle" style={{ animationDelay: '0s' }} />
                <div className="smoke-particle" style={{ animationDelay: '0.4s' }} />
                <div className="smoke-particle" style={{ animationDelay: '0.8s' }} />
              </div>
            )}

            {/* Candle Wick */}
            <div
              style={{
                width: '4px',
                height: '14px',
                background: '#2b2b2b',
                borderRadius: '2px',
                marginTop: isBlown ? '38px' : '0px'
              }}
            />

            {/* Candle Body */}
            <div
              style={{
                width: '18px',
                height: '50px',
                background: 'linear-gradient(to right, #ffd166, #ff70a6, #ffd166)',
                borderRadius: '4px 4px 0 0',
                boxShadow: isBlown ? 'none' : '0 0 20px rgba(255, 209, 102, 0.7)'
              }}
            />
          </div>

          {/* Realistic Multi-Tier Birthday Cake with Glass/Neon Frosting */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* Top Tier */}
            <div
              style={{
                width: '130px',
                height: '45px',
                background: 'linear-gradient(135deg, #f472b6, #e879f9)',
                borderRadius: '16px 16px 6px 6px',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 4px 15px rgba(244, 114, 182, 0.4)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '0 10px'
              }}
            >
              <span style={{ fontSize: '14px' }}>🍓</span>
              <span style={{ fontSize: '14px' }}>💖</span>
              <span style={{ fontSize: '14px' }}>🍓</span>
            </div>

            {/* Middle Tier */}
            <div
              style={{
                width: '180px',
                height: '52px',
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                borderRadius: '18px 18px 8px 8px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 6px 20px rgba(139, 92, 246, 0.4)',
                marginTop: '-4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '0 14px'
              }}
            >
              <span style={{ fontSize: '16px' }}>✨</span>
              <span style={{ fontSize: '16px' }}>🌸</span>
              <span style={{ fontSize: '16px' }}>✨</span>
              <span style={{ fontSize: '16px' }}>🌸</span>
            </div>

            {/* Bottom Tier */}
            <div
              style={{
                width: '230px',
                height: '60px',
                background: 'linear-gradient(135deg, #1e1b4b, #4c1d95, #701a75)',
                borderRadius: '20px 20px 10px 10px',
                border: '2px solid rgba(255, 120, 200, 0.4)',
                boxShadow: '0 8px 25px rgba(236, 72, 153, 0.35)',
                marginTop: '-4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}
            >
              <span style={{ fontSize: '14px', color: '#ffb3c6', fontWeight: 600, letterSpacing: '2px' }}>
                HAPPY BIRTHDAY
              </span>
            </div>

            {/* Cake Stand / Plate */}
            <div
              style={{
                width: '270px',
                height: '14px',
                background: 'linear-gradient(to right, #ffd700, #fff, #ffd700)',
                borderRadius: '50px',
                marginTop: '-3px',
                boxShadow: '0 6px 20px rgba(255, 215, 0, 0.5)'
              }}
            />
          </div>
        </div>

        {/* Guidance or Success Message */}
        <AnimatePresence>
          {!isBlown ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{
                fontSize: '0.95rem',
                color: '#fbcfe8',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 42, 133, 0.15)',
                padding: '8px 20px',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 42, 133, 0.3)'
              }}
            >
              <Sparkles size={16} color="#ffd700" />
              <span>Tap or click the flame to blow it out</span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}
            >
              <div
                className="glass-panel"
                style={{
                  padding: '16px 28px',
                  borderRadius: '20px',
                  border: '1px solid #ffd700',
                  boxShadow: '0 0 30px rgba(255, 215, 0, 0.35)'
                }}
              >
                <p className="font-serif" style={{ fontSize: '1.25rem', color: '#f3d58d', marginBottom: '6px', fontWeight: 600 }}>
                  Your wish has been carried to the stars! 🌟
                </p>
                <p style={{ color: '#fed7aa', fontSize: '0.95rem' }}>
                  May this year bring you limitless joy, peace, and dreams fulfilled.
                </p>
              </div>

              {/* NEXT BUTTON */}
              <motion.button
                onClick={onNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="btn-magical"
                style={{ fontSize: '1.1rem', padding: '16px 42px' }}
              >
                <span>CONTINUE OUR JOURNEY</span>
                <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

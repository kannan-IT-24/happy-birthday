import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEngine';

export default function BalloonBurstStage({ config, onNext }) {
  const [balloons, setBalloons] = useState(
    config.balloons.map((b) => ({ ...b, isPopped: false, revealed: false }))
  );
  const [poppedCount, setPoppedCount] = useState(0);
  const [activeMessage, setActiveMessage] = useState(null);

  const handlePop = (id) => {
    soundEngine.playBalloonPop();

    // Trigger canvas confetti at the pop spot
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#ff2a85', '#00d2ff', '#ffd700', '#a855f7']
    });

    setBalloons((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          setActiveMessage(b.text);
          return { ...b, isPopped: true };
        }
        return b;
      })
    );

    setPoppedCount((c) => c + 1);
  };

  const handleResetBalloons = () => {
    soundEngine.playSparkle();
    setBalloons(config.balloons.map((b) => ({ ...b, isPopped: false, revealed: false })));
    setPoppedCount(0);
    setActiveMessage(null);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '50px 16px 40px',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ maxWidth: '900px', width: '100%', textAlign: 'center' }}
      >
        <span
          style={{
            fontSize: '0.85rem',
            color: '#ff2a85',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontWeight: 700,
            marginBottom: '8px',
            display: 'block'
          }}
        >
          INTERACTIVE SURPRISE
        </span>

        <h1
          className="font-romantic text-glow-pink"
          style={{ fontSize: 'clamp(1.9rem, 4.5vw, 2.65rem)', color: '#f472b6', marginBottom: '12px', lineHeight: 1.2 }}
        >
          Pop the Birthday Balloons! 🎈💥
        </h1>

        <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '580px', margin: '0 auto 24px' }}>
          Tap on each floating balloon to burst it and reveal secret birthday affirmations hidden inside!
        </p>

        {/* Revealed message banner */}
        <AnimatePresence mode="wait">
          {activeMessage && (
            <motion.div
              key={activeMessage}
              initial={{ scale: 0.8, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass-panel-glow"
              style={{
                maxWidth: '600px',
                margin: '0 auto 30px',
                padding: '16px 24px',
                borderRadius: '16px',
                border: '1px solid #ffd700'
              }}
            >
              <span style={{ fontSize: '0.82rem', color: '#ffd700', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                🎉 REVEALED WISH:
              </span>
              <p style={{ fontSize: '1.15rem', color: '#f8fafc', fontWeight: 500, lineHeight: 1.6 }}>
                "{activeMessage}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Balloons Playground */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '380px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '30px',
            margin: '20px 0 36px'
          }}
        >
          {balloons.map((b, idx) => {
            if (b.isPopped) {
              return (
                <div
                  key={b.id}
                  style={{
                    width: '100px',
                    height: '140px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.2, opacity: 0.7 }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '50%',
                      padding: '12px',
                      border: '1px dashed rgba(255, 42, 133, 0.4)'
                    }}
                  >
                    <span style={{ fontSize: '24px' }}>✨</span>
                  </motion.div>
                </div>
              );
            }

            return (
              <motion.div
                key={b.id}
                animate={{
                  y: [0, -18, 0],
                  rotate: [-3, 3, -3]
                }}
                transition={{
                  duration: 3 + (idx % 3),
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: idx * 0.4
                }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.85 }}
                onClick={() => handlePop(b.id)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative'
                }}
              >
                {/* 3D Glossy Balloon Sphere */}
                <div
                  style={{
                    width: '100px',
                    height: '125px',
                    borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                    background:
                      idx % 3 === 0
                        ? 'radial-gradient(circle at 35% 30%, #ff8bc3 0%, #ff2a85 60%, #99004d 100%)'
                        : idx % 3 === 1
                        ? 'radial-gradient(circle at 35% 30%, #b388ff 0%, #7c4dff 60%, #311b92 100%)'
                        : 'radial-gradient(circle at 35% 30%, #80d8ff 0%, #00b0ff 60%, #006064 100%)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.4), inset 0 0 15px rgba(255,255,255,0.4)',
                    position: 'relative'
                  }}
                >
                  {/* Highlight sheen */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '18px',
                      left: '20px',
                      width: '22px',
                      height: '35px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.65)',
                      transform: 'rotate(-30deg)',
                      filter: 'blur(1px)'
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: 'rgba(255,255,255,0.85)',
                      letterSpacing: '1px'
                    }}
                  >
                    TAP ME
                  </span>
                </div>

                {/* Balloon Knot & String */}
                <div
                  style={{
                    width: '10px',
                    height: '6px',
                    background: '#ff2a85',
                    borderRadius: '2px',
                    marginTop: '-2px'
                  }}
                />
                <div
                  style={{
                    width: '1.5px',
                    height: '50px',
                    background: 'rgba(255, 255, 255, 0.4)'
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Counter & Reset Option */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
          <span style={{ fontSize: '0.95rem', color: '#ff70a6', fontWeight: 600 }}>
            Popped: {poppedCount} / {balloons.length} balloons
          </span>
          {poppedCount > 0 && (
            <button onClick={handleResetBalloons} className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.8rem' }}>
              Reset Balloons
            </button>
          )}
        </div>

        {/* NEXT Button */}
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="btn-magical"
          style={{ fontSize: '1.1rem', padding: '16px 44px' }}
        >
          <span>OPEN MYSTERY GIFTS</span>
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>
    </div>
  );
}

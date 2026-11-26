import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlobalEffects() {
  const [clickEffects, setClickEffects] = useState([]);
  const [ambientButterflies, setAmbientButterflies] = useState([]);
  const [ambientHearts, setAmbientHearts] = useState([]);

  // Setup ambient background butterflies
  useEffect(() => {
    const butterflies = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      scale: 0.7 + Math.random() * 0.5,
      delay: i * 2,
      duration: 14 + Math.random() * 8
    }));
    setAmbientButterflies(butterflies);

    // Setup ambient floating hearts
    const hearts = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 95}%`,
      size: 14 + Math.random() * 20,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 6,
      opacity: 0.15 + Math.random() * 0.3
    }));
    setAmbientHearts(hearts);
  }, []);

  // Global click & touch listener for butterflies & heart particles
  useEffect(() => {
    const handleSpawn = (clientX, clientY) => {
      const id = Date.now() + Math.random();
      // Alternatingly or jointly spawn heart and butterfly
      const isButterfly = Math.random() > 0.45;

      const newEffect = {
        id,
        x: clientX,
        y: clientY,
        type: isButterfly ? 'butterfly' : 'heart',
        rotation: (Math.random() - 0.5) * 60,
        scale: 0.8 + Math.random() * 0.6
      };

      setClickEffects((prev) => [...prev.slice(-15), newEffect]);

      setTimeout(() => {
        setClickEffects((prev) => prev.filter((item) => item.id !== id));
      }, 2000);
    };

    const handleClick = (e) => {
      // Don't spawn if clicking inside an input or button to avoid clutter
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      handleSpawn(e.clientX, e.clientY);
    };

    const handleTouch = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.touches && e.touches[0]) {
        handleSpawn(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouch, { passive: true });

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 35, overflow: 'hidden' }}>
      {/* Ambient Cosmic Twinkling Stars */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.3, 0.8]
            }}
            transition={{
              duration: 2 + (i % 4),
              repeat: Infinity,
              delay: (i * 0.3) % 3
            }}
            style={{
              position: 'absolute',
              top: `${(i * 19) % 100}%`,
              left: `${(i * 31) % 100}%`,
              width: i % 3 === 0 ? '4px' : '2px',
              height: i % 3 === 0 ? '4px' : '2px',
              borderRadius: '50%',
              backgroundColor: i % 2 === 0 ? '#ff8ec7' : '#90e0ef',
              boxShadow: '0 0 8px #ffffff'
            }}
          />
        ))}
      </div>

      {/* Ambient Floating Hearts */}
      {ambientHearts.map((h) => (
        <motion.div
          key={`ambient-heart-${h.id}`}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, h.opacity, h.opacity, 0],
            x: [0, 20, -20, 0]
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            left: h.left,
            fontSize: `${h.size}px`,
            filter: 'drop-shadow(0 0 8px rgba(255, 42, 133, 0.6))'
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Ambient Fluttering Butterflies */}
      {ambientButterflies.map((bf) => (
        <motion.div
          key={`bf-${bf.id}`}
          animate={{
            x: [bf.x, bf.x + 120, bf.x - 80, bf.x + 40, bf.x],
            y: [bf.y, bf.y - 140, bf.y - 60, bf.y - 200, bf.y],
            rotate: [0, 25, -20, 15, 0]
          }}
          transition={{
            duration: bf.duration,
            repeat: Infinity,
            delay: bf.delay,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            transform: `scale(${bf.scale})`,
            zIndex: 38
          }}
        >
          <div className="butterfly-wrapper">
            <div className="butterfly-wing left" />
            <div className="butterfly-body" />
            <div className="butterfly-wing right" />
          </div>
        </motion.div>
      ))}

      {/* User Click/Touch Generated Effects */}
      <AnimatePresence>
        {clickEffects.map((item) => (
          <motion.div
            key={item.id}
            initial={{
              opacity: 1,
              scale: 0.2,
              x: item.x - 20,
              y: item.y - 20
            }}
            animate={{
              opacity: 0,
              scale: [0.4, 1.4, 1.8],
              y: item.y - 100 + (Math.random() * 40 - 20),
              x: item.x + (Math.random() * 60 - 30),
              rotate: item.rotation
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            style={{ position: 'absolute', zIndex: 50 }}
          >
            {item.type === 'butterfly' ? (
              <div style={{ position: 'relative', width: 40, height: 40 }}>
                <div className="butterfly-wrapper" style={{ transform: 'scale(1.2)' }}>
                  <div className="butterfly-wing left" style={{ background: 'radial-gradient(circle, #ff2a85, #00d2ff)' }} />
                  <div className="butterfly-body" />
                  <div className="butterfly-wing right" style={{ background: 'radial-gradient(circle, #ff2a85, #00d2ff)' }} />
                </div>
              </div>
            ) : (
              <div
                style={{
                  fontSize: '28px',
                  filter: 'drop-shadow(0 0 12px rgba(255, 42, 133, 0.9))'
                }}
              >
                💖
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

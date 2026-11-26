import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, Sparkles, X, CheckCircle, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEngine';

export default function ShareMemoryStage({ userProfile, onNext, onSaveMemory }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memoryDesc, setMemoryDesc] = useState('');
  const [memoryDate, setMemoryDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleHeartClick = () => {
    soundEngine.playSparkle();
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!memoryDesc.trim()) return;

    soundEngine.playSparkle();

    // Trigger sweet confetti
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#ff2a85', '#ffd700', '#00d2ff', '#ffffff']
    });

    if (onSaveMemory) {
      onSaveMemory({
        id: Date.now(),
        title: 'Shared by ' + (userProfile.herName || 'Birthday Girl'),
        date: memoryDate || 'A Special Day',
        description: memoryDesc.trim()
      });
    }

    setSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2800);
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
        padding: '50px 16px 40px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ maxWidth: '780px', width: '100%', textAlign: 'center' }}
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
          INTERACTIVE CONNECTION
        </span>

        <h1
          className="font-romantic text-glow-pink"
          style={{ fontSize: 'clamp(1.9rem, 4.5vw, 2.65rem)', color: '#f472b6', marginBottom: '14px', lineHeight: 1.2 }}
        >
          Your Turn to Tell the Story 💖
        </h1>

        <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '580px', margin: '0 auto 36px' }}>
          What is your favorite memory of us? Tap the giant pulsating heart below to share it!
        </p>

        {/* Large Glowing Interactive Heart in the Centre */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleHeartClick}
          style={{
            position: 'relative',
            width: '280px',
            height: '280px',
            margin: '0 auto 40px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Heart SVG Background with Glowing Aura */}
          <svg
            viewBox="0 0 100 100"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              filter: 'drop-shadow(0 0 30px rgba(255, 42, 133, 0.8))'
            }}
          >
            <path
              d="M 50,25 C 50,25 35,5 20,5 C 8,5 0,15 0,28 C 0,48 25,68 50,90 C 75,68 100,48 100,28 C 100,15 92,5 80,5 C 65,5 50,25 50,25 Z"
              fill="url(#giantHeartGrad)"
            />
            <defs>
              <linearGradient id="giantHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff2a85" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#8a2be2" />
              </linearGradient>
            </defs>
          </svg>

          {/* Heart Text */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              padding: '0 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              transform: 'translateY(-6px)'
            }}
          >
            <Sparkles size={24} color="#ffd700" style={{ marginBottom: 6 }} />
            <h3
              className="font-romantic text-glow-pink"
              style={{ fontSize: '1.25rem', lineHeight: 1.35, color: '#fff' }}
            >
              Share Your Best Memorable Day With Me ❤️
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#fed7aa', marginTop: '6px', fontWeight: 600 }}>
              (Tap Here)
            </span>
          </div>
        </motion.div>

        {/* Form Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(5, 3, 15, 0.92)',
                backdropFilter: 'blur(20px)',
                zIndex: 110,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}
            >
              <motion.div
                initial={{ scale: 0.85, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.85, y: 30 }}
                className="glass-panel-glow"
                style={{
                  maxWidth: '500px',
                  width: '100%',
                  padding: '36px 28px',
                  position: 'relative',
                  textAlign: 'left'
                }}
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    position: 'absolute',
                    top: '18px',
                    right: '18px',
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  <X size={22} />
                </button>

                {!submitted ? (
                  <div>
                    <h2
                      className="font-romantic text-glow-pink"
                      style={{ fontSize: 'clamp(1.5rem, 3.5vw, 1.95rem)', color: '#f472b6', marginBottom: '8px' }}
                    >
                      A Memory to Cherish Forever
                    </h2>
                    <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '22px' }}>
                      Tell me about a special moment you treasure most.
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div>
                        <label style={{ fontSize: '0.85rem', color: '#f472b6', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                          When did it happen? (Date or moment):
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Summer vacation, that midnight phone call, or a specific date"
                          className="glass-input"
                          value={memoryDate}
                          onChange={(e) => setMemoryDate(e.target.value)}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.85rem', color: '#f472b6', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                          Describe Your Favourite Memory:
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="What happened and what made it so special to you?"
                          className="glass-input"
                          value={memoryDesc}
                          onChange={(e) => setMemoryDesc(e.target.value)}
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn-magical"
                        style={{ marginTop: '10px', fontSize: '1.05rem', width: '100%' }}
                      >
                        <Send size={18} />
                        <span>SEND MEMORY WITH LOVE</span>
                      </button>
                    </form>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', padding: '20px 0' }}
                  >
                    <div style={{ fontSize: '50px', marginBottom: '16px' }} className="pulse-glow">
                      💖✨💖
                    </div>
                    <h3 className="font-romantic text-glow-pink" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2rem)', color: '#f472b6', marginBottom: '10px' }}>
                      Thank You, {userProfile.herName || userProfile.specialNickname || 'My Dearest'}!
                    </h3>
                    <p style={{ color: '#e2e8f0', fontSize: '1.1rem', lineHeight: 1.6 }}>
                      Your memory has been lovingly saved into the heart of this universe. It means the world to me! ❤️
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NEXT Button */}
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="btn-magical"
          style={{ fontSize: '1.1rem', padding: '16px 44px' }}
        >
          <span>VIEW FINAL BIRTHDAY WISHES</span>
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>
    </div>
  );
}

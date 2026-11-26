import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, Sparkles, Edit3, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEngine';
import { HEART_LETTER_DATA } from '../config/letterData';
import { INITIAL_CONFIG } from '../config/birthdayData';

export default function LetterStage({ onNext }) {
  const letterPhotos = INITIAL_CONFIG.letterPhotos || [];
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [paragraphs, setParagraphs] = useState(HEART_LETTER_DATA.paragraphs);

  const handleOpenLetter = () => {
    if (isOpen || isOpening) return;
    soundEngine.playSparkle();
    setIsOpening(true);

    setTimeout(() => {
      setIsOpen(true);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.55 },
        colors: ['#f472b6', '#f3d58d', '#c4b5fd', '#ffffff']
      });
    }, 550);
  };

  const handleParagraphChange = (index, value) => {
    const updated = [...paragraphs];
    updated[index] = value;
    setParagraphs(updated);
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
        padding: '78px 16px 64px',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
        background:
          'radial-gradient(ellipse at top, rgba(49, 27, 94, 0.55) 0%, rgba(14, 10, 36, 0.92) 50%, rgba(6, 5, 20, 0.99) 100%)'
      }}
    >
      {/* Subtle Midnight Nebula Glows */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '-8%',
          width: '380px',
          height: '380px',
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.14) 0%, rgba(139, 92, 246, 0.08) 55%, transparent 72%)',
          filter: 'blur(70px)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '8%',
          right: '-8%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(196, 181, 253, 0.14) 0%, rgba(243, 213, 141, 0.06) 55%, transparent 72%)',
          filter: 'blur(75px)',
          pointerEvents: 'none'
        }}
      />

      {/* Delicate Sparkling Stars */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={`letter-star-${i}`}
            animate={{ opacity: [0.15, 0.75, 0.15], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: (i * 0.3) % 3 }}
            style={{
              position: 'absolute',
              top: `${(i * 19 + 8) % 92}%`,
              left: `${(i * 27 + 6) % 94}%`,
              width: i % 3 === 0 ? '3.5px' : '2px',
              height: i % 3 === 0 ? '3.5px' : '2px',
              borderRadius: '50%',
              backgroundColor: i % 2 === 0 ? '#f3d58d' : '#f472b6',
              boxShadow: '0 0 8px rgba(244, 114, 182, 0.6)'
            }}
          />
        ))}
      </div>

      {/* Delicate Floating Butterflies */}
      {[
        { top: '14%', left: '7%', dur: 11, delay: 0 },
        { top: '24%', right: '8%', dur: 13, delay: 1.5 }
      ].map((pos, idx) => (
        <motion.div
          key={`letter-bf-${idx}`}
          animate={{
            x: [0, 18, -14, 10, 0],
            y: [0, -22, -8, -26, 0],
            rotate: [0, 8, -8, 4, 0]
          }}
          transition={{ duration: pos.dur, repeat: Infinity, delay: pos.delay, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: pos.top,
            left: pos.left,
            right: pos.right,
            pointerEvents: 'none',
            zIndex: 15,
            opacity: 0.75
          }}
        >
          <div className="butterfly-wrapper" style={{ transform: 'scale(0.8)' }}>
            <div className="butterfly-wing left" />
            <div className="butterfly-body" />
            <div className="butterfly-wing right" />
          </div>
        </motion.div>
      ))}

      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }}
        style={{
          maxWidth: '760px',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          zIndex: 20
        }}
      >
        <span
          style={{
            fontSize: '0.78rem',
            color: '#c4b5fd',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '8px',
            display: 'block'
          }}
        >
          MORE BIRTHDAY WISHES
        </span>

        <h1
          className="font-romantic text-glow-pink"
          style={{
            fontSize: 'clamp(1.9rem, 4.5vw, 2.75rem)',
            color: '#f472b6',
            marginBottom: '12px',
            lineHeight: 1.2
          }}
        >
          {HEART_LETTER_DATA.sectionTitle}
        </h1>

        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed-envelope"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '16px auto 36px'
              }}
            >
              <p
                className="font-serif"
                style={{
                  color: '#f3d58d',
                  fontSize: 'clamp(1.05rem, 2.5vw, 1.22rem)',
                  fontStyle: 'italic',
                  marginBottom: '26px'
                }}
              >
                {HEART_LETTER_DATA.envelopeHeading}
              </p>

              {/* Animated Envelope */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.02 }}
                onClick={handleOpenLetter}
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '410px',
                  height: '240px',
                  borderRadius: '20px',
                  background: 'linear-gradient(145deg, #1b123d 0%, #2b1854 55%, #3d1b59 100%)',
                  border: '1.5px solid rgba(244, 114, 182, 0.42)',
                  boxShadow:
                    '0 20px 50px rgba(4, 3, 15, 0.7), 0 0 28px rgba(244, 114, 182, 0.2), inset 0 0 24px rgba(196, 181, 253, 0.08)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  marginBottom: '28px',
                  perspective: '800px'
                }}
              >
                {/* Animated Top Flap */}
                <motion.div
                  animate={isOpening ? { rotateX: 165, opacity: 0.4 } : { rotateX: 0, opacity: 1 }}
                  transition={{ duration: 0.55, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '124px',
                    transformOrigin: 'top center',
                    background: 'linear-gradient(180deg, rgba(244, 114, 182, 0.2), rgba(139, 92, 246, 0.14))',
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    borderBottom: '1px solid rgba(244, 114, 182, 0.35)',
                    zIndex: 3
                  }}
                />

                {/* Subtle Envelope Fold Lines */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top right, rgba(255, 255, 255, 0.03) 49%, transparent 50%), linear-gradient(to top left, rgba(255, 255, 255, 0.03) 49%, transparent 50%)',
                    pointerEvents: 'none'
                  }}
                />

                {/* Champagne-Rose Wax Seal */}
                <motion.div
                  animate={isOpening ? { scale: 1.3, opacity: 0 } : { scale: [1, 1.08, 1] }}
                  transition={{ duration: isOpening ? 0.35 : 2.2, repeat: isOpening ? 0 : Infinity }}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, #f9a8d4, #ec4899 58%, #9d174d 100%)',
                    boxShadow: '0 6px 20px rgba(236, 72, 153, 0.55), inset 0 0 10px rgba(255, 255, 255, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 5,
                    marginTop: '10px'
                  }}
                >
                  <Heart size={26} fill="#fff" color="#fff" />
                </motion.div>

                <div
                  style={{
                    marginTop: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    zIndex: 5
                  }}
                >
                  <Sparkles size={13} color="#f3d58d" />
                  <span style={{ fontSize: '0.78rem', color: '#e2e8f0', fontWeight: 500, letterSpacing: '1.5px' }}>
                    SEALED WITH LOVE
                  </span>
                  <Sparkles size={13} color="#f3d58d" />
                </div>
              </motion.div>

              {/* Open My Letter Button */}
              <motion.button
                onClick={handleOpenLetter}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="btn-magical"
                style={{ fontSize: '1.02rem', padding: '14px 34px' }}
              >
                <span>{HEART_LETTER_DATA.openButtonText}</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="opened-letter"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              style={{ marginTop: '12px', marginBottom: '36px' }}
            >
              {/* Letter Keepsake Photos (from public/assets/photos/letter/) */}
              {letterPhotos.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  style={{
                    maxWidth: '720px',
                    margin: '0 auto 22px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px'
                  }}
                >
                  {letterPhotos.map((src, idx) => (
                    <div
                      key={idx}
                      className="glass-panel"
                      style={{
                        borderRadius: '18px',
                        overflow: 'hidden',
                        aspectRatio: '4 / 5',
                        maxHeight: '260px',
                        width: '100%',
                        border: '1px solid rgba(244, 114, 182, 0.3)',
                        boxShadow: '0 10px 28px rgba(5, 4, 18, 0.6)'
                      }}
                    >
                      <img
                        src={src}
                        alt={`Letter memory ${idx + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          objectPosition: 'center',
                          background: '#07061a'
                        }}
                      />
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Premium Personal Love Letter Card */}
              <div
                className="glass-panel-glow"
                style={{
                  maxWidth: '720px',
                  margin: '0 auto',
                  padding: 'clamp(24px, 5vw, 48px)',
                  borderRadius: '24px',
                  border: '1px solid rgba(243, 213, 141, 0.28)',
                  boxShadow: '0 24px 60px rgba(5, 4, 18, 0.75), 0 0 32px rgba(244, 114, 182, 0.14)',
                  textAlign: 'left',
                  position: 'relative',
                  background: 'linear-gradient(165deg, rgba(22, 16, 48, 0.95) 0%, rgba(13, 10, 32, 0.97) 100%)'
                }}
              >
                {/* Top Salutation & Edit Button */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '12px',
                    paddingBottom: '20px',
                    marginBottom: '24px',
                    borderBottom: '1px solid rgba(196, 181, 253, 0.16)'
                  }}
                >
                  <motion.h2
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="font-romantic"
                    style={{
                      fontSize: 'clamp(1.3rem, 3vw, 1.65rem)',
                      color: '#f3d58d',
                      lineHeight: 1.45,
                      flex: '1 1 260px'
                    }}
                  >
                    {HEART_LETTER_DATA.salutation}
                  </motion.h2>

                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(196, 181, 253, 0.25)',
                      borderRadius: '9999px',
                      padding: '6px 14px',
                      color: '#c4b5fd',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 500
                    }}
                  >
                    {isEditing ? <Check size={14} /> : <Edit3 size={14} />}
                    {isEditing ? 'Save Edits' : 'Edit Letter'}
                  </button>
                </div>

                {/* Readable Letter Paragraphs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {paragraphs.map((paragraph, idx) => {
                    if (isEditing) {
                      return (
                        <textarea
                          key={idx}
                          value={paragraph}
                          onChange={(e) => handleParagraphChange(idx, e.target.value)}
                          rows={paragraph.length > 150 ? 4 : 2}
                          className="glass-input"
                          style={{ width: '100%', resize: 'vertical', fontSize: '0.98rem', lineHeight: 1.7 }}
                        />
                      );
                    }

                    if (paragraph.trim() === '---') {
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scaleX: 0.6 }}
                          whileInView={{ opacity: 1, scaleX: 1 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.5 }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            margin: '12px 0'
                          }}
                        >
                          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(244, 114, 182, 0.4))' }} />
                          <Heart size={13} color="#f472b6" fill="#f472b6" />
                          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(244, 114, 182, 0.4))' }} />
                        </motion.div>
                      );
                    }

                    const isSubHeading = paragraph === 'A Little Something From My Heart... 🥹❤️';
                    const isPromiseHighlight = paragraph === 'I WILL ALWAYS BE THERE FOR YOU. ❤️';
                    const isTamilLine = paragraph.includes('Unakku naa iruken');

                    if (isSubHeading) {
                      return (
                        <motion.h3
                          key={idx}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.55 }}
                          className="font-romantic"
                          style={{
                            fontSize: 'clamp(1.25rem, 2.8vw, 1.55rem)',
                            color: '#f472b6',
                            textAlign: 'center',
                            margin: '6px 0'
                          }}
                        >
                          {paragraph}
                        </motion.h3>
                      );
                    }

                    if (isPromiseHighlight || isTamilLine) {
                      return (
                        <motion.p
                          key={idx}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.15 }}
                          transition={{ duration: 0.6 }}
                          style={{
                            fontSize: isPromiseHighlight ? '1.08rem' : '1.03rem',
                            fontWeight: isPromiseHighlight ? 600 : 500,
                            lineHeight: 1.8,
                            color: isPromiseHighlight ? '#f3d58d' : '#f8fafc',
                            textAlign: isPromiseHighlight ? 'center' : 'left',
                            padding: '14px 18px',
                            borderRadius: '14px',
                            background: isPromiseHighlight
                              ? 'rgba(243, 213, 141, 0.08)'
                              : 'rgba(244, 114, 182, 0.07)',
                            borderLeft: isPromiseHighlight ? 'none' : '3px solid #f472b6',
                            border: isPromiseHighlight ? '1px solid rgba(243, 213, 141, 0.28)' : undefined,
                            letterSpacing: isPromiseHighlight ? '0.03em' : '0.01em'
                          }}
                        >
                          {paragraph}
                        </motion.p>
                      );
                    }

                    return (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.55, delay: Math.min(idx * 0.04, 0.2) }}
                        style={{
                          fontSize: 'clamp(0.98rem, 2.2vw, 1.06rem)',
                          lineHeight: 1.85,
                          color: '#e2e8f0',
                          fontWeight: 400
                        }}
                      >
                        {paragraph}
                      </motion.p>
                    );
                  })}
                </div>

                {/* Closing & Signature */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    marginTop: '28px',
                    paddingTop: '18px',
                    borderTop: '1px solid rgba(196, 181, 253, 0.16)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '4px'
                  }}
                >
                  <p style={{ color: '#c4b5fd', fontSize: '0.96rem', fontStyle: 'italic' }}>
                    {HEART_LETTER_DATA.closing}
                  </p>
                  <p className="font-signature" style={{ fontSize: '1.5rem', color: '#f472b6' }}>
                    {HEART_LETTER_DATA.author}
                  </p>
                </motion.div>

                {/* Subtle Animated Final Reveal: "♾️ FOREVER & ALWAYS. ❤️" */}
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{
                    marginTop: '28px',
                    textAlign: 'center',
                    padding: '18px 20px',
                    borderRadius: '18px',
                    background:
                      'linear-gradient(135deg, rgba(244, 114, 182, 0.14) 0%, rgba(139, 92, 246, 0.18) 50%, rgba(243, 213, 141, 0.12) 100%)',
                    border: '1px solid rgba(243, 213, 141, 0.38)',
                    boxShadow: '0 8px 28px rgba(244, 114, 182, 0.18)'
                  }}
                >
                  <motion.p
                    animate={{ opacity: [0.88, 1, 0.88] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="font-romantic text-glow-gold"
                    style={{
                      fontSize: 'clamp(1.3rem, 3.2vw, 1.75rem)',
                      color: '#f3d58d',
                      margin: 0,
                      letterSpacing: '0.06em'
                    }}
                  >
                    {HEART_LETTER_DATA.eternalSignOff}
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NEXT Button */}
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="btn-magical"
          style={{ fontSize: '1.05rem', padding: '14px 40px' }}
        >
          <span>NEXT</span>
          <ArrowRight size={19} />
        </motion.button>
      </motion.div>
    </div>
  );
}

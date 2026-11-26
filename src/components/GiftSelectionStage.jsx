import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Gift, Heart, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEngine';

export default function GiftSelectionStage({ config, onNext }) {
  const [selectedGiftId, setSelectedGiftId] = useState(null);
  const [revealedGift, setRevealedGift] = useState(null);

  const handleSelectBox = (gift) => {
    if (selectedGiftId !== null) return; // Visitor can choose only one gift

    setSelectedGiftId(gift.id);
    soundEngine.playSparkle();

    // Trigger celebratory confetti and floating hearts
    setTimeout(() => {
      setRevealedGift(gift);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#ff2a85', '#00d2ff', '#ffffff']
      });
    }, 800);
  };

  const handleResetChoice = () => {
    setSelectedGiftId(null);
    setRevealedGift(null);
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
        zIndex: 10
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ maxWidth: '960px', width: '100%', textAlign: 'center' }}
      >
        <span
          style={{
            fontSize: '0.85rem',
            color: '#ffd700',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontWeight: 700,
            marginBottom: '8px',
            display: 'block'
          }}
        >
          A SPECIAL SURPRISE TOKEN
        </span>

        <h1
          className="font-romantic text-glow-pink"
          style={{ fontSize: 'clamp(1.9rem, 4.5vw, 2.65rem)', color: '#f472b6', marginBottom: '12px', lineHeight: 1.2 }}
        >
          Mystery Gift Selection 🎁✨
        </h1>

        <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 36px' }}>
          Choose one of the mystery wrapped gift boxes below to unveil a secret keepsake selected just for you!
        </p>

        {/* 3 Wrapped Mystery Gift Boxes */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '28px',
            marginBottom: '36px'
          }}
        >
          {config.gifts.map((gift) => {
            const isSelected = selectedGiftId === gift.id;
            const isOtherDisabled = selectedGiftId !== null && !isSelected;

            return (
              <motion.div
                key={gift.id}
                whileHover={!selectedGiftId ? { y: -10, scale: 1.03 } : {}}
                whileTap={!selectedGiftId ? { scale: 0.96 } : {}}
                onClick={() => handleSelectBox(gift)}
                className="glass-panel"
                style={{
                  borderRadius: '24px',
                  padding: '36px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: !selectedGiftId ? 'pointer' : 'default',
                  border: isSelected
                    ? '2px solid #ffd700'
                    : '1px solid rgba(255, 42, 133, 0.3)',
                  boxShadow: isSelected
                    ? '0 0 35px rgba(255, 215, 0, 0.6)'
                    : 'none',
                  opacity: isOtherDisabled ? 0.4 : 1,
                  transition: 'opacity 0.4s, border 0.4s',
                  position: 'relative'
                }}
              >
                {/* 3D Wrapped Gift Box Visualization */}
                <div
                  style={{
                    position: 'relative',
                    width: '130px',
                    height: '130px',
                    marginBottom: '20px'
                  }}
                >
                  {/* Box Lid Animation */}
                  <motion.div
                    animate={
                      isSelected
                        ? { y: -35, rotateX: -40, opacity: 0.85 }
                        : { y: 0, rotateX: 0 }
                    }
                    transition={{ duration: 0.6 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '140px',
                      height: '35px',
                      background: gift.boxColor,
                      borderRadius: '10px 10px 4px 4px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                      zIndex: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {/* Ribbon Bow on Lid */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '-14px',
                        fontSize: '24px',
                        filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.8))'
                      }}
                    >
                      🎀
                    </div>
                  </motion.div>

                  {/* Main Box Cube */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '124px',
                      height: '105px',
                      background: gift.boxColor,
                      borderRadius: '0 0 16px 16px',
                      border: '2px solid rgba(255, 255, 255, 0.25)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Vertical Ribbon */}
                    <div
                      style={{
                        position: 'absolute',
                        width: '24px',
                        height: '100%',
                        background: gift.ribbonColor,
                        boxShadow: '0 0 10px rgba(0,0,0,0.2)'
                      }}
                    />
                    {/* Horizontal Ribbon */}
                    <div
                      style={{
                        position: 'absolute',
                        height: '24px',
                        width: '100%',
                        background: gift.ribbonColor,
                        boxShadow: '0 0 10px rgba(0,0,0,0.2)'
                      }}
                    />
                  </div>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 600, marginBottom: '6px' }}>
                  Mystery Box #{gift.id}
                </h3>
                <span style={{ fontSize: '0.85rem', color: '#ff70a6', fontWeight: 600 }}>
                  {isSelected ? 'Opened!' : 'Tap to Open'}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Revealed Gift Card & Required Simulation Message */}
        <AnimatePresence>
          {revealedGift && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="glass-panel-glow"
              style={{
                maxWidth: '620px',
                margin: '0 auto 36px',
                padding: '30px 24px',
                borderRadius: '24px',
                border: '2px solid #ffd700',
                textAlign: 'center'
              }}
            >
              {/* EXACT REQUIRED MESSAGE FROM SPECIFICATION */}
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 42, 133, 0.3), rgba(255, 215, 0, 0.3))',
                  border: '1px solid #ffd700',
                  borderRadius: '16px',
                  padding: '14px 20px',
                  marginBottom: '20px',
                  boxShadow: '0 0 25px rgba(255, 215, 0, 0.4)'
                }}
              >
                <h2
                  className="font-romantic text-glow-gold"
                  style={{ fontSize: 'clamp(1.25rem, 3vw, 1.65rem)', color: '#f3d58d', margin: 0 }}
                >
                  🎉 ORDER PLACED SUCCESSFULLY FOR HER! ❤️
                </h2>
                <p style={{ fontSize: '0.78rem', color: '#fed7aa', marginTop: '4px', opacity: 0.85 }}>
                  (Playful simulated birthday surprise — pure love, no real charges!)
                </p>
              </div>

              {/* Revealed Gift Image and Details */}
              <div
                style={{
                  width: '100%',
                  height: '260px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                  background: 'rgba(10, 8, 28, 0.75)',
                  border: '1px solid rgba(244, 114, 182, 0.22)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.45)'
                }}
              >
                <img
                  src={revealedGift.image}
                  alt={revealedGift.title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }}
                />
              </div>

              <h3 style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 700, marginBottom: '8px' }}>
                {revealedGift.title}
              </h3>

              <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6, marginBottom: '18px' }}>
                {revealedGift.description}
              </p>

              <button
                onClick={handleResetChoice}
                className="btn-secondary"
                style={{ fontSize: '0.85rem', padding: '6px 16px' }}
              >
                Choose Another Box
              </button>
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
          <span>READ BIRTHDAY LETTER</span>
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>
    </div>
  );
}

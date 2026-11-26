import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Sparkles, Upload, Edit3, Check } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function BirthdayWishesStage({ config, userProfile, onNext }) {
  const portraits = config.wishes.portraits || [config.wishes.photoUrl];
  const [portraitIdx, setPortraitIdx] = useState(0);
  const [customPhoto, setCustomPhoto] = useState(null);
  const [customMsg, setCustomMsg] = useState(config.wishes.message);
  const [isEditing, setIsEditing] = useState(false);

  const heroPhoto = customPhoto || portraits[portraitIdx];

  // Allow uploading a custom photo locally
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomPhoto(url);
      soundEngine.playSparkle();
    }
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
        padding: '36px 16px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: '780px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <span
          style={{
            fontSize: '0.85rem',
            color: '#ff70a6',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontWeight: 700,
            marginBottom: '8px'
          }}
        >
          CELEBRATING A WONDERFUL SOUL
        </span>

        {/* Animated Birthday Typography */}
        <motion.h1
          animate={{ scale: [1, 1.015, 1] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="font-romantic text-glow-pink"
          style={{
            fontSize: 'clamp(1.9rem, 4.5vw, 2.8rem)',
            color: '#f472b6',
            marginBottom: '20px',
            lineHeight: 1.2
          }}
        >
          Happy Birthday, {userProfile.herName || userProfile.specialNickname || 'My Special Girl'}! 🎂🦋
        </motion.h1>

        {/* Central Photograph in a Glowing Heart-Shaped Frame */}
        <div
          style={{
            position: 'relative',
            width: '280px',
            height: '280px',
            margin: '20px auto 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Butterflies Flying in natural orbits around the photograph */}
          {[
            { id: 1, angle: 0, duration: 6, delay: 0 },
            { id: 2, angle: 90, duration: 8, delay: 1 },
            { id: 3, angle: 180, duration: 7, delay: 2 },
            { id: 4, angle: 270, duration: 9, delay: 0.5 }
          ].map((bf) => (
            <motion.div
              key={bf.id}
              animate={{
                rotate: [bf.angle, bf.angle + 360]
              }}
              transition={{
                duration: bf.duration,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                position: 'absolute',
                width: '320px',
                height: '320px',
                pointerEvents: 'none'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}
              >
                <div className="butterfly-wrapper" style={{ transform: 'scale(1.1)' }}>
                  <div className="butterfly-wing left" />
                  <div className="butterfly-body" />
                  <div className="butterfly-wing right" />
                </div>
              </div>
            </motion.div>
          ))}

          {/* Glowing Aura Outer Ring */}
          <div
            style={{
              position: 'absolute',
              inset: -15,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 42, 133, 0.4), rgba(138, 43, 226, 0.2), transparent 70%)',
              filter: 'blur(12px)',
              animation: 'pulseGlow 3s infinite ease-in-out'
            }}
          />

          {/* Heart Frame Container */}
          <div
            style={{
              position: 'relative',
              width: '240px',
              height: '240px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid #ff70a6',
              boxShadow: '0 0 35px rgba(255, 42, 133, 0.8), inset 0 0 20px rgba(255, 215, 0, 0.4)',
              background: '#1a0b2e'
            }}
          >
            <img
              src={heroPhoto}
              alt="Birthday Girl Portrait"
              onClick={() => {
                if (!customPhoto && portraits.length > 1) {
                  setPortraitIdx((prev) => (prev + 1) % portraits.length);
                }
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                cursor: portraits.length > 1 ? 'pointer' : 'default'
              }}
              onError={(e) => {
                e.target.src = config.wishes.photoFallback;
              }}
            />
          </div>

          {/* Portrait Switcher Dots for multiple birthday/ photos */}
          {!customPhoto && portraits.length > 1 && (
            <div
              style={{
                position: 'absolute',
                bottom: '-22px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px',
                zIndex: 15
              }}
            >
              {portraits.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPortraitIdx(idx)}
                  aria-label={`View birthday portrait ${idx + 1}`}
                  style={{
                    width: portraitIdx === idx ? '20px' : '8px',
                    height: '8px',
                    borderRadius: '9999px',
                    border: 'none',
                    background: portraitIdx === idx ? '#f472b6' : 'rgba(255,255,255,0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    padding: 0
                  }}
                />
              ))}
            </div>
          )}

          {/* Heart Badge at Bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: '5px',
              background: 'linear-gradient(135deg, #ff2a85, #8a2be2)',
              padding: '6px 14px',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 15px rgba(255, 42, 133, 0.7)',
              zIndex: 10
            }}
          >
            <Heart size={14} fill="#fff" color="#fff" />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px' }}>CELEBRATED</span>
          </div>

          {/* Quick Photo Upload Button */}
          <label
            title="Upload custom photo"
            style={{
              position: 'absolute',
              bottom: 8,
              right: 12,
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '50%',
              width: 34,
              height: 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 15
            }}
          >
            <Upload size={16} color="#fff" />
            <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
          </label>
        </div>

        {/* Customizable Birthday Message Card */}
        <div
          className="glass-panel-glow"
          style={{
            width: '100%',
            padding: '28px 24px',
            marginBottom: '32px',
            position: 'relative',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.85rem', color: '#ffd700', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={16} /> A HEARTFELT WISH
            </span>
            <button
              onClick={() => setIsEditing(!isEditing)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ff70a6',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: '0.85rem'
              }}
            >
              {isEditing ? <Check size={16} /> : <Edit3 size={16} />}
              {isEditing ? 'Save Message' : 'Edit Message'}
            </button>
          </div>

          {isEditing ? (
            <textarea
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              rows={5}
              className="glass-input"
              style={{ width: '100%', resize: 'vertical', fontSize: '1rem', lineHeight: '1.6' }}
            />
          ) : (
            <p
              style={{
                fontSize: '1.05rem',
                color: '#f1f5f9',
                lineHeight: 1.8,
                whiteSpace: 'pre-line'
              }}
            >
              {customMsg}
            </p>
          )}

          <div style={{ textAlign: 'right', marginTop: '18px' }}>
            <span className="font-signature" style={{ fontSize: '1.35rem', color: '#f472b6' }}>
              {config.wishes.signature}
            </span>
          </div>
        </div>

        {/* NEXT Button */}
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="btn-magical"
          style={{ fontSize: '1.1rem', padding: '16px 44px' }}
        >
          <span>VIEW MEMORABLE PHOTOS</span>
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>
    </div>
  );
}

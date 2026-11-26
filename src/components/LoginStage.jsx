import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Eye, EyeOff, Lock, User, UserCheck, KeyRound } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function LoginStage({ onLoginSuccess, initialData }) {
  const [hisName, setHisName] = useState('');
  const [herName, setHerName] = useState('');
  const [specialNickname, setSpecialNickname] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [welcomePopup, setWelcomePopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Field validation
    if (!hisName.trim()) {
      setErrorMsg('Please enter his name ❤️');
      return;
    }
    if (!herName.trim()) {
      setErrorMsg('Please enter your name 💖');
      return;
    }
    if (!specialNickname.trim()) {
      setErrorMsg('Please give a special nickname ✨');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Please enter your secret password 🔐');
      return;
    }

    soundEngine.playSparkle();
    setIsSubmitting(true);

    // Show personalized welcome message before advancing
    setTimeout(() => {
      setWelcomePopup(true);
    }, 600);
  };

  const handleProceedAfterWelcome = () => {
    soundEngine.playSparkle();
    onLoginSuccess({
      hisName: hisName.trim(),
      herName: herName.trim(),
      specialNickname: specialNickname.trim()
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="glass-panel-glow"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '36px 28px',
          position: 'relative'
        }}
      >
        {/* Glowing floating decorative hearts */}
        <div style={{ position: 'absolute', top: -18, right: -12, fontSize: '30px' }} className="pulse-glow">
          🦋
        </div>
        <div style={{ position: 'absolute', bottom: -14, left: -10, fontSize: '26px' }} className="float-gentle">
          💖
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              display: 'inline-flex',
              padding: '16px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255, 42, 133, 0.3), rgba(138, 43, 226, 0.3))',
              marginBottom: '12px',
              boxShadow: '0 0 25px rgba(255, 42, 133, 0.5)'
            }}
          >
            <Heart size={36} color="#ff2a85" fill="#ff2a85" />
          </motion.div>

          <h1
            className="font-romantic text-glow-pink"
            style={{ fontSize: 'clamp(1.85rem, 4vw, 2.35rem)', color: '#f472b6', marginBottom: '6px' }}
          >
            A Magical Universe
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
            Enter your secret credentials to unlock the birthday surprise
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Field 1: His Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#f472b6', marginBottom: '6px', fontWeight: 600 }}>
              1. His Name:
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="glass-input"
                placeholder="Type his name..."
                value={hisName}
                onChange={(e) => setHisName(e.target.value)}
                style={{ paddingLeft: '42px' }}
              />
              <User
                size={18}
                color="#f472b6"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          {/* Field 2: Her Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#f472b6', marginBottom: '6px', fontWeight: 600 }}>
              2. Her Name:
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="glass-input"
                placeholder="Type your name..."
                value={herName}
                onChange={(e) => setHerName(e.target.value)}
                style={{ paddingLeft: '42px' }}
              />
              <UserCheck
                size={18}
                color="#f472b6"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          {/* Field 3: Special Nickname */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#f472b6', marginBottom: '6px', fontWeight: 600 }}>
              3. Special Name for You:
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="glass-input"
                placeholder="Give a special nickname..."
                value={specialNickname}
                onChange={(e) => setSpecialNickname(e.target.value)}
                style={{ paddingLeft: '42px' }}
              />
              <Sparkles
                size={18}
                color="#ffd700"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          {/* Field 4: Password */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#f472b6', marginBottom: '6px', fontWeight: 600 }}>
              4. Password:
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                className="glass-input"
                placeholder="Enter your secret password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '42px', paddingRight: '44px' }}
              />
              <Lock
                size={18}
                color="#f472b6"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#f472b6',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error Message Display */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  color: '#fca5a5',
                  fontSize: '0.88rem',
                  textAlign: 'center'
                }}
              >
                {errorMsg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animated LOGIN Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-magical"
            style={{ width: '100%', marginTop: '12px', fontSize: '1.05rem', letterSpacing: '1px' }}
            disabled={isSubmitting}
          >
            <Heart size={20} fill="#fff" />
            {isSubmitting ? 'UNLOCKING MAGIC...' : 'ENTER OUR MAGIC WORLD'}
          </motion.button>
        </form>
      </motion.div>

      {/* Personalized Welcome Popup Modal */}
      <AnimatePresence>
        {welcomePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5, 3, 15, 0.88)',
              backdropFilter: 'blur(16px)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              className="glass-panel-glow"
              style={{
                maxWidth: '460px',
                width: '100%',
                padding: '36px 28px',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }} className="pulse-glow">
                ✨💖✨
              </div>

              <h2 className="font-romantic text-glow-pink" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.2rem)', color: '#f472b6', marginBottom: '12px' }}>
                Welcome, {herName}! ✨
              </h2>

              <p style={{ fontSize: '1rem', lineHeight: '1.65', color: '#e2e8f0', marginBottom: '14px' }}>
                From <span style={{ color: '#f472b6', fontWeight: 600 }}>{hisName}</span>, to my special{' '}
                <span style={{ color: '#f3d58d', fontWeight: 600 }}>"{specialNickname}"</span>...
              </p>

              <p style={{ fontSize: '0.94rem', color: '#cbd5e1', fontStyle: 'italic', marginBottom: '28px', lineHeight: 1.65 }}>
                "Every star in this midnight sky shines in celebration of you. Get ready for a birthday journey made straight from my heart."
              </p>

              <button onClick={handleProceedAfterWelcome} className="btn-magical" style={{ width: '100%', fontSize: '1.1rem' }}>
                BEGIN THE SURPRISE 🚀
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

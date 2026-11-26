import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function DateSelectionStage({ startDate, onDateSelected }) {
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(startDate || '2023-01-15');
  const [errorMsg, setErrorMsg] = useState('');

  const handleProceed = (e) => {
    e.preventDefault();
    if (!selectedDate) {
      setErrorMsg('Please select a meaningful date ❤️');
      return;
    }
    const chosen = new Date(selectedDate);
    const now = new Date();
    if (chosen > now) {
      setErrorMsg('Please choose a past date when our journey began ✨');
      return;
    }

    soundEngine.playSparkle();
    onDateSelected(selectedDate);
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
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-panel-glow"
        style={{
          width: '100%',
          maxWidth: '520px',
          padding: '40px 30px',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            display: 'inline-flex',
            padding: '18px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 42, 133, 0.4), rgba(138, 43, 226, 0.4))',
            marginBottom: '16px',
            boxShadow: '0 0 30px rgba(255, 42, 133, 0.6)'
          }}
        >
          <Calendar size={38} color="#ff70a6" />
        </motion.div>

        <h1
          className="font-romantic text-glow-pink"
          style={{ fontSize: 'clamp(1.75rem, 4.2vw, 2.4rem)', color: '#f472b6', marginBottom: '12px', lineHeight: 1.25 }}
        >
          When Did Our Beautiful Journey Begin?
        </h1>

        <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.6', marginBottom: '28px' }}>
          Select the memorable date when our paths crossed, our story started, or when a special spark was lit in our hearts.
        </p>

        <form onSubmit={handleProceed} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="date"
              max={todayStr}
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setErrorMsg('');
              }}
              className="glass-input"
              style={{
                fontSize: '1.15rem',
                textAlign: 'center',
                letterSpacing: '1px',
                color: '#ffd700',
                padding: '16px 20px',
                cursor: 'pointer'
              }}
            />
          </div>

          {errorMsg && (
            <div
              style={{
                color: '#f87171',
                fontSize: '0.9rem',
                background: 'rgba(239, 68, 68, 0.15)',
                padding: '8px 12px',
                borderRadius: '8px'
              }}
            >
              {errorMsg}
            </div>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-magical"
            style={{ fontSize: '1.1rem', marginTop: '10px' }}
          >
            <span>LAUNCH GALAXY JOURNEY</span>
            <ArrowRight size={20} />
          </motion.button>
        </form>

        <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Sparkles size={16} color="#ffd700" />
          <span style={{ fontSize: '0.88rem', color: '#e2e8f0', opacity: 0.85 }}>
            Time will be calculated to the exact live second
          </span>
        </div>
      </motion.div>
    </div>
  );
}

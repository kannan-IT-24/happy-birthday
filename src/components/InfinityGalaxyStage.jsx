import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

export default function InfinityGalaxyStage({ startDate, onNext }) {
  const [elapsed, setElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Calculate live time counter from selected start date
  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate || '2023-01-15T00:00:00');
      const now = new Date();

      if (now < start) {
        setElapsed({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();
      let hours = now.getHours() - start.getHours();
      let minutes = now.getMinutes() - start.getMinutes();
      let seconds = now.getSeconds() - start.getSeconds();

      if (seconds < 0) {
        seconds += 60;
        minutes -= 1;
      }
      if (minutes < 0) {
        minutes += 60;
        hours -= 1;
      }
      if (hours < 0) {
        hours += 24;
        days -= 1;
      }
      if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months -= 1;
      }
      if (months < 0) {
        months += 12;
        years -= 1;
      }

      setElapsed({
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, days),
        hours: Math.max(0, hours),
        minutes: Math.max(0, minutes),
        seconds: Math.max(0, seconds)
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 16px',
        overflow: 'hidden',
        zIndex: 10
      }}
    >
      {/* Cosmic Nebula Cloud Backgrounds */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(138, 43, 226, 0.25) 0%, rgba(255, 42, 133, 0.15) 50%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0, 210, 255, 0.2) 0%, rgba(138, 43, 226, 0.15) 50%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none'
        }}
      />

      {/* Orbiting Planet Visuals */}
      <motion.div
        animate={{
          x: [0, 40, 0, -40, 0],
          y: [0, -25, 0, 25, 0]
        }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '12%',
          right: '12%',
          width: '75px',
          height: '75px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #ff8bc3, #701a75, #1e1b4b)',
          boxShadow: '0 0 35px rgba(255, 42, 133, 0.4)',
          pointerEvents: 'none',
          opacity: 0.85
        }}
      />

      <motion.div
        animate={{
          x: [0, -30, 0, 30, 0],
          y: [0, 30, 0, -30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '8%',
          width: '95px',
          height: '95px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #00f2fe, #4338ca, #09061b)',
          boxShadow: '0 0 40px rgba(0, 210, 255, 0.35)',
          pointerEvents: 'none',
          opacity: 0.8
        }}
      />

      {/* Center Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{
          position: 'relative',
          maxWidth: '920px',
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
            color: '#00d2ff',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontWeight: 700,
            marginBottom: '8px'
          }}
        >
          OUR INFINITE TIMELINE
        </span>

        <h1
          className="font-romantic text-glow-pink"
          style={{ fontSize: 'clamp(1.9rem, 4.5vw, 2.7rem)', color: '#f472b6', marginBottom: '8px', lineHeight: 1.2 }}
        >
          An Eternity with You
        </h1>

        {/* Large Glowing Animated Infinity Symbol & Orbiting Hearts */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '540px',
            height: '220px',
            margin: '20px auto 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Infinity SVG Route */}
          <svg
            viewBox="0 0 600 300"
            style={{
              width: '100%',
              height: '100%',
              overflow: 'visible',
              filter: 'drop-shadow(0 0 25px rgba(255, 42, 133, 0.8))'
            }}
          >
            <defs>
              <linearGradient id="infGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff2a85" />
                <stop offset="50%" stopColor="#8a2be2" />
                <stop offset="100%" stopColor="#00d2ff" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background infinity trace */}
            <path
              id="infinityPath"
              d="M 300,150 C 390,40 540,40 540,150 C 540,260 390,260 300,150 C 210,40 60,40 60,150 C 60,260 210,260 300,150 Z"
              fill="none"
              stroke="url(#infGrad)"
              strokeWidth="5"
              filter="url(#glow)"
              opacity="0.9"
            />

            {/* Glowing travelling heart on infinity path */}
            <circle r="7" fill="#ffd700" filter="url(#glow)">
              <animateMotion
                dur="7s"
                repeatCount="indefinite"
                path="M 300,150 C 390,40 540,40 540,150 C 540,260 390,260 300,150 C 210,40 60,40 60,150 C 60,260 210,260 300,150 Z"
              />
            </circle>

            <circle r="5" fill="#ff2a85" filter="url(#glow)">
              <animateMotion
                dur="7s"
                begin="3.5s"
                repeatCount="indefinite"
                path="M 300,150 C 390,40 540,40 540,150 C 540,260 390,260 300,150 C 210,40 60,40 60,150 C 60,260 210,260 300,150 Z"
              />
            </circle>

            <circle r="4" fill="#00d2ff" filter="url(#glow)">
              <animateMotion
                dur="7s"
                begin="1.8s"
                repeatCount="indefinite"
                path="M 300,150 C 390,40 540,40 540,150 C 540,260 390,260 300,150 C 210,40 60,40 60,150 C 60,260 210,260 300,150 Z"
              />
            </circle>
          </svg>

          {/* Central Pulsing Heart Symbol */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart size={38} color="#ff2a85" fill="#ff2a85" style={{ filter: 'drop-shadow(0 0 15px #ff2a85)' }} />
            </motion.div>
          </div>
        </div>

        {/* Live Counter Display in the Center */}
        <div
          className="glass-panel-glow"
          style={{
            width: '100%',
            padding: '24px 18px',
            marginBottom: '28px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '14px',
            alignItems: 'center'
          }}
        >
          {[
            { label: 'YEARS', val: elapsed.years },
            { label: 'MONTHS', val: elapsed.months },
            { label: 'DAYS', val: elapsed.days },
            { label: 'HOURS', val: elapsed.hours },
            { label: 'MINUTES', val: elapsed.minutes },
            { label: 'SECONDS', val: elapsed.seconds }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '14px 8px',
                border: '1px solid rgba(255, 42, 133, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <span
                style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  fontFamily: 'Outfit, monospace',
                  color: idx % 2 === 0 ? '#ff70a6' : '#ffd700',
                  textShadow: '0 0 15px rgba(255, 112, 166, 0.5)'
                }}
              >
                {String(item.val).padStart(2, '0')}
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '1.5px',
                  color: '#94a3b8',
                  fontWeight: 600,
                  marginTop: '4px'
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Emotional Quote from prompt */}
        <div
          className="glass-panel"
          style={{
            padding: '18px 24px',
            maxWidth: '680px',
            marginBottom: '32px',
            borderRadius: '20px',
            border: '1px solid rgba(255, 215, 0, 0.3)'
          }}
        >
          <p
            className="font-serif"
            style={{
              fontSize: '1.15rem',
              color: '#f8fafc',
              lineHeight: 1.6,
              fontStyle: 'italic'
            }}
          >
            "From the day our journey began until this very second, every moment has become a memory. And this journey has no ending... ♾️❤️"
          </p>
        </div>

        {/* NEXT Button */}
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="btn-magical"
          style={{ fontSize: '1.1rem', padding: '16px 44px' }}
        >
          <span>STEP INTO BIRTHDAY WISHES</span>
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>
    </div>
  );
}

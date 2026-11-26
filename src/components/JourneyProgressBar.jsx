import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

const STAGE_TITLES = [
  'Login Surprise',
  'Birthday Candle',
  'Journey Date',
  'Infinity Galaxy',
  'Birthday Wishes',
  'Photo Memories',
  'Video Memories',
  'Days Timeline',
  'Balloon Surprise',
  'Mystery Gift',
  'Letter From My Heart',
  'Share Your Memory',
  'Grand Finale'
];

export default function JourneyProgressBar({ currentStage, maxUnlockedStage, onSelectStage }) {
  // If user is at login (stage 1), we can show minimal or progress
  if (currentStage === 1) return null;

  return (
    <header
      style={{
        position: 'fixed',
        top: 14,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 80,
        width: '92%',
        maxWidth: '860px',
        pointerEvents: 'auto'
      }}
    >
      <div
        className="glass-panel"
        style={{
          padding: '8px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '50px',
          border: '1px solid rgba(255, 42, 133, 0.3)',
          boxShadow: '0 4px 25px rgba(0,0,0,0.5)'
        }}
      >
        {/* Stage counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Heart size={16} color="#ff2a85" fill="#ff2a85" className="pulse-glow" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '0.5px' }}>
            STEP {currentStage} <span style={{ opacity: 0.5, fontWeight: 400 }}>/ 13</span>
          </span>
          <span
            style={{
              display: 'inline-block',
              fontSize: '12px',
              color: '#ff8ec7',
              marginLeft: 6,
              maxWidth: 160,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {STAGE_TITLES[currentStage - 1]}
          </span>
        </div>

        {/* Step dots for quick navigation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            overflowX: 'auto',
            padding: '2px 4px',
            scrollbarWidth: 'none'
          }}
        >
          {STAGE_TITLES.map((title, idx) => {
            const stepNum = idx + 1;
            const isCurrent = stepNum === currentStage;
            const isUnlocked = stepNum <= maxUnlockedStage;

            return (
              <button
                key={stepNum}
                onClick={() => isUnlocked && onSelectStage(stepNum)}
                disabled={!isUnlocked}
                title={`${stepNum}. ${title}`}
                style={{
                  width: isCurrent ? '22px' : '9px',
                  height: '9px',
                  borderRadius: '9999px',
                  border: 'none',
                  background: isCurrent
                    ? 'linear-gradient(90deg, #ff2a85, #00d2ff)'
                    : isUnlocked
                    ? 'rgba(255, 120, 200, 0.6)'
                    : 'rgba(255, 255, 255, 0.15)',
                  cursor: isUnlocked ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                  padding: 0
                }}
              />
            );
          })}
        </div>
      </div>
    </header>
  );
}

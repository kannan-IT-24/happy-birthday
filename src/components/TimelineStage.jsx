import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, Sparkles, Plus, Edit2, Calendar, Check, X } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function TimelineStage({ config, onNext }) {
  const [timelineEvents, setTimelineEvents] = useState(config.timeline);
  const [expandedId, setExpandedId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Memory Modal Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPhoto, setNewPhoto] = useState('');

  const toggleExpand = (id) => {
    soundEngine.playSparkle();
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAddMemory = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDate.trim()) return;

    const newEvent = {
      id: Date.now(),
      title: newTitle.trim(),
      date: newDate.trim(),
      description: newDesc.trim() || 'A cherished memory etched in our hearts forever.',
      photo: newPhoto.trim() || '/assets/photos/timeline/WhatsApp Image 2026-11-26 at 6.48.17 PM.jpeg'
    };

    setTimelineEvents([...timelineEvents, newEvent]);
    setShowAddModal(false);
    setNewTitle('');
    setNewDate('');
    setNewDesc('');
    setNewPhoto('');
    soundEngine.playSparkle();
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
        style={{ maxWidth: '840px', width: '100%', textAlign: 'center' }}
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
          CHAPTERS OF OUR STORY
        </span>

        <h1
          className="font-romantic text-glow-pink"
          style={{ fontSize: 'clamp(1.9rem, 4.5vw, 2.65rem)', color: '#f472b6', marginBottom: '14px', lineHeight: 1.2 }}
        >
          Memorable Days Timeline ❤️
        </h1>

        <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 28px' }}>
          Milestones, unscripted laughs, and turning points that shaped this unforgettable friendship.
        </p>

        {/* Add Memory Button */}
        <div style={{ marginBottom: '36px' }}>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-secondary"
            style={{
              padding: '10px 24px',
              fontSize: '0.92rem',
              border: '1px solid rgba(255, 42, 133, 0.4)',
              background: 'rgba(255, 42, 133, 0.15)'
            }}
          >
            <Plus size={16} color="#ff70a6" />
            <span>Add a Memorable Day</span>
          </button>
        </div>

        {/* Vertical Timeline Structure */}
        <div style={{ position: 'relative', margin: '20px auto 44px', textAlign: 'left' }}>
          {/* Central Glowing Line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '24px',
              width: '3px',
              background: 'linear-gradient(to bottom, #ff2a85, #8a2be2, #00d2ff)',
              boxShadow: '0 0 15px rgba(255, 42, 133, 0.6)'
            }}
          />

          {/* Timeline Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {timelineEvents.map((event, index) => {
              const isExpanded = expandedId === event.id;

              return (
                <div key={event.id} style={{ position: 'relative', paddingLeft: '64px' }}>
                  {/* Heart-Shaped Timeline Marker */}
                  <motion.div
                    whileHover={{ scale: 1.25 }}
                    onClick={() => toggleExpand(event.id)}
                    style={{
                      position: 'absolute',
                      left: '8px',
                      top: '16px',
                      transform: 'translateX(-50%)',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #ff2a85, #8a2be2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 0 18px rgba(255, 42, 133, 0.8)',
                      zIndex: 10
                    }}
                  >
                    <Heart size={18} fill="#fff" color="#fff" />
                  </motion.div>

                  {/* Card Content */}
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="glass-panel"
                    onClick={() => toggleExpand(event.id)}
                    style={{
                      padding: '20px 24px',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      border: isExpanded ? '1px solid #ff2a85' : '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: isExpanded ? '0 0 25px rgba(255, 42, 133, 0.35)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.85rem', color: '#ffd700', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Calendar size={14} /> {event.date}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#ff70a6' }}>
                        {isExpanded ? 'Click to collapse' : 'Click to read story'}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.3rem', color: '#fff', fontWeight: 700, marginBottom: '8px' }}>
                      {event.title}
                    </h3>

                    <p style={{ color: '#cbd5e1', fontSize: '0.98rem', lineHeight: 1.6 }}>
                      {event.description}
                    </p>

                    {/* Expanded Photo view */}
                    <AnimatePresence>
                      {isExpanded && event.photo && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          style={{ marginTop: '16px', overflow: 'hidden', borderRadius: '14px' }}
                        >
                          <img
                            src={event.photo}
                            alt={event.title}
                            style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', objectPosition: 'center', borderRadius: '14px', background: '#07061a' }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              );
            })}
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
          <span>POP THE BALLOONS</span>
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>

      {/* Add Memory Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5, 3, 15, 0.88)',
              backdropFilter: 'blur(16px)',
              zIndex: 110,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass-panel-glow"
              style={{ maxWidth: '480px', width: '100%', padding: '32px 26px', position: 'relative' }}
            >
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>

              <h2 className="font-romantic text-glow-pink" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 1.9rem)', color: '#f472b6', marginBottom: '18px' }}>
                Add a Special Memory
              </h2>

              <form onSubmit={handleAddMemory} style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: '#f472b6', display: 'block', marginBottom: '4px' }}>Date or Period:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. October 14, Rainy Day"
                    className="glass-input"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', color: '#f472b6', display: 'block', marginBottom: '4px' }}>Memory Title:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Spontaneous Road Trip"
                    className="glass-input"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', color: '#f472b6', display: 'block', marginBottom: '4px' }}>Memory Story:</label>
                  <textarea
                    rows={3}
                    placeholder="What made this day so unforgettable?"
                    className="glass-input"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', color: '#f472b6', display: 'block', marginBottom: '4px' }}>Photo URL (optional):</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    className="glass-input"
                    value={newPhoto}
                    onChange={(e) => setNewPhoto(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn-magical" style={{ marginTop: '10px' }}>
                  SAVE TO TIMELINE ❤️
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

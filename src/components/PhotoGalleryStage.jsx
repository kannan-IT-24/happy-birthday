import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, X, Maximize2, ChevronLeft, ChevronRight, Sparkles, Plus, Image } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function PhotoGalleryStage({ config, onNext }) {
  const [photosList, setPhotosList] = useState(config.photos);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [heartAnimId, setHeartAnimId] = useState(null);

  const categories = ['All', 'Sweet Moments', 'Adventures', 'Special Dates'];

  const filteredPhotos =
    activeFilter === 'All'
      ? photosList
      : photosList.filter((p) => p.category === activeFilter);

  const handlePhotoClick = (photo) => {
    soundEngine.playSparkle();
    setHeartAnimId(photo.id);
    setSelectedPhoto(photo);
    setTimeout(() => setHeartAnimId(null), 1000);
  };

  const handleNextPhoto = () => {
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  };

  const handlePrevPhoto = () => {
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIndex]);
  };

  const handleCustomUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newPhoto = {
        id: Date.now(),
        title: file.name.replace(/\.[^/.]+$/, ''),
        date: 'Just Added',
        category: 'Sweet Moments',
        caption: 'A brand new precious memory uploaded with love.',
        src: url,
        fallback: url
      };
      setPhotosList([newPhoto, ...photosList]);
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
        padding: '50px 16px 40px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ maxWidth: '1080px', width: '100%', textAlign: 'center' }}
      >
        <span
          style={{
            fontSize: '0.85rem',
            color: '#00d2ff',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontWeight: 700,
            marginBottom: '8px',
            display: 'block'
          }}
        >
          TREASURED MEMORIES IN FRAMES
        </span>

        <h1
          className="font-romantic text-glow-pink"
          style={{ fontSize: 'clamp(1.9rem, 4.5vw, 2.65rem)', color: '#f472b6', marginBottom: '14px', lineHeight: 1.2 }}
        >
          Memorable Photographs 📸❤️
        </h1>

        <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto 28px' }}>
          Every picture holds a thousand words and a million emotions. Tap any photograph to view it in full magical glory.
        </p>

        {/* Filter Tabs & Add Custom Photo Button */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '36px'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={activeFilter === cat ? 'btn-magical' : 'btn-secondary'}
              style={{
                padding: '8px 20px',
                fontSize: '0.9rem',
                borderRadius: '9999px'
              }}
            >
              {cat}
            </button>
          ))}

          {/* Upload Button */}
          <label
            className="btn-secondary"
            style={{
              padding: '8px 18px',
              fontSize: '0.9rem',
              cursor: 'pointer',
              border: '1px dashed #ff2a85',
              background: 'rgba(255, 42, 133, 0.15)'
            }}
          >
            <Plus size={16} color="#ff70a6" />
            <span>Add Photograph</span>
            <input type="file" accept="image/*" onChange={handleCustomUpload} style={{ display: 'none' }} />
          </label>
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}
        >
          {filteredPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass-panel"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                textAlign: 'left',
                position: 'relative',
                border: '1px solid rgba(255, 120, 200, 0.3)'
              }}
              onClick={() => handlePhotoClick(photo)}
            >
              {/* Photo Image */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 4', overflow: 'hidden', background: '#0a0820' }}>
                <img
                  src={photo.src}
                  alt={photo.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    transition: 'transform 0.5s ease'
                  }}
                  onError={(e) => {
                    e.target.src = photo.fallback;
                  }}
                />

                {/* Gradient overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(7, 6, 20, 0.85) 0%, transparent 60%)'
                  }}
                />

                {/* Date badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(0, 0, 0, 0.65)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '9999px',
                    padding: '4px 12px',
                    fontSize: '0.78rem',
                    color: '#ffd700',
                    fontWeight: 600
                  }}
                >
                  {photo.date}
                </div>

                {/* Floating Heart Burst effect when card clicked */}
                {heartAnimId === photo.id && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 1 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: '48px',
                      zIndex: 30
                    }}
                  >
                    💖
                  </motion.div>
                )}
              </div>

              {/* Card Meta Content */}
              <div style={{ padding: '16px 20px' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '6px', fontWeight: 600 }}>
                  {photo.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* NEXT Button */}
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="btn-magical"
          style={{ fontSize: '1.1rem', padding: '16px 44px' }}
        >
          <span>EXPLORE VIDEO MEMORIES</span>
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5, 3, 15, 0.94)',
              backdropFilter: 'blur(20px)',
              zIndex: 110,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#fff',
                borderRadius: '50%',
                width: 44,
                height: 44,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 120
              }}
            >
              <X size={22} />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrevPhoto}
              style={{
                position: 'absolute',
                left: '20px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#fff',
                borderRadius: '50%',
                width: 48,
                height: 48,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 120
              }}
            >
              <ChevronLeft size={28} />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNextPhoto}
              style={{
                position: 'absolute',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#fff',
                borderRadius: '50%',
                width: 48,
                height: 48,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 120
              }}
            >
              <ChevronRight size={28} />
            </button>

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="glass-panel-glow"
              style={{
                maxWidth: '740px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'hidden',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #ff2a85'
              }}
            >
              <div style={{ width: '100%', maxHeight: '65vh', overflow: 'hidden', background: '#0a0820', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  style={{ maxWidth: '100%', maxHeight: '65vh', objectFit: 'contain', display: 'block' }}
                  onError={(e) => {
                    e.target.src = selectedPhoto.fallback;
                  }}
                />
              </div>

              <div style={{ padding: '24px', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h2 style={{ fontSize: '1.4rem', color: '#ff70a6', fontWeight: 700 }}>
                    {selectedPhoto.title}
                  </h2>
                  <span style={{ fontSize: '0.85rem', color: '#ffd700', fontWeight: 600 }}>
                    {selectedPhoto.date}
                  </span>
                </div>
                <p style={{ color: '#e2e8f0', fontSize: '1.05rem', lineHeight: 1.6 }}>
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Pause, Maximize, Film, Plus } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { assetPath } from '../utils/assetPath';

function VideoCard({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn('Playback error:', e);
      });
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      }
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="glass-panel"
      style={{
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 42, 133, 0.35)',
        textAlign: 'left'
      }}
    >
      {/* Video Container */}
      <div style={{ position: 'relative', width: '100%', height: '280px', background: '#07061a' }}>
        <video
          ref={videoRef}
          src={video.src}
          poster={video.fallbackPoster}
          preload="metadata"
          controls={isPlaying}
          playsInline
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onEnded={() => setIsPlaying(false)}
          style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#07061a' }}
        />

        {/* Play/Pause Center Button Overlay */}
        {!isPlaying && (
          <div
            onClick={togglePlay}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(6, 5, 20, 0.38)',
              cursor: 'pointer',
              transition: 'background 0.3s ease'
            }}
          >
            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                border: 'none',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 22px rgba(236, 72, 153, 0.5)'
              }}
            >
              <Play size={24} style={{ marginLeft: 3 }} />
            </motion.button>
          </div>
        )}

        {/* Fullscreen Button */}
        <button
          onClick={handleFullscreen}
          title="Fullscreen"
          style={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            background: 'rgba(0,0,0,0.65)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff',
            borderRadius: '50%',
            width: 34,
            height: 34,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <Maximize size={16} />
        </button>

        {/* Date Tag */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
            borderRadius: '9999px',
            padding: '4px 12px',
            fontSize: '0.78rem',
            color: '#ffd700',
            fontWeight: 600
          }}
        >
          {video.date}
        </div>
      </div>

      {/* Description */}
      <div style={{ padding: '20px 22px' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#ff70a6', marginBottom: '8px', fontWeight: 600 }}>
          {video.title}
        </h3>
        <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.5 }}>
          {video.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function VideoGalleryStage({ config, onNext }) {
  const [videoList, setVideoList] = useState(config.videos);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newVideo = {
        id: Date.now(),
        title: file.name.replace(/\.[^/.]+$/, ''),
        date: 'Personal Video Clip',
        description: 'A special video clip uploaded for this birthday celebration.',
        src: url,
        fallbackPoster: assetPath('/assets/photos/birthday/WhatsApp Image 2026-11-26 at 6.41.40 PM (1).jpeg')
      };
      setVideoList([newVideo, ...videoList]);
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
        style={{ maxWidth: '960px', width: '100%', textAlign: 'center' }}
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
          MOTION PICTURE MEMORIES
        </span>

        <h1
          className="font-romantic text-glow-pink"
          style={{ fontSize: 'clamp(1.9rem, 4.5vw, 2.65rem)', color: '#f472b6', marginBottom: '14px', lineHeight: 1.2 }}
        >
          Memorable Video Clips 🎬✨
        </h1>

        <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto 28px' }}>
          Moving memories filled with smiles, laughter, and timeless moments captured on tape.
        </p>

        {/* Upload Custom Video Button */}
        <div style={{ marginBottom: '32px' }}>
          <label
            className="btn-secondary"
            style={{
              padding: '10px 22px',
              fontSize: '0.92rem',
              cursor: 'pointer',
              border: '1px dashed #00d2ff',
              background: 'rgba(0, 210, 255, 0.1)'
            }}
          >
            <Plus size={16} color="#00d2ff" />
            <span>Upload MP4 Video</span>
            <input type="file" accept="video/mp4,video/*" onChange={handleVideoUpload} style={{ display: 'none' }} />
          </label>
        </div>

        {/* Video Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            marginBottom: '44px'
          }}
        >
          {videoList.map((vid) => (
            <VideoCard key={vid.id} video={vid} />
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
          <span>VIEW DAYS TIMELINE</span>
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>
    </div>
  );
}

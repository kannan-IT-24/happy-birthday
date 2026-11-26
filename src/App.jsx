import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_CONFIG } from './config/birthdayData';

// Global Controls
import GlobalEffects from './components/GlobalEffects';
import MusicPlayer from './components/MusicPlayer';
import JourneyProgressBar from './components/JourneyProgressBar';

// All 13 Stages in Exact Order
import LoginStage from './components/LoginStage';
import CandleStage from './components/CandleStage';
import DateSelectionStage from './components/DateSelectionStage';
import InfinityGalaxyStage from './components/InfinityGalaxyStage';
import BirthdayWishesStage from './components/BirthdayWishesStage';
import PhotoGalleryStage from './components/PhotoGalleryStage';
import VideoGalleryStage from './components/VideoGalleryStage';
import TimelineStage from './components/TimelineStage';
import BalloonBurstStage from './components/BalloonBurstStage';
import GiftSelectionStage from './components/GiftSelectionStage';
import LetterStage from './components/LetterStage';
import ShareMemoryStage from './components/ShareMemoryStage';
import FinalWishesStage from './components/FinalWishesStage';

export default function App() {
  const [config, setConfig] = useState(INITIAL_CONFIG);
  const [currentStage, setCurrentStage] = useState(1);
  const [maxUnlockedStage, setMaxUnlockedStage] = useState(1);
  const [startDate, setStartDate] = useState(INITIAL_CONFIG.defaultStartDate);

  const [userProfile, setUserProfile] = useState({
    hisName: '',
    herName: '',
    specialNickname: ''
  });

  // Scroll to top on every stage change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStage]);

  const handleLoginSuccess = (profile) => {
    setUserProfile(profile);
    const next = 2;
    setCurrentStage(next);
    setMaxUnlockedStage((prev) => Math.max(prev, next));
  };

  const handleDateSelected = (dateStr) => {
    setStartDate(dateStr);
    const next = 4;
    setCurrentStage(next);
    setMaxUnlockedStage((prev) => Math.max(prev, next));
  };

  const goToNextStage = () => {
    const next = currentStage + 1;
    if (next <= 13) {
      setCurrentStage(next);
      setMaxUnlockedStage((prev) => Math.max(prev, next));
    }
  };

  const handleSelectStage = (stageNum) => {
    if (stageNum <= maxUnlockedStage) {
      setCurrentStage(stageNum);
    }
  };

  const handleReplay = () => {
    // Replay journey starting from the Candle or Date selection
    setCurrentStage(2);
  };

  const handleSaveMemory = (newMemory) => {
    setConfig((prev) => ({
      ...prev,
      timeline: [...prev.timeline, newMemory]
    }));
  };

  // Stage router
  const renderCurrentStage = () => {
    switch (currentStage) {
      case 1:
        return (
          <LoginStage
            key="stage-1"
            initialData={config}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      case 2:
        return (
          <CandleStage
            key="stage-2"
            userProfile={userProfile}
            onNext={goToNextStage}
          />
        );
      case 3:
        return (
          <DateSelectionStage
            key="stage-3"
            startDate={startDate}
            onDateSelected={handleDateSelected}
          />
        );
      case 4:
        return (
          <InfinityGalaxyStage
            key="stage-4"
            startDate={startDate}
            onNext={goToNextStage}
          />
        );
      case 5:
        return (
          <BirthdayWishesStage
            key="stage-5"
            config={config}
            userProfile={userProfile}
            onNext={goToNextStage}
          />
        );
      case 6:
        return (
          <PhotoGalleryStage
            key="stage-6"
            config={config}
            onNext={goToNextStage}
          />
        );
      case 7:
        return (
          <VideoGalleryStage
            key="stage-7"
            config={config}
            onNext={goToNextStage}
          />
        );
      case 8:
        return (
          <TimelineStage
            key="stage-8"
            config={config}
            onNext={goToNextStage}
          />
        );
      case 9:
        return (
          <BalloonBurstStage
            key="stage-9"
            config={config}
            onNext={goToNextStage}
          />
        );
      case 10:
        return (
          <GiftSelectionStage
            key="stage-10"
            config={config}
            onNext={goToNextStage}
          />
        );
      case 11:
        return (
          <LetterStage
            key="stage-11"
            config={config}
            userProfile={userProfile}
            onNext={goToNextStage}
          />
        );
      case 12:
        return (
          <ShareMemoryStage
            key="stage-12"
            userProfile={userProfile}
            onNext={goToNextStage}
            onSaveMemory={handleSaveMemory}
          />
        );
      case 13:
        return (
          <FinalWishesStage
            key="stage-13"
            config={config}
            userProfile={userProfile}
            onReplay={handleReplay}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Global Interactive Butterflies & Touch Heart Effects */}
      <GlobalEffects />

      {/* Floating Persistent Romantic Music Player */}
      <MusicPlayer />

      {/* Journey Step & Progress Navigation Bar */}
      <JourneyProgressBar
        currentStage={currentStage}
        maxUnlockedStage={maxUnlockedStage}
        onSelectStage={handleSelectStage}
      />

      {/* Main Animated Stage Viewport */}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentStage}
          initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.98 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          exit={{ opacity: 0, filter: 'blur(8px)', scale: 1.02 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ width: '100%', minHeight: '100vh' }}
        >
          {renderCurrentStage()}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

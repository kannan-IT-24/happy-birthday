/**
 * =========================================================================
 * 🌟 MAGICAL BIRTHDAY SURPRISE - CENTRAL CONFIGURATION 🌟
 * =========================================================================
 * Connected to personal uploaded photos, videos, gifts, and music in:
 *   - public/assets/photos/
 *   - public/assets/videos/
 *   - public/assets/music/
 */

import { assetPath } from '../utils/assetPath';

export const INITIAL_CONFIG = {
  // Passcode required for the surprise login
  defaultPassword: "love",

  // Default fallback names
  defaultHisName: "My Dearest",
  defaultHerName: "Your Angel",
  defaultNickname: "Cutiee Pandaa",

  // Romantic Welcome Message
  welcomeMessage: "Welcome to a universe created only for you... Every star here whispers how much you mean to me. ✨❤️",

  // Candle Surprise Configuration
  candle: {
    title: "Make a Birthday Wish",
    subtitle: "Close your eyes, make a beautiful wish, and blow the candle... ❤️",
    blownSuccessMessage: "Your wish has been carried to the stars! May all your dreams come true! 🌟🎉",
    blowHint: "Tap or click the flame to blow it out"
  },

  // Default Journey Date fallback
  defaultStartDate: "2023-01-15",

  // Infinity Galaxy Messages
  galaxy: {
    quote: "From the day our journey began until this very second, every moment has become a memory. And this journey has no ending... ♾️❤️",
    tagline: "Two souls, one infinite journey across time and space."
  },

  // Birthday Wishes with Butterflies (public/assets/photos/birthday/)
  wishes: {
    title: "Happy Birthday, My Special Girl!",
    photoUrl: assetPath("/assets/photos/birthday/WhatsApp Image 2026-11-26 at 6.41.40 PM (1).jpeg"),
    photoFallback: assetPath("/assets/photos/birthday/WhatsApp Image 2026-11-26 at 6.48.16 PM (2).jpeg"),
    portraits: [
      assetPath("/assets/photos/birthday/WhatsApp Image 2026-11-26 at 6.41.40 PM (1).jpeg"),
      assetPath("/assets/photos/birthday/WhatsApp Image 2026-11-26 at 6.48.16 PM (2).jpeg")
    ],
    message: `To the most incredible girl who brightens up my entire world,
May your smile never fade, your heart always stay peaceful, and your happiness multiply with each passing day.
Thank you for bringing so much magic, warmth, and genuine love into my life.
Today is all about celebrating YOU and the wonderful soul you are! 🦋✨💖`,
    signature: "Always by your side ❤️"
  },

  // Final Birthday Screen Portraits (public/assets/photos/final/)
  finalPhotos: [
    assetPath("/assets/photos/final/WhatsApp Image 2026-11-26 at 6.48.19 PM.jpeg"),
    assetPath("/assets/photos/final/WhatsApp Image 2026-11-26 at 6.41.30 PM (1).jpeg")
  ],

  // Letter Keepsake Photos (public/assets/photos/letter/)
  letterPhotos: [
    assetPath("/assets/photos/letter/WhatsApp Image 2026-11-26 at 6.48.15 PM.jpeg"),
    assetPath("/assets/photos/letter/WhatsApp Image 2026-11-26 at 6.48.19 PM (2).jpeg")
  ],

  // Memorable Photos Gallery (all 15 photos from public/assets/photos/gallery/)
  photos: [
    {
      id: 1,
      title: "Radiant Smile",
      date: "Memory 01",
      category: "Sweet Moments",
      caption: "A smile that effortlessly brightens every single corner of my world.",
      src: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.41.31 PM.jpeg"),
      fallback: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.41.31 PM.jpeg")
    },
    {
      id: 2,
      title: "Golden Moments",
      date: "Memory 02",
      category: "Sweet Moments",
      caption: "Every frame with you turns an ordinary moment into an unforgettable treasure.",
      src: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.41.38 PM.jpeg"),
      fallback: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.41.38 PM.jpeg")
    },
    {
      id: 3,
      title: "Pure Happiness",
      date: "Memory 03",
      category: "Adventures",
      caption: "Caught in the happiest of moments, laughing without a care in the world.",
      src: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.41.38 PM (1).jpeg"),
      fallback: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.41.38 PM (1).jpeg")
    },
    {
      id: 4,
      title: "Effortless Grace",
      date: "Memory 04",
      category: "Special Dates",
      caption: "Always carrying warmth, kindness, and beauty wherever you go.",
      src: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.41.39 PM.jpeg"),
      fallback: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.41.39 PM.jpeg")
    },
    {
      id: 5,
      title: "Sweetest Vibes",
      date: "Memory 05",
      category: "Sweet Moments",
      caption: "Moments I replay in my heart whenever I want to smile.",
      src: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.41.39 PM (1).jpeg"),
      fallback: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.41.39 PM (1).jpeg")
    },
    {
      id: 6,
      title: "Unforgettable Glow",
      date: "Memory 06",
      category: "Special Dates",
      caption: "Shining brighter than every star in the midnight sky.",
      src: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.41.39 PM (2).jpeg"),
      fallback: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.41.39 PM (2).jpeg")
    },
    {
      id: 7,
      title: "Cherished Together",
      date: "Memory 07",
      category: "Adventures",
      caption: "Side by side, turning little moments into lifelong stories.",
      src: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.41.40 PM (2).jpeg"),
      fallback: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.41.40 PM (2).jpeg")
    },
    {
      id: 8,
      title: "Timeless Joy",
      date: "Memory 08",
      category: "Sweet Moments",
      caption: "Your happiness will always be my favourite sight in the world.",
      src: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.44.07 PM.jpeg"),
      fallback: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.44.07 PM.jpeg")
    },
    {
      id: 9,
      title: "Heartfelt Smiles",
      date: "Memory 09",
      category: "Sweet Moments",
      caption: "The kind of genuine warmth that makes everything feel alright.",
      src: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.44.08 PM.jpeg"),
      fallback: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.44.08 PM.jpeg")
    },
    {
      id: 10,
      title: "Brightest Days",
      date: "Memory 10",
      category: "Adventures",
      caption: "Every adventure feels lighter and sweeter with you around.",
      src: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.44.08 PM (1).jpeg"),
      fallback: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.44.08 PM (1).jpeg")
    },
    {
      id: 11,
      title: "Candid Magic",
      date: "Memory 11",
      category: "Adventures",
      caption: "Unscripted smiles and memories that stay forever.",
      src: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.44.08 PM (2).jpeg"),
      fallback: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.44.08 PM (2).jpeg")
    },
    {
      id: 12,
      title: "Precious Chapter",
      date: "Memory 12",
      category: "Special Dates",
      caption: "A reminder of how lucky I am to have you in my life.",
      src: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.44.09 PM (1).jpeg"),
      fallback: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.44.09 PM (1).jpeg")
    },
    {
      id: 13,
      title: "Special Bond",
      date: "Memory 13",
      category: "Special Dates",
      caption: "More than words can say, this bond means everything to me.",
      src: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.44.09 PM (2).jpeg"),
      fallback: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.44.09 PM (2).jpeg")
    },
    {
      id: 14,
      title: "Forever Favourite",
      date: "Memory 14",
      category: "Sweet Moments",
      caption: "One of those pictures that instantly brings a smile to my face.",
      src: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.48.16 PM.jpeg"),
      fallback: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.48.16 PM.jpeg")
    },
    {
      id: 15,
      title: "Endless Sparkle",
      date: "Memory 15",
      category: "Special Dates",
      caption: "May your life always shine just as beautifully as this moment.",
      src: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.48.16 PM (1).jpeg"),
      fallback: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.48.16 PM (1).jpeg")
    }
  ],

  // Memorable Video Memories (all 4 MP4 videos from public/assets/videos/)
  videos: [
    {
      id: 1,
      title: "Moments of Pure Happiness",
      date: "Video Memory 01",
      description: "A special clip filled with genuine smiles and unforgettable warmth.",
      src: assetPath("/assets/videos/WhatsApp Video 2026-11-26 at 6.41.37 PM.mp4"),
      fallbackPoster: assetPath("/assets/photos/birthday/WhatsApp Image 2026-11-26 at 6.41.40 PM (1).jpeg")
    },
    {
      id: 2,
      title: "Cherished Vibes Together",
      date: "Video Memory 02",
      description: "Little moments caught in motion that mean the world to me.",
      src: assetPath("/assets/videos/WhatsApp Video 2026-11-26 at 7.38.09 PM.mp4"),
      fallbackPoster: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.41.38 PM.jpeg")
    },
    {
      id: 3,
      title: "Unfiltered Smiles & Joy",
      date: "Video Memory 03",
      description: "Memories that make every day brighter just by watching them again.",
      src: assetPath("/assets/videos/WhatsApp Video 2026-11-26 at 7.38.12 PM.mp4"),
      fallbackPoster: assetPath("/assets/photos/gallery/WhatsApp Image 2026-11-26 at 6.44.08 PM.jpeg")
    },
    {
      id: 4,
      title: "Forever in My Heart",
      date: "Video Memory 04",
      description: "Another beautiful memory saved forever in our birthday story.",
      src: assetPath("/assets/videos/WhatsApp Video 2026-11-26 at 7.38.17 PM.mp4"),
      fallbackPoster: assetPath("/assets/photos/final/WhatsApp Image 2026-11-26 at 6.48.19 PM.jpeg")
    }
  ],

  // Memorable Days Timeline (all 9 photos from public/assets/photos/timeline/)
  timeline: [
    {
      id: 1,
      date: "Chapter 01",
      title: "Where Our Story Began",
      description: "Who knew that one meeting would grow into one of the most cherished bonds of my life?",
      icon: "Sparkles",
      photo: assetPath("/assets/photos/timeline/file_00000000b7dc8208bf125f747428de7c.png")
    },
    {
      id: 2,
      date: "Chapter 02",
      title: "First Unforgettable Smiles",
      description: "Those early moments that made everything feel effortlessly special and bright.",
      icon: "Heart",
      photo: assetPath("/assets/photos/timeline/WhatsApp Image 2026-11-26 at 6.41.30 PM.jpeg")
    },
    {
      id: 3,
      date: "Chapter 03",
      title: "Deep Talks & Late Hours",
      description: "Hours felt like minutes whenever we talked about everything and nothing at all.",
      icon: "MessageCircleHeart",
      photo: assetPath("/assets/photos/timeline/WhatsApp Image 2026-11-26 at 6.41.37 PM.jpeg")
    },
    {
      id: 4,
      date: "Chapter 04",
      title: "Laughter That Heals",
      description: "Your presence has a magical way of turning any hard day into warmth and laughter.",
      icon: "Smile",
      photo: assetPath("/assets/photos/timeline/WhatsApp Image 2026-11-26 at 6.41.38 PM (1).jpeg")
    },
    {
      id: 5,
      date: "Chapter 05",
      title: "Standing By Each Other",
      description: "Through every high and low, you never let me feel alone — and I'll never forget that.",
      icon: "Shield",
      photo: assetPath("/assets/photos/timeline/WhatsApp Image 2026-11-26 at 6.44.09 PM (1).jpeg")
    },
    {
      id: 6,
      date: "Chapter 06",
      title: "Little Moments, Big Memories",
      description: "Even the simplest days together turned into stories I'll always hold close.",
      icon: "Sparkles",
      photo: assetPath("/assets/photos/timeline/WhatsApp Image 2026-11-26 at 6.48.17 PM.jpeg")
    },
    {
      id: 7,
      date: "Chapter 07",
      title: "Pure Sunshine",
      description: "You keep bringing light into my world, and I always want to see you shine.",
      icon: "Sun",
      photo: assetPath("/assets/photos/timeline/WhatsApp Image 2026-11-26 at 6.48.17 PM (1).jpeg")
    },
    {
      id: 8,
      date: "Chapter 08",
      title: "A Bond Beyond Words",
      description: "Understanding without needing to explain — a rare and priceless connection.",
      icon: "Heart",
      photo: assetPath("/assets/photos/timeline/WhatsApp Image 2026-11-26 at 6.48.17 PM (2).jpeg")
    },
    {
      id: 9,
      date: "Today – Your Special Day",
      title: "Celebrating You, Cutiee Pandaa",
      description: "Celebrating your life, your kindness, and the irreplaceable place you hold in my heart.",
      icon: "Gift",
      photo: assetPath("/assets/photos/timeline/WhatsApp Image 2026-11-26 at 6.48.18 PM (1).jpeg")
    }
  ],

  // Balloon Surprise Messages
  balloons: [
    { id: 1, color: "from-pink-500 to-rose-600", text: "You bring so much light into every room! 💖" },
    { id: 2, color: "from-purple-500 to-indigo-600", text: "May all your biggest dreams turn into reality this year! 🌟" },
    { id: 3, color: "from-blue-500 to-cyan-500", text: "Never forget how incredibly strong and wonderful you are! 🚀" },
    { id: 4, color: "from-amber-400 to-orange-500", text: "Your smile is pure magic — keep shining like the sun! ☀️" },
    { id: 5, color: "from-fuchsia-500 to-pink-600", text: "You deserve all the universe's blessings today and forever! 🦋" },
    { id: 6, color: "from-emerald-400 to-teal-600", text: "Cheers to another year of unforgettable memories together! 🥂" }
  ],

  // Mystery Gift Boxes (all 3 photos from public/assets/photos/gifts/)
  gifts: [
    {
      id: 1,
      boxColor: "linear-gradient(135deg, #ec4899, #7c3aed)",
      ribbonColor: "#f3d58d",
      title: "Special Keepsake #1 — Made With Love",
      description: "A heartfelt surprise chosen especially to bring the brightest smile to your face.",
      image: assetPath("/assets/photos/gifts/WhatsApp Image 2026-11-26 at 7.34.28 PM.jpeg"),
      badge: "Precious Gift"
    },
    {
      id: 2,
      boxColor: "linear-gradient(135deg, #7c3aed, #4338ca)",
      ribbonColor: "#f472b6",
      title: "Special Keepsake #2 — Endless Happiness",
      description: "Wrapped with warm wishes for your peace, joy, and every dream in your heart.",
      image: assetPath("/assets/photos/gifts/WhatsApp Image 2026-11-26 at 7.34.28 PM (1).jpeg"),
      badge: "Pure Magic"
    },
    {
      id: 3,
      boxColor: "linear-gradient(135deg, #db2777, #4f46e5)",
      ribbonColor: "#ffffff",
      title: "Special Keepsake #3 — Forever Treasure",
      description: "A token of how precious and special you will always be to me.",
      image: assetPath("/assets/photos/gifts/WhatsApp Image 2026-11-26 at 7.34.29 PM.jpeg"),
      badge: "Forever Yours"
    }
  ],

  // Emotional Birthday Letter fallback metadata
  letter: {
    salutation: "My Dearest,",
    paragraphs: [],
    closing: "With endless love and gratitude,",
    author: "Your Forever Person... 🦋"
  },

  // Final Birthday Wishes
  finalWishes: {
    heroTitle: "ONCE AGAIN, HAPPY BIRTHDAY! ❤️",
    message1: "May your life be filled with happiness, success, endless opportunities, and beautiful memories.",
    message2: "Thank you for being a special part of my journey.",
    message3: "No matter how many pages this website has, the memories we share will always be my favourite story.",
    message4: "Keep smiling, keep shining, and never stop being you!",
    celebrateCallout: "HAPPY BIRTHDAY! 🎂❤️",
    replayButtonText: "REPLAY OUR JOURNEY ♾️"
  }
};

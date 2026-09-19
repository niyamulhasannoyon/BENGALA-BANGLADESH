'use client';

import React, { useEffect, useRef } from 'react';
import { useHeroStore } from '@/lib/store/useHeroStore';
import { IDestination } from '@/lib/models/Destination';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';
import { CarouselDeck } from './CarouselDeck';
import { DockControls } from './DockControls';
import { Navbar } from '@/components/ui/Navbar';
import { TrustStrip } from '@/components/home/TrustStrip';
import { ExpeditionsOverview } from '@/components/home/ExpeditionsOverview';
import { HeritageNarrative } from '@/components/home/HeritageNarrative';
import { TestimonialsPress } from '@/components/home/TestimonialsPress';
import { BespokeBanner } from '@/components/home/BespokeBanner';
import { Footer } from '@/components/ui/Footer';
import { ExpeditionModal } from '@/components/ui/ExpeditionModal';
import { BookmarksDrawer } from '@/components/ui/BookmarksDrawer';

interface HeroShowcaseProps {
  initialDestinations: IDestination[];
  initialBookmarks?: string[];
}

export const HeroShowcase: React.FC<HeroShowcaseProps> = ({
  initialDestinations,
  initialBookmarks = [],
}) => {
  const {
    destinations,
    setDestinations,
    setBookmarkedIds,
    nextSlide,
    prevSlide,
    isPaused,
    isTransitioning,
    slideDurationMs,
    setProgress,
    closeExpeditionModal,
    activeModalDestination,
    isBookmarksDrawerOpen,
    toggleBookmarksDrawer,
  } = useHeroStore();

  // Initialize store on mount with server data
  useEffect(() => {
    if (initialDestinations && initialDestinations.length > 0) {
      setDestinations(initialDestinations);
    }
    // Load bookmarks from local storage if present, merged with initialBookmarks
    try {
      const stored = localStorage.getItem('bengala_saved_expeditions');
      const localIds = stored ? JSON.parse(stored) : [];
      const merged = Array.from(new Set([...initialBookmarks, ...localIds]));
      setBookmarkedIds(merged);
    } catch {
      setBookmarkedIds(initialBookmarks);
    }
  }, [initialDestinations, initialBookmarks, setDestinations, setBookmarkedIds]);

  // Persist bookmarks changes to localStorage
  const bookmarkedIds = useHeroStore((s) => s.bookmarkedIds);
  useEffect(() => {
    try {
      localStorage.setItem('bengala_saved_expeditions', JSON.stringify(bookmarkedIds));
    } catch {
      // Ignore
    }
  }, [bookmarkedIds]);

  // Autoplay Timer with Pause-on-hover & Smooth Progress Tracking
  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(0);

  useEffect(() => {
    if (destinations.length <= 1) return;

    let animFrameId: number;
    startTimeRef.current = Date.now() - pausedTimeRef.current;

    const tick = () => {
      if (!isPaused && !activeModalDestination && !isBookmarksDrawerOpen && !isTransitioning) {
        const elapsed = Date.now() - (startTimeRef.current || Date.now());
        const pct = Math.min(100, (elapsed / slideDurationMs) * 100);
        setProgress(pct);

        if (elapsed >= slideDurationMs) {
          startTimeRef.current = Date.now();
          pausedTimeRef.current = 0;
          setProgress(0);
          nextSlide();
        }
      } else {
        // Freeze progress when paused
        if (startTimeRef.current) {
          pausedTimeRef.current = Date.now() - startTimeRef.current;
        }
      }
      animFrameId = requestAnimationFrame(tick);
    };

    animFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [
    isPaused,
    activeModalDestination,
    isBookmarksDrawerOpen,
    isTransitioning,
    slideDurationMs,
    destinations.length,
    nextSlide,
    setProgress,
  ]);

  // Keyboard navigation: Left/Right arrows, ESC for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape') {
        if (activeModalDestination) {
          closeExpeditionModal();
        } else if (isBookmarksDrawerOpen) {
          toggleBookmarksDrawer();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, activeModalDestination, closeExpeditionModal, isBookmarksDrawerOpen, toggleBookmarksDrawer]);

  return (
    <div className="relative min-h-screen bg-[#080D0A] text-alabaster overflow-x-hidden">
      {/* 1. Slim Sticky Navigation Header */}
      <Navbar />

      {/* 2. Full-Bleed Hero Section */}
      <section className="relative min-h-[90vh] lg:min-h-[calc(100vh-4.5rem)] flex flex-col justify-between overflow-hidden">
        {/* Synced Cross-fade Hero Background */}
        <HeroBackground />

        {/* Central Hero Stage: Typography + Stepped Deck */}
        <div className="relative z-10 w-full flex-1 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-center py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
            {/* Left: Staggered Hero Typography & Narrative */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <HeroContent />
            </div>

            {/* Right: Editorial Stepped Deck */}
            <div className="lg:col-span-5 flex flex-col justify-center items-end">
              <CarouselDeck />
            </div>
          </div>
        </div>

        {/* Floating Bottom Dock Controls */}
        <DockControls />
      </section>

      {/* 3. Trust & Sustainability Credentials */}
      <TrustStrip />

      {/* 4. Grand Portfolio Overview Grid */}
      <ExpeditionsOverview />

      {/* 5. Heritage & Private Fleet Narrative */}
      <HeritageNarrative />

      {/* 6. International Press & Guest Chronicles */}
      <TestimonialsPress />

      {/* 7. Bespoke Journey Invitation Banner */}
      <BespokeBanner />

      {/* 8. Comprehensive Editorial Footer */}
      <Footer />

      {/* VIP Concierge Modal & Saved Expeditions Drawer */}
      <ExpeditionModal />
      <BookmarksDrawer />
    </div>
  );
};

'use client';

import React, { useEffect, useRef } from 'react';
import { useHeroStore } from '@/lib/store/useHeroStore';
import { IDestination } from '@/lib/models/Destination';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';
import { CarouselDeck } from './CarouselDeck';
import { DockControls } from './DockControls';
import { Navbar } from '@/components/ui/Navbar';
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

  // Autoplay Timer (6000ms) with Pause-on-hover & Smooth Progress Tracking
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
    <main className="relative w-screen h-screen min-h-[680px] overflow-hidden bg-bengal-950">
      {/* 1. Synced Cross-fade Hero Background */}
      <HeroBackground />

      {/* 2. Top Luxury Navigation */}
      <Navbar />

      {/* 3. Central Stage: Left Content + Right 3D Carousel Deck */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col justify-center pb-20 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center w-full">
          {/* Left: Staggered Hero Typography & Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <HeroContent />
          </div>

          {/* Right: 3D Perspective Card Deck */}
          <div className="lg:col-span-5 flex flex-col justify-center items-end">
            <CarouselDeck />
          </div>
        </div>
      </div>

      {/* 4. Floating Bottom Luxury Dock Controls */}
      <DockControls />

      {/* 5. Deep Itinerary & VIP Concierge Inquiry Modal */}
      <ExpeditionModal />

      {/* 6. Saved Expeditions Drawer */}
      <BookmarksDrawer />
    </main>
  );
};

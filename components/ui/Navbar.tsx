'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeroStore } from '@/lib/store/useHeroStore';
import { Bookmark, Volume2, VolumeX, Compass, ChevronDown, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { TRANSITION_FAST, TRANSITION_LUXURY } from '@/lib/motion';

export const Navbar: React.FC = () => {
  const {
    destinations,
    activeIndex,
    bookmarkedIds,
    toggleBookmarksDrawer,
    isSoundscapePlaying,
    toggleSoundscape,
    openExpeditionModal,
    goToSlide,
  } = useHeroStore();

  const [isDestDropdownOpen, setIsDestDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeDestination = destinations[activeIndex] || destinations[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDestDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Web Audio ambient luxury soundscape
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);

  useEffect(() => {
    if (isSoundscapePlaying) {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.05, ctx.currentTime);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        const freqs = [82.41, 123.47, 164.81, 196.0, 293.66];
        const oscs: OscillatorNode[] = [];

        freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(320, ctx.currentTime);

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          osc.connect(filter);
          filter.connect(masterGain);
          osc.start();
          oscs.push(osc);
        });

        oscNodesRef.current = oscs;
      } catch (err) {
        console.warn('Web Audio Ambient synth error:', err);
      }
    } else {
      if (oscNodesRef.current.length > 0) {
        oscNodesRef.current.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // Ignore
          }
        });
        oscNodesRef.current = [];
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    }

    return () => {
      oscNodesRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch {
          // Ignore
        }
      });
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [isSoundscapePlaying]);

  return (
    <header className="sticky top-0 left-0 right-0 z-40 glass-header transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 sm:py-5 flex items-center justify-between">
        {/* Left: Brand Monogram */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-brass">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.04] border border-brass/40 text-brass group-hover:border-brass transition-colors">
            <Compass className="w-4.5 h-4.5 text-brass" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-syne font-bold text-lg tracking-[0.22em] text-alabaster">
                BENGALA
              </span>
              <span className="w-1 h-1 rounded-full bg-brass" />
              <span className="text-[10px] uppercase font-semibold tracking-[0.25em] text-mist">
                BANGLADESH
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.22em] text-brass/90 font-medium">
              Ultra-Luxury Expeditions
            </span>
          </div>
        </Link>

        {/* Center: Editorial Navigation & Destination Dropdown (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.18em] font-medium text-mist">
          {/* Destination Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDestDropdownOpen(!isDestDropdownOpen)}
              onMouseEnter={() => setIsDestDropdownOpen(true)}
              aria-expanded={isDestDropdownOpen}
              className="flex items-center gap-1.5 hover:text-alabaster transition-colors py-2 focus:outline-none"
            >
              <span className={isDestDropdownOpen ? 'text-brass' : ''}>Destinations</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDestDropdownOpen ? 'rotate-180 text-brass' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isDestDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={TRANSITION_FAST}
                  onMouseLeave={() => setIsDestDropdownOpen(false)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] p-3 rounded-2xl bg-[#0E1612] border border-white/[0.1] shadow-2xl z-50 before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
                >
                  <div className="text-[10px] uppercase tracking-[0.22em] text-stone font-semibold px-3 py-1.5 border-b border-white/[0.06] mb-2 flex items-center justify-between">
                    <span>Curated Sanctuaries</span>
                    <span>{destinations.length} Expeditions</span>
                  </div>

                  <div className="space-y-1.5">
                    {destinations.map((dest, i) => (
                      <Link
                        key={dest.slug}
                        href={`/destinations/${dest.slug}`}
                        onClick={() => {
                          goToSlide(i);
                          setIsDestDropdownOpen(false);
                        }}
                        className="group flex items-center gap-3.5 p-2 rounded-xl hover:bg-white/[0.04] transition-colors"
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-bengal-surface">
                          <Image
                            src={dest.cardThumbUrl}
                            alt={dest.title}
                            fill
                            sizes="48px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] uppercase tracking-wider text-brass font-semibold">
                              {dest.categoryBadge}
                            </span>
                          </div>
                          <h4 className="font-syne text-xs font-bold text-alabaster truncate group-hover:text-brass transition-colors">
                            {dest.title}
                          </h4>
                          <p className="text-[11px] text-mist truncate font-normal">
                            {dest.region}
                          </p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-stone group-hover:text-brass group-hover:translate-x-1 transition-all shrink-0" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/#heritage" className="hover:text-alabaster transition-colors">
            Heritage
          </Link>
          <Link href="/#trust" className="hover:text-alabaster transition-colors">
            Credentials
          </Link>
          <Link href="/#press" className="hover:text-alabaster transition-colors">
            Press
          </Link>
        </nav>

        {/* Right: Soundscape, Bookmarks, and VIP CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Ambient Soundscape Toggle */}
          <button
            onClick={toggleSoundscape}
            aria-label={isSoundscapePlaying ? 'Mute ambient soundscape' : 'Play ambient soundscape'}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] text-mist hover:text-alabaster hover:border-brass/30 transition-all"
            title={isSoundscapePlaying ? 'Soundscape On (Click to Mute)' : 'Play Ambient Soundscape'}
          >
            {isSoundscapePlaying ? (
              <Volume2 className="w-4 h-4 text-brass animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Bookmarks Trigger */}
          <button
            onClick={toggleBookmarksDrawer}
            aria-label="View saved expeditions"
            className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] text-mist hover:text-alabaster hover:border-brass/30 transition-all"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarkedIds.length > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4.5 h-4.5 px-1 rounded-full bg-brass text-[10px] font-bold text-black shadow-md">
                {bookmarkedIds.length}
              </span>
            )}
          </button>

          {/* Plan Journey Primary CTA (Desktop) */}
          <button
            onClick={() => openExpeditionModal(activeDestination)}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brass hover:bg-brass-light text-black text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200 active:scale-95 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Plan Journey</span>
          </button>

          {/* Mobile Hamburger Menu Toggle (<md) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] text-alabaster hover:border-brass/40 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={TRANSITION_FAST}
            className="md:hidden bg-[#080D0A] border-b border-white/[0.1] px-6 py-6 overflow-hidden"
          >
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brass block mb-3">
                  Expeditions
                </span>
                <div className="grid grid-cols-1 gap-2.5">
                  {destinations.map((dest, i) => (
                    <Link
                      key={dest.slug}
                      href={`/destinations/${dest.slug}`}
                      onClick={() => {
                        goToSlide(i);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-brass/30 transition-all"
                    >
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-brass/80 font-bold block">
                          {dest.categoryBadge}
                        </span>
                        <span className="font-syne font-bold text-sm text-alabaster">
                          {dest.title}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-mist" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.08] flex flex-col gap-3 text-xs uppercase tracking-widest text-mist">
                <Link
                  href="/#heritage"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-alabaster py-1"
                >
                  Heritage & Delta Stewardship
                </Link>
                <Link
                  href="/#trust"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-alabaster py-1"
                >
                  Private Aviation & Safety
                </Link>
                <Link
                  href="/#press"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-alabaster py-1"
                >
                  Press & Reviews
                </Link>
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openExpeditionModal(activeDestination);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-brass hover:bg-brass-light text-black text-xs font-semibold uppercase tracking-[0.15em] transition-all"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Plan Bespoke Journey</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

'use client';

import React, { useEffect, useRef } from 'react';
import { useHeroStore } from '@/lib/store/useHeroStore';
import { Bookmark, Volume2, VolumeX, Compass, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    destinations,
    activeIndex,
    bookmarkedIds,
    toggleBookmarksDrawer,
    isSoundscapePlaying,
    toggleSoundscape,
    openExpeditionModal,
  } = useHeroStore();

  const activeDestination = destinations[activeIndex] || destinations[0];

  // Synthesized luxury ambient audio using Web Audio API (zero external asset dependency)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);

  useEffect(() => {
    if (isSoundscapePlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.06, ctx.currentTime);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Ambient chord frequencies (E minor cinematic luxury pad: E2, B2, E3, G3, D4)
        const freqs = [82.41, 123.47, 164.81, 196.0, 293.66];
        const oscs: OscillatorNode[] = [];

        freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(320, ctx.currentTime);

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Subtle LFO drift
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
            // Ignore disconnect errors
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
          // ignore
        }
      });
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [isSoundscapePlaying]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-10 py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Monogram */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full glass-panel border border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-950/50">
            <Compass className="w-5 h-5 text-emerald-400" />
            <span className="absolute -inset-1 rounded-full bg-emerald-500/10 blur-sm pointer-events-none" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-syne font-extrabold text-lg sm:text-xl tracking-[0.25em] text-white">
                BENGALA
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] uppercase font-semibold tracking-[0.3em] text-neutral-400">
                BANGLADESH
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-emerald-400/80 font-medium">
              Ultra-Luxury Expeditions
            </span>
          </div>
        </div>

        {/* Center Region Indicator (Desktop) */}
        <div className="hidden lg:flex pointer-events-auto items-center gap-6 px-5 py-2 rounded-full glass-panel border border-white/10 text-xs text-neutral-300">
          <span className="text-neutral-500 uppercase tracking-wider font-mono text-[10px]">CURRENT LOCALE</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-medium text-white tracking-wide">{activeDestination?.region || 'Bengal Delta'}</span>
          </div>
          <span className="text-neutral-600">|</span>
          <span className="text-emerald-400 font-mono text-[11px] font-semibold">
            {activeDestination?.coordinates ? `${activeDestination.coordinates.lat.toFixed(2)}°N, ${activeDestination.coordinates.lng.toFixed(2)}°E` : '21.94°N, 89.18°E'}
          </span>
        </div>

        {/* Right Actions: Ambiance Sound, Bookmarks, VIP Concierge */}
        <div className="pointer-events-auto flex items-center gap-3">
          {/* Ambient Soundscape Toggle */}
          <button
            onClick={toggleSoundscape}
            aria-label={isSoundscapePlaying ? 'Mute ambient soundscape' : 'Play ambient soundscape'}
            className="flex items-center justify-center w-10 h-10 rounded-full glass-button text-neutral-300 hover:text-white transition-all group"
            title={isSoundscapePlaying ? 'Soundscape On (Click to Mute)' : 'Play Ambient Soundscape'}
          >
            {isSoundscapePlaying ? (
              <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-neutral-400 group-hover:text-white" />
            )}
          </button>

          {/* Bookmarks Trigger */}
          <button
            onClick={toggleBookmarksDrawer}
            aria-label="View saved expeditions"
            className="relative flex items-center justify-center w-10 h-10 rounded-full glass-button text-neutral-300 hover:text-white transition-all group"
          >
            <Bookmark className="w-4 h-4 group-hover:text-emerald-400 transition-colors" />
            {bookmarkedIds.length > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-emerald-500 text-[10px] font-bold text-black shadow-lg">
                {bookmarkedIds.length}
              </span>
            )}
          </button>

          {/* VIP Concierge Button */}
          {activeDestination && (
            <button
              onClick={() => openExpeditionModal(activeDestination)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full glass-button bg-emerald-500/15 border-emerald-500/30 text-emerald-300 hover:text-white hover:bg-emerald-500/25 transition-all text-xs font-semibold tracking-wider uppercase shadow-lg shadow-emerald-950/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Charter VIP</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

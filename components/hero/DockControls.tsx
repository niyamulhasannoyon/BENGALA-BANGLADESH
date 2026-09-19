'use client';

import React from 'react';
import { useHeroStore } from '@/lib/store/useHeroStore';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { formatIndex } from '@/lib/utils';

export const DockControls: React.FC = () => {
  const {
    destinations,
    activeIndex,
    progress,
    isPaused,
    nextSlide,
    prevSlide,
    goToSlide,
    setIsPaused,
  } = useHeroStore();

  const total = destinations.length;

  return (
    <div className="fixed bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 select-none">
      <div className="flex items-center gap-3 sm:gap-6 px-5 py-3 rounded-full glass-dock">
        {/* Prev Arrow */}
        <button
          onClick={prevSlide}
          aria-label="Previous destination"
          className="p-2 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-all active:scale-90"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2]" />
        </button>

        {/* Dynamic Multi-Segment / Continuous Progress Bar */}
        <div className="flex items-center gap-2">
          {destinations.map((_, idx) => {
            const isActive = idx === activeIndex;
            const isPast = idx < activeIndex;

            return (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="group relative py-2 px-1 focus:outline-none"
              >
                <div className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300 bg-white/15 w-8 sm:w-12 group-hover:bg-white/30">
                  {/* Dynamic fill */}
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transition-all"
                    style={{
                      width: isActive ? `${progress}%` : isPast ? '100%' : '0%',
                      transition: isActive ? 'width 50ms linear' : 'width 300ms ease',
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Next Arrow */}
        <button
          onClick={nextSlide}
          aria-label="Next destination"
          className="p-2 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-all active:scale-90"
        >
          <ChevronRight className="w-5 h-5 stroke-[2]" />
        </button>

        <div className="w-[1px] h-5 bg-white/20 hidden sm:block" />

        {/* Index Counter ("01 / 05") */}
        <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm tracking-widest text-neutral-300 font-semibold">
          <span className="text-emerald-400 text-sm sm:text-base font-bold">
            {formatIndex(activeIndex)}
          </span>
          <span className="text-neutral-500">/</span>
          <span className="text-neutral-400">{formatIndex(total - 1)}</span>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
          className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-all ml-1"
          title={isPaused ? 'Resume rotation' : 'Pause rotation'}
        >
          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};

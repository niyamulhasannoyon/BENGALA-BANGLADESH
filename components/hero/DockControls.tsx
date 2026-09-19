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
    <div className="relative z-30 select-none flex justify-center py-4 sm:py-6">
      <div className="inline-flex items-center gap-2.5 sm:gap-5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full glass-dock">
        {/* Prev Arrow */}
        <button
          onClick={prevSlide}
          aria-label="Previous destination"
          className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-mist hover:text-alabaster transition-all active:scale-90"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
        </button>

        {/* Dynamic Multi-Segment Progress Indicators */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {destinations.map((_, idx) => {
            const isActive = idx === activeIndex;
            const isPast = idx < activeIndex;

            return (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to expedition ${idx + 1}`}
                className="group relative py-2 px-0.5 focus:outline-none"
              >
                <div className="relative h-1 sm:h-1.5 rounded-full overflow-hidden transition-all duration-300 bg-white/15 w-6 sm:w-10 group-hover:bg-white/30">
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-brass rounded-full transition-all"
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
          className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-mist hover:text-alabaster transition-all active:scale-90"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
        </button>

        <div className="w-[1px] h-4 bg-white/15 hidden sm:block" />

        {/* Index Counter ("01 / 05") */}
        <div className="flex items-center gap-1 font-mono text-xs sm:text-sm tracking-widest text-mist font-medium">
          <span className="text-brass font-bold">
            {formatIndex(activeIndex)}
          </span>
          <span className="text-stone">/</span>
          <span className="text-stone">{formatIndex(total - 1)}</span>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
          className="p-1.5 rounded-full hover:bg-white/10 text-stone hover:text-alabaster transition-all ml-0.5"
          title={isPaused ? 'Resume rotation' : 'Pause rotation'}
        >
          {isPaused ? <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
        </button>
      </div>
    </div>
  );
};

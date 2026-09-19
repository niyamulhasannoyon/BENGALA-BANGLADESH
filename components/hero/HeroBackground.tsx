'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeroStore } from '@/lib/store/useHeroStore';

export const HeroBackground: React.FC = () => {
  const { destinations, activeIndex } = useHeroStore();
  const current = destinations[activeIndex] || destinations[0];

  if (!current) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      <AnimatePresence initial={false}>
        <motion.div
          key={current.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {/* Subtle slow cinematic Ken Burns zoom */}
          <motion.div
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.04 }}
            transition={{ duration: 10, ease: 'linear' }}
            className="relative w-full h-full"
          >
            <Image
              src={current.heroBgUrl}
              alt={current.title}
              fill
              priority={activeIndex === 0}
              sizes="100vw"
              placeholder={current.blurDataUrl ? 'blur' : 'empty'}
              blurDataURL={current.blurDataUrl || undefined}
              className="object-cover object-center"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Multi-Stop Obsidian Vignette Scrim (Ensures WCAG AAA contrast for typography) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080D0A] via-[#080D0A]/55 to-[#080D0A]/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080D0A]/90 via-[#080D0A]/40 to-transparent lg:w-3/4" />
      <div className="absolute inset-0 cinematic-vignette opacity-80" />

      {/* Subtle Warm Forest & Antique Brass Ambient Mist */}
      <div className="absolute top-1/4 left-1/5 w-96 h-96 rounded-full bg-emerald-900/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-[#C5A880]/10 blur-[140px] pointer-events-none" />
    </div>
  );
};

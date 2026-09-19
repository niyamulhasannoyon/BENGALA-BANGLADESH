'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeroStore } from '@/lib/store/useHeroStore';

export const HeroBackground: React.FC = () => {
  const { destinations, activeIndex } = useHeroStore();
  const current = destinations[activeIndex];

  if (!current) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      <AnimatePresence initial={false}>
        <motion.div
          key={current.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {/* Subtle slow cinematic Ken Burns zoom */}
          <motion.div
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 6, ease: 'linear' }}
            className="relative w-full h-full"
          >
            <Image
              src={current.heroBgUrl}
              alt={current.title}
              fill
              priority={activeIndex === 0 || activeIndex === 1}
              sizes="100vw"
              quality={90}
              placeholder={current.blurDataUrl ? 'blur' : 'empty'}
              blurDataURL={current.blurDataUrl || undefined}
              className="object-cover object-center"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Cinematic Overlays: Multi-Stop Gradient Vignette & Obsidian Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-bengal-950 via-bengal-950/50 to-bengal-950/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-bengal-950/90 via-bengal-950/40 to-transparent lg:w-3/4" />
      <div className="absolute inset-0 cinematic-vignette opacity-80" />

      {/* Subtle Atmospheric Mist Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[32rem] h-[32rem] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />
    </div>
  );
};

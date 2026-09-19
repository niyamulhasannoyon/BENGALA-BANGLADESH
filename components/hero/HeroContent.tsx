'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeroStore } from '@/lib/store/useHeroStore';
import { toggleBookmarkAction } from '@/app/actions/destinationActions';
import { useToast } from '@/components/ui/ToastProvider';
import { Star, ArrowUpRight, Bookmark, Calendar, MapPin, Sparkles } from 'lucide-react';

export const HeroContent: React.FC = () => {
  const {
    destinations,
    activeIndex,
    bookmarkedIds,
    toggleBookmarkOptimistic,
    openExpeditionModal,
  } = useHeroStore();
  const { showToast } = useToast();

  const current = destinations[activeIndex];

  if (!current) return null;

  const isBookmarked = bookmarkedIds.includes(current._id || '');

  const handleBookmarkToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!current._id) return;

    const newStatus = toggleBookmarkOptimistic(current._id);
    showToast({
      title: newStatus ? 'Expedition Saved' : 'Expedition Removed',
      description: newStatus
        ? `${current.title} added to your private itinerary.`
        : `${current.title} removed from saved list.`,
      type: 'success',
    });

    try {
      await toggleBookmarkAction(current._id);
    } catch {
      // Revert if server action failed
      toggleBookmarkOptimistic(current._id);
      showToast({
        title: 'Sync Error',
        description: 'Failed to update remote bookmark.',
        type: 'error',
      });
    }
  };

  return (
    <div className="relative z-10 w-full max-w-2xl text-left flex flex-col justify-center select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.slug}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {/* Tagline / Category Pill */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-[0.2em] shadow-lg shadow-emerald-950/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{current.categoryBadge}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{current.region}, {current.country}</span>
            </div>
          </motion.div>

          {/* Main Bold Sculptural Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2"
          >
            <h1 className="font-syne text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05] drop-shadow-2xl">
              {current.title}
            </h1>
            <p className="font-serif italic text-base sm:text-lg text-emerald-200/90 tracking-wide font-light">
              &ldquo;{current.tagLine}&rdquo;
            </p>
          </motion.div>

          {/* Editorial Narrative Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm sm:text-base text-neutral-300/90 leading-relaxed font-normal max-w-xl line-clamp-3 sm:line-clamp-none drop-shadow"
          >
            {current.description}
          </motion.p>

          {/* Key Expedition Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4 text-xs"
          >
            {/* Rating */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-panel text-amber-300">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(current.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-neutral-600'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold font-mono text-white text-xs ml-1">
                {current.rating.toFixed(1)}
              </span>
            </div>

            {/* Best Season */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-panel text-neutral-300">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Optimal: <strong className="text-white font-medium">{current.bestSeason}</strong></span>
            </div>

            {/* Curated duration */}
            {current.curatedExpedition && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-panel text-neutral-300">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{current.curatedExpedition.duration}</span>
              </div>
            )}
          </motion.div>

          {/* Action CTAs: Glowing "Explore" + "Save Itinerary" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center gap-4 pt-2"
          >
            {/* Glowing CTA Button */}
            <button
              onClick={() => openExpeditionModal(current)}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 text-black font-semibold text-sm tracking-wider uppercase shadow-[0_0_35px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(34,211,238,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <span>Explore Expedition</span>
              <div className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <ArrowUpRight className="w-4 h-4 text-black stroke-[2.5]" />
              </div>
            </button>

            {/* Quick Bookmark Toggle */}
            <button
              onClick={handleBookmarkToggle}
              aria-label={isBookmarked ? 'Remove from saved' : 'Save expedition'}
              className={`p-4 rounded-full glass-button flex items-center justify-center transition-all ${
                isBookmarked
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-lg shadow-emerald-950/50'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-emerald-400' : ''}`} />
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

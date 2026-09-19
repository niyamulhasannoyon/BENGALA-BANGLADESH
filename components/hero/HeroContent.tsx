'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeroStore } from '@/lib/store/useHeroStore';
import { toggleBookmarkAction } from '@/app/actions/destinationActions';
import { useToast } from '@/components/ui/ToastProvider';
import { Star, ArrowRight, Bookmark, Calendar, MapPin, Sparkles } from 'lucide-react';
import { LUXURY_EASE, TRANSITION_FAST, TRANSITION_LUXURY } from '@/lib/motion';

export const HeroContent: React.FC = () => {
  const {
    destinations,
    activeIndex,
    bookmarkedIds,
    toggleBookmarkOptimistic,
    openExpeditionModal,
  } = useHeroStore();
  const { showToast } = useToast();

  const current = destinations[activeIndex] || destinations[0];

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
    <div className="relative z-10 w-full max-w-2xl text-left flex flex-col justify-center select-none pt-4 sm:pt-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={TRANSITION_LUXURY}
          className="space-y-6"
        >
          {/* Overline: Category & Locale */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-brass/35 text-brass text-[11px] font-semibold uppercase tracking-[0.22em]">
              <span className="w-1.5 h-1.5 rounded-full bg-brass animate-pulse" />
              <span>{current.categoryBadge}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs text-mist font-mono tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-brass/80" />
              <span>{current.region}, {current.country}</span>
            </div>
          </div>

          {/* Main Editorial Headline */}
          <div className="space-y-3">
            <h1 className="font-syne text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-alabaster leading-[1.08]">
              {current.title}
            </h1>
            <p className="font-serif italic text-base sm:text-lg text-[#DFCCA9] tracking-wide font-light">
              &ldquo;{current.tagLine}&rdquo;
            </p>
          </div>

          {/* Narrative Body Copy */}
          <p className="text-sm sm:text-base text-mist leading-editorial font-normal max-w-xl">
            {current.description}
          </p>

          {/* Expedition Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* Rating */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-brass">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(current.rating)
                        ? 'fill-brass text-brass'
                        : 'text-neutral-600'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold font-mono text-alabaster text-xs ml-1">
                {current.rating.toFixed(1)}
              </span>
            </div>

            {/* Optimal Season */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-mist">
              <Calendar className="w-3.5 h-3.5 text-brass" />
              <span>Season: <strong className="text-alabaster font-medium">{current.bestSeason}</strong></span>
            </div>

            {/* Curated Duration */}
            {current.curatedExpedition && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-mist">
                <Sparkles className="w-3.5 h-3.5 text-brass" />
                <span>{current.curatedExpedition.duration}</span>
              </div>
            )}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-4 pt-2">
            {/* Primary Action: Link to dedicated landing page */}
            <Link
              href={`/destinations/${current.slug}`}
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-brass hover:bg-brass-light text-black font-semibold text-xs uppercase tracking-[0.16em] transition-all duration-200 active:scale-95 shadow-md"
            >
              <span>Explore Expedition</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Secondary VIP Charter Trigger */}
            <button
              onClick={() => openExpeditionModal(current)}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-brass/40 text-alabaster text-xs font-semibold uppercase tracking-[0.14em] transition-all"
            >
              <span>VIP Charter</span>
            </button>

            {/* Bookmark Action */}
            <button
              onClick={handleBookmarkToggle}
              aria-label={isBookmarked ? 'Remove from saved' : 'Save expedition'}
              className={`p-3.5 rounded-full border transition-all ${
                isBookmarked
                  ? 'bg-brass/20 text-brass border-brass/50'
                  : 'bg-white/[0.04] text-mist hover:text-alabaster border-white/[0.1] hover:border-brass/30'
              }`}
            >
              <Bookmark className={`w-4.5 h-4.5 ${isBookmarked ? 'fill-brass' : ''}`} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

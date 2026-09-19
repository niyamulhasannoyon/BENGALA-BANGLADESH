'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useHeroStore } from '@/lib/store/useHeroStore';
import { toggleBookmarkAction } from '@/app/actions/destinationActions';
import { useToast } from '@/components/ui/ToastProvider';
import { Bookmark, Star, ArrowRight } from 'lucide-react';
import { formatIndex } from '@/lib/utils';
import { TRANSITION_LUXURY } from '@/lib/motion';

export const CarouselDeck: React.FC = () => {
  const {
    destinations,
    activeIndex,
    goToSlide,
    setIsPaused,
    bookmarkedIds,
    toggleBookmarkOptimistic,
    openExpeditionModal,
  } = useHeroStore();
  const { showToast } = useToast();

  const handleBookmarkToggle = async (e: React.MouseEvent, destinationId: string, title: string) => {
    e.preventDefault();
    e.stopPropagation();
    const newStatus = toggleBookmarkOptimistic(destinationId);
    showToast({
      title: newStatus ? 'Expedition Saved' : 'Expedition Removed',
      description: newStatus ? `${title} added to itinerary.` : `${title} removed from saved.`,
      type: 'success',
    });

    try {
      await toggleBookmarkAction(destinationId);
    } catch {
      toggleBookmarkOptimistic(destinationId);
    }
  };

  return (
    <div
      className="relative w-full z-20 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* DESKTOP REFINED EDITORIAL CAROUSEL (hidden on mobile, visible md+) */}
      <div className="hidden md:flex items-center justify-end h-[380px] overflow-visible pr-2 lg:pr-8">
        <div className="relative w-[340px] lg:w-[380px] h-[340px]">
          {destinations.map((dest, index) => {
            const n = destinations.length;
            const diff = (index - activeIndex + n) % n;
            const isActive = index === activeIndex;
            const isBookmarked = bookmarkedIds.includes(dest._id || '');

            // Render active card and up to 3 upcoming cards
            if (diff > 3 && diff < n - 1) return null;

            const xOffset = diff * 76;
            const scale = isActive ? 1.02 : Math.max(0.86, 1 - diff * 0.07);
            const zIndex = isActive ? 30 : 25 - diff;
            const opacity = isActive ? 1 : Math.max(0.35, 0.85 - diff * 0.2);

            return (
              <motion.div
                key={dest.slug}
                onClick={() => goToSlide(index)}
                animate={{
                  x: xOffset,
                  scale,
                  opacity,
                  zIndex,
                }}
                transition={TRANSITION_LUXURY}
                className={`absolute top-0 right-0 w-[300px] lg:w-[320px] h-[340px] rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 ${
                  isActive
                    ? 'bg-[#0E1612] border border-brass/50 shadow-[0_20px_40px_rgba(0,0,0,0.8)]'
                    : 'bg-[#0A100C] border border-white/[0.08] hover:opacity-90'
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={dest.cardThumbUrl}
                    alt={dest.title}
                    fill
                    sizes="(max-width: 1024px) 300px, 320px"
                    placeholder={dest.blurDataUrl ? 'blur' : 'empty'}
                    blurDataURL={dest.blurDataUrl || undefined}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080D0A] via-[#080D0A]/50 to-[#080D0A]/20" />
                </div>

                {/* Card Overlay Content */}
                <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-brass px-2 py-0.5 rounded bg-black/70 border border-brass/30">
                        {formatIndex(index)}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-mist bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                        {dest.categoryBadge}
                      </span>
                    </div>

                    {/* Bookmark Action */}
                    <button
                      onClick={(e) => handleBookmarkToggle(e, dest._id || '', dest.title)}
                      className={`p-2 rounded-full transition-all ${
                        isBookmarked
                          ? 'text-brass bg-black/80 border border-brass/40'
                          : 'text-white/70 hover:text-white bg-black/50 hover:bg-black/80'
                      }`}
                      aria-label={`Bookmark ${dest.title}`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-brass' : ''}`} />
                    </button>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-brass text-xs">
                      <Star className="w-3.5 h-3.5 fill-brass text-brass" />
                      <span className="font-semibold text-alabaster">{dest.rating.toFixed(1)}</span>
                      <span className="text-mist text-[11px] ml-1 font-mono">({dest.region})</span>
                    </div>

                    <h3 className="font-syne text-base font-bold text-alabaster tracking-wide leading-snug group-hover:text-brass transition-colors">
                      {dest.title}
                    </h3>

                    <p className="text-xs text-mist line-clamp-2 leading-relaxed">
                      {dest.description}
                    </p>

                    {isActive && (
                      <div className="pt-2 flex items-center justify-between">
                        <Link
                          href={`/destinations/${dest.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs text-brass hover:text-brass-light font-semibold uppercase tracking-wider"
                        >
                          <span>Full Itinerary</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openExpeditionModal(dest);
                          }}
                          className="text-[11px] uppercase tracking-wider text-mist hover:text-alabaster font-mono"
                        >
                          Quick Reserve
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* MOBILE CLEAN TOUCH SCROLL-SNAP SLIDER (<768px) */}
      <div className="md:hidden w-full px-2 pt-2 pb-1">
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 px-2 -mx-2">
          {destinations.map((dest, index) => {
            const isActive = index === activeIndex;
            const isBookmarked = bookmarkedIds.includes(dest._id || '');

            return (
              <div
                key={dest.slug}
                onClick={() => goToSlide(index)}
                className={`snap-center shrink-0 w-[270px] h-[220px] relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  isActive
                    ? 'border border-brass shadow-lg scale-[1.01]'
                    : 'border border-white/[0.08] opacity-75'
                }`}
              >
                <Image
                  src={dest.cardThumbUrl}
                  alt={dest.title}
                  fill
                  sizes="270px"
                  placeholder={dest.blurDataUrl ? 'blur' : 'empty'}
                  blurDataURL={dest.blurDataUrl || undefined}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080D0A] via-[#080D0A]/50 to-transparent" />

                <div className="relative z-10 p-3.5 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-brass px-1.5 py-0.5 rounded bg-black/70 border border-brass/30">
                      {formatIndex(index)}
                    </span>
                    <button
                      onClick={(e) => handleBookmarkToggle(e, dest._id || '', dest.title)}
                      className="p-1.5 rounded-full bg-black/60 text-white"
                      aria-label="Bookmark destination"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-brass text-brass' : ''}`} />
                    </button>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-brass font-bold block mb-0.5">
                      {dest.categoryBadge}
                    </span>
                    <h4 className="font-syne font-bold text-sm text-alabaster line-clamp-1">
                      {dest.title}
                    </h4>
                    <div className="flex items-center justify-between mt-1 text-[11px] text-mist font-mono">
                      <span>{dest.region}</span>
                      <Link
                        href={`/destinations/${dest.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-brass font-sans font-semibold flex items-center gap-1"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

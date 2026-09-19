'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useHeroStore } from '@/lib/store/useHeroStore';
import { toggleBookmarkAction } from '@/app/actions/destinationActions';
import { useToast } from '@/components/ui/ToastProvider';
import { Bookmark, Star, ArrowRight } from 'lucide-react';
import { formatIndex } from '@/lib/utils';

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

  const preloadedUrls = useRef<Set<string>>(new Set());

  const handlePreload = (url: string) => {
    if (!preloadedUrls.current.has(url) && typeof window !== 'undefined') {
      const img = new window.Image();
      img.src = url;
      preloadedUrls.current.add(url);
    }
  };

  const handleBookmarkToggle = async (e: React.MouseEvent, destinationId: string, title: string) => {
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
      {/* DESKTOP 3D CAROUSEL DECK (hidden on mobile, visible md+) */}
      <div className="hidden md:flex items-center justify-end h-[360px] perspective-[1200px] overflow-visible pr-4 lg:pr-12">
        <div className="relative w-[340px] lg:w-[380px] h-[320px]">
          {destinations.map((dest, index) => {
            // Calculate relative offset from active index
            const n = destinations.length;
            const diff = (index - activeIndex + n) % n;
            const isActive = index === activeIndex;
            const isBookmarked = bookmarkedIds.includes(dest._id || '');

            // We only render active and upcoming cards (up to 3 cards visible)
            if (diff > 3 && diff < n - 1) return null;

            // Positioning calculations
            const xOffset = diff * 85; // staggered horizontal distance
            const scale = isActive ? 1.05 : Math.max(0.85, 1 - diff * 0.08);
            const zIndex = isActive ? 30 : 25 - diff;
            const opacity = isActive ? 1 : Math.max(0.4, 0.85 - diff * 0.2);
            const rotateY = isActive ? 0 : -8;

            return (
              <motion.div
                key={dest.slug}
                onClick={() => (isActive ? openExpeditionModal(dest) : goToSlide(index))}
                onMouseEnter={() => {
                  handlePreload(dest.heroBgUrl);
                  handlePreload(dest.cardThumbUrl);
                }}
                animate={{
                  x: xOffset,
                  scale,
                  opacity,
                  rotateY,
                  zIndex,
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`absolute top-0 right-0 w-[300px] lg:w-[320px] h-[320px] rounded-2xl overflow-hidden cursor-pointer group transition-shadow ${
                  isActive
                    ? 'glass-card-active shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(34,211,238,0.35)] ring-1 ring-cyan-400/50'
                    : 'glass-card contain-paint shadow-xl hover:opacity-95'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Background Card Image */}
                <div className="absolute inset-0">
                  <Image
                    src={dest.cardThumbUrl}
                    alt={dest.title}
                    fill
                    sizes="(max-width: 1024px) 300px, 340px"
                    placeholder={dest.blurDataUrl ? 'blur' : 'empty'}
                    blurDataURL={dest.blurDataUrl || undefined}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />
                </div>

                {/* Card Header Content */}
                <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-black/60 border border-emerald-500/30">
                        {formatIndex(index)}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-300 bg-black/50 px-2 py-0.5 rounded backdrop-blur-md">
                        {dest.categoryBadge}
                      </span>
                    </div>

                    {/* Bookmark Action */}
                    <button
                      onClick={(e) => handleBookmarkToggle(e, dest._id || '', dest.title)}
                      className={`p-2 rounded-full glass-panel transition-all ${
                        isBookmarked
                          ? 'text-emerald-400 bg-emerald-500/20 border-emerald-500/50'
                          : 'text-white/70 hover:text-white bg-black/40 hover:bg-black/60'
                      }`}
                      aria-label={`Bookmark ${dest.title}`}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-emerald-400' : ''}`} />
                    </button>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-amber-300 text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-white">{dest.rating.toFixed(1)}</span>
                      <span className="text-neutral-400 text-[11px] ml-1">({dest.region})</span>
                    </div>

                    <h3 className="font-syne text-lg font-bold text-white tracking-wide leading-snug group-hover:text-cyan-300 transition-colors">
                      {dest.title}
                    </h3>

                    <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                      {dest.description}
                    </p>

                    {isActive && (
                      <div className="pt-2 flex items-center justify-between text-xs text-cyan-300 font-semibold uppercase tracking-wider">
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* MOBILE HORIZONTAL TOUCH SLIDER (<768px) */}
      <div className="md:hidden w-full px-4 pt-4 pb-2">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 px-1 -mx-4 px-4">
          {destinations.map((dest, index) => {
            const isActive = index === activeIndex;
            const isBookmarked = bookmarkedIds.includes(dest._id || '');

            return (
              <div
                key={dest.slug}
                onClick={() => goToSlide(index)}
                className={`snap-center shrink-0 w-[260px] h-[210px] relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  isActive
                    ? 'ring-2 ring-cyan-400 scale-[1.02] shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                    : 'opacity-70 scale-95'
                }`}
              >
                <Image
                  src={dest.cardThumbUrl}
                  alt={dest.title}
                  fill
                  sizes="260px"
                  placeholder={dest.blurDataUrl ? 'blur' : 'empty'}
                  blurDataURL={dest.blurDataUrl || undefined}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                <div className="relative z-10 p-3 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-black/60">
                      {formatIndex(index)}
                    </span>
                    <button
                      onClick={(e) => handleBookmarkToggle(e, dest._id || '', dest.title)}
                      className="p-1.5 rounded-full bg-black/50 text-white"
                      aria-label="Bookmark destination"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-emerald-400 text-emerald-400' : ''}`} />
                    </button>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold block mb-0.5">
                      {dest.categoryBadge}
                    </span>
                    <h4 className="font-syne font-bold text-sm text-white line-clamp-1">
                      {dest.title}
                    </h4>
                    <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
                      {dest.region}
                    </p>
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

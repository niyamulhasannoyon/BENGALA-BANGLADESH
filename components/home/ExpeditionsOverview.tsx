'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useHeroStore } from '@/lib/store/useHeroStore';
import { toggleBookmarkAction } from '@/app/actions/destinationActions';
import { useToast } from '@/components/ui/ToastProvider';
import { Bookmark, ArrowRight, Star, Clock, DollarSign, Sparkles } from 'lucide-react';
import { formatIndex } from '@/lib/utils';

export const ExpeditionsOverview: React.FC = () => {
  const { destinations, bookmarkedIds, toggleBookmarkOptimistic, openExpeditionModal } = useHeroStore();
  const { showToast } = useToast();

  const handleBookmarkToggle = async (e: React.MouseEvent, id: string, title: string) => {
    e.preventDefault();
    e.stopPropagation();
    const newStatus = toggleBookmarkOptimistic(id);
    showToast({
      title: newStatus ? 'Expedition Saved' : 'Expedition Removed',
      description: newStatus ? `${title} added to dossier.` : `${title} removed from saved.`,
      type: 'success',
    });

    try {
      await toggleBookmarkAction(id);
    } catch {
      toggleBookmarkOptimistic(id);
    }
  };

  return (
    <section id="expeditions" className="relative z-10 bg-[#080D0A] py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.06]">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brass font-semibold font-mono block">
              The Grand Portfolio
            </span>
            <h2 className="font-syne text-3xl sm:text-5xl font-bold text-alabaster tracking-tight">
              Five Extraordinary Realms
            </h2>
          </div>
          <p className="text-sm text-mist max-w-md mt-4 md:mt-0 leading-relaxed font-normal">
            Each bespoke expedition is strictly limited to 8 guests per voyage to ensure deep solitude, personalized culinary arts, and pristine environmental protection.
          </p>
        </div>

        {/* 2-Column / 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, i) => {
            const isBookmarked = bookmarkedIds.includes(dest._id || '');

            return (
              <div
                key={dest.slug}
                className="group flex flex-col rounded-2xl bg-[#0E1612] border border-white/[0.08] hover:border-brass/40 overflow-hidden transition-all duration-300 shadow-xl"
              >
                {/* Visual Thumbnail */}
                <div className="relative w-full h-72 overflow-hidden bg-black/40">
                  <Image
                    src={dest.cardThumbUrl}
                    alt={dest.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    placeholder={dest.blurDataUrl ? 'blur' : 'empty'}
                    blurDataURL={dest.blurDataUrl || undefined}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1612] via-transparent to-black/30" />

                  {/* Top Pill Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-brass px-2.5 py-1 rounded bg-black/70 border border-brass/30">
                        {formatIndex(i)}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-alabaster bg-black/60 px-2.5 py-1 rounded backdrop-blur-sm">
                        {dest.categoryBadge}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleBookmarkToggle(e, dest._id || '', dest.title)}
                      aria-label={`Bookmark ${dest.title}`}
                      className={`p-2 rounded-full transition-all ${
                        isBookmarked
                          ? 'text-brass bg-black/80 border border-brass/50'
                          : 'text-white/70 hover:text-white bg-black/50 hover:bg-black/75'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-brass' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Card Editorial Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-mist font-mono">
                      <span>{dest.region}</span>
                      <div className="flex items-center gap-1 text-brass">
                        <Star className="w-3.5 h-3.5 fill-brass" />
                        <span className="font-bold text-alabaster">{dest.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <h3 className="font-syne text-xl font-bold text-alabaster group-hover:text-brass transition-colors leading-snug">
                      {dest.title}
                    </h3>

                    <p className="text-xs text-mist leading-relaxed line-clamp-3 font-normal">
                      {dest.description}
                    </p>
                  </div>

                  {/* Curated Expedition Meta */}
                  {dest.curatedExpedition && (
                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-mist">
                        <Clock className="w-3.5 h-3.5 text-brass" />
                        <span>{dest.curatedExpedition.duration}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-stone uppercase block">From</span>
                        <span className="font-syne font-bold text-sm text-brass">
                          {dest.curatedExpedition.priceStarting}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Action Row */}
                  <div className="pt-2 flex items-center justify-between gap-3">
                    <Link
                      href={`/destinations/${dest.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-alabaster group-hover:text-brass transition-colors"
                    >
                      <span>Explore Realm</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-brass" />
                    </Link>

                    <button
                      onClick={() => openExpeditionModal(dest)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-brass hover:text-black border border-white/[0.08] text-mist text-[11px] font-semibold uppercase tracking-wider transition-all"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Charter</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

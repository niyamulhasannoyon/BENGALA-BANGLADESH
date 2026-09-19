'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeroStore } from '@/lib/store/useHeroStore';
import { toggleBookmarkAction } from '@/app/actions/destinationActions';
import { useToast } from '@/components/ui/ToastProvider';
import { X, Trash2, ArrowRight, Bookmark } from 'lucide-react';
import { formatIndex } from '@/lib/utils';
import { TRANSITION_FAST } from '@/lib/motion';

export const BookmarksDrawer: React.FC = () => {
  const {
    destinations,
    bookmarkedIds,
    isBookmarksDrawerOpen,
    toggleBookmarksDrawer,
    goToSlide,
    toggleBookmarkOptimistic,
    openExpeditionModal,
  } = useHeroStore();
  const { showToast } = useToast();

  const savedDestinations = destinations.filter((d) => bookmarkedIds.includes(d._id || ''));

  const handleRemove = async (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    toggleBookmarkOptimistic(id);
    showToast({
      title: 'Removed from Dossier',
      description: `${title} was removed.`,
      type: 'info',
    });
    try {
      await toggleBookmarkAction(id);
    } catch {
      toggleBookmarkOptimistic(id);
    }
  };

  const handleSelect = (destId: string) => {
    const idx = destinations.findIndex((d) => d._id === destId);
    if (idx !== -1) {
      goToSlide(idx);
      toggleBookmarksDrawer();
    }
  };

  if (!isBookmarksDrawerOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Saved Expeditions">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={TRANSITION_FAST}
          onClick={toggleBookmarksDrawer}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-screen max-w-md bg-[#0B120E] border-l border-white/[0.1] p-6 sm:p-8 flex flex-col justify-between shadow-2xl"
          >
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-brass/20 text-brass">
                    <Bookmark className="w-5 h-5 fill-brass" />
                  </div>
                  <div>
                    <h3 className="font-syne text-lg font-bold text-alabaster">Saved Expeditions</h3>
                    <p className="text-xs text-mist font-mono">
                      {savedDestinations.length} destination{savedDestinations.length === 1 ? '' : 's'} in private dossier
                    </p>
                  </div>
                </div>

                <button
                  onClick={toggleBookmarksDrawer}
                  className="p-2 rounded-full hover:bg-white/10 text-mist hover:text-alabaster transition-colors"
                  aria-label="Close saved drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Saved Items List */}
              <div className="mt-6 space-y-3.5 max-h-[calc(100vh-250px)] overflow-y-auto pr-1">
                {savedDestinations.length === 0 ? (
                  <div className="py-20 text-center space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-stone">
                      <Bookmark className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-alabaster font-medium">No saved expeditions yet</p>
                    <p className="text-xs text-mist max-w-xs mx-auto leading-relaxed">
                      Select the bookmark icon on any destination card to curate your bespoke Bangladesh itinerary dossier.
                    </p>
                  </div>
                ) : (
                  savedDestinations.map((dest, i) => {
                    const originalIdx = destinations.findIndex((d) => d._id === dest._id);
                    return (
                      <div
                        key={dest.slug}
                        onClick={() => handleSelect(dest._id || '')}
                        className="group relative flex items-center gap-3.5 p-3 rounded-2xl bg-[#0E1612] hover:bg-white/[0.05] border border-white/[0.06] hover:border-brass/40 cursor-pointer transition-all"
                      >
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-black/40">
                          <Image
                            src={dest.cardThumbUrl}
                            alt={dest.title}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                          <div className="absolute top-1 left-1 bg-black/80 px-1 rounded text-[9px] font-mono text-brass font-bold">
                            {formatIndex(originalIdx)}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] uppercase font-bold tracking-wider text-brass">
                            {dest.categoryBadge}
                          </span>
                          <h4 className="font-syne font-bold text-sm text-alabaster truncate group-hover:text-brass transition-colors">
                            {dest.title}
                          </h4>
                          <p className="text-[11px] text-mist truncate">{dest.region}</p>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <Link
                            href={`/destinations/${dest.slug}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmarksDrawer();
                            }}
                            className="p-2 rounded-lg hover:bg-white/10 text-mist hover:text-brass transition-colors"
                            aria-label={`View ${dest.title}`}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={(e) => handleRemove(e, dest._id || '', dest.title)}
                            className="p-2 rounded-lg hover:bg-rose-500/20 text-stone hover:text-rose-400 transition-colors"
                            aria-label={`Remove ${dest.title}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            {savedDestinations.length > 0 && (
              <div className="pt-4 border-t border-white/[0.08] space-y-2">
                <button
                  onClick={() => {
                    toggleBookmarksDrawer();
                    if (savedDestinations[0]) {
                      openExpeditionModal(savedDestinations[0]);
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brass hover:bg-brass-light text-black font-semibold text-xs uppercase tracking-wider transition-all"
                >
                  <span>Inquire Full Custom Itinerary</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

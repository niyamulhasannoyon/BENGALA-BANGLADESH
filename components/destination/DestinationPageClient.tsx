'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IDestination } from '@/lib/models/Destination';
import { useHeroStore } from '@/lib/store/useHeroStore';
import { toggleBookmarkAction } from '@/app/actions/destinationActions';
import { useToast } from '@/components/ui/ToastProvider';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { ExpeditionModal } from '@/components/ui/ExpeditionModal';
import { BookmarksDrawer } from '@/components/ui/BookmarksDrawer';
import {
  MapPin,
  Calendar,
  Star,
  CheckCircle2,
  Bookmark,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Compass,
  Quote,
} from 'lucide-react';
import { BANGLADESH_DESTINATIONS } from '@/lib/data/bangladeshDestinations';

interface DestinationPageClientProps {
  destination: IDestination;
}

export const DestinationPageClient: React.FC<DestinationPageClientProps> = ({ destination }) => {
  const { bookmarkedIds, toggleBookmarkOptimistic, openExpeditionModal } = useHeroStore();
  const { showToast } = useToast();

  const isBookmarked = bookmarkedIds.includes(destination._id || '');

  const handleBookmarkToggle = async () => {
    if (!destination._id) return;
    const newStatus = toggleBookmarkOptimistic(destination._id);
    showToast({
      title: newStatus ? 'Expedition Saved' : 'Expedition Removed',
      description: newStatus
        ? `${destination.title} added to private dossier.`
        : `${destination.title} removed from saved list.`,
      type: 'success',
    });

    try {
      await toggleBookmarkAction(destination._id);
    } catch {
      toggleBookmarkOptimistic(destination._id);
    }
  };

  const otherDestinations = BANGLADESH_DESTINATIONS.filter((d) => d.slug !== destination.slug);

  return (
    <div className="relative min-h-screen bg-[#080D0A] text-alabaster overflow-x-hidden">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Full-Bleed Destination Hero */}
      <section className="relative w-full h-[75vh] sm:h-[82vh] overflow-hidden flex flex-col justify-between">
        <div className="absolute inset-0 z-0">
          <Image
            src={destination.heroBgUrl}
            alt={destination.title}
            fill
            priority
            sizes="100vw"
            placeholder={destination.blurDataUrl ? 'blur' : 'empty'}
            blurDataURL={destination.blurDataUrl || undefined}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080D0A] via-[#080D0A]/40 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080D0A]/90 via-[#080D0A]/30 to-transparent lg:w-2/3" />
        </div>

        {/* Top Breadcrumb */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-mist hover:text-alabaster font-mono transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-brass" />
            <span>Return to Grand Portfolio</span>
          </Link>
        </div>

        {/* Bottom Hero Narrative */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pb-16">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-brass/20 border border-brass/40 text-brass text-xs uppercase font-bold tracking-[0.2em] backdrop-blur-md">
                {destination.categoryBadge}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-mist font-mono">
                <MapPin className="w-3.5 h-3.5 text-brass" />
                <span>{destination.region}, {destination.country}</span>
              </div>
            </div>

            <h1 className="font-syne text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-alabaster leading-[1.08]">
              {destination.title}
            </h1>

            <p className="font-serif italic text-lg sm:text-xl text-brass-light font-light">
              &ldquo;{destination.tagLine}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Narrative & Details (Col 1-7) */}
          <div className="lg:col-span-7 space-y-12">
            {/* The Sanctuary Story */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brass font-semibold block">
                The Narrative
              </span>
              <h2 className="font-syne text-2xl sm:text-3xl font-bold text-alabaster tracking-tight">
                An Untouched Realm of Wonder
              </h2>
              <p className="text-sm sm:text-base text-mist leading-editorial font-normal">
                {destination.description}
              </p>
            </div>

            {/* Inclusions / Highlights */}
            <div className="space-y-6">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brass font-semibold block">
                Bespoke Inclusions
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {destination.highlights.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-[#0E1612] border border-white/[0.08]"
                  >
                    <CheckCircle2 className="w-4.5 h-4.5 text-brass shrink-0 mt-0.5" />
                    <span className="text-xs text-alabaster leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Geographical Specs */}
            <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-[#0E1612] border border-white/[0.08]">
              <div>
                <span className="text-[10px] uppercase font-mono text-stone block">Season</span>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-alabaster font-medium">
                  <Calendar className="w-3.5 h-3.5 text-brass" />
                  <span>{destination.bestSeason}</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-stone block">Rating</span>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-brass font-medium">
                  <Star className="w-3.5 h-3.5 fill-brass" />
                  <span>{destination.rating.toFixed(1)} / 5.0</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-stone block">Coordinates</span>
                <span className="text-xs font-mono text-mist mt-1 block">
                  {destination.coordinates.lat.toFixed(2)}°N, {destination.coordinates.lng.toFixed(2)}°E
                </span>
              </div>
            </div>

            {/* Guest Dispatch Quote */}
            <div className="p-8 rounded-3xl bg-[#0C140F] border border-brass/25 space-y-4">
              <Quote className="w-8 h-8 text-brass/30" />
              <p className="font-serif italic text-base text-alabaster leading-relaxed">
                &ldquo;Experiencing {destination.title} under BENGALA&apos;s stewardship was unlike any journey we have taken in Asia. The silence, the mastery of the private crew, and the utter lack of commercial intrusion made it indelible.&rdquo;
              </p>
              <div className="flex items-center justify-between text-xs text-mist pt-4 border-t border-white/[0.06]">
                <span className="font-syne font-bold text-alabaster">Charter Guest Chronicles</span>
                <span className="font-mono text-brass">Private Villa Buyout</span>
              </div>
            </div>
          </div>

          {/* Right Sticky Charter Card (Col 8-12) */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              <div className="p-8 rounded-3xl bg-[#0E1612] border border-brass/40 shadow-2xl space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-brass text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Curated Expedition</span>
                  </div>
                  <button
                    onClick={handleBookmarkToggle}
                    aria-label={isBookmarked ? 'Remove from saved' : 'Save to dossier'}
                    className={`p-2.5 rounded-full border transition-all ${
                      isBookmarked
                        ? 'bg-brass/20 text-brass border-brass/50'
                        : 'bg-white/[0.04] text-mist hover:text-alabaster border-white/[0.1]'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-brass' : ''}`} />
                  </button>
                </div>

                {destination.curatedExpedition && (
                  <div>
                    <h3 className="font-syne text-xl font-bold text-alabaster">
                      {destination.curatedExpedition.title}
                    </h3>
                    <div className="flex items-baseline justify-between pt-3">
                      <span className="text-xs text-mist">{destination.curatedExpedition.duration}</span>
                      <span className="font-syne font-bold text-2xl text-brass">
                        {destination.curatedExpedition.priceStarting}
                      </span>
                    </div>

                    <ul className="mt-6 space-y-2.5 text-xs text-mist border-t border-white/[0.08] pt-6">
                      {destination.curatedExpedition.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-2 space-y-3">
                  <button
                    onClick={() => openExpeditionModal(destination)}
                    className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-brass hover:bg-brass-light text-black font-semibold text-xs uppercase tracking-[0.16em] transition-all shadow-lg active:scale-98"
                  >
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>Reserve / Inquire Charter</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-stone font-mono pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-brass" />
                    <span>Full bespoke itinerary customized to your dates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Explore Other Realms */}
        <div className="mt-28 pt-16 border-t border-white/[0.08]">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brass font-semibold block mb-1">
                Continue The Exploration
              </span>
              <h3 className="font-syne text-2xl sm:text-3xl font-bold text-alabaster">
                Other Sanctuaries
              </h3>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-brass font-semibold hover:underline"
            >
              <span>View All 5 Realms</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherDestinations.map((dest) => (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                className="group flex flex-col rounded-2xl bg-[#0E1612] border border-white/[0.06] hover:border-brass/40 overflow-hidden transition-all duration-300"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={dest.cardThumbUrl}
                    alt={dest.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1612] to-transparent" />
                </div>
                <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-brass font-semibold block">
                      {dest.categoryBadge}
                    </span>
                    <h4 className="font-syne text-sm font-bold text-alabaster group-hover:text-brass transition-colors">
                      {dest.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-mist font-mono pt-2">
                    <span>{dest.region}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brass group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Floating Modals */}
      <ExpeditionModal />
      <BookmarksDrawer />
    </div>
  );
};

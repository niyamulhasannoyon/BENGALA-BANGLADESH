'use client';

import React from 'react';
import Image from 'next/image';
import { useHeroStore } from '@/lib/store/useHeroStore';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const BespokeBanner: React.FC = () => {
  const { destinations, openExpeditionModal } = useHeroStore();

  const handleOpenModal = () => {
    if (destinations.length > 0) {
      openExpeditionModal(destinations[0]);
    }
  };

  return (
    <section className="relative z-10 py-20 sm:py-28 bg-[#080D0A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="relative rounded-3xl overflow-hidden border border-brass/30 p-8 sm:p-14 lg:p-20 bg-[#0C140F]">
          {/* Background Ambient Imagery */}
          <div className="absolute inset-0 z-0 opacity-25">
            <Image
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80"
              alt="Highland clouds and mountain ridges"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C140F] via-[#0C140F]/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brass/10 border border-brass/30 text-brass text-xs font-semibold uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5 text-brass" />
              <span>Private Client Office</span>
            </div>

            <h2 className="font-syne text-3xl sm:text-5xl font-bold text-alabaster tracking-tight leading-[1.12]">
              Craft Your Bespoke Bangladesh Expedition
            </h2>

            <p className="text-sm sm:text-base text-mist leading-editorial font-normal">
              Whether combining the tiger waters of Khulna with the rolling jade tea terraced hills of Sreemangal, our lead journey architects craft seamless itineraries with private helicopter charters, luxury river yachts, and secluded villa buyouts.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleOpenModal}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-brass hover:bg-brass-light text-black font-semibold text-xs uppercase tracking-[0.16em] transition-all active:scale-95 shadow-lg"
              >
                <span>Initiate Private Inquiry</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <div className="flex items-center gap-2 text-xs text-stone font-mono">
                <ShieldCheck className="w-4 h-4 text-brass" />
                <span>Confidential White-Glove Response Within 4 Hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

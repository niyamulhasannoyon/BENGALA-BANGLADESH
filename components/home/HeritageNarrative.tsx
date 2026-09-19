'use client';

import React from 'react';
import Image from 'next/image';
import { Compass, Sparkles, Feather } from 'lucide-react';

export const HeritageNarrative: React.FC = () => {
  return (
    <section id="heritage" className="relative z-10 bg-[#0A100C] border-y border-white/[0.08] py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Storytelling */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-brass/35 text-brass text-[11px] font-semibold uppercase tracking-[0.25em]">
              <Feather className="w-3.5 h-3.5" />
              <span>The Bengal Ethos</span>
            </div>

            <h2 className="font-syne text-3xl sm:text-5xl font-bold text-alabaster tracking-tight leading-[1.12]">
              A Sanctuary of Silence and Untamed Splendor
            </h2>

            <p className="font-serif italic text-lg text-brass-light leading-relaxed">
              &ldquo;Where the rivers braid into the Indian Ocean, time ceases to rush. Only the tides, the calls of crested serpent eagles, and the rustle of sundari leaves dictate the rhythm.&rdquo;
            </p>

            <div className="space-y-4 text-sm text-mist leading-editorial font-normal">
              <p>
                Founded to open the hidden crown jewels of Bangladesh to the world’s most discerning travelers, BENGALA operates with quiet reverence. We replace tourist masses with bespoke catamarans, cantilevered high-altitude villas, and solitary coral atolls.
              </p>
              <p>
                Whether tracking the Royal Bengal Tiger under the stewardship of veteran delta trackers or savoring imperial first-flush harvests with single-estate tea masters in Sylhet, every moment is handcrafted for transcendent privacy.
              </p>
            </div>

            {/* Micro stats strip */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/[0.08]">
              <div>
                <span className="font-syne text-2xl sm:text-3xl font-bold text-brass block">
                  8 Max
                </span>
                <span className="text-[11px] uppercase tracking-wider text-stone block mt-0.5">
                  Guests Per Voyage
                </span>
              </div>
              <div>
                <span className="font-syne text-2xl sm:text-3xl font-bold text-brass block">
                  100%
                </span>
                <span className="text-[11px] uppercase tracking-wider text-stone block mt-0.5">
                  Private Charters
                </span>
              </div>
              <div>
                <span className="font-syne text-2xl sm:text-3xl font-bold text-brass block">
                  24 / 7
                </span>
                <span className="text-[11px] uppercase tracking-wider text-stone block mt-0.5">
                  Dedicated Concierge
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Double Image Mosaic */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=85"
                alt="Sundarbans private river exploration"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A100C]/90 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/60 border border-white/[0.1] backdrop-blur-md">
                <span className="text-[10px] uppercase font-mono tracking-widest text-brass block mb-1">
                  Private Marine Vessel
                </span>
                <p className="font-syne font-bold text-sm text-alabaster">
                  The M.V. Bengala Dawn — Custom 52ft Hybrid Catamaran
                </p>
                <p className="text-[11px] text-mist mt-1">
                  Equipped with silent electric propulsion for unperturbed wildlife tracking in mangrove tributaries.
                </p>
              </div>
            </div>

            {/* Overlapping inset card */}
            <div className="hidden sm:block absolute -bottom-8 -left-8 w-64 p-4 rounded-2xl bg-[#0E1612] border border-brass/30 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-2 text-brass text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bespoke Logistics</span>
              </div>
              <p className="text-xs text-mist leading-relaxed">
                Direct helicopter transfer from Hazrat Shahjalal International VIP terminal straight to deep delta launchpads.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

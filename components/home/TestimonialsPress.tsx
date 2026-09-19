'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialsPress: React.FC = () => {
  const pressQuotes = [
    {
      source: 'Financial Times',
      quote: 'BENGALA has done the impossible: unlocked the wildest delta on Earth with the uncompromising luxury of an Aman retreat.',
      date: 'Autumn Expeditions Issue',
    },
    {
      source: 'Condé Nast Traveler',
      quote: 'The silent electric catamaran through the Sundarbans fog is one of the single most arresting wildlife experiences in all of Asia.',
      date: 'Gold List Award',
    },
    {
      source: 'Robb Report',
      quote: 'Forget mass tourism. This is private aviation, Michelin-caliber delta gastronomy, and supreme isolation at its pinnacle.',
      date: 'The Ultimate Gift Guide',
    },
  ];

  const guestReviews = [
    {
      author: 'Lord & Lady Sterling',
      origin: 'London & Geneva',
      destination: 'Sundarbans & Sreemangal Odyssey',
      text: 'Our four days aboard the private catamaran exceeded every expectation. From our sunrise encounter with a tigress on the mudflats to vintage champagne under millions of unpolluted stars, it was pure poetry.',
    },
    {
      author: 'Dr. Alistair Vance',
      origin: 'Singapore',
      destination: 'Sajek Cloud Sanctuary',
      text: 'Floating above the morning cloud blanket at 2,000 feet with complete architectural seclusion. The indigenous bamboo banquet was culinary genius. A truly world-class sanctuary.',
    },
  ];

  return (
    <section id="press" className="relative z-10 bg-[#080D0A] py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Press Quotes Bar */}
        <div className="mb-20 pb-12 border-b border-white/[0.08]">
          <div className="text-center mb-10">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brass font-semibold block mb-2">
              International Acclaim
            </span>
            <h2 className="font-syne text-2xl sm:text-4xl font-bold text-alabaster tracking-tight">
              In The Global Press
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pressQuotes.map((item, i) => (
              <div
                key={i}
                className="flex flex-col justify-between p-6 rounded-2xl bg-[#0E1612] border border-white/[0.06] hover:border-brass/30 transition-colors"
              >
                <div className="space-y-3">
                  <span className="font-syne font-bold text-sm tracking-wider uppercase text-brass block">
                    {item.source}
                  </span>
                  <p className="font-serif italic text-sm sm:text-base text-alabaster leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
                <span className="text-[11px] text-stone font-mono tracking-wider block mt-4">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Private Guest Chronicles */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brass font-semibold block mb-2">
                Guest Chronicles
              </span>
              <h3 className="font-syne text-2xl sm:text-3xl font-bold text-alabaster tracking-tight">
                Reflections From The Journey
              </h3>
            </div>
            <p className="text-xs text-mist max-w-sm mt-3 md:mt-0">
              Dispatches written by private charter guests following bespoke delta and highland expeditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guestReviews.map((rev, i) => (
              <div
                key={i}
                className="relative flex flex-col justify-between p-8 rounded-3xl bg-[#0E1612] border border-white/[0.08] hover:border-brass/40 transition-all duration-300 shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-brass">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-brass" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-brass/25" />
                  </div>

                  <p className="text-sm sm:text-base text-mist leading-editorial font-normal">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>

                <div className="pt-6 border-t border-white/[0.06] mt-6 flex items-center justify-between">
                  <div>
                    <h4 className="font-syne text-sm font-bold text-alabaster">{rev.author}</h4>
                    <p className="text-xs text-stone">{rev.origin}</p>
                  </div>
                  <span className="text-[11px] text-brass font-mono uppercase tracking-wider">
                    {rev.destination}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

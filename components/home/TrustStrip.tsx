'use client';

import React from 'react';
import { ShieldCheck, Anchor, Compass, TreePine } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const credentials = [
    {
      icon: TreePine,
      title: 'UNESCO Biosphere Stewards',
      description: 'Zero-trace expeditions coordinated with certified Sundarbans delta rangers.',
    },
    {
      icon: Anchor,
      title: 'Private Aviation & Marine Fleet',
      description: 'Chartered twin-engine helicopters & custom 52-foot silent electric catamarans.',
    },
    {
      icon: Compass,
      title: 'Master Naturalists & Biologists',
      description: 'Every journey led by seasoned regional wildlife historians and ornithologists.',
    },
    {
      icon: ShieldCheck,
      title: 'Carbon-Neutral Travel Logistics',
      description: '100% verified carbon offset on all private flight, boat, and villa logistics.',
    },
  ];

  return (
    <section id="trust" className="relative z-10 bg-[#080D0A] border-y border-white/[0.08] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/[0.06]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-brass font-semibold block mb-2 font-mono">
              Uncompromising Standards
            </span>
            <h2 className="font-syne text-2xl sm:text-3xl font-bold text-alabaster tracking-tight">
              Curated for Discerning Travelers
            </h2>
          </div>
          <p className="text-xs text-mist max-w-md mt-3 md:mt-0 leading-relaxed">
            Operating in the most pristine and secluded regions of Bengal with strict safety protocols, private medical escorts, and ecological sanctity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {credentials.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex flex-col p-6 rounded-2xl bg-[#0E1612] border border-white/[0.06] hover:border-brass/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-brass/25 flex items-center justify-center text-brass mb-5 group-hover:border-brass transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-syne text-sm sm:text-base font-bold text-alabaster mb-2 group-hover:text-brass transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-mist leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

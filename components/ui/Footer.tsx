'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { BANGLADESH_DESTINATIONS } from '@/lib/data/bangladeshDestinations';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="relative z-10 bg-[#060907] border-t border-white/[0.08] text-alabaster pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/[0.08]">
          {/* Brand & Mission (Col 1-4) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.04] border border-brass/40 text-brass">
                <Compass className="w-5 h-5 text-brass" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-syne font-bold text-xl tracking-[0.22em] text-alabaster">
                    BENGALA
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brass" />
                  <span className="text-[10px] uppercase font-semibold tracking-[0.25em] text-mist">
                    BANGLADESH
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-[0.22em] text-brass/90 font-medium">
                  Ultra-Luxury Expeditions
                </span>
              </div>
            </Link>

            <p className="text-xs text-mist leading-relaxed font-normal max-w-sm">
              Crafting extraordinary journeys through Bangladesh’s most secluded deltas, cloud valleys, and coral atolls. Uncompromising luxury in deep harmony with the wild.
            </p>

            <div className="pt-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-stone block mb-1">
                Conservation Stewardship
              </span>
              <p className="text-xs text-mist">
                Part of the UNESCO Biosphere Conservation Alliance & Leave No Trace Global Network.
              </p>
            </div>
          </div>

          {/* Expeditions Sitemap (Col 5-6) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-syne text-xs uppercase font-bold tracking-[0.2em] text-brass">
              Expeditions
            </h4>
            <ul className="space-y-2.5 text-xs text-mist">
              {BANGLADESH_DESTINATIONS.map((dest) => (
                <li key={dest.slug}>
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="hover:text-alabaster hover:underline transition-colors"
                  >
                    {dest.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* The Experience (Col 7-8) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-syne text-xs uppercase font-bold tracking-[0.2em] text-brass">
              The Standard
            </h4>
            <ul className="space-y-2.5 text-xs text-mist">
              <li>
                <Link href="/#heritage" className="hover:text-alabaster transition-colors">
                  Private Aviation Fleet
                </Link>
              </li>
              <li>
                <Link href="/#heritage" className="hover:text-alabaster transition-colors">
                  Silent Marine Tenders
                </Link>
              </li>
              <li>
                <Link href="/#trust" className="hover:text-alabaster transition-colors">
                  Master Naturalists
                </Link>
              </li>
              <li>
                <Link href="/#trust" className="hover:text-alabaster transition-colors">
                  Carbon-Neutral Charter
                </Link>
              </li>
              <li>
                <Link href="/#press" className="hover:text-alabaster transition-colors">
                  International Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Private Offices & Newsletter (Col 9-12) */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h4 className="font-syne text-xs uppercase font-bold tracking-[0.2em] text-brass mb-3">
                Private Client Salons
              </h4>
              <div className="text-xs text-mist space-y-2">
                <p>
                  <strong className="text-alabaster font-medium">Dhaka Salon:</strong> Road 84, Gulshan-2 Diplomatic Enclave, Dhaka 1212
                </p>
                <p>
                  <strong className="text-alabaster font-medium">London Liaison:</strong> Berkeley Square, Mayfair, London W1J 6BD
                </p>
                <p className="font-mono text-[11px] text-brass/90">
                  direct: concierge@bengala-expeditions.com
                </p>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <h4 className="font-syne text-xs uppercase font-bold tracking-[0.2em] text-brass mb-2">
                The Bengal Dispatch
              </h4>
              <p className="text-xs text-mist mb-3">
                Private seasonal letters on wildlife migrations, new private yacht charters, and cloud villa openings.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-brass/40 text-brass text-xs">
                  <CheckCircle2 className="w-4 h-4 text-brass" />
                  <span>Your address has been added to our private register.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter private email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#0E1612] border border-white/[0.1] text-xs text-alabaster focus:border-brass focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="px-4 py-2 rounded-xl bg-brass hover:bg-brass-light text-black text-xs font-semibold uppercase tracking-wider transition-all shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone font-mono">
          <p>© {new Date().getFullYear()} BENGALA EXPEDITIONS • ALL RIGHTS RESERVED</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-mist cursor-pointer">Privacy Charter</span>
            <span>•</span>
            <span className="hover:text-mist cursor-pointer">Terms of Expedition</span>
            <span>•</span>
            <span className="hover:text-mist cursor-pointer">Safety Protocols</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

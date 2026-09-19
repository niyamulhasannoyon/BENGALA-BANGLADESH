'use client';

import { Compass, Search, BookmarkCheck, Sparkles } from 'lucide-react';
import { useShowcaseStore } from '@/store/useShowcaseStore';

export function Navbar() {
  const bookmarkedIds = useShowcaseStore((state) => state.bookmarkedIds);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-slate-950/20 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full border border-cyan-400/40 flex items-center justify-center bg-cyan-950/30 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
          <Compass className="h-5 w-5 text-cyan-400 animate-pulse" />
        </div>
        <div>
          <span className="font-heading font-extrabold text-xl tracking-[0.25em] text-white">
            BENGALA
          </span>
          <span className="block text-[9px] uppercase tracking-widest text-cyan-400/80 -mt-1">
            Bangladesh
          </span>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wider text-slate-300">
        {['Destinations', 'Expeditions', 'Itineraries', 'Heritage', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="hover:text-cyan-400 transition-colors duration-200"
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <button
          aria-label="Search"
          className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
        >
          <Search className="h-4 w-4 text-slate-300" />
        </button>

        <div className="relative">
          <button
            aria-label="Bookmarks"
            className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <BookmarkCheck className="h-4 w-4 text-slate-300" />
          </button>
          {bookmarkedIds.size > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-black shadow-[0_0_8px_rgba(0,240,255,0.6)]">
              {bookmarkedIds.size}
            </span>
          )}
        </div>

        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-semibold uppercase tracking-wider text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)]">
          <Sparkles className="h-3.5 w-3.5 text-slate-950" />
          Plan Expedition
        </button>
      </div>
    </header>
  );
}

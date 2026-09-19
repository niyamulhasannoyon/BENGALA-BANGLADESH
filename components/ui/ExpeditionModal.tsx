'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeroStore } from '@/lib/store/useHeroStore';
import { useToast } from '@/components/ui/ToastProvider';
import { X, MapPin, Calendar, Star, CheckCircle2, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { MODAL_VARIANTS, TRANSITION_FAST } from '@/lib/motion';

export const ExpeditionModal: React.FC = () => {
  const { activeModalDestination, closeExpeditionModal } = useHeroStore();
  const { showToast } = useToast();

  const [travelerName, setTravelerName] = useState('');
  const [travelerEmail, setTravelerEmail] = useState('');
  const [travelersCount, setTravelersCount] = useState('2');
  const [inquirySent, setInquirySent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle ESC key inside modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeExpeditionModal();
      }
    };
    if (activeModalDestination) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalDestination, closeExpeditionModal]);

  if (!activeModalDestination) return null;

  const dest = activeModalDestination;

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!travelerName || !travelerEmail) {
      showToast({
        title: 'Incomplete Request',
        description: 'Please provide your name and private email address.',
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setInquirySent(true);
      showToast({
        title: 'Concierge Inquiry Dispatched',
        description: `Our VIP Private Expeditions Director will contact you regarding ${dest.title}.`,
        type: 'success',
      });
    }, 700);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Backdrop Scrim */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={TRANSITION_FAST}
          onClick={closeExpeditionModal}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          variants={MODAL_VARIANTS}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0B120E] border border-brass/30 shadow-2xl z-10 my-auto text-alabaster"
        >
          {/* Close Button */}
          <button
            onClick={closeExpeditionModal}
            aria-label="Close modal"
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/70 hover:bg-white/20 border border-white/15 text-mist hover:text-alabaster transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Banner Header */}
          <div className="relative w-full h-64 sm:h-80 overflow-hidden rounded-t-3xl bg-black/60">
            <Image
              src={dest.heroBgUrl}
              alt={dest.title}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              placeholder={dest.blurDataUrl ? 'blur' : 'empty'}
              blurDataURL={dest.blurDataUrl || undefined}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B120E] via-[#0B120E]/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-brass/20 border border-brass/40 text-brass text-[10px] uppercase font-bold tracking-widest backdrop-blur-sm">
                  {dest.categoryBadge}
                </span>
                <span className="text-xs text-mist font-mono flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-brass/80" />
                  {dest.region}
                </span>
              </div>
              <h2 id="modal-title" className="font-syne text-3xl sm:text-5xl font-bold text-alabaster">
                {dest.title}
              </h2>
            </div>
          </div>

          {/* Body Content Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Narrative, Highlights, Specs */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-brass font-semibold mb-2 font-mono">
                  The Journey
                </h3>
                <p className="text-mist text-sm sm:text-base leading-editorial font-normal">
                  {dest.description}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-brass font-semibold mb-3 font-mono">
                  Curated Inclusions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {dest.highlights.map((highlight, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-mist"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expedition Specs */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-black/50 border border-white/[0.08]">
                <div>
                  <span className="text-[10px] uppercase font-mono text-stone block">Optimal Season</span>
                  <div className="flex items-center gap-1 mt-1 text-xs text-alabaster font-medium">
                    <Calendar className="w-3.5 h-3.5 text-brass" />
                    <span>{dest.bestSeason}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-stone block">Curated Rating</span>
                  <div className="flex items-center gap-1 mt-1 text-xs text-brass font-medium">
                    <Star className="w-3.5 h-3.5 fill-brass" />
                    <span>{dest.rating.toFixed(1)} / 5.0</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-stone block">Coordinates</span>
                  <span className="text-xs font-mono text-mist mt-1 block">
                    {dest.coordinates.lat.toFixed(2)}°N, {dest.coordinates.lng.toFixed(2)}°E
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Private Charter Inquiry Box */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-[#0E1612] border border-white/[0.1] shadow-xl">
              {dest.curatedExpedition && (
                <div className="mb-6 pb-6 border-b border-white/[0.08] space-y-2">
                  <div className="flex items-center gap-2 text-brass text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Private Charter Package</span>
                  </div>
                  <h4 className="font-syne font-bold text-base text-alabaster">
                    {dest.curatedExpedition.title}
                  </h4>
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-xs text-mist">{dest.curatedExpedition.duration}</span>
                    <span className="font-syne font-bold text-xl text-brass">
                      {dest.curatedExpedition.priceStarting}
                    </span>
                  </div>
                </div>
              )}

              {/* Inquiry Form */}
              {inquirySent ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-brass/20 border border-brass flex items-center justify-center text-brass">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-syne text-lg font-bold text-alabaster">Dossier Dispatched</h4>
                  <p className="text-xs text-mist leading-relaxed">
                    Our lead concierge in Dhaka will review private yacht/helicopter slots and prepare your bespoke itinerary within 4 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="space-y-4">
                  <h4 className="text-xs uppercase font-bold tracking-widest text-alabaster font-mono">
                    VIP Concierge Inquiry
                  </h4>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-mist block mb-1 font-mono">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Lord / Lady / Dr. Harrison"
                      value={travelerName}
                      onChange={(e) => setTravelerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/[0.12] text-alabaster text-xs focus:border-brass focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-mist block mb-1 font-mono">
                      Private Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@privateoffice.com"
                      value={travelerEmail}
                      onChange={(e) => setTravelerEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/[0.12] text-alabaster text-xs focus:border-brass focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-mist block mb-1 font-mono">
                      Travelers
                    </label>
                    <select
                      value={travelersCount}
                      onChange={(e) => setTravelersCount(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/[0.12] text-alabaster text-xs focus:border-brass focus:outline-none transition-colors"
                    >
                      <option value="1">1 Guest (Private Solo Sanctuary)</option>
                      <option value="2">2 Guests (Couple Expedition)</option>
                      <option value="4">4 Guests (Private Cabin Charter)</option>
                      <option value="6+">6+ Guests (Full Vessel / Villa Buyout)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brass hover:bg-brass-light text-black font-semibold text-xs uppercase tracking-wider transition-all disabled:opacity-50 active:scale-98 shadow-md"
                  >
                    <Send className="w-3.5 h-3.5 text-black" />
                    <span>{isSubmitting ? 'Transmitting...' : 'Request VIP Charter Details'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { ArrowRight, Send, Sparkles, Gift, BookOpen, Palette, CheckCircle } from 'lucide-react';

interface HeroFeaturedBannersProps {
  onBannerClick: (category: string, subcategory?: string | null) => void;
}

export const HeroFeaturedBanners: React.FC<HeroFeaturedBannersProps> = ({ onBannerClick }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleWhatsAppSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNum = phoneNumber.trim();
    const msg = encodeURIComponent(
      `Hello Zest Enterprises, I would like to receive your complete catalog, price lists and supply updates.${
        cleanNum ? ` My contact number is: ${cleanNum}` : ''
      }`
    );
    window.open(`https://wa.me/919321445253?text=${msg}`, '_blank');
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* 1. TOP WIDE HERO BANNER (Box 1) - Kept as requested */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-r from-[#243315] via-[#2F421A] to-[#4D6429] text-white shadow-xl overflow-hidden border border-[#A6C48A]/30">
        {/* Ambient background glows */}
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-black/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Text Content */}
          <div className="flex-1 max-w-2xl text-center lg:text-left space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[#EEF4E5] text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#A6C48A]" />
              <span>Wholesale &amp; Institutional Supply Partner</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black tracking-tight text-white leading-tight font-serif">
              For All Your Supply Needs — <span className="text-[#A6C48A]">You name it, We have it</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#EEF4E5] font-medium leading-relaxed">
              <span className="font-bold text-white">"Your Needs. Our Priority."</span> Direct bulk supplies, customized company logo branding, institutional quotations, and pan-India dispatch.
            </p>

            {/* Subscribe Form (Enter phone number -> Opens WhatsApp of Owner) */}
            <div className="pt-2">
              <form
                onSubmit={handleWhatsAppSubscribe}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-md mx-auto lg:mx-0"
              >
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number..."
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-900/90 border border-white/25 text-white placeholder-slate-400 focus:outline-hidden focus:border-[#A6C48A] text-xs sm:text-sm shadow-inner"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02] cursor-pointer shrink-0"
                  title="Subscribe and open WhatsApp of the owner"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubscribed ? 'Opening WhatsApp...' : 'Subscribe'}</span>
                </button>
              </form>
              <div className="flex items-center justify-center lg:justify-start gap-4 mt-2 text-[11px] text-[#EEF4E5]/80">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-[#A6C48A]" /> Instant WhatsApp dispatch
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-[#A6C48A]" /> Pan-India delivery
                </span>
              </div>
            </div>
          </div>

          {/* Right Highlights Card / Image */}
          <div className="w-full lg:w-auto shrink-0 flex items-center justify-center">
            <div
              onClick={() => onBannerClick('CORPORATE GIFTING', 'bottless')}
              className="group/card relative w-full max-w-[340px] sm:max-w-[380px] rounded-2xl p-5 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl cursor-pointer hover:bg-white/15 transition-all text-left"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#A6C48A] bg-[#243315]/80 px-2.5 py-1 rounded-full">
                  Featured Collection
                </span>
                <span className="text-xs font-bold text-white group-hover/card:text-[#A6C48A] flex items-center gap-1">
                  Explore <ArrowRight className="w-3 h-3 group-hover/card:translate-x-1 transition-transform" />
                </span>
              </div>
              <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-black/20 border border-white/20">
                <img
                  src="/assets/aistudio/d_handle_double_shipper_tumbler_mix_add234a3.jpeg"
                  alt="Corporate Gifting Bottles and Drinkware"
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 className="text-base font-black text-white">
                Corporate Gifting &amp; Bottles
              </h4>
              <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                Double sipper tumblers, vacuum sports flasks, wooden lid bottles &amp; custom branded mugs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BOTTOM 3 BOXES GRID (Boxes 2, 3, 4) - Restored Home Experience */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {/* BOX 2: School & Office Stationery */}
        <div
          onClick={() => onBannerClick('STATIONERIES', null)}
          className="group relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-[#2F421A] to-[#1C2A0F] text-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden border border-[#A6C48A]/40 flex flex-col justify-between min-h-[260px]"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onBannerClick('STATIONERIES', null);
            }
          }}
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#A6C48A] mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#A6C48A] block">
              Essential Supplies
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-snug">
              Stationery &amp; Office Supplies
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Copier paper reams, archival files, registers, desktop calculators &amp; writing pens for institutions.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <span className="text-xs font-bold text-white group-hover:text-[#A6C48A] flex items-center gap-1.5">
              <span>View Stationery</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

        {/* BOX 3: Corporate Gifting & Bottles */}
        <div
          onClick={() => onBannerClick('CORPORATE GIFTING', 'bottless')}
          className="group relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-[#4D6429] to-[#36481C] text-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden border-2 border-[#A6C48A] ring-2 ring-emerald-400/20 flex flex-col justify-between min-h-[260px]"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onBannerClick('CORPORATE GIFTING', 'bottless');
            }
          }}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white mb-1">
                <Gift className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-[#25D366] text-white px-2 py-0.5 rounded-full shadow-xs">
                HOT CATEGORY
              </span>
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#EEF4E5] block">
              Merchandise &amp; Gifting
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-snug">
              Bottles &amp; Keychains
            </h3>
            <p className="text-xs sm:text-sm text-[#EEF4E5] leading-relaxed">
              Explore 11 custom drinkware models &amp; 33 executive keychains ready with company laser branding.
            </p>
          </div>

          <div className="pt-4 flex items-center gap-2 flex-wrap">
            <span
              onClick={(e) => {
                e.stopPropagation();
                onBannerClick('CORPORATE GIFTING', 'keychains');
              }}
              className="text-xs font-extrabold text-white hover:bg-white hover:text-[#243315] flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <span>Keychains (33)</span>
              <ArrowRight className="w-3 h-3" />
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                onBannerClick('CORPORATE GIFTING', 'bottless');
              }}
              className="text-xs font-extrabold text-[#EEF4E5] hover:bg-white/30 flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <span>Bottles (11)</span>
            </span>
          </div>
        </div>

        {/* BOX 4: Art & Craft Materials */}
        <div
          onClick={() => onBannerClick('ART SUPPLIES', null)}
          className="group relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-[#243315] to-[#1A260E] text-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden border border-[#A6C48A]/40 flex flex-col justify-between min-h-[260px]"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onBannerClick('ART SUPPLIES', null);
            }
          }}
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#A6C48A] mb-3">
              <Palette className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#A6C48A] block">
              Creative Excellence
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-snug">
              Art Supplies &amp; Craft Materials
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Non-toxic paints, student sketchbooks, artist canvases, clay doughs &amp; precision brushes.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <span className="text-xs font-bold text-white group-hover:text-[#A6C48A] flex items-center gap-1.5">
              <span>View Art Supplies</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

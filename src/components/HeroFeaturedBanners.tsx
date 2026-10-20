import React from 'react';

interface HeroFeaturedBannersProps {
  onBannerClick: (category: string, subcategory?: string | null) => void;
}

export const HeroFeaturedBanners: React.FC<HeroFeaturedBannersProps> = ({ onBannerClick }) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* 1. TOP WIDE HERO BANNER: "Your Everyday Essentials, Curated" */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => onBannerClick('STATIONERIES', null)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onBannerClick('STATIONERIES', null);
          }
        }}
        aria-label="Your Everyday Essentials, Curated - Pens, notebooks, planners and tools that fit seamlessly into your daily routine"
        className="group relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer bg-white"
      >
        <img
          src="/assets/aistudio/home_hero_top_banner.png"
          alt="Your Everyday Essentials, Curated - Pens, notebooks, planners & tools that fit seamlessly into your daily routine"
          className="w-full h-auto object-contain block group-hover:scale-[1.008] transition-transform duration-300"
        />
      </div>

      {/* 2. BOTTOM 3 BOXES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {/* CARD 1: Stationery that inspires every Day */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onBannerClick('STATIONERIES', null)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onBannerClick('STATIONERIES', null);
            }
          }}
          aria-label="Stationery that inspires every Day - Shop Now"
          className="group relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-white"
        >
          <img
            src="/assets/aistudio/home_card_stationery.png"
            alt="Stationery that inspires every Day - From pens that glide effortlessly to notebooks that hold your thoughts discover tools designed to elevate your everyday - Shop Now"
            className="w-full h-auto object-contain block group-hover:scale-[1.015] transition-transform duration-300"
          />
        </div>

        {/* CARD 2: Organize, focus, achieve */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onBannerClick('OFFICE SUPPLIES', null)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onBannerClick('OFFICE SUPPLIES', null);
            }
          }}
          aria-label="Organize, focus, achieve - Shop Now"
          className="group relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-white"
        >
          <img
            src="/assets/aistudio/home_card_organize.png"
            alt="Organize, focus, achieve - Smart storage, sleek folders, and functional tools to bring clarity to every workspace - Shop Now"
            className="w-full h-auto object-contain block group-hover:scale-[1.015] transition-transform duration-300"
          />
        </div>

        {/* CARD 3: Where ideas take shape */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onBannerClick('ART SUPPLIES', null)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onBannerClick('ART SUPPLIES', null);
            }
          }}
          aria-label="Where ideas take shape - Shop Now"
          className="group relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-white"
        >
          <img
            src="/assets/aistudio/home_card_art.png"
            alt="Where ideas take shape - Premium art materials that let your imagination run free whether you're sketching, painting, or crafting - Shop Now"
            className="w-full h-auto object-contain block group-hover:scale-[1.015] transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
};

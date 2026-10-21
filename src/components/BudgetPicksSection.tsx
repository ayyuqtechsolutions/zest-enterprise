import React from 'react';
import { Product } from '../types';
import { Tag, ArrowRight, CheckCircle2 } from 'lucide-react';

export type BudgetTier = 199 | 299 | 399 | 599;

interface BudgetPicksSectionProps {
  products: Product[];
  onOpenBudgetPage: (tier: BudgetTier) => void;
}

export const BudgetPicksSection: React.FC<BudgetPicksSectionProps> = ({
  products,
  onOpenBudgetPage,
}) => {
  const dynamicCount199 = products.filter((p) => (p.referencePrice ?? 0) > 0 && (p.referencePrice ?? 0) <= 199).length;
  const dynamicCount299 = products.filter((p) => (p.referencePrice ?? 0) > 0 && (p.referencePrice ?? 0) <= 299).length;
  const dynamicCount399 = products.filter((p) => (p.referencePrice ?? 0) > 0 && (p.referencePrice ?? 0) <= 399).length;
  const dynamicCount599 = products.filter((p) => (p.referencePrice ?? 0) > 0 && (p.referencePrice ?? 0) <= 599).length;

  const count199 = dynamicCount199 > 0 ? dynamicCount199 : 17;
  const count299 = dynamicCount299 > 0 ? dynamicCount299 : 23;
  const count399 = dynamicCount399 > 0 ? dynamicCount399 : 28;
  const count599 = dynamicCount599 > 0 ? dynamicCount599 : 29;

  const budgetBoxes = [
    {
      tier: 199 as BudgetTier,
      title: 'Under ₹199',
      subtitle: 'Everyday Essentials & Pocket-Friendly Value',
      count: count199,
      badge: '⚡ BESTSELLER PICKS',
      bgGradient: 'bg-gradient-to-b from-[#0b8054] to-[#044c32]',
      badgeBg: 'bg-[#063321]/80 text-white border border-emerald-400/20',
      buttonText: 'text-[#044c32]',
      highlightItems: 'Archival files, highlighters, erasers, student registers, craft glue & ceramic mugs',
      tagline: 'Ideal for schools & daily office supplies',
    },
    {
      tier: 299 as BudgetTier,
      title: 'Under ₹299',
      subtitle: 'Executive Stationery & Classroom Gear',
      count: count299,
      badge: '🎯 HIGH VALUE PICKS',
      bgGradient: 'bg-gradient-to-b from-[#2162e0] to-[#143274]',
      badgeBg: 'bg-[#0c204d]/80 text-white border border-blue-400/20',
      buttonText: 'text-[#143274]',
      highlightItems: 'Executive roller pens, matte gel sets, desktop calculators & PU leather diaries',
      tagline: 'Perfect for student sets & office desks',
    },
    {
      tier: 399 as BudgetTier,
      title: 'Under ₹399',
      subtitle: 'Corporate Essentials & Premium Supplies',
      count: count399,
      badge: '🔥 POPULAR CHOICE',
      bgGradient: 'bg-gradient-to-b from-[#ea580c] to-[#991b1b]',
      badgeBg: 'bg-[#4a1306]/80 text-white border border-orange-400/20',
      buttonText: 'text-[#991b1b]',
      highlightItems: 'Pure leather wallets, vacuum water bottles, 500-sheet A4 reams & tiffin boxes',
      tagline: 'Top choice for employee onboarding gifts',
    },
    {
      tier: 599 as BudgetTier,
      title: 'Under ₹599',
      subtitle: 'Deluxe Journals & Luxury Gifting',
      count: count599,
      badge: '💎 PREMIUM PICKS',
      bgGradient: 'bg-gradient-to-b from-[#7e22ce] to-[#3b0764]',
      badgeBg: 'bg-[#2b074a]/80 text-white border border-purple-400/20',
      buttonText: 'text-[#3b0764]',
      highlightItems: '160 GSM hardcover bullet journals, power banks, executive hampers & gifting bags',
      tagline: 'High-impact corporate gifting & archival gear',
    },
  ];

  return (
    <section id="budget-picks-section" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header matching screenshot exactly */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4E5] text-[#4D6429] text-[11px] font-bold uppercase tracking-wider mb-2.5 border border-[#A6C48A]/30">
            <Tag className="w-3.5 h-3.5" />
            <span>SMART SPENDING &amp; WHOLESALE VALUE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#243315] tracking-tight">
            GREAT PICKS UNDER BUDGET
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-normal leading-relaxed">
            Choose your target budget slab below. Click any box to explore a dedicated catalog page featuring verified wholesale and institutional items at or below that price.
          </p>
        </div>

        <div className="flex items-center gap-5 text-xs sm:text-sm font-semibold text-slate-700 shrink-0 pb-1">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#4D6429]" />
            <span>Direct GST Invoicing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#4D6429]" />
            <span>Tiered Bulk Discounts</span>
          </div>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {budgetBoxes.map((box) => (
          <div
            key={box.tier}
            onClick={() => onOpenBudgetPage(box.tier)}
            className={`group relative rounded-2xl p-5 sm:p-6 ${box.bgGradient} text-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between`}
          >
            {/* Top Row: Badge & Count */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${box.badgeBg}`}>
                  {box.badge}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/20 text-white shrink-0">
                  {box.count} Items
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {box.title}
              </div>
              <div className="text-xs font-medium text-white/90 mt-1.5 leading-snug">
                {box.subtitle}
              </div>

              {/* Divider */}
              <div className="border-t border-white/15 my-4" />

              {/* Featured Items */}
              <div className="text-xs leading-relaxed">
                <span className="text-white/70 font-bold block text-[10px] uppercase tracking-wider mb-1">
                  FEATURED ITEMS:
                </span>
                <span className="text-white/90">
                  {box.highlightItems}
                </span>
              </div>

              {/* Tagline */}
              <div className="mt-3.5 text-[11px] font-medium text-amber-200/95 italic">
                ✨ {box.tagline}
              </div>
            </div>

            {/* Bottom CTA Button */}
            <div className="mt-6 pt-1">
              <button
                type="button"
                className={`w-full py-2.5 px-4 bg-white ${box.buttonText} font-bold text-xs sm:text-sm rounded-xl shadow-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5 cursor-pointer`}
              >
                <span>Explore {box.title} Store</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

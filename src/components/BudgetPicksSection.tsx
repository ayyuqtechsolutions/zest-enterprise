import React from 'react';
import { Product } from '../types';
import { Tag, ArrowRight, Sparkles, CheckCircle2, ChevronRight, Zap, ShoppingBag, ShieldCheck } from 'lucide-react';

export type BudgetTier = 199 | 299 | 399 | 599;

interface BudgetPicksSectionProps {
  products: Product[];
  onOpenBudgetPage: (tier: BudgetTier) => void;
}

export const BudgetPicksSection: React.FC<BudgetPicksSectionProps> = ({
  products,
  onOpenBudgetPage,
}) => {
  const count199 = products.filter((p) => (p.referencePrice ?? 0) > 0 && (p.referencePrice ?? 0) <= 199).length;
  const count299 = products.filter((p) => (p.referencePrice ?? 0) > 0 && (p.referencePrice ?? 0) <= 299).length;
  const count399 = products.filter((p) => (p.referencePrice ?? 0) > 0 && (p.referencePrice ?? 0) <= 399).length;
  const count599 = products.filter((p) => (p.referencePrice ?? 0) > 0 && (p.referencePrice ?? 0) <= 599).length;

  const budgetBoxes = [
    {
      tier: 199 as BudgetTier,
      title: 'Under ₹199',
      subtitle: 'Everyday Essentials & Pocket-Friendly Value',
      count: count199,
      badge: '⚡ BESTSELLER PICKS',
      bgGradient: 'from-emerald-600 via-emerald-700 to-teal-800',
      badgeBg: 'bg-emerald-900/60 text-emerald-100 border border-emerald-400/30',
      buttonBg: 'bg-white text-emerald-800 hover:bg-emerald-50',
      highlightItems: 'Archival files, highlighters, erasers, student registers, craft glue & ceramic mugs',
      tagline: 'Ideal for schools & daily office supplies',
    },
    {
      tier: 299 as BudgetTier,
      title: 'Under ₹299',
      subtitle: 'Executive Stationery & Classroom Gear',
      count: count299,
      badge: '🎯 HIGH VALUE PICKS',
      bgGradient: 'from-blue-600 via-indigo-700 to-cyan-800',
      badgeBg: 'bg-blue-900/60 text-blue-100 border border-blue-400/30',
      buttonBg: 'bg-white text-blue-900 hover:bg-blue-50',
      highlightItems: 'Executive roller pens, matte gel sets, desktop calculators & PU leather diaries',
      tagline: 'Perfect for student sets & office desks',
    },
    {
      tier: 399 as BudgetTier,
      title: 'Under ₹399',
      subtitle: 'Corporate Essentials & Premium Supplies',
      count: count399,
      badge: '🔥 POPULAR CHOICE',
      bgGradient: 'from-amber-600 via-orange-600 to-rose-700',
      badgeBg: 'bg-amber-950/60 text-amber-100 border border-amber-400/30',
      buttonBg: 'bg-white text-orange-900 hover:bg-orange-50',
      highlightItems: 'Pure leather wallets, vacuum water bottles, 500-sheet A4 reams & tiffin boxes',
      tagline: 'Top choice for employee onboarding gifts',
    },
    {
      tier: 599 as BudgetTier,
      title: 'Under ₹599',
      subtitle: 'Deluxe Journals & Luxury Gifting',
      count: count599,
      badge: '💎 PREMIUM PICKS',
      bgGradient: 'from-purple-700 via-violet-800 to-fuchsia-800',
      badgeBg: 'bg-purple-950/60 text-purple-100 border border-purple-400/30',
      buttonBg: 'bg-white text-purple-950 hover:bg-purple-50',
      highlightItems: '160 GSM hardcover bullet journals, power banks, executive hampers & gifting bags',
      tagline: 'High-impact corporate gifting & archival gear',
    },
  ];

  return (
    <section id="budget-picks-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4E5] text-[#4D6429] text-xs font-extrabold uppercase tracking-wider mb-2">
            <Tag className="w-3.5 h-3.5" />
            <span>Smart Spending &amp; Wholesale Value</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#243315] tracking-tight">
            GREAT PICKS UNDER BUDGET
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Choose your target budget slab below. Click any box to explore a dedicated catalog page featuring verified wholesale and institutional items at or below that price.
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-xs font-semibold text-slate-600 shrink-0">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#4D6429]" />
            <span>Direct GST Invoicing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#243315]" />
            <span>Tiered Bulk Discounts</span>
          </div>
        </div>
      </div>

      {/* 4 Colorful BG Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {budgetBoxes.map((box) => (
          <div
            key={box.tier}
            onClick={() => onOpenBudgetPage(box.tier)}
            className={`group relative rounded-3xl p-6 sm:p-7 bg-gradient-to-br ${box.bgGradient} text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between overflow-hidden border border-white/15`}
          >
            {/* Background Decorative Circles */}
            <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-black/15 blur-lg pointer-events-none" />

            {/* Top Row: Badge & Count */}
            <div className="relative z-10 flex items-start justify-between gap-2 mb-4">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wide uppercase shadow-xs ${box.badgeBg}`}>
                {box.badge}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-xs text-white border border-white/20 shrink-0">
                {box.count} Items
              </span>
            </div>

            {/* Middle: Title, Subtitle, Highlights */}
            <div className="relative z-10 my-2">
              <div className="text-3xl sm:text-4xl font-black tracking-tight drop-shadow-xs">
                {box.title}
              </div>
              <div className="text-xs font-semibold text-white/90 mt-1">
                {box.subtitle}
              </div>

              <div className="mt-4 pt-3 border-t border-white/20 text-xs text-white/80 leading-relaxed">
                <span className="text-white/60 font-medium block text-[10px] uppercase tracking-wider mb-1">
                  Featured Items:
                </span>
                {box.highlightItems}
              </div>

              <div className="mt-3 text-[11px] font-medium text-white/70 italic">
                ✨ {box.tagline}
              </div>
            </div>

            {/* Bottom CTA Button */}
            <div className="relative z-10 mt-6 pt-2">
              <div
                className={`w-full py-3 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all duration-200 group-hover:gap-3 ${box.buttonBg}`}
              >
                <span>Explore {box.title} Store</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

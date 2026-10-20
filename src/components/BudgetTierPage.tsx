import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { BudgetTier } from './BudgetPicksSection';
import { 
  ArrowLeft, 
  Tag, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Heart, 
  Mail, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  Building2, 
  Sparkles 
} from 'lucide-react';
import { sendInquiryEmail } from '../utils/inquiryEmail';

interface BudgetTierPageProps {
  currentTier: BudgetTier;
  onSelectTier: (tier: BudgetTier) => void;
  onBackToHome: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (productId: string) => void;
  onOpenInquiryForProduct: (product: Product) => void;
  onOpenGeneralInquiry: () => void;
}

const TIER_CONFIG: Record<
  BudgetTier,
  {
    title: string;
    label: string;
    subtitle: string;
    gradient: string;
    lightBg: string;
    badgeBg: string;
    badgeBorder: string;
    badgeText: string;
    accentColor: string;
  }
> = {
  199: {
    title: 'Under ₹199 Store',
    label: 'Under ₹199',
    subtitle: 'Cost-effective stationery, filing solutions, classroom supplies & everyday desk tools.',
    gradient: 'from-emerald-600 via-emerald-700 to-teal-800',
    lightBg: 'bg-emerald-50',
    badgeBg: 'bg-emerald-100',
    badgeBorder: 'border-emerald-300',
    badgeText: 'text-emerald-800',
    accentColor: '#059669',
  },
  299: {
    title: 'Under ₹299 Store',
    label: 'Under ₹299',
    subtitle: 'Executive roller pens, commercial calculators, student kits & premium diaries.',
    gradient: 'from-blue-600 via-indigo-700 to-cyan-800',
    lightBg: 'bg-blue-50',
    badgeBg: 'bg-blue-100',
    badgeBorder: 'border-blue-300',
    badgeText: 'text-blue-800',
    accentColor: '#2563EB',
  },
  399: {
    title: 'Under ₹399 Store',
    label: 'Under ₹399',
    subtitle: 'Leather accessories, double-wall vacuum bottles, A4 reams & artist sketchbooks.',
    gradient: 'from-amber-600 via-orange-600 to-rose-700',
    lightBg: 'bg-amber-50',
    badgeBg: 'bg-amber-100',
    badgeBorder: 'border-amber-300',
    badgeText: 'text-amber-800',
    accentColor: '#EA580C',
  },
  599: {
    title: 'Under ₹599 Store',
    label: 'Under ₹599',
    subtitle: '160 GSM hardcover bullet journals, deluxe gift sets & institutional hampers.',
    gradient: 'from-purple-700 via-violet-800 to-fuchsia-800',
    lightBg: 'bg-purple-50',
    badgeBg: 'bg-purple-100',
    badgeBorder: 'border-purple-300',
    badgeText: 'text-purple-800',
    accentColor: '#7C3AED',
  },
};

export const BudgetTierPage: React.FC<BudgetTierPageProps> = ({
  currentTier,
  onSelectTier,
  onBackToHome,
  products,
  onSelectProduct,
  wishlistIds,
  onToggleWishlist,
  onOpenInquiryForProduct,
  onOpenGeneralInquiry,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating' | 'name'>('price-asc');

  const config = TIER_CONFIG[currentTier];

  const tierProducts = useMemo(() => {
    return products.filter((p) => (p.referencePrice ?? 0) > 0 && (p.referencePrice ?? 0) <= currentTier);
  }, [products, currentTier]);

  // Categories available within this tier
  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    tierProducts.forEach((p) => {
      if (p.mainCategory) cats.add(p.mainCategory);
    });
    return Array.from(cats);
  }, [tierProducts]);

  // Filter and sort
  const displayProducts = useMemo(() => {
    let list = tierProducts.filter((p) => {
      const matchesCat = selectedCategory === 'ALL' || p.mainCategory === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });

    list.sort((a, b) => {
      if (sortBy === 'price-asc') return a.referencePrice - b.referencePrice;
      if (sortBy === 'price-desc') return b.referencePrice - a.referencePrice;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return a.title.localeCompare(b.title);
    });

    return list;
  }, [tierProducts, selectedCategory, searchQuery, sortBy]);

  const handleSendTierBulkInquiry = () => {
    sendInquiryEmail({
      category: `Great Picks Under ₹${currentTier}`,
      customMessage: `I would like to inquire about wholesale volume order options for products in your "Under ₹${currentTier}" catalog. Please share itemized pricing slabs and sample availability.`,
    });
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] py-4 sm:py-8 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full max-w-full overflow-hidden">
      {/* Breadcrumb & Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-500 font-medium flex-wrap">
          <button
            type="button"
            onClick={onBackToHome}
            className="flex items-center gap-1.5 text-slate-700 hover:text-[#4D6429] font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <span>/</span>
          <span className="text-slate-500">Great Picks Under Budget</span>
          <span>/</span>
          <span className="text-[#243315] font-bold">{config.label}</span>
        </div>

        {/* 4 Switcher Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl overflow-x-auto max-w-full">
          {([199, 299, 399, 599] as BudgetTier[]).map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => {
                onSelectTier(tier);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                currentTier === tier
                  ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              Under ₹{tier}
            </button>
          ))}
        </div>
      </div>

      {/* Colorful Hero Banner for this Budget Tier */}
      <div
        className={`rounded-2xl sm:rounded-3xl p-5 sm:p-10 bg-gradient-to-br ${config.gradient} text-white shadow-xl mb-6 sm:mb-8 relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-black uppercase tracking-wider mb-3">
            <Tag className="w-3.5 h-3.5" />
            <span>Dedicated Budget Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-2">
            {config.title}
          </h1>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl mb-6">
            {config.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-white/90">
            <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-lg backdrop-blur-xs">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>{tierProducts.length} Items Under ₹{currentTier}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-lg backdrop-blur-xs">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Pan-India Dispatch</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-lg backdrop-blur-xs">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>GST Bulk Quotations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search, Filter, Sort Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search within ${config.label} products...`}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4D6429] text-xs sm:text-sm text-slate-800"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort By:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#4D6429]"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Product Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'ALL'
                ? 'bg-[#243315] text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            All Categories ({tierProducts.length})
          </button>
          {availableCategories.map((cat) => {
            const count = tierProducts.filter((p) => p.mainCategory === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#4D6429] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Results Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 mb-4 px-1">
        <span>
          Showing <strong className="text-slate-900">{displayProducts.length}</strong> items in{' '}
          <strong className="text-[#243315]">{config.title}</strong>
        </span>
        <button
          type="button"
          onClick={handleSendTierBulkInquiry}
          className="text-[#4D6429] hover:underline font-bold flex items-center gap-1 cursor-pointer"
        >
          <Mail className="w-3.5 h-3.5 shrink-0" />
          <span>Email Inquiry for all Under ₹{currentTier} products</span>
        </button>
      </div>

      {/* Product Grid */}
      {displayProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
          {displayProducts.map((product) => {
            const isWishlisted = wishlistIds.has(product.id);
            const discountPct = product.mrp
              ? Math.round(((product.mrp - product.referencePrice) / product.mrp) * 100)
              : null;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-[#4D6429]/40 hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden group"
              >
                {/* Image */}
                <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Tier Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span
                      className={`px-2.5 py-0.5 text-[10px] font-black rounded-full border shadow-xs ${config.badgeBg} ${config.badgeBorder} ${config.badgeText}`}
                    >
                      Under ₹{currentTier}
                    </span>
                  </div>

                  {/* Discount */}
                  {discountPct && discountPct > 0 && (
                    <div className="absolute bottom-2.5 left-2.5">
                      <span className="px-2 py-0.5 bg-[#4D6429] text-white text-[10px] font-black rounded shadow-xs">
                        Save {discountPct}%
                      </span>
                    </div>
                  )}

                  {/* Wishlist */}
                  <button
                    type="button"
                    onClick={() => onToggleWishlist(product.id)}
                    className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all cursor-pointer shadow-xs ${
                      isWishlisted
                        ? 'bg-white text-[#4D6429]'
                        : 'bg-white/80 hover:bg-white text-slate-500 hover:text-[#4D6429]'
                    }`}
                    title="Shortlist for inquiry"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#4D6429]' : ''}`} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                      <span className="text-[#243315] uppercase tracking-wider">{product.brand}</span>
                      <span className="text-slate-400">{product.sku}</span>
                    </div>

                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-bold text-sm text-slate-900 line-clamp-2 hover:text-[#4D6429] cursor-pointer transition-colors leading-snug"
                      title={product.title}
                    >
                      {product.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Pricing & Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                        Ref. Price
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-black text-[#243315]">
                          ₹{product.referencePrice}
                        </span>
                        {product.mrp && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{product.mrp}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
                        title="View Detailed Specifications"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Specs</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenInquiryForProduct(product)}
                        className="px-3 py-1.5 rounded-lg bg-[#4D6429] hover:bg-[#3E5220] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                        title="Send Product Inquiry to zestenterprises21@gmail.com"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Inquire</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-8">
          <div className="w-12 h-12 rounded-full bg-[#EEF4E5] text-[#4D6429] flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No products matched your search</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords or select "All Categories" to view all available items under ₹{currentTier}.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-[#243315] text-white text-xs font-bold cursor-pointer hover:bg-[#1C2810]"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Bottom Bulk Procurement Callout */}
      <div className="bg-gradient-to-r from-slate-900 to-[#243315] rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md mb-10">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#8DA962] block mb-1">
            Institutional Procurement Desk
          </span>
          <h3 className="text-xl sm:text-2xl font-black">
            Need Bulk Quotation for Under ₹{currentTier} Items?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            We provide volume discounts, customized institutional branding (laser engraving &amp; logo printing), and official GST invoices.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleSendTierBulkInquiry}
            className="px-5 py-3 rounded-xl bg-[#4D6429] hover:bg-[#3E5220] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Email Bulk Inquiry Now</span>
          </button>
          <a
            href="tel:+919321445253"
            className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <span>Call Desk</span>
          </a>
        </div>
      </div>
    </div>
  );
};

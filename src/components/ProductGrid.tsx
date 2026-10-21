import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { CATEGORIES_DATA } from '../data/categories';
import { 
  Heart, 
  Info, 
  SlidersHorizontal, 
  RotateCcw, 
  FileText, 
  Search, 
  ArrowLeft,
  Home,
  PackageSearch
} from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  selectedSubcategory: string | null;
  searchQuery: string;
  onSelectCategory: (cat: string) => void;
  onSelectSubcategory: (subcat: string | null) => void;
  onClearFilters: () => void;
  onBackToHome?: () => void;
  onSelectProduct: (product: Product) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (productId: string) => void;
  onOpenInquiryForProduct: (product: Product) => void;
}

// Authentic WhatsApp SVG Icon
export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4 fill-current" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  selectedSubcategory,
  searchQuery,
  onSelectCategory,
  onSelectSubcategory,
  onClearFilters,
  onBackToHome,
  onSelectProduct,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'name'>('featured');

  // Find subcategories list for current category
  const activeMainCat = CATEGORIES_DATA.find(
    (c) => c.title.toUpperCase() === selectedCategory.toUpperCase()
  );

  const availableSubcategories = useMemo(() => {
    if (!activeMainCat) return [];
    const items: string[] = [];
    activeMainCat.groups.forEach((g) => {
      g.items.forEach((item) => {
        if (!items.includes(item.name)) items.push(item.name);
      });
    });
    return items;
  }, [activeMainCat]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'ALL') {
        if (p.mainCategory.toUpperCase() !== selectedCategory.toUpperCase()) {
          return false;
        }
      }
      // Subcategory filter
      if (selectedSubcategory) {
        const s = selectedSubcategory.toLowerCase();
        const matchesSub = 
          p.subCategory.toLowerCase() === s ||
          p.subCategoryGroup.toLowerCase() === s ||
          (s.includes('bottle') && p.subCategory.toLowerCase().includes('bottle')) ||
          (s.includes('keychain') && p.subCategory.toLowerCase().includes('keychain'));
        if (!matchesSub) return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQ =
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesQ) return false;
      }
      return true;
    });

    // Sorting
    if (sortBy === 'name') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [products, selectedCategory, selectedSubcategory, searchQuery, sortBy]);

  const hasActiveFilters = selectedCategory !== 'ALL' || selectedSubcategory !== null || searchQuery.trim().length > 0;

  return (
    <section id="products-section" className="max-w-7xl mx-auto px-4 py-8">
      {/* SECTION HEADER & BREADCRUMB */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1 flex-wrap">
            {onBackToHome && (
              <button
                type="button"
                onClick={onBackToHome}
                className="hover:text-[#4D6429] font-medium transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Home className="w-3.5 h-3.5 text-[#4D6429]" />
                <span>Home</span>
              </button>
            )}
            <span>/</span>
            <span 
              onClick={() => {
                onSelectCategory('ALL');
                onSelectSubcategory(null);
              }}
              className="hover:text-[#4D6429] cursor-pointer transition-colors"
            >
              Catalog
            </span>
            <span>/</span>
            <span 
              onClick={() => onSelectSubcategory(null)}
              className="font-medium text-slate-700 hover:text-[#4D6429] cursor-pointer"
            >
              {selectedCategory === 'ALL' ? 'All Products' : selectedCategory}
            </span>
            {selectedSubcategory && (
              <>
                <span>/</span>
                <span className="font-bold text-[#4D6429]">{selectedSubcategory}</span>
              </>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#243315] tracking-tight">
            {selectedSubcategory
              ? selectedSubcategory
              : selectedCategory === 'ALL'
              ? 'Product Catalog'
              : selectedCategory}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Direct bulk supplies, customized corporate logo branding, and nationwide delivery. Click any product to enquire directly on WhatsApp with our team.
          </p>
        </div>

        {/* Sort and Count Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap">
          {onBackToHome && (
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:border-[#4D6429] hover:bg-[#EEF4E5] text-[#243315] font-semibold text-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#4D6429]" />
              <span>Back to Home</span>
            </button>
          )}

          <span className="text-xs text-slate-500">
            Showing <strong className="text-[#243315]">{filteredProducts.length}</strong> items
          </span>

          <div className="flex items-center gap-1.5 border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-500 hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-medium text-slate-800 focus:outline-hidden cursor-pointer"
            >
              <option value="featured">Featured / Curated</option>
              <option value="name">Alphabetical (A - Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* FILTER BUTTONS & PILLS */}
      <div className="py-4 space-y-3">
        {/* Main Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => {
              onSelectCategory('ALL');
              onSelectSubcategory(null);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'ALL'
                ? 'bg-[#4D6429] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Products ({products.length})
          </button>
          {CATEGORIES_DATA.map((cat) => {
            const isSelected = selectedCategory.toUpperCase() === cat.title.toUpperCase();
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  onSelectCategory(cat.title);
                  onSelectSubcategory(null);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#4D6429] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.title}
              </button>
            );
          })}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#4D6429] bg-[#EEF4E5] hover:bg-[#E2ECD5] flex items-center gap-1 shrink-0 cursor-pointer ml-auto border border-[#A6C48A]/40"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Subcategory Filter Pills (when a main category is selected) */}
        {availableSubcategories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Subcategories:
            </span>
            <button
              type="button"
              onClick={() => onSelectSubcategory(null)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors shrink-0 cursor-pointer ${
                selectedSubcategory === null
                  ? 'bg-[#243315] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              All in {selectedCategory}
            </button>
            {availableSubcategories.map((sub) => {
              const isSubActive = selectedSubcategory === sub;
              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => onSelectSubcategory(isSubActive ? null : sub)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors shrink-0 cursor-pointer ${
                    isSubActive
                      ? 'bg-[#243315] text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-[#4D6429]/40 hover:bg-slate-50'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        )}

        {/* Active Search Filter Pill */}
        {searchQuery.trim() && (
          <div className="flex items-center gap-2 p-2 bg-[#EEF4E5] border border-[#A6C48A]/40 rounded-lg text-xs text-[#243315]">
            <Search className="w-3.5 h-3.5 text-[#4D6429]" />
            <span>
              Searching for: <strong className="font-semibold text-[#243315]">"{searchQuery}"</strong>
            </span>
            <button
              type="button"
              onClick={() => onClearFilters()}
              className="text-[#4D6429] hover:underline font-bold ml-auto"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* PRODUCTS GRID */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.has(product.id);
            const whatsappMessage = `Hello Zest Enterprises, I would like to enquire about: ${product.title}`;
            const whatsappUrl = `https://wa.me/919321445253?text=${encodeURIComponent(whatsappMessage)}`;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-[#4D6429]/40 transition-all duration-300 flex flex-col group"
              >
                {/* Image Container with Zoom & Badges */}
                <div 
                  className="relative aspect-square w-full bg-slate-50 overflow-hidden cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
                  />

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
                    {product.badges.map((badge, bIdx) => (
                      <span
                        key={bIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-[#243315] shadow-2xs border border-slate-200 backdrop-blur-xs"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Wishlist Heart Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-xs cursor-pointer z-10 ${
                      isWishlisted
                        ? 'bg-[#EEF4E5] text-[#4D6429] hover:bg-[#E2ECD5]'
                        : 'bg-white/90 text-slate-600 hover:text-[#4D6429] hover:bg-white'
                    }`}
                    title={isWishlisted ? 'Remove from Saved' : 'Save to Shortlist'}
                  >
                    <Heart
                      className={`w-4 h-4 ${isWishlisted ? 'fill-[#4D6429]' : ''}`}
                    />
                  </button>

                  {/* Quick View Hover Strip */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-200 flex items-center justify-between text-white text-xs">
                    <span className="font-medium flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" />
                      Click for specifications
                    </span>
                    <span className="font-mono text-[11px]">{product.sku}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    {/* Category breadcrumb & status */}
                    <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                      <span className="text-[#4D6429] font-bold">{product.subCategory}</span>
                      <span className="text-[#243315] bg-[#EEF4E5] px-1.5 py-0.5 rounded font-medium">
                        Custom Logo Ready
                      </span>
                    </div>

                    {/* Product Title */}
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-bold text-sm text-slate-900 group-hover:text-[#4D6429] transition-colors line-clamp-2 cursor-pointer leading-snug"
                    >
                      {product.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>

                    {/* Specifications Snippet */}
                    <div className="pt-1 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 font-mono line-clamp-1">
                      {product.specifications.capacity && (
                        <span>Capacity: {product.specifications.capacity} • </span>
                      )}
                      {product.specifications.material && (
                        <span>{product.specifications.material}</span>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom: ONLY ENQUIRY BUTTON (NO PRICES) */}
                  <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer text-center"
                      title={`Enquire on WhatsApp for ${product.title}`}
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
                      <span>Enquire on WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="w-full py-1.5 text-center text-[11px] font-semibold text-slate-500 hover:text-[#4D6429] hover:underline flex items-center justify-center gap-1 cursor-pointer transition-colors"
                    >
                      <FileText className="w-3 h-3" />
                      <span>View Specifications</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State for Empty Categories */
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 max-w-lg mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#EEF4E5] text-[#4D6429] flex items-center justify-center mx-auto mb-3">
            <PackageSearch className="w-7 h-7" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-lg">
            No products currently listed in {selectedCategory === 'ALL' ? 'this filter' : selectedCategory}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
            We are actively expanding our catalog. For direct bulk supply, custom branding, or institutional inquiries, contact us directly on WhatsApp.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/919321445253?text=Hello%20Zest%20Enterprises,%20I%20have%20an%20enquiry%20regarding%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Enquire on WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => {
                onSelectCategory('CORPORATE GIFTING');
                onSelectSubcategory('keychains');
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#4D6429] hover:bg-[#3E5220] text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              View Keychains (33)
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectCategory('CORPORATE GIFTING');
                onSelectSubcategory('bottles');
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#243315] hover:bg-[#1A260E] text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              View Bottles (11)
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

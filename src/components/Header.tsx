import React, { useState, useRef, useEffect } from 'react';
import { Search, Heart, Mail, FileSpreadsheet, X, ChevronDown, Check, ArrowRight, Phone } from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES_DATA } from '../data/categories';
import { ZestLogo } from './ZestLogo';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenInquiry: () => void;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  allProducts,
  onSelectProduct,
  wishlistCount,
  onOpenWishlist,
  onOpenInquiry,
  onToggleMobileMenu,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Filter live search preview results
  const matchingProducts = searchQuery.trim().length > 1
    ? allProducts.filter((p) => {
        const matchesCategory = selectedCategory === 'ALL' || p.mainCategory.toUpperCase() === selectedCategory.toUpperCase();
        const matchesTerm =
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subCategoryGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesTerm;
      }).slice(0, 5)
    : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
        setIsCategorySelectOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLiveProduct = (prod: Product) => {
    setIsDropdownOpen(false);
    onSelectProduct(prod);
  };

  const clearSearch = () => {
    onSearchChange('');
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40 shadow-xs w-full max-w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 md:py-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 md:gap-6">
        {/* Top bar on Mobile / Left & Right on Desktop */}
        <div className="flex items-center justify-between gap-2 shrink-0 w-full md:w-auto">
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-1.5 sm:p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg focus:outline-hidden cursor-pointer shrink-0"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Brand Name */}
            <div
              onClick={() => {
                onSelectCategory('ALL');
                onSearchChange('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer shrink-0"
            >
              <ZestLogo size="md" showTaglines={true} />
            </div>
          </div>

          {/* Right Mobile Actions (Wishlist & Quote) */}
          <div className="flex md:hidden items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={onOpenWishlist}
              className="p-1.5 sm:p-2 text-slate-700 hover:text-[#4D6429] hover:bg-slate-100 rounded-full relative transition-colors cursor-pointer"
              title="Saved Items"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#4D6429] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenInquiry}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-[#4D6429] hover:bg-[#3E5220] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-[#D5E6BC]" />
              <span>Quote</span>
            </button>
          </div>
        </div>

        {/* Live Search Bar with Category Filter */}
        <div ref={searchContainerRef} className="flex-1 w-full md:max-w-2xl relative min-w-0">
          <div className="flex items-center border-2 border-slate-200 hover:border-[#4D6429]/30 focus-within:border-[#4D6429] rounded-full overflow-hidden transition-colors bg-slate-50 w-full">
            {/* Category Selector Dropdown Button */}
            <div className="relative border-r border-slate-200 hidden sm:block shrink-0">
              <button
                type="button"
                onClick={() => setIsCategorySelectOpen(!isCategorySelectOpen)}
                className="h-9 md:h-10 px-3 text-xs font-semibold text-slate-700 hover:text-[#4D6429] flex items-center gap-1.5 whitespace-nowrap bg-slate-100/70 hover:bg-slate-200/60 transition-colors"
              >
                <span className="max-w-[110px] truncate">{selectedCategory === 'ALL' ? 'All Categories' : selectedCategory}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              </button>

              {isCategorySelectOpen && (
                <div className="absolute left-0 top-full mt-1 w-52 bg-white border border-slate-200 rounded-lg shadow-xl py-1.5 z-50 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCategory('ALL');
                      setIsCategorySelectOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 flex items-center justify-between hover:bg-slate-50 ${
                      selectedCategory === 'ALL' ? 'text-[#4D6429] font-bold bg-[#F2F7EB]' : 'text-slate-700'
                    }`}
                  >
                    <span>All Categories</span>
                    {selectedCategory === 'ALL' && <Check className="w-3.5 h-3.5 text-[#4D6429]" />}
                  </button>
                  {CATEGORIES_DATA.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        onSelectCategory(cat.title);
                        setIsCategorySelectOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 flex items-center justify-between hover:bg-slate-50 ${
                        selectedCategory === cat.title ? 'text-[#4D6429] font-bold bg-[#F2F7EB]' : 'text-slate-700'
                      }`}
                    >
                      <span>{cat.title}</span>
                      {selectedCategory === cat.title && <Check className="w-3.5 h-3.5 text-[#4D6429]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Input Field */}
            <div className="flex-1 flex items-center px-2.5 sm:px-3 min-w-0">
              <Search className="w-4 h-4 text-slate-400 shrink-0 mr-1.5 sm:mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder="Search pens, journals, acrylics, files..."
                className="w-full h-9 md:h-10 bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden min-w-0"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="text-slate-400 hover:text-slate-600 p-1 shrink-0"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              )}
            </div>

            {/* Submit / Action Button */}
            <button
              type="button"
              onClick={() => {
                setIsDropdownOpen(false);
                const el = document.getElementById('products-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="h-9 md:h-10 px-3.5 sm:px-5 bg-[#4D6429] hover:bg-[#3E5220] text-white font-medium text-xs flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              Search
            </button>
          </div>

          {/* Live Search Instant Dropdown Results */}
          {isDropdownOpen && searchQuery.trim().length > 1 && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-w-[calc(100vw-1.5rem)]">
              <div className="p-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="truncate mr-2">
                  {matchingProducts.length} matches for{' '}
                  <strong className="text-slate-800">"{searchQuery}"</strong>
                </span>
                <span className="text-[11px] text-slate-400 shrink-0">Click for specs</span>
              </div>

              {matchingProducts.length > 0 ? (
                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                  {matchingProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectLiveProduct(p)}
                      className="p-3 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md border border-slate-200 shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-[#4D6429] uppercase truncate">
                              {p.subCategory}
                            </span>
                            <span className="text-[9px] sm:text-[10px] text-slate-400 shrink-0">SKU: {p.sku}</span>
                          </div>
                          <h4 className="text-xs font-semibold text-slate-900 group-hover:text-[#4D6429] truncate">
                            {p.title}
                          </h4>
                          <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">
                            {p.shortDescription}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-white bg-[#25D366] px-2 py-0.5 rounded font-bold">
                          Enquire
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-xs sm:text-sm text-slate-500">
                  <p>No products found matching "{searchQuery}".</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Try searching for "fountain pen", "dotted notebook", "stapler", or "watercolours".
                  </p>
                </div>
              )}

              <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    const el = document.getElementById('products-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-[#243315] hover:text-[#4D6429] flex items-center justify-center gap-1 mx-auto cursor-pointer transition-colors"
                >
                  <span>See all catalog results in product grid</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Right Header Badges & Actions */}
        <div className="hidden md:flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Call Button */}
          <a
            href="tel:+919321445253"
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:text-[#4D6429] hover:border-[#4D6429] text-xs font-semibold transition-colors shrink-0"
            title="Call Zest Enterprises: +91 9321445253"
          >
            <Phone className="w-3.5 h-3.5 text-[#4D6429]" />
            <span>+91 9321445253</span>
          </a>

          {/* Wishlist / Bookmark Tray */}
          <button
            type="button"
            onClick={onOpenWishlist}
            className="p-2 text-slate-700 hover:text-[#4D6429] hover:bg-slate-100 rounded-full relative transition-colors cursor-pointer shrink-0"
            title="Saved Items / Shortlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#4D6429] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Catalog Request / Inquiry CTA */}
          <button
            type="button"
            onClick={onOpenInquiry}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#4D6429] hover:bg-[#3E5220] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <Mail className="w-3.5 h-3.5 text-[#D5E6BC]" />
            <span>Bulk Quote</span>
          </button>
        </div>
      </div>
    </header>
  );
};

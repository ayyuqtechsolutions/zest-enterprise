import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Layers, X } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/categories';
import { MainCategory } from '../types';

interface MegaNavbarProps {
  selectedCategory: string;
  selectedSubcategory: string | null;
  onSelectCategoryFilter: (category: string, subcategory?: string) => void;
  isMobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

export const MegaNavbar: React.FC<MegaNavbarProps> = ({
  selectedCategory,
  selectedSubcategory,
  onSelectCategoryFilter,
  isMobileMenuOpen,
  onCloseMobileMenu,
}) => {
  const [activeHoverCategory, setActiveHoverCategory] = useState<string | null>(null);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>('stationeries');
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(null);

  const handleItemClick = (catTitle: string, subItemName?: string) => {
    onSelectCategoryFilter(catTitle, subItemName);
    setActiveHoverCategory(null);
    onCloseMobileMenu();
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* DESKTOP MEGA NAVBAR */}
      <nav className="bg-white border-b border-slate-200 hidden lg:block relative z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-2 lg:px-4">
          <ul className="flex items-center justify-between font-medium text-[11px] xl:text-xs tracking-wider whitespace-nowrap">
            {/* All Products Link */}
            <li className="shrink-0">
              <button
                type="button"
                onClick={() => handleItemClick('ALL')}
                className={`py-3.5 px-2 xl:px-3 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'ALL' && !selectedSubcategory
                    ? 'text-[#4D6429] font-bold border-b-2 border-[#4D6429]'
                    : 'text-slate-700 hover:text-[#4D6429]'
                }`}
              >
                <Layers className="w-3.5 h-3.5 shrink-0" />
                <span>ALL PRODUCTS</span>
              </button>
            </li>

            {/* Main Categories with Mega Menu Hover */}
            {CATEGORIES_DATA.map((category) => {
              const isSelected = selectedCategory === category.title;
              const isHovered = activeHoverCategory === category.id;

              return (
                <li
                  key={category.id}
                  className="static shrink-0"
                  onMouseEnter={() => setActiveHoverCategory(category.id)}
                  onMouseLeave={() => setActiveHoverCategory(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleItemClick(category.title)}
                    className={`py-3.5 px-2 xl:px-3 flex items-center gap-1 transition-colors cursor-pointer uppercase whitespace-nowrap ${
                      isSelected
                        ? 'text-[#4D6429] font-bold border-b-2 border-[#4D6429]'
                        : 'text-slate-800 hover:text-[#4D6429]'
                    }`}
                  >
                    <span>{category.title}</span>
                    {category.groups.length > 0 && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                          isHovered ? 'rotate-180 text-[#4D6429]' : 'text-slate-400'
                        }`}
                      />
                    )}
                  </button>

                  {/* Mega Menu Dropdown (Subnavbar only - only when groups exist) */}
                  {isHovered && category.groups.length > 0 && (
                    <div
                      className="absolute left-0 right-0 top-full bg-white border-b border-slate-200 shadow-2xl z-50 p-6 animate-in fade-in slide-in-from-top-1 duration-150"
                      onMouseEnter={() => setActiveHoverCategory(category.id)}
                      onMouseLeave={() => setActiveHoverCategory(null)}
                    >
                      <div className="max-w-7xl mx-auto">
                        {/* Multi-Column Subcategories Layout */}
                        <div className={`grid gap-6 ${
                          category.groups.length === 1
                            ? 'grid-cols-2 md:grid-cols-3'
                            : category.groups.length === 2
                            ? 'grid-cols-2 max-w-md'
                            : category.groups.length === 3
                            ? 'grid-cols-3'
                            : category.groups.length === 4
                            ? 'grid-cols-4'
                            : 'grid-cols-5'
                        }`}>
                          {category.groups.map((group) => (
                            <div key={group.id} className="space-y-3">
                              {/* Subcategory Group Title with Olive Accent Line */}
                              <div className="border-b border-slate-200 pb-1.5 flex items-center justify-between">
                                <h4 className="font-black text-[12px] text-[#243315] uppercase tracking-wider border-l-4 border-[#4D6429] pl-2">
                                  {group.title}
                                </h4>
                              </div>

                              {/* Items List */}
                              <ul className="space-y-1.5">
                                {group.items.map((item) => {
                                  const isCurrentSub = selectedSubcategory === item.name;
                                  return (
                                    <li key={item.id}>
                                      <button
                                        type="button"
                                        onClick={() => handleItemClick(category.title, item.name)}
                                        className={`w-full text-left py-1 text-xs transition-colors flex items-center justify-between group cursor-pointer ${
                                          isCurrentSub
                                            ? 'text-[#4D6429] font-bold'
                                            : 'text-slate-600 hover:text-[#4D6429] hover:translate-x-1 duration-150'
                                        }`}
                                      >
                                        <span className="group-hover:underline">
                                          {item.name}
                                        </span>
                                        {item.isPopular && (
                                          <span className="text-[9px] font-semibold text-[#263717] bg-[#E8F0D9] px-1.5 py-0.5 rounded-full">
                                            Popular
                                          </span>
                                        )}
                                      </button>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* MOBILE RESPONSIVE DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobileMenu}
          />

          {/* Drawer Panel */}
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-[#4D6429] text-white flex items-center justify-center font-bold text-sm">
                  Z
                </div>
                <span className="font-extrabold text-[#243315] text-sm tracking-tight">
                  ZEST ENTERPRISES
                </span>
              </div>
              <button
                type="button"
                onClick={onCloseMobileMenu}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu List */}
            <div className="flex-1 p-3 divide-y divide-slate-100">
              <div className="py-2">
                <button
                  type="button"
                  onClick={() => handleItemClick('ALL')}
                  className="w-full text-left py-2 px-3 rounded-md text-xs font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>ALL PRODUCTS</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {CATEGORIES_DATA.map((category) => {
                const isCatExpanded = mobileExpandedCat === category.id;

                return (
                  <div key={category.id} className="py-2">
                    {/* Category Title Accordion Toggle or Direct Select */}
                    {category.groups.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => setMobileExpandedCat(isCatExpanded ? null : category.id)}
                        className="w-full text-left py-2 px-3 rounded-md text-xs font-bold text-slate-900 hover:bg-slate-50 flex items-center justify-between"
                      >
                        <span className="uppercase">{category.title}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 transition-transform ${
                            isCatExpanded ? 'rotate-180 text-[#4D6429]' : ''
                          }`}
                        />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleItemClick(category.title)}
                        className="w-full text-left py-2 px-3 rounded-md text-xs font-bold text-slate-900 hover:bg-slate-50 flex items-center justify-between"
                      >
                        <span className="uppercase">{category.title}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>
                    )}

                    {/* Subcategories Accordion Content */}
                    {isCatExpanded && (
                      <div className="pl-3 pr-1 pt-1 pb-2 space-y-3 bg-slate-50/70 rounded-lg mt-1">
                        <button
                          type="button"
                          onClick={() => handleItemClick(category.title)}
                          className="w-full text-left text-xs font-bold text-[#4D6429] py-1 px-2 hover:underline"
                        >
                          → View all in {category.title}
                        </button>

                        {category.groups.map((group) => {
                          const isGroupExpanded = mobileExpandedGroup === group.id;

                          return (
                            <div key={group.id} className="border-l-2 border-[#C4D9A7] pl-3">
                              <button
                                type="button"
                                onClick={() => setMobileExpandedGroup(isGroupExpanded ? null : group.id)}
                                className="w-full text-left py-1 text-[11px] font-extrabold text-[#243315] flex items-center justify-between"
                              >
                                <span>{group.title}</span>
                                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isGroupExpanded ? 'rotate-180' : ''}`} />
                              </button>

                              {isGroupExpanded && (
                                <ul className="mt-1 space-y-1 pl-1">
                                  {group.items.map((item) => (
                                    <li key={item.id}>
                                      <button
                                        type="button"
                                        onClick={() => handleItemClick(category.title, item.name)}
                                        className="w-full text-left py-1 text-xs text-slate-600 hover:text-[#4D6429] flex items-center justify-between"
                                      >
                                        <span>{item.name}</span>
                                        {item.isPopular && (
                                          <span className="text-[8px] bg-[#E8F0D9] text-[#263717] px-1 py-0.2 rounded font-semibold">
                                            Popular
                                          </span>
                                        )}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Drawer Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-600 space-y-2">
              <div className="font-semibold text-slate-800">Zest Enterprises Support</div>
              <p className="text-[11px] text-slate-500">Corporate & Institutional Wholesale Inquiries</p>
              <a href="tel:+919321445253" className="block text-[#4D6429] font-bold">
                +91 9321445253
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

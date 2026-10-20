import React from 'react';
import { QUICK_CATEGORIES } from '../data/categories';
import { ChevronRight } from 'lucide-react';

interface QuickCategoryRowProps {
  onSelectQuickCategory: (category: string, subcategory?: string) => void;
}

export const QuickCategoryRow: React.FC<QuickCategoryRowProps> = ({
  onSelectQuickCategory,
}) => {
  return (
    <section className="bg-white py-6 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-extrabold text-[#243315] tracking-tight uppercase">
              Popular Categories
            </h2>
            <p className="text-xs text-slate-500">Quickly browse our stationery, office supplies & corporate gifting range</p>
          </div>
          <span className="text-xs font-semibold text-[#4D6429] hidden sm:flex items-center gap-0.5">
            <span>Scroll horizontally to explore</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Circular Cards Horizontal Scroll */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
          {QUICK_CATEGORIES.map((qc) => (
            <button
              key={qc.id}
              type="button"
              onClick={() => onSelectQuickCategory(qc.category, qc.subcategory)}
              className="flex flex-col items-center group shrink-0 focus:outline-hidden cursor-pointer"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 border-2 border-slate-200 group-hover:border-[#4D6429] transition-all overflow-hidden bg-slate-50 shadow-2xs group-hover:shadow-md group-hover:scale-105">
                <img
                  src={qc.image}
                  alt={qc.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="mt-2 text-xs font-semibold text-slate-700 group-hover:text-[#4D6429] text-center max-w-[100px] leading-tight line-clamp-2">
                {qc.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

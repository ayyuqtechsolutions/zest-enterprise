import React, { useState } from 'react';
import { ChevronDown, BookOpen, Gift, Briefcase, HelpCircle, Phone, Mail } from 'lucide-react';

export const StationeryGuide: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const guides = [
    {
      title: 'How does Zest Enterprises handle Corporate Gifting & Custom Logo Branding?',
      content: 'We specialize in customized pens, mugs, diaries, leather wallets, vacuum-insulated water bottles, keychains, and 4-in-1 / 5-in-1 employee welcome combo sets. We offer precision laser engraving, screen printing, UV color printing, and debossing. Simply share your organization logo vector or design when submitting an inquiry, and our design team provides a 3D digital mock-up before production begins.',
    },
    {
      title: 'What are the volume tiers for Office Supplies and Copier Paper reams?',
      content: 'We supply genuine Double A, JK Copier, and TNPL A4 & A3 reams in palletized carton quantities (5 reams per box). We also provide heavy-duty lever arch files, desktop staplers, paper punchers, and correction tapes with tiered corporate pricing, GST tax invoices, and scheduled monthly replenishments for corporate offices and institutions.',
    },
    {
      title: 'Are School Supplies & Art Doughs safe and non-toxic for children?',
      content: 'Yes! All school stationery items—including our modeling clay doughs, tempera & watercolor paints, lunch tiffins, and stainless steel sippers—are certified non-toxic, child-safe, and food-grade (BPA-free). We partner with schools, kindergartens, and hobby clubs for annual student supply kits.',
    },
    {
      title: 'How can our company request a wholesale quotation or sample kit?',
      content: 'You can submit an inquiry through any product page on this portal, email us directly at zestenterprises21@gmail.com, or call our direct enterprise desk at +91 9321445253. We provide itemized quotation sheets with tiered volume pricing, GST breakdowns, and sample dispatches within 24 hours.',
    },
  ];

  return (
    <section className="bg-slate-50 py-12 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-[#4D6429] bg-[#EEF4E5] mb-2 border border-[#A6C48A]/30 uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5" />
            <span>Corporate Gifting &amp; Supplies FAQ</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#243315] font-serif">
            Frequently Asked Procurement Questions
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-lg mx-auto font-medium">
            Everything you need to know about custom branding, institutional supply batches, and corporate pricing.
          </p>
        </div>

        <div className="space-y-3">
          {guides.map((g, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all shadow-2xs hover:border-[#4D6429]/40"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-[#4D6429] cursor-pointer"
                >
                  <span>{g.title}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-[#4D6429]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-[#EEF4E5]/40">
                    {g.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

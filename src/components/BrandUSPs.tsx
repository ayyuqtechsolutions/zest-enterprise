import React from 'react';
import { Award, Tag, Truck, ShieldCheck } from 'lucide-react';

export const BrandUSPs: React.FC = () => {
  const usps = [
    {
      icon: Award,
      title: 'PREMIUM QUALITY',
      subtitle: 'Certified Grade',
      description: 'Tested materials, laser-etched branding, food-safe drinkware & archival paper.',
    },
    {
      icon: Tag,
      title: 'COMPETITIVE PRICES',
      subtitle: 'Wholesale Tiers',
      description: 'Transparent B2B volume pricing, direct manufacturer sourcing & zero hidden fees.',
    },
    {
      icon: Truck,
      title: 'TIMELY DELIVERY',
      subtitle: 'Pan-India Express',
      description: 'On-schedule dispatch for corporate welcome events, office setup & school batches.',
    },
    {
      icon: ShieldCheck,
      title: 'TRUSTED BY BUSINESSES',
      subtitle: 'Institutional Partner',
      description: 'Serving 500+ enterprises, colleges, IT hubs, and government organizations nationwide.',
    },
  ];

  return (
    <section className="bg-slate-50 border-b border-slate-200 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {usps.map((usp, idx) => {
            const Icon = usp.icon;
            const isAlt = idx % 2 === 1;
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-[#4D6429]/50 transition-all hover:shadow-xs"
              >
                <div className={`p-2.5 rounded-lg shrink-0 ${
                  isAlt ? 'bg-[#EEF4E5] text-[#243315]' : 'bg-[#F4F8EE] text-[#4D6429]'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-black tracking-wide text-[#243315] uppercase">{usp.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5 font-medium">
                    {usp.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

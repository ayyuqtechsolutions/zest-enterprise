import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  ArrowUp, 
  CheckCircle,
  Clock,
  Award,
  Truck,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { ZestLogo } from './ZestLogo';

interface FooterProps {
  onSelectCategoryFilter: (category: string, subcategory?: string) => void;
  onOpenInquiry: () => void;
  onSelectBudgetTier?: (tier: 199 | 299 | 399 | 599) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategoryFilter,
  onOpenInquiry,
  onSelectBudgetTier,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNum = phoneNumber.trim();
    const msg = encodeURIComponent(
      `Hello Zest Enterprises, I would like to get your product catalog & wholesale supply details.${cleanNum ? ` My contact number is: ${cleanNum}` : ''}`
    );
    window.open(`https://wa.me/919321445253?text=${msg}`, '_blank');
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 text-xs border-t-2 border-[#4D6429]">
      {/* Upper Newsletter & Contact Bar */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14 space-y-12">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#243315]/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-[#A6C48A]">
              ZEST ENTERPRISES
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight font-serif">
              For All Your Supply Needs — <span className="text-[#A6C48A]">You name it, We have it</span>
            </h3>
            <p className="text-slate-400 max-w-xl text-xs sm:text-sm font-medium">
              "Your Needs. Our Priority." Direct bulk supplies, customized company logo branding, institutional quotations, and pan-India dispatch.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto max-w-md shrink-0">
            <input
              type="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number..."
              className="flex-1 px-4 py-2.5 sm:py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-hidden focus:border-[#4D6429] text-xs min-w-0"
            />
            <button
              type="submit"
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#4D6429] hover:bg-[#3E5220] text-white font-bold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors shrink-0 shadow-md shadow-emerald-950/20 text-xs"
              title="Connect directly on WhatsApp with the owner"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubscribed ? 'Opening WhatsApp...' : 'Subscribe'}</span>
            </button>
          </form>
        </div>

        {/* Mega Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand Info & Exact Contact Details from PDF */}
          <div className="lg:col-span-2 space-y-4">
            <ZestLogo size="lg" theme="dark" showTaglines={true} />

            <p className="text-slate-400 leading-relaxed max-w-sm pt-2 text-xs">
              YOUR ONE STOP SOLUTION FOR STATIONERY &amp; CORPORATE GIFTING. Quality Products, Wide Range, Competitive Wholesale Prices, and Timely Delivery trusted by businesses and institutions across India.
            </p>

            <div className="space-y-2.5 text-slate-300 pt-2 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#4D6429]/20 text-[#A6C48A] flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Phone / WhatsApp</span>
                  <a href="tel:+919321445253" className="text-white hover:text-[#A6C48A] font-bold text-sm transition-colors">
                    +91 9321445253
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#4D6429]/20 text-[#A6C48A] flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Official Inquiries</span>
                  <a href="mailto:zestenterprises21@gmail.com" className="text-white hover:text-[#A6C48A] font-medium transition-colors">
                    zestenterprises21@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <div className="w-7 h-7 rounded-lg bg-[#4D6429]/20 text-[#A6C48A] flex items-center justify-center shrink-0">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Company Motto</span>
                  <span className="text-white font-bold italic">"Your Needs. Our Priority."</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: CORPORATE GIFTING Links */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider border-b border-slate-800 pb-2 text-[#A6C48A]">
              CORPORATE DRINKWARE
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategoryFilter('CORPORATE GIFTING', 'bottless')}
                  className="hover:text-white transition-colors"
                >
                  All Bottles &amp; Tumblers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategoryFilter('CORPORATE GIFTING', 'bottless')}
                  className="hover:text-white transition-colors"
                >
                  Double Shipper Tumblers (900ml)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategoryFilter('CORPORATE GIFTING', 'bottless')}
                  className="hover:text-white transition-colors"
                >
                  Vacuum Sports Bottles (800ml &amp; 1000ml)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategoryFilter('CORPORATE GIFTING', 'bottless')}
                  className="hover:text-white transition-colors"
                >
                  RB Wooden Lid Bottles (500ml)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategoryFilter('CORPORATE GIFTING', 'bottless')}
                  className="hover:text-white transition-colors"
                >
                  Push Button Thermal Mugs (500ml)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategoryFilter('CORPORATE GIFTING', 'bottless')}
                  className="hover:text-white transition-colors"
                >
                  Mini Pocket Vacuum Flasks (300ml)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: SUPPLY CATEGORIES Links */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider border-b border-slate-800 pb-2 text-[#A6C48A]">
              OUR CATEGORIES
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategoryFilter('CORPORATE GIFTING', 'keychains')}
                  className="hover:text-white transition-colors flex items-center justify-between w-full"
                >
                  <span>Corporate Keychains</span>
                  <span className="text-[10px] text-[#A6C48A] bg-[#243315] px-1.5 py-0.5 rounded">New</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategoryFilter('CORPORATE GIFTING', 'bottless')}
                  className="hover:text-white transition-colors flex items-center justify-between w-full"
                >
                  <span>Corporate Bottles &amp; Flasks</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategoryFilter('CORPORATE GIFTING')}
                  className="hover:text-white transition-colors"
                >
                  All Corporate Gifting
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategoryFilter('STATIONERIES')}
                  className="hover:text-white transition-colors"
                >
                  Stationeries
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategoryFilter('OFFICE SUPPLIES')}
                  className="hover:text-white transition-colors"
                >
                  Office Supplies
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategoryFilter('SCHOOL SUPPLIES')}
                  className="hover:text-white transition-colors"
                >
                  School Supplies
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategoryFilter('ART SUPPLIES')}
                  className="hover:text-white transition-colors"
                >
                  Art Supplies
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategoryFilter('CRAFT MATERIALS')}
                  className="hover:text-white transition-colors"
                >
                  Craft Materials
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: B2B Procurement Services */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider border-b border-slate-800 pb-2 text-[#A6C48A]">
              B2B SERVICES
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a
                  href="https://wa.me/919321445253?text=Hello%20Zest%20Enterprises,%20I%20need%20custom%20company%20logo%20branding."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#A6C48A] transition-colors flex items-center gap-1.5"
                >
                  <span>✓ Company Logo Laser Engraving</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919321445253?text=Hello%20Zest%20Enterprises,%20I%20need%20an%20institutional%20GST%20quotation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#A6C48A] transition-colors flex items-center gap-1.5"
                >
                  <span>✓ Institutional GST Quotations</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919321445253?text=Hello%20Zest%20Enterprises,%20I%20would%20like%20to%20request%20samples."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#A6C48A] transition-colors flex items-center gap-1.5"
                >
                  <span>✓ Sample Kits for Corporate Review</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919321445253?text=Hello%20Zest%20Enterprises,%20I%20have%20an%20enquiry%20regarding%20pan-India%20dispatch."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#A6C48A] transition-colors flex items-center gap-1.5"
                >
                  <span>✓ Pan-India Bulk Dispatch</span>
                </a>
              </li>
            </ul>

            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider border-b border-slate-800 pb-2 pt-2">
              BULK QUOTATIONS
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={onOpenInquiry}
                  className="w-full text-left py-2 px-3 rounded-lg bg-[#4D6429] hover:bg-[#3E5220] text-white font-bold transition-colors cursor-pointer text-center text-xs"
                >
                  Request Bulk Quotation
                </button>
              </li>
              <li>
                <a
                  href="tel:+919321445253"
                  className="block w-full py-2 px-3 rounded-lg bg-[#243315] hover:bg-[#1a250f] text-white font-bold transition-colors text-center text-xs border border-[#4D6429]/40"
                >
                  Call +91 9321445253
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © 2026 ZEST ENTERPRISES. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

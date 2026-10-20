import React, { useState, useEffect } from 'react';
import { Phone, Mail, ChevronRight, HelpCircle, Code2, Bell } from 'lucide-react';

interface AnnouncementBarProps {
  onOpenInquiry: () => void;
}

const ANNOUNCEMENTS = [
  'For All Your Supply Needs — You name it, We have it | Zest Enterprises',
  'Your One Stop Solution for Stationery & Corporate Gifting',
  'Customized Solutions & Premium Quality — Pens, Mugs, Wallets, Diaries, Welcome Kits & Bottles',
  'Office Supplies: Copier Paper, Filing Folders, Desk Essentials & Writing Instruments',
  'School Supplies: Notebooks, Tiffin Boxes, Sippers, Art Colors & Modeling Clay',
];

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  onOpenInquiry,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#4D6429] text-white text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-[#3E5220] transition-colors w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2">
        {/* Left / Center Announcement Ticker */}
        <div className="flex items-center justify-center sm:justify-start gap-1.5 font-medium tracking-wide text-center sm:text-left min-w-0 max-w-full">
          <Bell className="w-3.5 h-3.5 shrink-0 text-[#EEF4E5]" />
          <span className="transition-opacity duration-300 truncate max-w-[280px] xs:max-w-xs sm:max-w-none text-[11px] sm:text-xs">
            {ANNOUNCEMENTS[currentIdx]}
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center justify-center gap-3 text-[10px] sm:text-[11px] font-medium shrink-0 flex-wrap">
          <button
            onClick={onOpenInquiry}
            className="flex items-center gap-1 hover:text-[#EEF4E5] transition-colors cursor-pointer font-semibold"
          >
            <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Email Inquiry</span>
          </button>
          <span className="opacity-40">|</span>
          <a
            href="tel:+919321445253"
            className="flex items-center gap-1 hover:text-[#EEF4E5] transition-colors font-bold"
          >
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>+91 9321445253</span>
          </a>
        </div>
      </div>
    </div>
  );
};

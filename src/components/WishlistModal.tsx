import React from 'react';
import { Product } from '../types';
import { X, Trash2, Mail, ExternalLink, Heart } from 'lucide-react';
import { sendInquiryEmail } from '../utils/inquiryEmail';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenInquiryForBulk: () => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  savedProducts,
  onRemoveFromWishlist,
  onSelectProduct,
  onOpenInquiryForBulk,
}) => {
  if (!isOpen) return null;

  const handleSendWishlistInquiry = () => {
    sendInquiryEmail({
      shortlistedItems: savedProducts.map((p) => ({
        title: p.title,
        sku: p.sku,
        price: p.referencePrice,
      })),
    });
    onClose();
    onOpenInquiryForBulk();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto w-full max-w-full">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      {/* Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] flex flex-col z-10 border border-slate-200 overflow-x-hidden">
        {/* Header */}
        <div className="p-3.5 sm:p-4 border-b border-slate-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 rounded-lg bg-[#EEF4E5] text-[#4D6429] shrink-0">
              <Heart className="w-4 h-4 fill-[#4D6429]" />
            </div>
            <div className="min-w-0">
              <h3 className="font-extrabold text-xs sm:text-sm text-[#243315] truncate">
                Shortlisted Catalog Items ({savedProducts.length})
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">
                Saved for specification review and bulk quotation
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Product Items List */}
        <div className="flex-1 p-4 overflow-y-auto divide-y divide-slate-100">
          {savedProducts.length > 0 ? (
            savedProducts.map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-3">
                <div 
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="flex items-center gap-3 cursor-pointer group flex-1"
                >
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#4D6429] uppercase">
                      {p.subCategory}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#4D6429] line-clamp-1">
                      {p.title}
                    </h4>
                    <span className="text-[11px] font-semibold text-[#4D6429]">
                      Click to view specifications
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="p-1.5 text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-100"
                    title="View details"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveFromWishlist(p.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-slate-100"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-xs text-slate-500 space-y-2">
              <Heart className="w-8 h-8 text-slate-300 mx-auto" />
              <p>You have not shortlisted any stationery items yet.</p>
              <p className="text-[11px] text-slate-400">
                Click the heart icon on any product card to bookmark it for your inquiry sheet.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {savedProducts.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200">
            <button
              type="button"
              onClick={handleSendWishlistInquiry}
              className="w-full py-2.5 rounded-xl bg-[#4D6429] hover:bg-[#3E5220] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Inquire About All Shortlisted Items (Send to Email)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

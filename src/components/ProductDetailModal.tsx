import React, { useState } from 'react';
import { Product } from '../types';
import { 
  X, 
  Heart, 
  Mail, 
  Printer, 
  CheckCircle2, 
  Shield, 
  Layers, 
  Info,
  ChevronRight,
  PackageCheck
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onOpenInquiryForProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onOpenInquiryForProduct,
}) => {
  if (!product) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto w-full max-w-full">
      {/* Dark Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto overflow-x-hidden z-10 border border-neutral-200">
        {/* Sticky Header Bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 flex items-center justify-between z-20">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-500 min-w-0">
            <span className="font-semibold text-slate-800 truncate">{product.mainCategory}</span>
            <span>/</span>
            <span className="text-[#4D6429] font-semibold truncate">{product.subCategory}</span>
            <span className="hidden sm:inline opacity-40">|</span>
            <span className="hidden sm:inline font-mono text-[11px] text-slate-400">
              SKU: {product.sku}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer shrink-0"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* Top Section: Gallery & Primary Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Left: Product Images */}
            <div className="space-y-3">
              <div className="aspect-square w-full rounded-xl bg-slate-50 border border-slate-200 overflow-hidden relative shadow-inner">
                <img
                  src={product.images[activeImageIdx] || product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {product.badges.map((b, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-[#243315] shadow-xs border border-slate-200"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Thumbnails row */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-16 h-16 rounded-lg border-2 overflow-hidden shrink-0 cursor-pointer ${
                        idx === activeImageIdx
                          ? 'border-[#4D6429]'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* B2B / Catalog Note */}
              <div className="p-3 bg-[#EEF4E5] rounded-xl border border-[#A6C48A]/30 text-xs text-slate-600 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#4D6429] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Zest Enterprises maintains strict quality testing. Bulk custom debossing, institutional branding, and sample requests are available upon inquiry.
                </p>
              </div>
            </div>

            {/* Right: Title, Specs Summary & Inquiry CTA */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                {/* Brand & Category */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold tracking-widest text-[#243315] uppercase">
                    {product.brand}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#243315] bg-[#EEF4E5] px-2 py-0.5 rounded-full font-bold">
                    <PackageCheck className="w-3.5 h-3.5 text-[#243315]" />
                    <span>In Stock for Supply</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#243315] leading-tight">
                  {product.title}
                </h1>

                {/* Corporate Inquiry Notice (NO PRICES) */}
                <div className="p-3.5 rounded-xl bg-[#EEF4E5]/80 border border-[#A6C48A]/40 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-bold text-[#243315] uppercase tracking-wider">
                      Wholesale & Corporate Supply
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Available for institutional quotation, custom company logo printing &amp; pan-India dispatch.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-[#243315] bg-white border border-[#A6C48A]/40 px-2 py-1 rounded-md shrink-0">
                    MOQ: {product.specifications.moq || '25 Units'}
                  </span>
                </div>

                {/* Short description */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {product.fullDescription}
                </p>

                {/* Key Features Bullet List */}
                <div className="space-y-1.5 pt-1">
                  <h4 className="text-xs font-extrabold uppercase text-[#243315] tracking-wider">
                    Key Product Highlights
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {product.keyFeatures.map((kf, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4D6429] shrink-0 mt-0.5" />
                        <span>{kf}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons: WhatsApp Enquiry Primary (NO PRICES / NO ADD TO CART) */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={`https://wa.me/919321445253?text=${encodeURIComponent(`Hello Zest Enterprises, I would like to enquire about: ${product.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all text-center"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-white shrink-0"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span>Enquire on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => onOpenInquiryForProduct(product)}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-[#4D6429] hover:bg-[#3E5220] text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Form</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleWishlist(product.id)}
                  className={`w-full sm:w-auto p-3 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer transition-colors ${
                    isWishlisted
                      ? 'border-[#A6C48A]/40 bg-[#EEF4E5] text-[#4D6429]'
                      : 'border-slate-300 hover:border-slate-400 text-slate-700'
                  }`}
                  title="Bookmark item"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#4D6429]' : ''}`} />
                  <span className="sm:hidden">{isWishlisted ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full sm:w-auto p-3 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer transition-colors"
                  title="Print Specification Sheet"
                >
                  <Printer className="w-4 h-4" />
                  <span className="sm:hidden">Print Specs</span>
                </button>
              </div>
            </div>
          </div>

          {/* Technical Specifications Matrix Table */}
          <div className="pt-6 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-[#243315] uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#4D6429]" />
                <span>Complete Technical Specifications Sheet</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                Model: {product.specifications.modelNumber || product.sku}
              </span>
            </div>

            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value], idx) => {
                    // format key from camelCase to Title Case
                    const label = key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase());
                    return (
                      <tr
                        key={key}
                        className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/80'}
                      >
                        <td className="py-2.5 px-4 font-semibold text-slate-600 border-b border-slate-200/60 w-1/3">
                          {label}
                        </td>
                        <td className="py-2.5 px-4 font-medium text-[#243315] border-b border-slate-200/60 font-mono">
                          {String(value)}
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-600 border-b border-slate-200/60">
                      Product SKU
                    </td>
                    <td className="py-2.5 px-4 font-medium text-[#243315] border-b border-slate-200/60 font-mono">
                      {product.sku}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-600 border-b border-slate-200/60">
                      Main Category
                    </td>
                    <td className="py-2.5 px-4 font-medium text-[#243315] border-b border-slate-200/60">
                      {product.mainCategory}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-600">
                      Subcategory Line
                    </td>
                    <td className="py-2.5 px-4 font-medium text-[#243315]">
                      {product.subCategoryGroup} &gt; {product.subCategory}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 text-center text-xs text-slate-500">
          Zest Enterprises Spec Sheet • For bulk enterprise procurement inquiries contact <strong className="text-[#243315]">inquiry@zestenterprises.in</strong>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Product, InquiryFormData } from '../types';
import { X, Send, CheckCircle, Building, Mail, Phone, User, Package, FileText, ExternalLink } from 'lucide-react';
import { sendInquiryEmail } from '../utils/inquiryEmail';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: Product | null;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  selectedProduct,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    estimatedQuantity: '10 - 50 units',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setFormData((prev) => ({
        ...prev,
        productId: selectedProduct.id,
        productName: selectedProduct.title,
        message: `Hello Zest Enterprises, I would like to inquire about specifications, wholesale availability, and delivery timelines for "${selectedProduct.title}" (SKU: ${selectedProduct.sku}).`,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        productId: undefined,
        productName: undefined,
        message: 'Hello Zest Enterprises, please share your complete institutional stationery and office supplies catalog along with bulk price tiers.',
      }));
    }
    setIsSubmitted(false);
  }, [selectedProduct, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Direct inquiry to email
    sendInquiryEmail({
      productTitle: formData.productName,
      sku: selectedProduct?.sku,
      referencePrice: selectedProduct?.referencePrice,
      category: selectedProduct?.mainCategory,
      quantity: formData.estimatedQuantity,
      fullName: formData.fullName,
      organization: formData.organization,
      phone: formData.phone,
      customMessage: formData.message,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto w-full max-w-full">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-4 sm:p-6 z-10 border border-slate-200 overflow-x-hidden">
        {/* Header */}
        <div className="flex items-start justify-between pb-3.5 sm:pb-4 border-b border-slate-200 gap-2">
          <div className="min-w-0">
            <div className="text-[10px] sm:text-[11px] font-bold text-[#4D6429] uppercase tracking-wider">
              Zest Enterprises B2B &amp; Wholesale
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#243315] mt-0.5 leading-snug">
              {selectedProduct ? 'Product Specification & Price Inquiry' : 'General Catalog & Bulk Order Request'}
            </h3>
            {selectedProduct && (
              <p className="text-xs text-slate-500 truncate mt-0.5 font-medium">
                Target: {selectedProduct.title} ({selectedProduct.sku})
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-[#EEF4E5] text-[#4D6429] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-[#243315]">
              Inquiry Sent Successfully!
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{formData.fullName}</strong>. Our enterprise executive has received your inquiry for{' '}
              <strong>{formData.productName || 'our complete catalog'}</strong> and will respond with product spec sheets and wholesale terms within 2-4 business hours.
            </p>
            <div className="pt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-lg bg-[#243315] hover:bg-[#4D6429] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Priya Sharma"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:border-[#4D6429] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:border-[#4D6429] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Contact Phone *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 00000"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:border-[#4D6429] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Company / Organization
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Studio / Firm / School"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:border-[#4D6429] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Est. Quantity / Scope
                </label>
                <div className="relative">
                  <Package className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <select
                    value={formData.estimatedQuantity}
                    onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:border-[#4D6429] focus:outline-hidden"
                  >
                    <option>Sample Unit (1 - 5)</option>
                    <option>Small Batch (10 - 50 units)</option>
                    <option>Corporate Batch (50 - 250 units)</option>
                    <option>Institutional Supply (250+ units)</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Detailed Inquiry Message
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:border-[#4D6429] focus:outline-hidden"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-xl bg-[#4D6429] hover:bg-[#3E5220] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Opening Email...' : 'Send Inquiry via Email'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  sendInquiryEmail({
                    productTitle: formData.productName,
                    sku: selectedProduct?.sku,
                    referencePrice: selectedProduct?.referencePrice,
                    category: selectedProduct?.mainCategory,
                  });
                }}
                className="py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#4D6429]" />
                <span>Direct Mailto</span>
              </button>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200 text-[11px] text-slate-500 text-center space-y-1">
              <p>
                Immediate requirement? Call/WhatsApp: <a href="tel:+919321445253" className="text-[#243315] font-bold hover:underline">+91 9321445253</a> | Email: <a href="mailto:zestenterprises21@gmail.com" className="text-[#243315] font-bold hover:underline">zestenterprises21@gmail.com</a>
              </p>
              <p className="text-[10px] text-[#4D6429] font-semibold italic">
                "For All Your Supply Needs — You name it, We have it"
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { MegaNavbar } from './components/MegaNavbar';
import { HeroFeaturedBanners } from './components/HeroFeaturedBanners';
import { QuickCategoryRow } from './components/QuickCategoryRow';
import { BrandUSPs } from './components/BrandUSPs';
import { ProductGrid } from './components/ProductGrid';
import { StationeryGuide } from './components/StationeryGuide';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { InquiryModal } from './components/InquiryModal';
import { WishlistModal } from './components/WishlistModal';
import { PRODUCTS_DATA } from './data/products';
import { Product } from './types';
import { sendInquiryEmail } from './utils/inquiryEmail';
import { ArrowRight } from 'lucide-react';

export default function App() {
  // Navigation & Filter State
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isViewingCatalog, setIsViewingCatalog] = useState(false);

  const isBrowsingCatalog =
    isViewingCatalog ||
    selectedCategory !== 'ALL' ||
    selectedSubcategory !== null ||
    searchQuery.trim().length > 0;
  
  // Modals and Trays
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryProductTarget, setInquiryProductTarget] = useState<Product | null>(null);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Shortlist / Wishlist state
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(
    new Set(['cg-bottle-wooden-white-500ml', 'cg-tumbler-shipper-hendal-900ml'])
  );

  const toggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const savedProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => wishlistIds.has(p.id));
  }, [wishlistIds]);

  const handleSelectCategoryFilter = (catTitle: string, subcategoryName?: string) => {
    setSelectedCategory(catTitle);
    setSelectedSubcategory(subcategoryName || null);
    setSearchQuery('');
    setIsViewingCatalog(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    setSelectedCategory('ALL');
    setSelectedSubcategory(null);
    setSearchQuery('');
    setIsViewingCatalog(true);
  };

  const handleBackToHome = () => {
    setSelectedCategory('ALL');
    setSelectedSubcategory(null);
    setSearchQuery('');
    setIsViewingCatalog(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInquiryForProduct = (product: Product) => {
    // Send inquiry directly to email
    sendInquiryEmail({
      productTitle: product.title,
      sku: product.sku,
      referencePrice: product.referencePrice,
      category: product.mainCategory,
    });
    setInquiryProductTarget(product);
    setIsInquiryModalOpen(true);
  };

  const handleOpenGeneralInquiry = () => {
    // Send inquiry directly to email
    sendInquiryEmail();
    setInquiryProductTarget(null);
    setIsInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFB] text-[#1A1A1A]">
      {/* 1. TOP ANNOUNCEMENT TICKER */}
      <AnnouncementBar
        onOpenInquiry={handleOpenGeneralInquiry}
      />

      {/* 2. MAIN HEADER (Search, Brand Name, Wishlist, Inquiry) */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSelectedSubcategory(null);
          if (cat === 'ALL') {
            setIsViewingCatalog(false);
          } else {
            setIsViewingCatalog(true);
          }
        }}
        allProducts={PRODUCTS_DATA}
        onSelectProduct={(p) => setSelectedProductModal(p)}
        wishlistCount={wishlistIds.size}
        onOpenWishlist={() => setIsWishlistModalOpen(true)}
        onOpenInquiry={handleOpenGeneralInquiry}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* 3. MEGA NAVBAR (STATIONERY, OFFICE SUPPLIES, ART SUPPLES, CRAFT MATERIAL) */}
      <MegaNavbar
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        onSelectCategoryFilter={handleSelectCategoryFilter}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />

      {/* MAIN BODY */}
      <main className="flex-1">
        {isBrowsingCatalog ? (
          /* DEDICATED FILTERED CATALOG PAGE */
          <ProductGrid
            products={PRODUCTS_DATA}
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            searchQuery={searchQuery}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setSelectedSubcategory(null);
            }}
            onSelectSubcategory={setSelectedSubcategory}
            onClearFilters={handleClearFilters}
            onBackToHome={handleBackToHome}
            onSelectProduct={(p) => setSelectedProductModal(p)}
            wishlistIds={wishlistIds}
            onToggleWishlist={toggleWishlist}
            onOpenInquiryForProduct={handleOpenInquiryForProduct}
          />
        ) : (
          /* HOME PAGE LAYOUT - NO "Catalog / All Products / Complete Product Catalog" */
          <>
            {/* 4. FEATURED 4 BOX HERO BANNERS */}
            <HeroFeaturedBanners
              onBannerClick={(cat, sub) => {
                handleSelectCategoryFilter(cat, sub || null);
              }}
            />

            {/* 5. QUICK CATEGORY ROW (Bottles & Tumblers) */}
            <QuickCategoryRow
              onSelectQuickCategory={(cat, sub) => {
                handleSelectCategoryFilter(cat, sub);
              }}
            />

            {/* 6. TRUST VALUE PROPOSITIONS */}
            <BrandUSPs />

            {/* 7. PROCUREMENT GUIDE & INSIGHTS */}
            <StationeryGuide />
          </>
        )}
      </main>

      {/* 9. FOOTER */}
      <Footer
        onSelectCategoryFilter={handleSelectCategoryFilter}
        onOpenInquiry={handleOpenGeneralInquiry}
        onSelectBudgetTier={(_tier) => {
          handleSelectCategoryFilter('CORPORATE GIFTING', 'bottless');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* MODALS */}
      {/* Product Detail & Spec Sheet Modal */}
      <ProductDetailModal
        product={selectedProductModal}
        onClose={() => setSelectedProductModal(null)}
        isWishlisted={selectedProductModal ? wishlistIds.has(selectedProductModal.id) : false}
        onToggleWishlist={toggleWishlist}
        onOpenInquiryForProduct={handleOpenInquiryForProduct}
      />

      {/* B2B / Catalog Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        selectedProduct={inquiryProductTarget}
      />

      {/* Shortlist / Wishlist Tray */}
      <WishlistModal
        isOpen={isWishlistModalOpen}
        onClose={() => setIsWishlistModalOpen(false)}
        savedProducts={savedProducts}
        onRemoveFromWishlist={toggleWishlist}
        onSelectProduct={(p) => setSelectedProductModal(p)}
        onOpenInquiryForBulk={handleOpenGeneralInquiry}
      />
    </div>
  );
}

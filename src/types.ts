export interface SubCategoryItem {
  id: string;
  name: string;
  slug: string;
  count?: number;
  isPopular?: boolean;
}

export interface SubCategoryGroup {
  id: string;
  title: string;
  items: SubCategoryItem[];
}

export interface MainCategory {
  id: string;
  title: string;
  slug: string;
  description: string;
  groups: SubCategoryGroup[];
}

export interface ProductSpecification {
  modelNumber?: string;
  material?: string;
  dimensions?: string;
  weight?: string;
  tipSize?: string;
  inkColor?: string;
  inkType?: string;
  paperWeight?: string;
  sheetCount?: number | string;
  binding?: string;
  ruling?: string;
  origin?: string;
  packaging?: string;
  suitableFor?: string;
  refillable?: string;
  [key: string]: string | number | undefined;
}

export interface Product {
  id: string;
  title: string;
  sku: string;
  brand: string;
  mainCategory: string; // "CORPORATE GIFTING" | "STATIONERIES" | etc.
  subCategoryGroup: string;
  subCategory: string;
  referencePrice?: number; // optional, not displayed
  mrp?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  thumbnail: string;
  isAvailable: boolean;
  badges: string[];
  shortDescription: string;
  fullDescription: string;
  keyFeatures: string[];
  specifications: ProductSpecification;
  tags: string[];
}

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  ctaText: string;
  targetCategory: string;
  targetSubcategory?: string;
  image: string;
  accentColor: string;
}

export interface QuickCategory {
  id: string;
  name: string;
  image: string;
  category: string;
  subcategory?: string;
}

export interface InquiryFormData {
  productId?: string;
  productName?: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  estimatedQuantity: string;
  message: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  organization: string;
  comment: string;
  rating: number;
  verified: boolean;
}

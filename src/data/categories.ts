import { MainCategory, QuickCategory } from '../types';

export const CATEGORIES_DATA: MainCategory[] = [
  {
    id: 'stationeries',
    title: 'STATIONERIES',
    slug: 'stationeries',
    description: 'School Stationery, Office Supplies, and All Types of Stationery Items.',
    groups: [],
  },
  {
    id: 'office-supplies',
    title: 'OFFICE SUPPLIES',
    slug: 'office-supplies',
    description: 'High-efficiency paper, filing systems, desk gear, and writing tools.',
    groups: [],
  },
  {
    id: 'school-supplies',
    title: 'SCHOOL SUPPLIES',
    slug: 'school-supplies',
    description: 'Durable stationery, notebooks, lunch sets, and student tools.',
    groups: [],
  },
  {
    id: 'art-supplies',
    title: 'ART SUPPLIES',
    slug: 'art-supplies',
    description: 'Paints, artist sketchbooks, canvases, and precision drawing instruments.',
    groups: [],
  },
  {
    id: 'craft-materials',
    title: 'CRAFT MATERIALS',
    slug: 'craft-materials',
    description: 'Clay, doughs, colorful craft sheets, and adhesives.',
    groups: [],
  },
  {
    id: 'corporate-gifting',
    title: 'CORPORATE GIFTING',
    slug: 'corporate-gifting',
    description: 'Customized solutions with company branding, logo printing & bulk packaging.',
    groups: [
      {
        id: 'bottles-group',
        title: 'BOTTLES',
        items: [
          { id: 'bottles', name: 'Bottles', slug: 'bottles', isPopular: true },
        ],
      },
      {
        id: 'keychains-group',
        title: 'KEYCHAINS',
        items: [
          { id: 'keychains', name: 'Keychains', slug: 'keychains', isPopular: true },
        ],
      },
    ],
  },
];

export const QUICK_CATEGORIES: QuickCategory[] = [
  {
    id: 'qc-keychains-1',
    name: 'Keychains',
    image: '/assets/aistudio/vc__cv_v_ca7d8b94.jpeg',
    category: 'CORPORATE GIFTING',
    subcategory: 'keychains',
  },
  {
    id: 'qc-bottles-1',
    name: 'Bottles',
    image: '/assets/aistudio/d_handle_double_shipper_tumbler_mix_add234a3.jpeg',
    category: 'CORPORATE GIFTING',
    subcategory: 'bottles',
  },
  {
    id: 'qc-keychains-2',
    name: 'Leather Keychains',
    image: '/assets/aistudio/nn_55762797.jpeg',
    category: 'CORPORATE GIFTING',
    subcategory: 'keychains',
  },
  {
    id: 'qc-bottles-2',
    name: 'Sports Bottles',
    image: '/assets/aistudio/800ml_sporrts_bottles_ceb049fe.jpeg',
    category: 'CORPORATE GIFTING',
    subcategory: 'bottles',
  },
  {
    id: 'qc-keychains-3',
    name: 'Metal & Stand Keychains',
    image: '/assets/aistudio/v__vv_dfba5b37.jpeg',
    category: 'CORPORATE GIFTING',
    subcategory: 'keychains',
  },
  {
    id: 'qc-bottles-3',
    name: 'Wooden Lid Bottles',
    image: '/assets/aistudio/wooden_rubber_bottle_white_f7682c15.jpeg',
    category: 'CORPORATE GIFTING',
    subcategory: 'bottles',
  },
  {
    id: 'qc-bottles-4',
    name: 'Coffee Mugs',
    image: '/assets/aistudio/push_button_coffee_mug_black_290e250b.jpeg',
    category: 'CORPORATE GIFTING',
    subcategory: 'bottles',
  },
];

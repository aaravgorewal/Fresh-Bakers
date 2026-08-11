export type NavTab = 'home' | 'products' | 'about' | 'contact' | 'admin';

export type Category = string;

export interface CategoryInfo {
  id?: string;
  name: Category;
  image: string;
  icon: string;
  tagline: string;
  bannerImage: string;
  type: 'cake' | 'additional';
  sortOrder?: number;
}

export interface ProductItem {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  imageUrl: string;
  available: boolean;
  // UI helper & tagging fields
  image?: string;
  priceNum?: number;
  imageAlt?: string;
  fermentationHours?: number;
  ingredients?: string[];
  isSignature?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  isRecommended?: boolean;
  gallery?: string[];
  isEggless?: boolean;
  weightOptions?: { label: string; multiplier: number }[];
}

export interface BakerySettings {
  id?: string;
  bakeryName: string;
  tagline: string;
  whatsappNumber: string; // e.g. "15550192824" (with country code, no + or spaces)
  address: string;
  email?: string;
  phone?: string;
  instagram: string;
  openHours: string;
  currencySymbol?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  announcementText?: string;
  heroImageUrl?: string;
  deliveryFee?: number;
  minOrder?: number;
}

export interface Testimonial {
  id: string;
  author: string;
  role?: string;
  review: string;
  rating: number;
  avatarUrl?: string;
  visible: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
}

export interface OrderCartItem {
  product: ProductItem;
  quantity: number;
}

export interface HomepageSection {
  id?: string;
  heading: string;
  categoryId?: string;    // Firestore category doc ID
  categoryName?: string;  // Denormalized for product filtering (products use p.category === cat.name)
  productIds?: string[];  // For "manual" source
  source: 'category' | 'manual';
  productLimit: number;
  sortOrder: number;
  isActive: boolean;
}

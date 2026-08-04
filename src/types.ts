export type NavTab = 'home' | 'products' | 'about' | 'contact' | 'admin';

export type Category =
  | 'Birthday Cakes'
  | 'Anniversary Cakes'
  | 'Designer Cakes'
  | 'Photo Cakes'
  | 'Premium Cakes'
  | 'Eggless Cakes'
  | 'Chocolate Cakes'
  | 'Kids Theme Cakes'
  | 'Fruit Cakes'
  | 'Bento Cakes'
  | 'Gift Portal'
  | 'Flowers'
  | 'Chocolate Bouquets'
  | 'Gift Hampers'
  | 'Balloon Decoration'
  | 'Birthday Accessories'
  | 'Recommend For You'
  | 'Trending'
  | 'Bamboo + Chocolate Gifts';

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

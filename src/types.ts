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
  // UI helper fields
  image?: string;
  priceNum?: number;
  imageAlt?: string;
  fermentationHours?: number;
  ingredients?: string[];
  isSignature?: boolean;
}

export interface BakerySettings {
  id?: string;
  bakeryName: string;
  tagline: string;
  whatsappNumber: string; // e.g. "15550192824" (with country code, no + or spaces)
  address: string;
  instagram: string;
  openHours: string;
}

export interface OrderCartItem {
  product: ProductItem;
  quantity: number;
}

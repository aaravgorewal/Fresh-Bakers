export type NavTab = 'home' | 'products' | 'about' | 'contact';

export type Category =
  | 'Cakes'
  | 'Pastries'
  | 'Breads'
  | 'Cookies & Biscuits'
  | 'Snacks & Puffs'
  | 'Custom Orders'
  | 'Seasonal Specials';

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

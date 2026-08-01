export type NavTab = 'home' | 'products' | 'about' | 'contact';

export type Category = 'Cakes' | 'Pastries' | 'Breads' | 'Cookies & Biscuits' | 'Snacks & Puffs' | 'Custom Orders' | 'Seasonal Specials';

export interface ProductItem {
  id: string;
  name: string;
  category: Category;
  price: string;
  priceNum: number;
  description: string;
  image: string;
  imageAlt: string;
  fermentationHours?: number;
  ingredients?: string[];
  isSignature?: boolean;
}

export interface OrderCartItem {
  product: ProductItem;
  quantity: number;
}

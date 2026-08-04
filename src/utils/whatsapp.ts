import { ProductItem } from '../types';

export interface WhatsAppOrderOptions {
  weight?: string;
  price?: string | number;
  currencySymbol?: string;
}

/**
 * Generates dynamic WhatsApp message for a single product as requested:
 * Hi,
 * I want to order
 * [Product Name]
 * Weight: [Weight]
 * Price: [Price]
 * Please share availability.
 */
export function generateProductWhatsAppMessage(
  product: ProductItem,
  options?: WhatsAppOrderOptions
): string {
  const name = product.name;

  // Determine Weight
  let weight = options?.weight;
  if (!weight) {
    if (product.weightOptions && product.weightOptions.length > 0) {
      weight = product.weightOptions[0].label;
    } else if (
      product.category?.toLowerCase().includes('cake') ||
      product.category === 'Birthday Cakes' ||
      product.category === 'Anniversary Cakes' ||
      product.category === 'Designer Cakes' ||
      product.category === 'Photo Cakes' ||
      product.category === 'Premium Cakes' ||
      product.category === 'Eggless Cakes' ||
      product.category === 'Chocolate Cakes' ||
      product.category === 'Kids Theme Cakes' ||
      product.category === 'Fruit Cakes'
    ) {
      weight = '1 Kg';
    } else {
      weight = 'Standard Pack';
    }
  }

  // Clean up weight if e.g. "1.0 kg (Serves 8-10)" -> "1 Kg" or "1.0 kg"
  if (weight.includes('(')) {
    const parts = weight.split('(')[0].trim();
    if (parts) weight = parts;
  }

  // Determine Price
  let priceStr = '';
  if (options?.price !== undefined) {
    if (typeof options.price === 'number') {
      const symbol = options.currencySymbol || '₹';
      priceStr = `${symbol}${options.price}`;
    } else {
      priceStr = String(options.price).replace(/\$/g, '₹');
    }
  } else {
    const rawPriceStr = String(product.price);
    if (rawPriceStr.includes('₹')) {
      priceStr = rawPriceStr;
    } else if (rawPriceStr.includes('$')) {
      priceStr = rawPriceStr.replace(/\$/g, '₹');
    } else {
      const numPrice = typeof product.price === 'number'
        ? product.price
        : parseFloat(rawPriceStr.replace(/[^0-9.]/g, '') || '0');
      const symbol = options?.currencySymbol || '₹';
      priceStr = `${symbol}${numPrice}`;
    }
  }

  return `Hi,
I want to order
${name}
Weight: ${weight}
Price: ${priceStr}
Please share availability.`;
}

/**
 * Opens WhatsApp with the dynamically generated message and the phone number from Firebase settings.
 */
export function sendProductWhatsAppOrder(
  product: ProductItem,
  whatsappNumber: string,
  options?: WhatsAppOrderOptions
) {
  const rawMsg = generateProductWhatsAppMessage(product, options);
  const encodedMsg = encodeURIComponent(rawMsg);
  const cleanNumber = (whatsappNumber || '15550192824').replace(/[\+\s\-]/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
  window.open(whatsappUrl, '_blank');
}

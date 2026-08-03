import { ProductItem, Category } from '../types';

export interface CategoryInfo {
  name: Category;
  image: string;
  icon: string;
  tagline: string;
  bannerImage: string;
  type: 'cake' | 'additional';
}

export const CATEGORIES: CategoryInfo[] = [
  // --- CAKE CATEGORIES ---
  {
    name: 'Birthday Cakes',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=1200',
    icon: 'Cake',
    tagline: 'Make birthday wishes extra magical with hand-decorated multi-tier sponges and sparkler tops.',
    type: 'cake'
  },
  {
    name: 'Anniversary Cakes',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=1200',
    icon: 'Heart',
    tagline: 'Celebrate love and milestones with elegant 24k gold leaf and fresh floral heart-shaped gateaux.',
    type: 'cake'
  },
  {
    name: 'Designer Cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1200',
    icon: 'Sparkles',
    tagline: 'Artisanal architectural centerpieces created by our master pastry chefs for bespoke events.',
    type: 'cake'
  },
  {
    name: 'Photo Cakes',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=1200',
    icon: 'Camera',
    tagline: 'Turn cherished memories into edible art printed on high-resolution sugar sheets.',
    type: 'cake'
  },
  {
    name: 'Premium Cakes',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=1200',
    icon: 'Crown',
    tagline: 'Decadent Belgian couverture chocolate, Iranian pistachios, and French butter perfection.',
    type: 'cake'
  },
  {
    name: 'Eggless Cakes',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=1200',
    icon: 'ShieldCheck',
    tagline: '100% pure vegetarian & eggless delicacies crafted with avocado mousse and condensed milk.',
    type: 'cake'
  },
  {
    name: 'Chocolate Cakes',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=1200',
    icon: 'Flame',
    tagline: 'Sinful fudge, ganache, truffle, and nutella layers for true chocoholics.',
    type: 'cake'
  },
  {
    name: 'Kids Theme Cakes',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1200',
    icon: 'Smile',
    tagline: 'Vibrant superhero, fairytale, animal, and cartoon character birthday wonderlands.',
    type: 'cake'
  },
  {
    name: 'Fruit Cakes',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=1200',
    icon: 'Apple',
    tagline: 'Loaded with farm-fresh berries, tropical mangoes, kiwis, and vanilla diplomat cream.',
    type: 'cake'
  },

  // --- ADDITIONAL CATEGORIES ---
  {
    name: 'Gift Portal',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=1200',
    icon: 'Gift',
    tagline: 'One-stop gifting sanctuary for curated boxes, greeting cards, and artisan hampers.',
    type: 'additional'
  },
  {
    name: 'Flowers',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=1200',
    icon: 'Flower2',
    tagline: 'Freshly harvested Dutch roses, lilies, orchids, and carnation floral bouquets.',
    type: 'additional'
  },
  {
    name: 'Chocolate Bouquets',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=1200',
    icon: 'Package',
    tagline: 'Hand-crafted Ferrero Rocher & Swiss chocolate arrangements wrapped in satin ribbons.',
    type: 'additional'
  },
  {
    name: 'Gift Hampers',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1200',
    icon: 'Box',
    tagline: 'Rustic wooden chests filled with sourdough breads, raw honeys, teas, and cookies.',
    type: 'additional'
  },
  {
    name: 'Balloon Decoration',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=1200',
    icon: 'PartyPopper',
    tagline: 'Organic balloon arches, foil age numbers, and fairy light table decor setups.',
    type: 'additional'
  },
  {
    name: 'Birthday Accessories',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=1200',
    icon: 'Sparkle',
    tagline: 'Pure beeswax candles, acrylic cake toppers, sparklers, and party crowns.',
    type: 'additional'
  },
  {
    name: 'Recommend For You',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=1200',
    icon: 'ThumbsUp',
    tagline: 'Personalized pairings recommended by our head baker for tea and celebration time.',
    type: 'additional'
  },
  {
    name: 'Trending',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=1200',
    icon: 'TrendingUp',
    tagline: 'The most popular WhatsApp pre-ordered items trending among our customers right now.',
    type: 'additional'
  },
  {
    name: 'Bamboo + Chocolate Gifts',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200',
    icon: 'Sprout',
    tagline: 'Eco-friendly lucky bamboo plant pots paired with luxury artisanal chocolate truffles.',
    type: 'additional'
  },
];

export const PRODUCTS: ProductItem[] = [
  // --- Birthday Cakes ---
  {
    id: 'bday-confetti-funfetti',
    name: 'Golden Confetti Birthday Extravaganza',
    category: 'Birthday Cakes',
    price: 38.0,
    priceNum: 38.0,
    description: 'Triple-layer vanilla bean sponge infused with colorful funfetti, layered with white chocolate buttercream and topped with birthday sparklers.',
    imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600',
    available: true,
    isSignature: true,
    ingredients: ['Madagascar Vanilla', 'White Chocolate Buttercream', 'Organic Wheat Flour', 'Edible Sparkles']
  },
  {
    id: 'bday-berry-drip',
    name: 'Berry Drip Birthday Celebration Cake',
    category: 'Birthday Cakes',
    price: 42.0,
    priceNum: 42.0,
    description: 'Fresh strawberry compote sponge with pink ruby chocolate drip glaze and mountain of fresh raspberries.',
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600',
    available: true,
    ingredients: ['Fresh Strawberries', 'Ruby Chocolate Drip', 'Swiss Meringue Buttercream']
  },

  // --- Anniversary Cakes ---
  {
    id: 'anni-gold-heart',
    name: '24k Gold Leaf Velvet Heart Gateau',
    category: 'Anniversary Cakes',
    price: 52.0,
    priceNum: 52.0,
    description: 'Romantic heart-shaped red velvet sponge with cream cheese frosting, edible 24k gold leaf flakes, and fresh red rose petals.',
    imageUrl: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600',
    available: true,
    isSignature: true,
    ingredients: ['Red Velvet Cocoa Sponge', '24k Gold Leaf', 'Organic Rose Petals', 'Philadelphia Cream Cheese']
  },
  {
    id: 'anni-floral-tiered',
    name: 'Blush Rose Milestone Anniversary Cake',
    category: 'Anniversary Cakes',
    price: 68.0,
    priceNum: 68.0,
    description: 'Two-tier vanilla bean & almond cake adorned with handcrafted wafer paper roses and subtle gold pearl dust.',
    imageUrl: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600',
    available: true,
    ingredients: ['Vanilla Bean', 'Almond Flour', 'Wafer Paper Florals', 'Champagne Syrup']
  },

  // --- Designer Cakes ---
  {
    id: 'dsgn-marble-arch',
    name: 'Modern Geode & Marble Sculpted Cake',
    category: 'Designer Cakes',
    price: 75.0,
    priceNum: 75.0,
    description: 'Avant-garde edible crystal geode carved into fondant marble finish with isomalt sugar quartz and gold veins.',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
    available: true,
    isSignature: true,
    ingredients: ['Isomalt Sugar Crystals', 'Marshmallow Fondant', 'Dark Ganache Core']
  },

  // --- Photo Cakes ---
  {
    id: 'photo-custom-memory',
    name: 'Custom Edible Memory Photo Cake',
    category: 'Photo Cakes',
    price: 45.0,
    priceNum: 45.0,
    description: 'Your favorite family photo printed in high-res edible food colors on premium icing sheet atop vanilla buttercream sponge.',
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600',
    available: true,
    ingredients: ['Edible Sugar Print', 'Whipped Cream Frosting', 'Sponge Cake Base']
  },

  // --- Premium Cakes ---
  {
    id: 'prem-pistachio-opera',
    name: 'Royal Persian Pistachio & Opera Gateau',
    category: 'Premium Cakes',
    price: 58.0,
    priceNum: 58.0,
    description: 'Seven layers of Iranian pistachio jaconde, coffee espresso ganache, and dark chocolate mirror glaze.',
    imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600',
    available: true,
    isSignature: true,
    ingredients: ['Iranian Pistachios', 'Valrhona Chocolate', 'Single Origin Espresso']
  },

  // --- Eggless Cakes ---
  {
    id: 'eggless-choco-fudge',
    name: 'Pure Eggless Dark Chocolate Fudge Cake',
    category: 'Eggless Cakes',
    price: 36.0,
    priceNum: 36.0,
    description: '100% vegetarian moist cocoa sponge bound with greek yogurt mousse and silky dark chocolate ganache.',
    imageUrl: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600',
    available: true,
    ingredients: ['100% Pure Cocoa', 'Greek Yogurt', 'Dark Belgian Choco Flakes']
  },

  // --- Chocolate Cakes ---
  {
    id: 'choco-nutella-truffle',
    name: 'Belgian Nutella Truffle Overload',
    category: 'Chocolate Cakes',
    price: 48.0,
    priceNum: 48.0,
    description: 'Deep chocolate sponge filled with hazelnut Nutella spread, Ferrero Rocher pralines, and dark truffle glaze.',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
    available: true,
    isSignature: true,
    ingredients: ['Nutella Spread', 'Ferrero Rocher Chunks', '70% Belgian Chocolate']
  },

  // --- Kids Theme Cakes ---
  {
    id: 'kids-superhero-fantasy',
    name: 'Super Kingdom Kids Fantasy Cake',
    category: 'Kids Theme Cakes',
    price: 55.0,
    priceNum: 55.0,
    description: 'Playful multi-colored rainbow sponge cake with fondant superhero emblems and star toppers.',
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600',
    available: true,
    ingredients: ['Natural Food Colors', 'Rainbow Sponge', 'Vanilla Buttercream']
  },

  // --- Fruit Cakes ---
  {
    id: 'fruit-harvest-tart',
    name: 'Exotic Fruit Harvest Gateau',
    category: 'Fruit Cakes',
    price: 40.0,
    priceNum: 40.0,
    description: 'Light vanilla sponge layered with kiwi, dragonfruit, fresh mangoes, and passionfruit curd.',
    imageUrl: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600',
    available: true,
    ingredients: ['Kiwi', 'Dragonfruit', 'Alphonso Mango', 'Diplomat Cream']
  },

  // --- Gift Portal ---
  {
    id: 'gift-deluxe-box',
    name: 'The King Bakers Royal Celebration Box',
    price: 65.0,
    priceNum: 65.0,
    description: 'Luxury velvet box containing mini bento cake, 6 macaron assortment, and a personalized wax-sealed greeting card.',
    imageUrl: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600',
    category: 'Gift Portal',
    available: true,
    isSignature: true,
    ingredients: ['Mini Bento Cake', 'French Macarons', 'Wax-Sealed Card', 'Luxury Box']
  },

  // --- Flowers ---
  {
    id: 'flower-dutch-roses',
    name: 'Royal Crimson Dutch Rose Bouquet',
    category: 'Flowers',
    price: 35.0,
    priceNum: 35.0,
    description: 'Bunch of 12 long-stemmed crimson Dutch roses hand-tied in rustic craft paper with eucalyptus sprigs.',
    imageUrl: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=600',
    available: true,
    ingredients: ['12x Crimson Dutch Roses', 'Eucalyptus Foliage', 'Craft Wrapping']
  },
  {
    id: 'flower-pastel-lilies',
    name: 'Pastel Lily & Carnation Bunch',
    category: 'Flowers',
    price: 42.0,
    priceNum: 42.0,
    description: 'Fragrant white Asiatic lilies blended with soft pink carnations and gypsophila baby breath.',
    imageUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=600',
    available: true
  },

  // --- Chocolate Bouquets ---
  {
    id: 'choco-bouquet-ferrero',
    name: 'Ferrero Rocher Golden Chocolate Bouquet',
    category: 'Chocolate Bouquets',
    price: 45.0,
    priceNum: 45.0,
    description: '16 golden Ferrero Rocher pralines sculpted into a stunning floral bouquet wrapped in black satin ribbon.',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    available: true,
    isSignature: true,
    ingredients: ['16x Ferrero Rocher', 'Satin Bows', 'Floral Base']
  },

  // --- Gift Hampers ---
  {
    id: 'hamper-sourdough-chest',
    name: 'Artisan Sourdough & Wild Honey Hamper',
    category: 'Gift Hampers',
    price: 52.0,
    priceNum: 52.0,
    description: 'Handcrafted wooden chest containing 1 sourdough loaf, raw wildflower honey, seeded rye crispbreads, and organic tea.',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    available: true,
    isSignature: true
  },

  // --- Balloon Decoration ---
  {
    id: 'balloon-pastel-arch',
    name: 'Pastel & Metallic Gold Balloon Arch Package',
    category: 'Balloon Decoration',
    price: 85.0,
    priceNum: 85.0,
    description: 'Custom 8ft organic balloon arch styled in blush nude, sage green, and chrome gold for cake backdrop setup.',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600',
    available: true
  },

  // --- Birthday Accessories ---
  {
    id: 'acc-beeswax-candle-pack',
    name: 'Natural Honey Beeswax Birthday Candles',
    category: 'Birthday Accessories',
    price: 6.0,
    priceNum: 6.0,
    description: 'Hand-dipped 100% natural beeswax candles with subtle sweet honey aroma.',
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600',
    available: true
  },
  {
    id: 'acc-sparkler-fountain',
    name: 'Golden Cake Sparkler Fountain (Pack of 4)',
    category: 'Birthday Accessories',
    price: 12.0,
    priceNum: 12.0,
    description: 'Smokeless cake sparklers erupting into 45 seconds of gold glitter flame.',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600',
    available: true
  },

  // --- Recommend For You ---
  {
    id: 'rec-almond-croissant',
    name: 'Baker Choice Twice-Baked Almond Croissant',
    category: 'Recommend For You',
    price: 6.5,
    priceNum: 6.5,
    description: 'Flaky French butter pastry filled with rich house-made frangipane and toasted almonds.',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600',
    available: true,
    isSignature: true
  },

  // --- Trending ---
  {
    id: 'trend-sea-salt-cookie',
    name: 'Maldon Sea Salt Dark Choco Chunk Cookie',
    category: 'Trending',
    price: 4.0,
    priceNum: 4.0,
    description: 'Brown butter base with 72% dark chocolate chunks and Maldon sea salt flakes.',
    imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600',
    available: true,
    isSignature: true
  },

  // --- Bamboo + Chocolate Gifts ---
  {
    id: 'bamboo-choco-serenity',
    name: 'Lucky 2-Layer Bamboo & Truffle Planter Gift',
    category: 'Bamboo + Chocolate Gifts',
    price: 32.0,
    priceNum: 32.0,
    description: 'Fresh 2-layer lucky indoor bamboo plant in ceramic vase paired with a box of 8 artisanal dark chocolate pralines.',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    available: true,
    isSignature: true,
    ingredients: ['2-Layer Bamboo Plant', 'Ceramic Pot', '8x Dark Truffle Pralines']
  }
];

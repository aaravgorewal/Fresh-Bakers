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
    tagline: 'Celebrate love and milestones with elegant red velvet and 24k gold leaf heart-shaped gateaux.',
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
    tagline: 'Decadent Belgian couverture chocolate, Iranian pistachios, and saffron perfection.',
    type: 'cake'
  },
  {
    name: 'Eggless Cakes',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=1200',
    icon: 'ShieldCheck',
    tagline: '100% pure vegetarian & eggless delicacies crafted with whipped cream and condensed milk.',
    type: 'cake'
  },
  {
    name: 'Chocolate Cakes',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=1200',
    icon: 'Flame',
    tagline: 'Sinful fudge, ganache, truffle, KitKat, Oreo, and Nutella layers for true chocoholics.',
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
    tagline: 'Loaded with farm-fresh Alphonso mangoes, pineapples, kiwis, and fresh cream.',
    type: 'cake'
  },
  {
    name: 'Bento Cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1200',
    icon: 'Sparkles',
    tagline: 'Trendy 4-inch cute Korean style bento mini cakes for intimate celebrations.',
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
    tagline: 'Hand-crafted Ferrero Rocher & Cadbury Silk arrangements wrapped in satin ribbons.',
    type: 'additional'
  },
  {
    name: 'Gift Hampers',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1200',
    icon: 'Box',
    tagline: 'Gourmet gift hampers filled with artisan tea cakes, dry fruit cookies, roasted nuts, and sweets.',
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
    id: 'bday-choco-truffle',
    name: 'Classic Dutch Chocolate Truffle Cake',
    category: 'Birthday Cakes',
    price: 599,
    priceNum: 599,
    description: 'Rich dark chocolate sponge layered with smooth 70% dark chocolate ganache and chocolate curls.',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
    available: true,
    isSignature: true,
    isFeatured: true,
    ingredients: ['Dark Couverture Chocolate', 'Fresh Dairy Cream', 'Dutch Cocoa', 'Vanilla Extract']
  },
  {
    id: 'bday-black-forest',
    name: 'Classic Black Forest Cream Cake',
    category: 'Birthday Cakes',
    price: 499,
    priceNum: 499,
    description: 'Soft cocoa sponge soaked in cherry syrup, layered with fresh whipped cream and juicy red cherries.',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
    available: true,
    isFeatured: true,
    ingredients: ['Whipped Cream', 'Dark Chocolate Shavings', 'Maraschino Cherries', 'Cocoa Sponge']
  },
  {
    id: 'bday-butterscotch',
    name: 'Royal Butterscotch Crunch Cake',
    category: 'Birthday Cakes',
    price: 499,
    priceNum: 499,
    description: 'Moist vanilla sponge infused with butterscotch syrup, topped with crunchy caramelized praline and butterscotch chips.',
    imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600',
    available: true,
    isTrending: true,
    ingredients: ['Butterscotch Praline', 'Caramel Drizzle', 'Vanilla Sponge', 'Buttercream']
  },
  {
    id: 'bday-kitkat-overload',
    name: 'KitKat & Gems Birthday Extravaganza',
    category: 'Birthday Cakes',
    price: 799,
    priceNum: 799,
    description: 'Crisp KitKat chocolate fence surrounding a dark chocolate truffle cake topped with colorful Cadbury Gems.',
    imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600',
    available: true,
    isTrending: true,
    ingredients: ['KitKat Chocolate Bars', 'Cadbury Gems', 'Dark Truffle Sponge', 'Chocolate Ribbon']
  },
  {
    id: 'bday-blueberry-drip',
    name: 'Fresh Blueberry Drip Celebration Cake',
    category: 'Birthday Cakes',
    price: 699,
    priceNum: 699,
    description: 'Vanilla sponge filled with organic blueberry compote, finished with purple white chocolate drip and fresh berries.',
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600',
    available: true,
    ingredients: ['Blueberry Compote', 'White Chocolate Drip', 'Whipped Frosting']
  },

  // --- Anniversary Cakes ---
  {
    id: 'anni-red-velvet',
    name: 'Red Velvet Heart Anniversary Cake',
    category: 'Anniversary Cakes',
    price: 699,
    priceNum: 699,
    description: 'Romantic heart-shaped red velvet sponge layered with cream cheese frosting and gold sprinkles.',
    imageUrl: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600',
    available: true,
    isSignature: true,
    isFeatured: true,
    ingredients: ['Red Velvet Cocoa Sponge', 'Cream Cheese Frosting', 'Edible Gold Sprinkles']
  },
  {
    id: 'anni-rasmalai-fusion',
    name: 'Royal Rasmalai Fusion Gateau',
    category: 'Anniversary Cakes',
    price: 899,
    priceNum: 899,
    description: 'Cardamom infused sponge layered with saffron milk cream, soft cottage cheese rasmalai pieces, and pistachios.',
    imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600',
    available: true,
    isSignature: true,
    isFeatured: true,
    ingredients: ['Authentic Rasmalai', 'Saffron Kesar Milk', 'Pistachios', 'Cardamom Sponge']
  },

  // --- Designer Cakes ---
  {
    id: 'dsgn-marble-arch',
    name: 'Modern Geode & Marble Designer Cake',
    category: 'Designer Cakes',
    price: 1499,
    priceNum: 1499,
    description: 'Hand-sculpted edible crystal geode carved into marshmallow fondant with gold sugar veins.',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
    available: true,
    isSignature: true,
    isFeatured: true,
    ingredients: ['Isomalt Sugar Crystals', 'Marshmallow Fondant', 'Dark Ganache Core']
  },

  // --- Photo Cakes ---
  {
    id: 'photo-custom-memory',
    name: 'Custom Edible Memory Photo Cake',
    category: 'Photo Cakes',
    price: 699,
    priceNum: 699,
    description: 'High-res edible photo print on sugar sheet, customized with your favorite memory atop fresh vanilla frosting.',
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600',
    available: true,
    isTrending: true,
    ingredients: ['Edible Sugar Print Sheet', 'Whipped Cream', 'Vanilla Sponge']
  },

  // --- Premium Cakes ---
  {
    id: 'prem-ferrero-rocher',
    name: 'Ferrero Rocher Royal Chocolate Cake',
    category: 'Premium Cakes',
    price: 1199,
    priceNum: 1199,
    description: 'Decadent Belgian hazelnut chocolate cake topped with original Ferrero Rocher pralines and roasted hazelnuts.',
    imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600',
    available: true,
    isSignature: true,
    isFeatured: true,
    ingredients: ['Ferrero Rocher Chocolates', 'Nutella Cream', 'Belgian Chocolate']
  },

  // --- Eggless Cakes ---
  {
    id: 'eggless-pineapple',
    name: 'Pure Eggless Fresh Pineapple Cake',
    category: 'Eggless Cakes',
    price: 499,
    priceNum: 499,
    description: '100% vegetarian moist sponge layered with juicy pineapple crushed slices and light vanilla cream.',
    imageUrl: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600',
    available: true,
    isEggless: true,
    isFeatured: true,
    ingredients: ['100% Eggless Sponge', 'Fresh Pineapple Slices', 'Whipped Cream', 'Cherries']
  },
  {
    id: 'eggless-choco-fudge',
    name: 'Pure Eggless Dark Chocolate Truffle Cake',
    category: 'Eggless Cakes',
    price: 599,
    priceNum: 599,
    description: '100% vegetarian dark chocolate sponge covered in rich dark ganache.',
    imageUrl: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600',
    available: true,
    isEggless: true,
    ingredients: ['100% Eggless Cocoa Sponge', 'Belgian Ganache', 'Dark Chocolate Shavings']
  },

  // --- Chocolate Cakes ---
  {
    id: 'choco-oreo-overload',
    name: 'Oreo Crunch & Truffle Overload Cake',
    category: 'Chocolate Cakes',
    price: 599,
    priceNum: 599,
    description: 'Moist chocolate sponge filled with crushed Oreo cookies and chocolate ganache cream.',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
    available: true,
    isTrending: true,
    ingredients: ['Oreo Biscuits', 'Dark Ganache', 'Whipped Oreo Cream']
  },

  // --- Kids Theme Cakes ---
  {
    id: 'kids-superhero-fantasy',
    name: 'Super Kingdom Kids Fantasy Cake',
    category: 'Kids Theme Cakes',
    price: 899,
    priceNum: 899,
    description: 'Playful rainbow sponge cake with hand-crafted superhero fondant toppers.',
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600',
    available: true,
    ingredients: ['Rainbow Sponge', 'Fondant Toppers', 'Vanilla Buttercream']
  },

  // --- Fruit Cakes ---
  {
    id: 'fruit-fresh-pineapple',
    name: 'Classic Fresh Pineapple Delight Cake',
    category: 'Fruit Cakes',
    price: 499,
    priceNum: 499,
    description: 'Soft sponge soaked in pineapple juice, garnished with glazed pineapple slices and cherries.',
    imageUrl: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600',
    available: true,
    ingredients: ['Pineapple Slices', 'Vanilla Sponge', 'Cherries']
  },
  {
    id: 'fruit-harvest-tart',
    name: 'Exotic Fresh Fruit Harvest Gateau',
    category: 'Fruit Cakes',
    price: 699,
    priceNum: 699,
    description: 'Vanilla sponge loaded with kiwi, dragonfruit, fresh Alphonso mangoes, and sweet cream.',
    imageUrl: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600',
    available: true,
    isRecommended: true,
    ingredients: ['Kiwi', 'Dragonfruit', 'Alphonso Mango', 'Fresh Cream']
  },

  // --- Bento Cakes ---
  {
    id: 'bento-cute-love',
    name: 'Cute Pastel Love Bento Cake',
    category: 'Bento Cakes',
    price: 299,
    priceNum: 299,
    description: '4-inch mini bento cake in eco-friendly sugar cane box with custom pastel piping.',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
    available: true,
    isTrending: true,
    ingredients: ['Vanilla Sponge', 'Pastel Cream', 'Bento Box']
  },
  {
    id: 'bento-birthday-wish',
    name: 'Personalized Birthday Wish Bento Cake',
    category: 'Bento Cakes',
    price: 349,
    priceNum: 349,
    description: '4-inch chocolate truffle mini bento cake with custom written birthday message.',
    imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600',
    available: true,
    ingredients: ['Chocolate Sponge', 'Truffle Cream', 'Personalized Piping']
  },

  // --- Gift Portal ---
  {
    id: 'gift-deluxe-box',
    name: 'The King Bakers Royal Celebration Box',
    category: 'Gift Portal',
    price: 1499,
    priceNum: 1499,
    description: 'Luxury box containing mini bento cake, dry fruit cookies, and a personalized wax-sealed card.',
    imageUrl: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600',
    available: true,
    isSignature: true,
    isFeatured: true,
    ingredients: ['Mini Bento Cake', 'Dry Fruit Cookies', 'Greeting Card', 'Luxury Box']
  },

  // --- Flowers ---
  {
    id: 'flower-dutch-roses',
    name: 'Royal Crimson Dutch Rose Bouquet',
    category: 'Flowers',
    price: 599,
    priceNum: 599,
    description: 'Bunch of 12 long-stemmed crimson Dutch roses hand-tied in craft paper with eucalyptus sprigs.',
    imageUrl: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=600',
    available: true,
    isTrending: true,
    ingredients: ['12x Crimson Dutch Roses', 'Eucalyptus Foliage', 'Craft Wrapping']
  },
  {
    id: 'flower-pastel-lilies',
    name: 'Pastel Lily & Carnation Bunch',
    category: 'Flowers',
    price: 799,
    priceNum: 799,
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
    price: 699,
    priceNum: 699,
    description: '16 golden Ferrero Rocher pralines sculpted into a stunning bouquet wrapped in red satin ribbon.',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    available: true,
    isSignature: true,
    isTrending: true,
    ingredients: ['16x Ferrero Rocher', 'Satin Bows', 'Floral Base']
  },

  // --- Gift Hampers ---
  {
    id: 'hamper-royal-chest',
    name: 'Artisan Indian Celebration Sweets & Tea Hamper',
    category: 'Gift Hampers',
    price: 999,
    priceNum: 999,
    description: 'Handcrafted wooden chest containing 1 dry fruit plum cake, raw wildflower honey, pistachio shortbread, and Assam tea.',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    available: true,
    isSignature: true,
    isFeatured: true,
    ingredients: ['Dry Fruit Cake', 'Assam Tea', 'Raw Honey', 'Gourmet Cookies']
  },

  // --- Balloon Decoration ---
  {
    id: 'balloon-pastel-arch',
    name: 'Pastel & Metallic Gold Balloon Arch Package',
    category: 'Balloon Decoration',
    price: 1499,
    priceNum: 1499,
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
    price: 149,
    priceNum: 149,
    description: 'Hand-dipped 100% natural beeswax candles with subtle sweet honey aroma.',
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600',
    available: true
  },
  {
    id: 'acc-sparkler-fountain',
    name: 'Golden Cake Sparkler Fountain (Pack of 4)',
    category: 'Birthday Accessories',
    price: 199,
    priceNum: 199,
    description: 'Smokeless cake sparklers erupting into 45 seconds of gold glitter flame.',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600',
    available: true
  },

  // --- Recommend For You ---
  {
    id: 'rec-rasmalai-jar',
    name: 'Eggless Rasmalai Jar Cake',
    category: 'Recommend For You',
    price: 199,
    priceNum: 199,
    description: 'Layered glass jar with cardamom sponge, saffron rabri, and soft rasmalai chunks.',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600',
    available: true,
    isSignature: true,
    isRecommended: true
  },

  // --- Trending ---
  {
    id: 'trend-sea-salt-cookie',
    name: 'Dark Choco Chunk Bakery Cookie',
    category: 'Trending',
    price: 149,
    priceNum: 149,
    description: 'Butter dough infused with 72% dark chocolate chunks and sea salt flakes.',
    imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600',
    available: true,
    isSignature: true,
    isTrending: true
  },

  // --- Bamboo + Chocolate Gifts ---
  {
    id: 'bamboo-choco-serenity',
    name: 'Lucky 2-Layer Bamboo & Truffle Planter Gift',
    category: 'Bamboo + Chocolate Gifts',
    price: 599,
    priceNum: 599,
    description: 'Fresh 2-layer lucky indoor bamboo plant in ceramic vase paired with a box of 8 artisanal dark chocolate pralines.',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    available: true,
    isSignature: true,
    ingredients: ['2-Layer Bamboo Plant', 'Ceramic Pot', '8x Dark Truffle Pralines']
  }
];

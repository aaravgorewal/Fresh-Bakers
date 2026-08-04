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
    tagline: 'Curated celebration bundles pairing fresh cakes with plushies, greeting cards & sweets.',
    type: 'additional'
  },
  {
    name: 'Flowers',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=1200',
    icon: 'Flower2',
    tagline: 'Exquisite hand-tied velvet rose bunches, Dutch lilies, and exotic orchid sprays.',
    type: 'additional'
  },
  {
    name: 'Chocolate Bouquets',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=1200',
    icon: 'Package',
    tagline: 'Stunning artistic arrangements of Ferrero Rocher, Cadbury Silk, and dark truffles.',
    type: 'additional'
  },
  {
    name: 'Gift Hampers',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200',
    icon: 'Box',
    tagline: 'Luxury wicker baskets packed with mithai fusion bakes, dry fruits, and sparkling cider.',
    type: 'additional'
  },
  {
    name: 'Balloon Decoration',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=1200',
    icon: 'PartyPopper',
    tagline: 'Professional home & venue helium balloon arches, chrome garlands, and LED setups.',
    type: 'additional'
  },
  {
    name: 'Birthday Accessories',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=1200',
    icon: 'Sparkle',
    tagline: 'Gold acrylic cake toppers, beeswax magic candles, sparkling fountains & party caps.',
    type: 'additional'
  },
  {
    name: 'Recommend For You',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=1200',
    icon: 'ThumbsUp',
    tagline: 'Our head chef’s personal favorite fusion delicacies and top-rated customer choices.',
    type: 'additional'
  },
  {
    name: 'Trending',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=1200',
    icon: 'TrendingUp',
    tagline: 'Viral bakery innovations currently breaking social media across India.',
    type: 'additional'
  },
  {
    name: 'Bamboo + Chocolate Gifts',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200',
    icon: 'Sprout',
    tagline: 'Eco-friendly 2-layer lucky bamboo planters paired with handmade dark chocolate boxes.',
    type: 'additional'
  }
];

// Helper to generate 209 high-quality products across all 19 categories
const generateProducts = (): ProductItem[] => {
  const items: ProductItem[] = [];

  const categoryConfigs: {
    category: Category;
    items: {
      name: string;
      price: number;
      desc: string;
      img: string;
      isEggless?: boolean;
      isSignature?: boolean;
      isFeatured?: boolean;
      isTrending?: boolean;
    }[];
  }[] = [
    {
      category: 'Birthday Cakes',
      items: [
        { name: 'Royal Shahi Rasmalai Birthday Gateau', price: 799, desc: 'Fresh saffron sponge soaked in cardamom milk with soft cottage cheese rasmalai & pistachios.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600', isEggless: true, isSignature: true, isFeatured: true },
        { name: 'Classic Belgian Chocolate Truffle Birthday Cake', price: 699, desc: 'Dark chocolate sponge layered with 70% Belgian chocolate ganache & cocoa nibs.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600', isEggless: true, isFeatured: true },
        { name: 'Red Velvet Heart Birthday Cake', price: 649, desc: 'Moist cocoa-infused crimson sponge filled with velvety cream cheese frosting.', img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600', isEggless: true, isTrending: true },
        { name: 'Fresh Alphonso Mango Cream Birthday Cake', price: 599, desc: 'Real Alphonso mango pulp layered with light vanilla whipped cream and fresh mint.', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Ferrero Rocher Hazelnut Birthday Delight', price: 899, desc: 'Crunchy Nutella mousse, roasted hazelnut praline, and gold foil topped ferrero spheres.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600', isEggless: false, isSignature: true },
        { name: 'Butterscotch Crunch Gold Sparkle Cake', price: 499, desc: 'Caramelized brown sugar sponge loaded with crunchy cashew praline and caramel glaze.', img: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Gulab Jamun Pistachio Fusion Birthday Cake', price: 749, desc: 'Cardamom infused sponge topped with juicy hot gulab jamuns and toasted almond flakes.', img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600', isEggless: true, isSignature: true },
        { name: 'Black Forest Cherry Birthday Special', price: 549, desc: 'Traditional dark chocolate sponge soaked in cherry syrup with whipped cream flakes.', img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600', isEggless: false },
        { name: 'Pineapple Glaze Golden Birthday Sponge', price: 449, desc: 'Fresh candied pineapple chunks baked in soft butter cake topped with maraschino cherries.', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Nutella Caramel Birthday Overload Cake', price: 799, desc: 'Decadent dual layer of creamy Nutella spread and salted butter caramel drip.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600', isEggless: true, isTrending: true },
        { name: 'Strawberry Rose Water Birthday Sparkle Cake', price: 599, desc: 'Delicate pink sponge infused with organic damask rose water and fresh strawberry preserve.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600', isEggless: true }
      ]
    },
    {
      category: 'Anniversary Cakes',
      items: [
        { name: '24K Gold Leaf Red Velvet Anniversary Heart', price: 1199, desc: 'Double tier crimson heart velvet cake adorned with edible 24k gold leaf flakes.', img: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600', isEggless: true, isSignature: true, isFeatured: true },
        { name: 'Silver Jubilee Rose & Pistachio Cake', price: 999, desc: 'Fragrant rose blossom cream with crushed pistachios & silver vark embellishments.', img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Romantic Strawberry Champagne Fusion Gateau', price: 899, desc: 'Sparkling fruit preserve sponge paired with silky vanilla bean buttercream.', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600', isEggless: false },
        { name: 'Classic Dark Chocolate Ganache Heart Cake', price: 799, desc: 'Heart-shaped pure Belgian dark chocolate mousse cake with mirror glaze finish.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600', isEggless: true, isTrending: true },
        { name: 'Kesar Elaichi Almond Anniversary Delight', price: 849, desc: 'Heritage Indian spice sponge soaked in saffron syrup with toasted almond slivers.', img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'White Chocolate Berry Love Anniversary Cake', price: 749, desc: 'Creamy Swiss white chocolate ganache with fresh raspberries and red currant drip.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Twin Hearts Fondant Milestone Cake', price: 1299, desc: 'Custom sculpted twin heart design with sugar lace flowers & personalized wedding date.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600', isEggless: true, isSignature: true },
        { name: 'Blueberry Cream Cheese Anniversary Tier', price: 899, desc: 'Wild Canadian blueberry compote folded into rich New York style cream cheese sponge.', img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600', isEggless: false },
        { name: 'Golden Truffle & Caramel Anniversary Gateau', price: 949, desc: 'Rich chocolate truffle sponge layered with salted caramel mousse & gold sugar pearls.', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Tiramisu Espresso Anniversary Special', price: 849, desc: 'Italian espresso soaked ladyfingers with whipped mascarpone & dark cocoa dust.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Mango Passionfruit Blossom Anniversary Cake', price: 799, desc: 'Tropical Alphonso mango mousse infused with tangy passionfruit glaze.', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600', isEggless: true }
      ]
    },
    {
      category: 'Designer Cakes',
      items: [
        { name: 'Royal Peacock Heritage Fondant Cake', price: 1799, desc: '3D hand-sculpted royal peacock with intricate edible gold foil & sugar flowers.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600', isEggless: true, isSignature: true, isFeatured: true },
        { name: 'Abstract Marble & Rose Gold Geode Cake', price: 1499, desc: 'Artisanal crystal geode sculpture crafted with sugar rock candy & metallic rose gold accents.', img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600', isEggless: true, isFeatured: true },
        { name: 'Botanical Floral Cascading Designer Cake', price: 1399, desc: 'Multi-tiered white buttercream canvas with hand-pressed edible flowers & wafer paper leaves.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Contemporary Metallic Gold & Charcoal Tier', price: 1699, desc: 'Sleek dark charcoal buttercream texture paired with 24k leaf geometric shapes.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600', isEggless: true, isTrending: true },
        { name: 'Bollywood Retro Vintage Draped Cake', price: 1299, desc: 'Custom piped vintage shell borders, maraschino cherries & ribbon detailing.', img: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Fairytale Floating Castle Designer Cake', price: 1899, desc: 'Magical multi-tiered sculpted castle with pastel sugar turrets & glitter dust.', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Luxury Suitcase & Passport Travel Cake', price: 1599, desc: 'Hand-painted vintage leather suitcase design for globetrotters and milestones.', img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Pastel Watercolor & Gold Butterfly Cake', price: 1249, desc: 'Soft pastel palette knife stroke finish with flying edible rice paper butterflies.', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Celestial Galaxy & Star Dust Cake', price: 1399, desc: 'Deep violet galaxy airbrushed sponge topped with constellation sugar pearls.', img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Sculpted Golden Crown Prince Designer Cake', price: 1649, desc: '3D handcrafted sugar crown sitting atop rich chocolate truffle sponge.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Modern Minimalist Textured Ochre Cake', price: 1199, desc: 'Textured warm terracotta buttercream adorned with dried pampas grass & palm spears.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600', isEggless: true }
      ]
    },
    {
      category: 'Photo Cakes',
      items: [
        { name: 'High-Res Custom Sugar Sheet Photo Cake', price: 699, desc: 'Edible high-resolution print on sweet sugar sheet framed with cream rosettes.', img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600', isEggless: true, isFeatured: true },
        { name: 'Heart Shape Memories Photo Collage Cake', price: 799, desc: 'Collage of up to 4 cherished photos printed on edible sugar sheet.', img: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Chocolate Truffle Border Photo Cake', price: 749, desc: 'Belgian truffle cake topped with high-definition edible photo print.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600', isEggless: true, isTrending: true },
        { name: 'Rasmalai Fusion Edible Photo Cake', price: 849, desc: 'Saffron cardamom sponge paired with a custom photo print.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600', isEggless: true, isSignature: true },
        { name: 'Red Velvet Love Story Photo Cake', price: 749, desc: 'Crimson cocoa velvet cake with custom photo topper for anniversaries.', img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Butterscotch Sparkle Photo Cake', price: 649, desc: 'Caramel crunch cake featuring your custom photo print with golden piping.', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Fruit Overload Edible Photo Cake', price: 699, desc: 'Fresh pineapple & mango cake with central high-res sugar photo sheet.', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Kids Cartoon Superhero Photo Cake', price: 699, desc: 'Bright birthday photo cake with kid’s favorite superhero theme border.', img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Black Forest Classic Photo Cake', price: 629, desc: 'Rich cherry & dark chocolate cake topped with personalized family photo.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600', isEggless: false },
        { name: 'Pineapple Delight Custom Photo Cake', price: 599, desc: 'Juicy pineapple whip cake featuring your high quality digital picture.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Nutella Fudge Photo Celebration Cake', price: 799, desc: 'Nutella fudge cream cake accented with edible photo print.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600', isEggless: true }
      ]
    },
    {
      category: 'Premium Cakes',
      items: [
        { name: 'Imperial Saffron Pista Rabri Opera Cake', price: 1299, desc: 'Multi-layer opera cake soaked in Kashmiri saffron elixir with Iranian pistachios.', img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600', isEggless: true, isSignature: true, isFeatured: true },
        { name: 'Belgian Couverture Truffle Crown Gateau', price: 1199, desc: '72% Single-origin Callebaut dark chocolate truffle with gold leaf crown.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600', isEggless: true, isFeatured: true },
        { name: 'Opulent Iranian Hazelnut Rocher Tower', price: 1399, desc: 'Towering layers of roasted hazelnut gianduja chocolate with gold dust.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600', isEggless: true, isTrending: true },
        { name: 'Royal Rose & Cardamom Malai Cake', price: 1099, desc: 'Organic rose extract, fresh malai cream & crushed green cardamom pods.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Single Origin Madagascar Vanilla Bean Cake', price: 999, desc: 'Pure Madagascar vanilla pod sponge with real seeds & white chocolate whip.', img: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Salted Caramel Macadamia Nut Cake', price: 1149, desc: 'Slow-cooked golden caramel with crunchy roasted Australian macadamias.', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Kashmir Almond Halwa Fusion Gateau', price: 1049, desc: 'Warm almond halwa sponge layered with light cardamom whipped ganache.', img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600', isEggless: true, isSignature: true },
        { name: 'Double Espresso Dark Cocoa Opera Cake', price: 999, desc: 'French style almond sponge soaked in Arabica espresso & dark chocolate glaze.', img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600', isEggless: false },
        { name: 'Wild Berry Mascarpone Velvet Cake', price: 1099, desc: 'Fresh blueberries, raspberries & blackberries in soft mascarpone cream.', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: '24K Edible Gold Chocolate Fudge Crown', price: 1499, desc: 'Luxe chocolate fudge sponge covered in 24k gold leaf and fresh blackberries.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Lotus Biscoff Caramelized Cookie Cake', price: 1049, desc: 'Rich Biscoff cookie butter spread with crushed Belgian Speculoos biscuits.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600', isEggless: true, isTrending: true }
      ]
    },
    {
      category: 'Eggless Cakes',
      items: [
        { name: '100% Eggless Pure Shahi Rasmalai Cake', price: 749, desc: 'Pure vegetarian recipe with fresh saffron milk, cottage cheese rasmalai & pistachios.', img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600', isEggless: true, isSignature: true, isFeatured: true },
        { name: 'Eggless Dutch Chocolate Fudge Cake', price: 649, desc: 'Moist eggless chocolate sponge smothered in rich Dutch cocoa ganache.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600', isEggless: true, isFeatured: true },
        { name: 'Eggless Red Velvet Cream Cheese Gateau', price: 649, desc: 'Crimson cocoa velvet sponge with silky eggless cream cheese frosting.', img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Eggless Butterscotch Praline Cake', price: 499, desc: 'Caramel sponge loaded with house-made cashew praline crunch.', img: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Eggless Fresh Alphonso Mango Cream Cake', price: 549, desc: 'Real mango pulp folded into soft eggless vanilla sponge and fresh cream.', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Eggless Nutella Ferrero Hazelnut Cake', price: 849, desc: 'Crunchy Nutella mousse and roasted hazelnut praline in eggless dark sponge.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600', isEggless: true, isTrending: true },
        { name: 'Eggless Gulab Jamun Fusion Delight', price: 699, desc: 'Juicy gulab jamuns embedded in cardamom whipped cream eggless cake.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600', isEggless: true, isSignature: true },
        { name: 'Eggless Pineapple Sweet Cream Cake', price: 449, desc: 'Refreshing pineapple bits baked in soft butter eggless cake.', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Eggless Strawberry Blossom Cake', price: 499, desc: 'Fresh strawberry preserve with delicate vanilla eggless whip.', img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Eggless Black Forest Cherry Cake', price: 529, desc: 'Rich cherry compote with dark chocolate shavings on eggless sponge.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Eggless Kesar Badam Milk Cake', price: 599, desc: 'Kashmiri saffron soak with roasted almonds in traditional eggless sponge.', img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600', isEggless: true }
      ]
    },
    {
      category: 'Chocolate Cakes',
      items: [
        { name: 'Ultimate Belgian Chocolate Truffle Cake', price: 749, desc: 'Rich 70% dark Belgian chocolate ganache poured over dense cocoa sponge.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600', isEggless: true, isFeatured: true },
        { name: 'Ferrero Rocher Hazelnut Overload', price: 899, desc: 'Crispy wafer layers, Nutella spread, and whole Ferrero Rocher pralines.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600', isEggless: true, isSignature: true, isFeatured: true },
        { name: 'KitKat & Gems Birthday Chocolate Surround', price: 699, desc: 'Circled with crispy KitKat fingers & topped with colorful chocolate Gems.', img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Oreo Cream Overload Chocolate Cake', price: 599, desc: 'Crushed Oreo cookies folded into dark chocolate mousse frosting.', img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600', isEggless: true, isTrending: true },
        { name: 'Nutella Lava Drip Chocolate Cake', price: 799, desc: 'Warm gooey Nutella core bursting from rich chocolate fudge sponge.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Chocolate Salted Caramel Drizzle Cake', price: 699, desc: 'Decadent dark chocolate paired with handcrafted salted butter caramel.', img: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Triple Chocolate Mousse Fantasy Cake', price: 849, desc: 'Three layers of dark, milk, and white Belgian chocolate mousse.', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600', isEggless: false },
        { name: 'Dark Chocolate Cherry Black Forest Deluxe', price: 599, desc: 'Soaked dark cherries, Kirsch syrup & Belgian chocolate curl shavings.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Chocolate Almond Fudge Crunch Cake', price: 649, desc: 'Toasted whole almonds coated in rich cocoa fudge ganache.', img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Cadbury Silk Indulgence Chocolate Cake', price: 749, desc: 'Creamy Cadbury Silk chocolate drizzle over velvety cocoa sponge.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Choco Chip Delight Birthday Cake', price: 499, desc: 'Packed with dark chocolate chips inside and out with chocolate cream.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600', isEggless: true }
      ]
    },
    {
      category: 'Kids Theme Cakes',
      items: [
        { name: 'Superstar Avengers Superhero Birthday Cake', price: 899, desc: '3D Fondant Avengers emblems atop colorful chocolate truffle cake.', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600', isEggless: true, isFeatured: true },
        { name: 'Enchanted Princess Castle Pastel Cake', price: 949, desc: 'Pastel pink & gold castle towers with sugar pearl decorations for birthday girls.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600', isEggless: true, isFeatured: true },
        { name: 'Magical Rainbow Unicorn Birthday Cake', price: 799, desc: 'Gold sugar horn, pastel rosette mane, and rainbow sponge inner layers.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600', isEggless: true, isTrending: true },
        { name: 'Jungle Safari Animal Kingdom Cake', price: 849, desc: 'Handcrafted cute fondant lion, elephant, and giraffe toppers on vanilla sponge.', img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Formula 1 Racing Car Theme Cake', price: 899, desc: 'Checkered flag design with 3D sugar racing car topper.', img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Space Astronaut & Galaxy Birthday Cake', price: 849, desc: 'Deep cosmic blue frosting with edible sugar moon, rocket & astronaut figurines.', img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Under The Sea Mermaid Pearl Cake', price: 799, desc: 'Teal watercolor waves with iridescent mermaid tail & sugar seashells.', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Dinosaur Jurassic World Adventure Cake', price: 849, desc: 'Volcano chocolate sponge with cute fondant T-Rex dinosaur toppers.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Cricket Champion Stadium Cake', price: 799, desc: 'Green pitch frosted cake with edible sugar cricket bat & ball.', img: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600', isEggless: true, isSignature: true },
        { name: 'Teddy Bear Cloud Birthday Cake', price: 749, desc: 'Adorable fluffy 3D teddy bear sitting on pastel blue buttercream clouds.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Candyland Lollipop Surprise Cake', price: 799, desc: 'Loaded with giant swirl lollipops, cotton candy & sprinkles.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600', isEggless: true }
      ]
    },
    {
      category: 'Fruit Cakes',
      items: [
        { name: 'Fresh Alphonso Mango Overload Cream Cake', price: 699, desc: 'Loaded with juicy Ratnagiri Alphonso mango slices & pure fresh cream.', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600', isEggless: true, isSignature: true, isFeatured: true },
        { name: 'Exotic Tropical Kiwi & Berry Fresh Fruit Cake', price: 649, desc: 'Topped with kiwi slices, strawberries, blueberries, dragonfruit & pineapple.', img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600', isEggless: true, isFeatured: true },
        { name: 'Fresh Hawaiian Pineapple Gateau', price: 499, desc: 'Sweet Hawaiian pineapple preserve layered in fluffy whipped cream sponge.', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Mahabaleshwar Fresh Strawberry Special', price: 599, desc: 'Juicy ripe Mahabaleshwar strawberries layered with vanilla bean cream.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600', isEggless: true, isTrending: true },
        { name: 'Blueberry Lemon Zest Fresh Fruit Cake', price: 649, desc: 'Tangy lemon infused sponge with sweet blueberry compote & fresh berries.', img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Mix Berry Harvest Special Fruit Cake', price: 699, desc: 'Abundance of fresh strawberries, raspberries & blackberries on white cream.', img: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Peach & Passionfruit Velvet Gateau', price: 599, desc: 'Sliced yellow peaches and tropical passionfruit reduction over vanilla sponge.', img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Orange Blossom Cranberry Cake', price: 549, desc: 'Zesty Nagpur orange extract paired with tart dried cranberries & almonds.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Green Apple & Cinnamon Spiced Cake', price: 499, desc: 'Warm Sri Lankan cinnamon sponge with caramelized green apple compote.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Tender Coconut & Lychee Royal Cake', price: 699, desc: 'Fresh malai tender coconut water soaked sponge with sweet lychee chunks.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600', isEggless: true, isSignature: true },
        { name: 'Pomegranate & Fig Royal Fruit Gateau', price: 649, desc: 'Ruby pomegranate arils and poached fresh figs over cardamom cream sponge.', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600', isEggless: true }
      ]
    },
    {
      category: 'Bento Cakes',
      items: [
        { name: 'Cute Korean Style Strawberry Bento Mini Cake', price: 349, desc: '4-inch adorable mini bento cake packed in eco sugarcane box with wooden fork.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600', isEggless: true, isFeatured: true },
        { name: 'Belgian Chocolate Truffle Bento Cake', price: 399, desc: 'Decadent 4-inch dark chocolate fudge bento cake with custom piped message.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600', isEggless: true, isFeatured: true },
        { name: 'Shahi Rasmalai Fusion Bento Cake', price: 429, desc: 'Cute mini bento filled with saffron soaked sponge & soft rasmalai chunk.', img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600', isEggless: true, isSignature: true },
        { name: 'Red Velvet Heart Bento Mini Cake', price: 379, desc: 'Intimate crimson velvet heart bento cake with cream cheese piped rosettes.', img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600', isEggless: true, isTrending: true },
        { name: 'Nutella Rocher Hazelnut Bento Cake', price: 449, desc: 'Mini Nutella hazelnut crunch bento topped with single Ferrero Rocher.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Pastel Floral Vintage Bento Cake', price: 369, desc: 'Trendy Korean style pastel buttercream piped flowers on vanilla sponge.', img: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Mango Passionfruit Bento Mini Cake', price: 349, desc: 'Fresh Alphonso mango pulp mini bento cake with cute smiley frosting.', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Butterscotch Crunch Bento Cake', price: 329, desc: 'Caramel crunch mini bento cake with golden cashew praline sprinkle.', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Lotus Biscoff Cream Bento Cake', price: 429, desc: 'Caramelized Speculoos cookie butter bento with whole Biscoff biscuit.', img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Black Forest Cherry Bento Mini Cake', price: 349, desc: 'Classic dark cherry chocolate mini bento cake with whipped cream star.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600', isEggless: false },
        { name: 'Custom Message Minimalist Bento Cake', price: 349, desc: 'Handwritten custom text on smooth white buttercream minimalist bento box.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600', isEggless: true }
      ]
    },
    {
      category: 'Gift Portal',
      items: [
        { name: 'Royal Celebration Bundle (Cake + Roses + Teddy)', price: 1499, desc: 'Half-kg truffle cake, 10 red rose bouquet, and 8-inch cute plush teddy bear.', img: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600', isFeatured: true },
        { name: 'Saffron Rasmalai Cake & Fresh Marigold Gift Combo', price: 1399, desc: 'Fusion Rasmalai cake paired with fresh flower bouquet & custom greeting card.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600', isSignature: true, isFeatured: true },
        { name: 'Red Velvet Heart Cake & 12 Rose Bouquet Combo', price: 1299, desc: 'Heart red velvet cake paired with a dozen fresh Dutch red roses.', img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600', isTrending: true },
        { name: 'Ferrero Rocher Box & Black Forest Cake Gift Pack', price: 1199, desc: 'Classic black forest cake with 16-piece Ferrero Rocher golden box.', img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=600' },
        { name: 'Bento Cake & Mini Flower Bucket Combo', price: 799, desc: 'Cute strawberry bento cake paired with a petite vase of fresh carnations.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600' },
        { name: 'Luxury Dry Fruit & Fusion Cake Celebration Box', price: 1699, desc: 'Premium dry fruit box (almonds, cashews, pistachios) + 0.5kg premium cake.', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600' },
        { name: 'Birthday Balloon Arch & Cake Home Delivery Combo', price: 1899, desc: 'Pastel balloon garland arch setup + 1kg designer birthday cake.', img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600' },
        { name: 'Chocolate Truffle Cake & Cadbury Silk Hamper', price: 999, desc: 'Half-kg chocolate truffle cake + 3 large Cadbury Silk chocolate bars.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600' },
        { name: 'Fruit Cake & Fresh Lily Floral Arrangement', price: 1249, desc: 'Exotic fruit overload cake + 5 stem fragrant white Dutch lily bunch.', img: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=600' },
        { name: 'Lucky Bamboo Plant & Chocolate Cake Gift Set', price: 949, desc: '2-layer lucky bamboo planter + half-kg Dutch chocolate fudge cake.', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600' },
        { name: 'Butterscotch Cake & Sparkling Fruit Cider Bottle', price: 899, desc: '0.5kg butterscotch cake + non-alcoholic sparkling red grape cider.', img: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600' }
      ]
    },
    {
      category: 'Flowers',
      items: [
        { name: 'Royal Crimson Red Roses Luxury Bouquet (15 Stems)', price: 799, desc: 'Fresh farm-cut long stem red velvet roses wrapped in premium brown jute paper.', img: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=600', isFeatured: true },
        { name: 'Exotic White Dutch Lilies & Baby’s Breath Bunch', price: 999, desc: '5 stems of fragrant white lilies complemented with delicate white baby’s breath.', img: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600', isFeatured: true },
        { name: 'Vibrant Mixed Gerberas & Carnations Bouquet', price: 599, desc: 'Bright array of yellow, orange, pink, and red gerbera daisies.', img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600' },
        { name: 'Purple Thai Orchid Spray Elegance Bunch', price: 899, desc: '10 stems of exotic long-lasting purple Thai dendrobium orchids.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600', isSignature: true },
        { name: 'Blush Pink Roses & Eucalyptus Leaves', price: 749, desc: 'Soft pastel pink roses styled with fragrant silver dollar eucalyptus stems.', img: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600', isTrending: true },
        { name: 'Sunshine Yellow Roses & Golden Solidago', price: 649, desc: '12 cheerful yellow roses signifying joy, friendship & new beginnings.', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600' },
        { name: 'Heritage Marigold & Mogra Floral Garland Box', price: 699, desc: 'Traditional fresh orange marigolds & sweet fragrant mogra flowers.', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600', isSignature: true },
        { name: 'Grand 50 Red Roses Heart Shape Table Arrangement', price: 2499, desc: '50 premium dark red roses artfully styled into a massive heart shape.', img: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=600' },
        { name: 'Peach Carnations & White Chrysanthemum Bouquet', price: 549, desc: 'Delicate peach carnations blended with fluffy white spray chrysanthemums.', img: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600' },
        { name: 'Sunflowers & Wild Wildflower Rustic Bunch', price: 799, desc: '3 golden sunflowers with seasonal rustic filler greens and raffia tie.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600' },
        { name: 'Red Roses & Ferrero Rocher Dual Bouquet', price: 1199, desc: '10 fresh red roses interspersed with 8 Ferrero Rocher golden chocolates.', img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=600' }
      ]
    },
    {
      category: 'Chocolate Bouquets',
      items: [
        { name: 'Ferrero Rocher Royal Gold Chocolate Bouquet (16 Pcs)', price: 999, desc: 'Handcrafted floral bouquet arranged with 16 Ferrero Rocher hazelnut pralines.', img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=600', isFeatured: true },
        { name: 'Cadbury Silk Sensation Bouquet', price: 899, desc: 'Artistic arrangement of 5 Cadbury Silk chocolate bars in silk paper.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600', isFeatured: true },
        { name: 'KitKat Break Time Chocolate Tower Bouquet', price: 699, desc: 'Stacked bouquet of 12 full-sized KitKat crispy finger packs with red ribbon.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600' },
        { name: 'Dark Truffle Praline & Red Rose Fusion Bouquet', price: 1099, desc: '10 dark cocoa truffles paired with 10 fresh crimson red rose stems.', img: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=600', isSignature: true },
        { name: 'Bournville Dark Chocolate Luxury Bouquet', price: 799, desc: '4 rich Bournville dark chocolate blocks styled in black & gold foil wrapping.', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600', isTrending: true },
        { name: 'Mega 24 Ferrero Rocher Heart Chocolate Bouquet', price: 1499, desc: 'Massive heart-shaped bouquet studded with 24 golden Ferrero Rocher spheres.', img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=600' },
        { name: 'Snickers & Mars Energy Chocolate Bouquet', price: 649, desc: 'Fun mixed bouquet featuring 6 Snickers peanut bars and 6 Mars caramel bars.', img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600' },
        { name: 'Amul Dark Chocolate Artisanal Bar Bouquet', price: 599, desc: 'Selection of 5 Amul single origin dark chocolates wrapped in natural twine.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600' },
        { name: 'Pink Teddy & Ferrero Chocolate Bouquet', price: 849, desc: 'Soft pink plush teddy sitting amidst 8 Ferrero Rocher chocolates.', img: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600' },
        { name: 'Dairy Milk Shots & Gems Candy Bouquet', price: 499, desc: 'Colorful kid-friendly bouquet loaded with Dairy Milk shots and Gems packets.', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600' },
        { name: 'Toblerone Honey & Almond Swiss Bouquet', price: 949, desc: '4 triangular Toblerone Swiss milk chocolate bars tied with gold satin ribbon.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600' }
      ]
    },
    {
      category: 'Gift Hampers',
      items: [
        { name: 'Royal Indian Mithai & Bakery Fusion Wicker Basket', price: 1999, desc: 'Luxury wicker basket filled with saffron rasgullas, dry fruit laddoos, cookies & tea.', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600', isSignature: true, isFeatured: true },
        { name: 'Grand Gourmet Celebration Hamper Box', price: 1799, desc: 'Artisanal cookies, chocolate truffles, sparkling cider, dry fruits & scented candle.', img: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600', isFeatured: true },
        { name: 'Kashmiri Saffron & Nuts Premium Gift Trunk', price: 2499, desc: 'Handcrafted wooden trunk containing 1g Kashmiri saffron, jumbo almonds & cashews.', img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600', isSignature: true },
        { name: 'Festive Diwali Sweets & Bakery Hamper', price: 1499, desc: 'Kaju katli, assorted choco bites, roasted dry fruits & traditional brass diya.', img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600', isTrending: true },
        { name: 'Organic Honey Tea & Artisan Cookie Basket', price: 1299, desc: 'Raw honey jar, Darjeeling tea tin, almond biscotti & butter cookies.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600' },
        { name: 'Choco Crunch & Sparkling Red Cider Hamper', price: 1199, desc: 'Crispy wafer rolls, dark chocolate slabs, and 750ml sparkling grape drink.', img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=600' },
        { name: 'Self-Care Pamper & Sweet Bakery Basket', price: 1599, desc: 'Aromatic lavender bath bomb, herbal tea, dark chocolates & velvet hand towel.', img: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600' },
        { name: 'Corporate Gourmet Coffee & Muffin Box', price: 999, desc: 'Freshly roasted Arabica coffee beans, ceramic mug & 4 assorted bakery muffins.', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600' },
        { name: 'Healthy Nut & Seed Mix Fitness Gift Box', price: 899, desc: 'Roasted pumpkin seeds, salted pistachios, dried cranberries & dark chocolate.', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600' },
        { name: 'Sweet Tooth Bakery Favorites Treasure Box', price: 1099, desc: 'Bento cake, jar dessert, brownie stack & chocolate coated almonds.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600' },
        { name: 'Luxury Rose Water & Pistachio Mithai Hamper', price: 1699, desc: 'Gulab jamun cake jar, pistachio baklava & organic damask rose water vial.', img: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=600' }
      ]
    },
    {
      category: 'Balloon Decoration',
      items: [
        { name: 'Pastel Nude & Chrome Gold Organic Balloon Arch (8ft)', price: 1499, desc: 'Professional home setup 8ft organic balloon arch in blush, cream & chrome gold.', img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600', isFeatured: true },
        { name: 'Royal Blue & Silver Metallic Balloon Garland', price: 1299, desc: 'Stunning 6ft wall garland in deep royal blue, metallic silver & white balloons.', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600', isFeatured: true },
        { name: 'Rose Gold Birthday Celebration Backdrop Arch', price: 1699, desc: 'Full backdrop arrangement with metallic rose gold balloons, foil banner & LED lights.', img: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600', isTrending: true },
        { name: 'Jungle Safari Balloon Ring Decor Setup', price: 1899, desc: 'Circular metal ring backdrop wrapped in sage green, gold & animal foil balloons.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600', isSignature: true },
        { name: 'Unicorn Pastel Birthday Balloon Arch', price: 1399, desc: 'Dreamy lavender, mint green, pastel pink & yellow balloon arch with giant unicorn foil.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600' },
        { name: 'Helium Metallic Ceiling Balloons (Pack of 30)', price: 999, desc: '30 floating helium balloons with dangling curling ribbons delivered to venue.', img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600' },
        { name: 'Romantic Red Heart Balloon Bed Decor', price: 1199, desc: '50 red heart balloons scatter setup with LED fairy light string for anniversaries.', img: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600' },
        { name: 'Giant 40-Inch Number Foil Balloon Pair', price: 399, desc: 'Gold metallic number foil balloons (0-9) filled with long lasting helium gas.', img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600' },
        { name: 'Black & Gold Luxury Milestone Party Garland', price: 1499, desc: 'Sophisticated matte black & chrome gold balloon arch for 30th/50th milestones.', img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600' },
        { name: 'Clear Bobo Balloon with LED & Custom Text', price: 499, desc: 'Personalized clear bubble balloon with fairy light string & feather filling.', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600' },
        { name: 'Mini Tabletop Balloon Cluster Centerpieces (Set of 4)', price: 799, desc: '4 miniature balloon stands for dining tables or dessert displays.', img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600' }
      ]
    },
    {
      category: 'Birthday Accessories',
      items: [
        { name: 'Natural Honey Beeswax Handmade Birthday Candles (Pack of 6)', price: 149, desc: 'Hand-dipped 100% natural beeswax candles emitting subtle honey aroma.', img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600', isFeatured: true },
        { name: 'Golden Sparkler Cake Fountain (Pack of 4)', price: 199, desc: 'Smokeless gold sparkler fountains bursting into 45 seconds of glittering firework.', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600', isFeatured: true },
        { name: 'Gold Mirror Acrylic "Happy Birthday" Cake Topper', price: 129, desc: 'Reusable laser-cut acrylic topper in reflective mirror gold finish.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600' },
        { name: 'Musical Spinning Flower Birthday Candle', price: 179, desc: 'Blossoming musical candle that opens up, spins, and plays Happy Birthday tune.', img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600', isTrending: true },
        { name: 'Royal Gold Birthday Sash & Pearl Tiara Crown Set', price: 299, desc: 'Glittering "Birthday Queen" sash paired with alloy pearl tiara crown.', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600' },
        { name: 'Party Popper Confetti Cannons (Set of 3)', price: 149, desc: 'Spring loaded confetti poppers spraying colorful foil metallic streamers.', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600' },
        { name: 'Rose Gold Number Metallic Candles (0-9)', price: 89, desc: 'Single number metallic candle with sturdy pick base.', img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600' },
        { name: 'Wooden Stainless Steel Cake Knife & Server Set', price: 349, desc: 'Elegant rosewood handle cake cutter knife and server for cake cutting.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600' },
        { name: 'Glitter Cone Birthday Party Caps (Pack of 10)', price: 199, desc: 'Sparkling glitter party hats with comfortable elastic chin straps.', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600' },
        { name: 'Handcrafted Wooden Birthday Banner Garland', price: 249, desc: 'Rustic laser-cut wooden bunting banner reading "HAPPY BIRTHDAY".', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600' },
        { name: 'LED Light-Up Happy Birthday Headband', price: 149, desc: 'Flashing LED headband available in gold, pink & blue colors.', img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600' }
      ]
    },
    {
      category: 'Recommend For You',
      items: [
        { name: 'Chef Signature Eggless Rasmalai Jar Cake', price: 199, desc: 'Layered glass jar with cardamom sponge, saffron rabri & cottage cheese rasmalai.', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600', isEggless: true, isSignature: true, isFeatured: true },
        { name: 'Belgian Truffle Pastry Slice', price: 149, desc: 'Individual slice of our famous 70% dark Belgian couverture chocolate gateau.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600', isEggless: true, isFeatured: true },
        { name: 'Red Velvet Cream Cheese Jar Dessert', price: 189, desc: 'Crimson cocoa velvet crumbs layered with silky cream cheese frosting.', img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Artisanal Ferrero Rocher Mousse Cup', price: 169, desc: 'Single-serve cup of crunchy Nutella mousse topped with toasted hazelnut.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Gulab Jamun Cardamom Cheesecake Slice', price: 179, desc: 'New York style baked cheesecake infused with cardamom & hot gulab jamun.', img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600', isEggless: true, isSignature: true },
        { name: 'Fresh Alphonso Mango Pastry Slice', price: 139, desc: 'Light vanilla sponge slice overflowing with seasonal Alphonso mango chunks.', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Lotus Biscoff Jar Dessert', price: 199, desc: 'Belgian Speculoos cookie butter spread with crushed Biscoff crumbs in glass jar.', img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600', isEggless: true, isTrending: true },
        { name: 'Tiramisu Espresso Shot Cup', price: 159, desc: 'Espresso soaked ladyfingers with whipped mascarpone cheese & cocoa dust.', img: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Blueberry Cheesecake Tartlet', price: 149, desc: 'Crispy butter tart shell filled with creamy cheese & Canadian blueberry compote.', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600', isEggless: false },
        { name: 'Kesar Pista Badam Mousse Cup', price: 179, desc: 'Traditional saffron & pistachio mousse infused with edible silver leaf.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Dark Choco Lava Hot Cake', price: 129, desc: 'Molten dark chocolate core bursting from warm chocolate muffin.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600', isEggless: true }
      ]
    },
    {
      category: 'Trending',
      items: [
        { name: 'Viral Dark Choco Chunk Bakery Cookie', price: 149, desc: 'Soft baked butter dough filled with 72% dark chocolate chunks and sea salt flakes.', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600', isSignature: true, isFeatured: true },
        { name: 'Lotus Biscoff Stuffed Giant Cookie', price: 179, desc: 'Gooey cookie stuffed with smooth Biscoff cookie butter spread.', img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600', isFeatured: true },
        { name: 'Trending Pinata Hammer Cake with Lights', price: 999, desc: 'Breakable chocolate shell pinata containing surprise cupcakes & fairy lights.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600', isEggless: true, isTrending: true },
        { name: 'Pull Me Up Tsunami Chocolate Cake', price: 899, desc: 'Pull up the plastic sheet to watch warm melted chocolate lava cascade over cake.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600', isEggless: true, isTrending: true },
        { name: 'Korean Milk Cream Loaded Donut (Pack of 2)', price: 199, desc: 'Ultra fluffy brioche donut bursting with light whipped vanilla milk cream.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600' },
        { name: 'Red Velvet Cream Cheese Stuffed Cookie', price: 169, desc: 'Crimson cocoa cookie with warm cream cheese center.', img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600', isEggless: true },
        { name: 'Cronut Croissant-Donut Cinnamon Glaze', price: 139, desc: 'Flaky 64-layer croissant pastry fried & glazed with vanilla bean icing.', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600' },
        { name: 'Pistachio Kunafa Belgian Chocolate Bar', price: 299, desc: 'Crispy shredded phyllo kunafa dough mixed with pistachio cream inside dark chocolate.', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600', isSignature: true, isTrending: true },
        { name: 'Nutella Stuffed Brioche French Toast Slice', price: 189, desc: 'Thick cut brioche toast filled with warm Nutella and dusted with cinnamon sugar.', img: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600' },
        { name: 'Matcha Green Tea White Choco Cookie', price: 159, desc: 'Japanese Uji matcha green tea cookie with white chocolate chunks.', img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600' },
        { name: 'Caramel Macchiato Croissant Roll', price: 149, desc: 'Circular Supreme croissant filled with espresso cream & salted caramel drip.', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600' }
      ]
    },
    {
      category: 'Bamboo + Chocolate Gifts',
      items: [
        { name: 'Lucky 2-Layer Bamboo & Truffle Planter Gift', price: 599, desc: 'Fresh 2-layer lucky indoor bamboo plant in ceramic vase paired with 8 dark chocolate pralines.', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600', isSignature: true, isFeatured: true },
        { name: '3-Layer Braided Lucky Bamboo & Ferrero Rocher Combo', price: 799, desc: 'Prosperity 3-layer braided bamboo plant in glass bowl + 12 Ferrero Rocher chocolates.', img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=600', isFeatured: true },
        { name: 'Jade Money Plant & Belgian Dark Truffle Box', price: 649, desc: 'Healthy succulent Jade plant in terracotta pot + box of 6 Belgian dark truffles.', img: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600' },
        { name: 'Peace Lily Plant & Rasmalai Fusion Cake Jar Combo', price: 899, desc: 'Air-purifying Peace Lily indoor plant paired with eggless Rasmalai dessert jar.', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600', isSignature: true },
        { name: 'Terrarium Glass Globe & Artisanal Choco Bites', price: 749, desc: 'Miniature glass terrarium with succulents & 8 assorted handmade chocolate rosettes.', img: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=600' },
        { name: 'Lucky Spiral Bamboo & Cadbury Silk Celebration', price: 699, desc: 'Single spiral lucky bamboo in ceramic vase + 2 large Cadbury Silk bars.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600' },
        { name: 'Bonsai Ficus Tree & Luxury Chocolate Hamper', price: 1499, desc: 'Grafted Ficus Bonsai tree in glazed stoneware pot + premium chocolate box.', img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600' },
        { name: 'Sansevieria Snake Plant & Bento Cake Gift Set', price: 849, desc: 'Hardy Snake plant in planter pot paired with mini strawberry bento cake.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600' },
        { name: 'Aloe Vera Succulent & Honey Almond Cookies', price: 499, desc: 'Fresh Aloe Vera potted plant paired with box of fresh honey almond cookies.', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600' },
        { name: 'Bamboo Stalk Glass Cylinder & Nutella Fudge Box', price: 599, desc: '5-stalk straight lucky bamboo in tall glass cylinder + 4 Nutella fudge cups.', img: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600' },
        { name: 'Syngonium Syngonia Plant & Red Velvet Jar Cake', price: 649, desc: 'Pink Syngonium foliage indoor plant paired with red velvet cake jar.', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600' }
      ]
    }
  ];

  let idCounter = 1;
  for (const cfg of categoryConfigs) {
    for (const item of cfg.items) {
      items.push({
        id: `prod-${idCounter++}`,
        name: item.name,
        category: cfg.category,
        price: item.price,
        priceNum: item.price,
        description: item.desc,
        imageUrl: item.img,
        image: item.img,
        available: true,
        isEggless: item.isEggless ?? (cfg.category.includes('Cake') ? true : false),
        isSignature: item.isSignature ?? false,
        isFeatured: item.isFeatured ?? false,
        isTrending: item.isTrending ?? false,
        ingredients: ['Pure Desi Butter', 'Farm Fresh Cream', 'Belgian Cocoa', 'Desi Ghee']
      });
    }
  }

  return items;
};

export const PRODUCTS: ProductItem[] = generateProducts();

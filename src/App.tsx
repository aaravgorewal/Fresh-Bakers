import React, { useState, useEffect, lazy, Suspense } from 'react';
import { NavTab, Category, ProductItem, OrderCartItem, BakerySettings, CategoryInfo, HomepageSection } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppModal } from './components/WhatsAppModal';
import { QuickViewModal } from './components/QuickViewModal';
import { HomeView } from './views/HomeView';
import { subscribeToProducts, subscribeToSettings, subscribeToCategories, subscribeToHomepageSections, seedInitialProductsIfEmpty, seedInitialSettingsIfEmpty, seedInitialCategoriesIfEmpty, DEFAULT_SETTINGS } from './lib/firebase';

const ProductsView = lazy(() => import('./views/ProductsView').then((m) => ({ default: m.ProductsView })));
const AboutView = lazy(() => import('./views/AboutView').then((m) => ({ default: m.AboutView })));
const ContactView = lazy(() => import('./views/ContactView').then((m) => ({ default: m.ContactView })));
const AdminView = lazy(() => import('./views/AdminView').then((m) => ({ default: m.AdminView })));

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [cart, setCart] = useState<OrderCartItem[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [bakerySettings, setBakerySettings] = useState<BakerySettings>(DEFAULT_SETTINGS);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [firestoreError, setFirestoreError] = useState<string | null>(null);
  const [homepageSections, setHomepageSections] = useState<HomepageSection[]>([]);

  // Initialize Firebase Firestore listeners & seed defaults if empty
  useEffect(() => {
    seedInitialProductsIfEmpty();
    seedInitialSettingsIfEmpty();
    seedInitialCategoriesIfEmpty();

    const timer = setTimeout(() => {
      setIsLoadingData(false);
    }, 600);

    const unsubscribeProducts = subscribeToProducts(
      (firestoreProducts) => {
        if (firestoreProducts) setProducts(firestoreProducts);
        setIsLoadingData(false);
      },
      () => {
        setFirestoreError('Unable to load products. Please refresh the page.');
        setIsLoadingData(false);
      }
    );

    const unsubscribeCategories = subscribeToCategories(
      (firestoreCategories) => {
        if (firestoreCategories) setCategories(firestoreCategories);
      },
      () => setFirestoreError('Unable to load categories. Please refresh the page.')
    );

    const unsubscribeSettings = subscribeToSettings(
      (firestoreSettings) => {
        if (firestoreSettings) setBakerySettings(firestoreSettings);
      },
      () => {} // Settings silently fall back to DEFAULT_SETTINGS
    );

    const unsubscribeHomepageSections = subscribeToHomepageSections(
      (firestoreSections) => {
        if (firestoreSections) setHomepageSections(firestoreSections);
      }
    );

    return () => {
      clearTimeout(timer);
      unsubscribeProducts();
      unsubscribeCategories();
      unsubscribeSettings();
      unsubscribeHomepageSections();
    };
  }, []);

  // Sync state with URL location & search query params (e.g. /admin, /products?category=Cakes)
  useEffect(() => {
    const syncUrlState = () => {
      const params = new URLSearchParams(window.location.search);
      const categoryParam = params.get('category');
      const pathname = window.location.pathname;

      // Only enter admin view if the route explicitly requests it.
      // If the path is '/' or anything else, we always default to the storefront view.
      if (pathname === '/admin' || pathname.startsWith('/admin/')) {
        setActiveTab('admin');
      } else if (pathname.includes('/products') || categoryParam) {
        setActiveTab('products');
        if (categoryParam) {
          setSelectedCategory(categoryParam as Category);
        }
      } else if (pathname.includes('/about')) {
        setActiveTab('about');
      } else if (pathname.includes('/contact')) {
        setActiveTab('contact');
      } else {
        setActiveTab('home');
      }
    };

    syncUrlState();
    window.addEventListener('popstate', syncUrlState);
    return () => window.removeEventListener('popstate', syncUrlState);
  }, []);

  // Update document.title and description meta tag based on active tab & selected category
  useEffect(() => {
    let title = 'Fresh Bakers Co. | Handcrafted Birthday Cakes & Artisan Bakery';
    let description =
      'Artisan bakery & handcrafted celebration cakes baked fresh daily. Order 100% pure eggless birthday cakes, rasmalai fusion gateaux, bento box cakes, and gift hampers.';

    if (activeTab === 'products') {
      if (selectedCategory && selectedCategory !== 'All') {
        title = `${selectedCategory} | Fresh Bakers Co.`;
        description = `Browse handcrafted ${selectedCategory.toLowerCase()} baked fresh daily at Fresh Bakers Co. 100% pure eggless options with direct WhatsApp ordering.`;
      } else {
        title = 'Artisan Bakery Menu & Celebration Cakes | Fresh Bakers Co.';
        description = 'Explore our full menu of handcrafted birthday cakes, rasmalai gateaux, custom bento box cakes, desserts, and luxury gift hampers.';
      }
    } else if (activeTab === 'about') {
      title = 'About Our Bakery Kitchen & Artisanal Craft | Fresh Bakers Co.';
      description = 'Learn about our passion for 100% stone-ground heirloom flour, 36-hour wild fermentation, and Normandy butter in crafting Bengaluru’s finest cakes.';
    } else if (activeTab === 'contact') {
      title = 'Contact Us & WhatsApp Pre-Orders | Fresh Bakers Co.';
      description = 'Get in touch with Fresh Bakers Co. Visit our bakery storefront or send an instant WhatsApp pre-order for custom event cakes.';
    } else if (activeTab === 'admin') {
      title = 'Admin Portal | Fresh Bakers Co.';
      description = 'Fresh Bakers Co. Admin Store Management Portal.';
    }

    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }, [activeTab, selectedCategory]);

  const handleNavigate = (tab: NavTab) => {
    setActiveTab(tab);
    let path = '/';
    if (tab === 'products') path = '/products';
    else if (tab === 'about') path = '/about';
    else if (tab === 'contact') path = '/contact';
    else if (tab === 'admin') path = '/admin';

    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (cat: Category) => {
    setSelectedCategory(cat);
    setActiveTab('products');
    window.history.pushState(null, '', `/products?category=${encodeURIComponent(cat)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSetSelectedCategory = (cat: Category | 'All') => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      window.history.pushState(null, '', '/products');
    } else {
      window.history.pushState(null, '', `/products?category=${encodeURIComponent(cat)}`);
    }
  };

  // Cart operations
  const handleAddToCart = (product: ProductItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as OrderCartItem[];
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fbf9f5] flex flex-col font-sans selection:bg-[#c68e5a] selection:text-[#4d2900]">
      {/* Firestore connectivity error banner */}
      {firestoreError && (
        <div
          role="alert"
          style={{
            background: '#7f1d1d',
            color: '#fef2f2',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.875rem',
            gap: '12px',
          }}
        >
          <span>⚠️ {firestoreError}</span>
          <button
            onClick={() => setFirestoreError(null)}
            aria-label="Dismiss error"
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '1.1rem', lineHeight: 1 }}
          >
            ×
          </button>
        </div>
      )}
      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
        cartCount={totalCartCount}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {isLoadingData ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
            <div className="w-12 h-12 border-4 border-[#d5c3b6] border-t-[#825425] rounded-full animate-spin mb-4"></div>
            <p className="font-headline-sm text-lg font-bold text-[#1b1c1a] mb-1">
              FreshBakers Artisan Bakery
            </p>
            <p className="font-body-md text-xs text-[#51443a] tracking-wide uppercase">
              Fetching daily menu & settings from Firestore...
            </p>
          </div>
        ) : (
          <>
            {activeTab === 'home' && (
              <HomeView
                products={products}
                categories={categories}
                homepageSections={homepageSections}
                setActiveTab={handleNavigate}
                onSelectCategory={handleSelectCategory}
                onOpenQuickView={(product) => setQuickViewProduct(product)}
                onAddToCart={handleAddToCart}
                onOpenOrderModal={() => setIsOrderModalOpen(true)}
                whatsappNumber={bakerySettings.whatsappNumber}
              />
            )}

            <Suspense fallback={
              <div className="min-h-[50vh] flex flex-col items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-[#825425] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-xs font-bold uppercase tracking-wider text-[#825425]">Loading Page...</p>
              </div>
            }>
              {activeTab === 'products' && (
                <ProductsView
                  products={products}
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={handleSetSelectedCategory}
                  onOpenQuickView={(product) => setQuickViewProduct(product)}
                  onAddToCart={handleAddToCart}
                  onOpenOrderModal={() => setIsOrderModalOpen(true)}
                  whatsappNumber={bakerySettings.whatsappNumber}
                />
              )}

              {activeTab === 'about' && (
                <AboutView
                  setActiveTab={handleNavigate}
                  onOpenOrderModal={() => setIsOrderModalOpen(true)}
                  settings={bakerySettings}
                />
              )}

              {activeTab === 'contact' && (
                <ContactView
                  onOpenOrderModal={() => setIsOrderModalOpen(true)}
                  settings={bakerySettings}
                />
              )}

              {activeTab === 'admin' && (
                <AdminView
                  products={products}
                  categories={categories}
                  settings={bakerySettings}
                />
              )}
            </Suspense>
          </>
        )}
      </main>

      {/* Shared Editorial Footer */}
      <Footer
        setActiveTab={handleNavigate}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
      />

      {/* WhatsApp Pre-Order Drawer/Modal */}
      <WhatsAppModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        allProducts={products}
        onAddToCart={handleAddToCart}
        whatsappNumber={bakerySettings.whatsappNumber}
      />

      {/* Product Quick View Detail Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
        allProducts={products}
        onSelectProduct={(p) => setQuickViewProduct(p)}
        whatsappNumber={bakerySettings.whatsappNumber}
      />
    </div>
  );
}

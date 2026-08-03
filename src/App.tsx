import React, { useState, useEffect } from 'react';
import { NavTab, Category, ProductItem, OrderCartItem, BakerySettings } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppModal } from './components/WhatsAppModal';
import { QuickViewModal } from './components/QuickViewModal';
import { AdminModal } from './components/AdminModal';
import { HomeView } from './views/HomeView';
import { ProductsView } from './views/ProductsView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';
import { subscribeToProducts, subscribeToSettings, seedInitialProductsIfEmpty, seedInitialSettingsIfEmpty, DEFAULT_SETTINGS } from './lib/firebase';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [cart, setCart] = useState<OrderCartItem[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductItem[]>(PRODUCTS);
  const [bakerySettings, setBakerySettings] = useState<BakerySettings>(DEFAULT_SETTINGS);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  // Initialize Firebase Firestore listeners & seed defaults if empty
  useEffect(() => {
    seedInitialProductsIfEmpty();
    seedInitialSettingsIfEmpty();

    const timer = setTimeout(() => {
      setIsLoadingData(false);
    }, 600);

    const unsubscribeProducts = subscribeToProducts((firestoreProducts) => {
      if (firestoreProducts) {
        setProducts(firestoreProducts);
      }
      setIsLoadingData(false);
    });

    const unsubscribeSettings = subscribeToSettings((firestoreSettings) => {
      if (firestoreSettings) {
        setBakerySettings(firestoreSettings);
      }
    });

    return () => {
      clearTimeout(timer);
      unsubscribeProducts();
      unsubscribeSettings();
    };
  }, []);

  // Sync state with URL location & search query params (e.g. /admin, /products?category=Cakes)
  useEffect(() => {
    const syncUrlState = () => {
      const params = new URLSearchParams(window.location.search);
      const categoryParam = params.get('category');
      const pathname = window.location.pathname;

      if (pathname.includes('/admin')) {
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
      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
        onOpenAdminModal={() => handleNavigate('admin')}
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
                setActiveTab={handleNavigate}
                onSelectCategory={handleSelectCategory}
                onOpenQuickView={(product) => setQuickViewProduct(product)}
                onAddToCart={handleAddToCart}
                onOpenOrderModal={() => setIsOrderModalOpen(true)}
              />
            )}

            {activeTab === 'products' && (
              <ProductsView
                products={products}
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
                settings={bakerySettings}
              />
            )}
          </>
        )}
      </main>

      {/* Shared Editorial Footer */}
      <Footer
        setActiveTab={handleNavigate}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
        onOpenAdminModal={() => handleNavigate('admin')}
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

      {/* Admin Login & Firestore CRUD Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        products={products}
        settings={bakerySettings}
      />
    </div>
  );
}

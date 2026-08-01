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

  // Initialize Firebase Firestore listeners & seed defaults if empty
  useEffect(() => {
    seedInitialProductsIfEmpty();
    seedInitialSettingsIfEmpty();

    const unsubscribeProducts = subscribeToProducts((firestoreProducts) => {
      if (firestoreProducts && firestoreProducts.length > 0) {
        setProducts(firestoreProducts);
      }
    });

    const unsubscribeSettings = subscribeToSettings((firestoreSettings) => {
      if (firestoreSettings) {
        setBakerySettings(firestoreSettings);
      }
    });

    return () => {
      unsubscribeProducts();
      unsubscribeSettings();
    };
  }, []);

  // Sync state with URL location & search query params (e.g. /products?category=Cakes)
  useEffect(() => {
    const syncUrlState = () => {
      const params = new URLSearchParams(window.location.search);
      const categoryParam = params.get('category');
      const pathname = window.location.pathname;

      if (pathname.includes('/products') || categoryParam) {
        setActiveTab('products');
        if (categoryParam) {
          setSelectedCategory(categoryParam as Category);
        }
      } else if (pathname.includes('/about')) {
        setActiveTab('about');
      } else if (pathname.includes('/contact')) {
        setActiveTab('contact');
      }
    };

    syncUrlState();
    window.addEventListener('popstate', syncUrlState);
    return () => window.removeEventListener('popstate', syncUrlState);
  }, []);

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
        setActiveTab={setActiveTab}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        cartCount={totalCartCount}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            products={products}
            setActiveTab={setActiveTab}
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
          />
        )}

        {activeTab === 'about' && (
          <AboutView
            setActiveTab={setActiveTab}
            onOpenOrderModal={() => setIsOrderModalOpen(true)}
          />
        )}

        {activeTab === 'contact' && (
          <ContactView
            onOpenOrderModal={() => setIsOrderModalOpen(true)}
          />
        )}
      </main>

      {/* Shared Editorial Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
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

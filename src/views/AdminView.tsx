import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ProductItem, Category, BakerySettings, Testimonial, GalleryItem, CategoryInfo } from '../types';
import {
  auth,
  addProductToFirestore,
  updateProductInFirestore,
  deleteProductFromFirestore,
  uploadProductImage,
  subscribeToSettings,
  updateBakerySettings,
  seedInitialProductsIfEmpty,
  seedInitialSettingsIfEmpty,
  addCategoryToFirestore,
  updateCategoryInFirestore,
  deleteCategoryFromFirestore,
  DEFAULT_SETTINGS
} from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Image as ImageIcon,
  MessageSquareQuote,
  Sparkles,
  PhoneCall,
  Settings as SettingsIcon,
  Lock,
  Upload,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Search,
  Star,
  Eye,
  EyeOff,
  RefreshCw,
  DollarSign,
  TrendingUp,
  Tag,
  ShieldCheck
} from 'lucide-react';

interface AdminViewProps {
  products: ProductItem[];
  categories: CategoryInfo[];
  settings?: BakerySettings;
}

type AdminTab =
  | 'dashboard'
  | 'products'
  | 'categories'
  | 'gallery'
  | 'testimonials'
  | 'hero'
  | 'contact'
  | 'settings'
  | 'curated';

const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Custom Rose Birthday Cake',
    category: 'Birthday Cakes',
    imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'g2',
    title: 'Golden Jubilee Anniversary Cake',
    category: 'Anniversary Cakes',
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'g3',
    title: 'Handcrafted Chocolate Truffle',
    category: 'Chocolate Cakes',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'g4',
    title: 'Artisan Rasmalai Celebration Cake',
    category: 'Gift Hampers',
    imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600'
  }
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'Ananya Sharma',
    role: 'Birthday Event Host',
    review: 'The photo cake was stunning and tasted absolutely divine! Fresh, moist, and arrived right on time via WhatsApp order.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    visible: true
  },
  {
    id: 't2',
    author: 'Rohan Mehta',
    role: 'Anniversary Celebration',
    review: 'Best 100% eggless cakes in town! The designer velvet cake made our anniversary extra special. Highly recommended.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    visible: true
  },
  {
    id: 't3',
    author: 'Priya Nair',
    role: 'Corporate Gifting',
    review: 'Ordered 15 luxury chocolate gift hampers for our client team. Impeccable packaging and supreme quality chocolates!',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    visible: true
  }
];

const CHART_COLORS = ['#825425', '#a06a30', '#c28646', '#e2a969', '#6a421c', '#b37d46', '#d99b58'];

export const AdminView: React.FC<AdminViewProps> = ({ products, categories, settings: initialSettings }) => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('admin@freshbakers.com');
  const [password, setPassword] = useState('baker123');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // Success message feedback banner
  const [successMsg, setSuccessMsg] = useState('');

  // Settings state
  const [bakerySettings, setBakerySettings] = useState<BakerySettings>(initialSettings || DEFAULT_SETTINGS);
  const [savingSettings, setSavingSettings] = useState(false);

  // Products filter & form state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedAvailabilityFilter, setSelectedAvailabilityFilter] = useState<string>('all');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  const [bulkDeleteLoading, setBulkDeleteLoading] = useState(false);

  const selectAllCheckboxRef = useRef<HTMLInputElement | null>(null);

  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryType, setNewCategoryType] = useState<CategoryInfo['type']>('cake');
  const [newCategoryIcon, setNewCategoryIcon] = useState('Cake');
  const [newCategoryImage, setNewCategoryImage] = useState('');
  const [newCategoryBannerImage, setNewCategoryBannerImage] = useState('');
  const [newCategoryTagline, setNewCategoryTagline] = useState('');
  const [categoryBannerFile, setCategoryBannerFile] = useState<File | null>(null);
  const [uploadingCategoryBanner, setUploadingCategoryBanner] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Birthday Cakes');
  const [priceNum, setPriceNum] = useState<number>(499);
  const [description, setDescription] = useState('');
  const [available, setAvailable] = useState<boolean>(true);
  const [isSignature, setIsSignature] = useState<boolean>(false);
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [isTrending, setIsTrending] = useState<boolean>(false);
  const [isRecommended, setIsRecommended] = useState<boolean>(false);
  const [isEggless, setIsEggless] = useState<boolean>(true);
  const [ingredientsText, setIngredientsText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [savingProduct, setSavingProduct] = useState(false);

  // Gallery state
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(DEFAULT_GALLERY_ITEMS);
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState('Birthday Cakes');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryFile, setNewGalleryFile] = useState<File | null>(null);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  // Testimonials state
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState<number>(5);
  const [newAvatarUrl, setNewAvatarUrl] = useState('');

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        seedInitialProductsIfEmpty();
        seedInitialSettingsIfEmpty();
      }
    });

    const unsubscribeSettings = subscribeToSettings((s) => {
      setBakerySettings(s);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeSettings();
    };
  }, []);

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Auth Handling
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      triggerSuccess('Successfully logged in as Admin!');
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          triggerSuccess('Admin account created and logged in!');
        } catch (createErr: any) {
          setAuthError(createErr.message || 'Authentication failed. Please check credentials.');
        }
      } else {
        setAuthError(err.message || 'Login failed.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = () => {
    signOut(auth);
    resetProductForm();
  };

  // Product Form Reset & Edit Init
  const resetProductForm = () => {
    setEditingId(null);
    setName('');
    setCategory('Birthday Cakes');
    setPriceNum(499);
    setDescription('');
    setAvailable(true);
    setIsSignature(false);
    setIsFeatured(false);
    setIsTrending(false);
    setIsRecommended(false);
    setIsEggless(true);
    setIngredientsText('');
    setImageUrl('');
    setImageFile(null);
  };

  const handleEditProductInit = (product: ProductItem) => {
    setEditingId(product.id);
    setName(product.name);
    setCategory(product.category);
    setPriceNum(typeof product.price === 'number' ? product.price : (product.priceNum || 0));
    setDescription(product.description || '');
    setAvailable(product.available !== false);
    setIsSignature(!!product.isSignature);
    setIsFeatured(!!product.isFeatured);
    setIsTrending(!!product.isTrending);
    setIsRecommended(!!product.isRecommended);
    setIsEggless(product.isEggless !== false);
    setIngredientsText(product.ingredients ? product.ingredients.join(', ') : '');
    setImageUrl(product.imageUrl || product.image || '');
    setImageFile(null);
    setActiveTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProduct(true);

    try {
      let finalImageUrl = imageUrl;

      if (imageFile) {
        setUploadingImage(true);
        finalImageUrl = await uploadProductImage(imageFile);
        setUploadingImage(false);
      }

      if (!finalImageUrl) {
        finalImageUrl = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600';
      }

      const ingredientsList = ingredientsText
        ? ingredientsText.split(',').map((s) => s.trim()).filter(Boolean)
        : [];

      const productPayload: Omit<ProductItem, 'id'> = {
        name,
        category,
        price: Number(priceNum),
        description,
        imageUrl: finalImageUrl,
        available,
        image: finalImageUrl,
        priceNum: Number(priceNum),
        imageAlt: name,
        isSignature,
        isFeatured,
        isTrending,
        isRecommended,
        isEggless,
        ingredients: ingredientsList,
      };

      if (editingId) {
        await updateProductInFirestore(editingId, productPayload);
        triggerSuccess(`Updated "${name}" successfully!`);
      } else {
        await addProductToFirestore(productPayload);
        triggerSuccess(`Added "${name}" to catalog!`);
      }

      resetProductForm();
    } catch (err: any) {
      alert(`Error saving product: ${err.message}`);
    } finally {
      setSavingProduct(false);
      setUploadingImage(false);
    }
  };

  const handleToggleProductStatus = async (product: ProductItem, field: 'available' | 'isFeatured' | 'isTrending' | 'isRecommended') => {
    const currentValue = product[field];
    const newValue = !currentValue;
    try {
      await updateProductInFirestore(product.id, { [field]: newValue });
      triggerSuccess(`Updated ${field} for "${product.name}"`);
    } catch (err: any) {
      alert(`Failed to update status: ${err.message}`);
    }
  };

  const handleDeleteProduct = async (product: ProductItem) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        await deleteProductFromFirestore(product.id);
        triggerSuccess(`Product "${product.name}" deleted.`);
      } catch (err: any) {
        alert(`Error deleting product: ${err.message}`);
      }
    }
  };

  const handleToggleSelectProduct = (productId: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleToggleSelectAll = () => {
    if (isAllVisibleSelected) {
      setSelectedProductIds((prev) => prev.filter((id) => !filteredProducts.some((product) => product.id === id)));
    } else {
      setSelectedProductIds((prev) => [
        ...new Set([
          ...prev,
          ...filteredProducts.map((product) => product.id),
        ]),
      ]);
    }
  };

  const handleDeleteSelectedProducts = async () => {
    if (selectedProductIds.length === 0) return;
    setShowBulkDeleteConfirm(true);
  };

  const confirmBulkDelete = async () => {
    setBulkDeleteLoading(true);
    const deletedCount = { success: 0, failure: 0 };

    await Promise.allSettled(
      selectedProductIds.map(async (productId) => {
        try {
          await deleteProductFromFirestore(productId);
          deletedCount.success += 1;
          return { productId, status: 'fulfilled' } as const;
        } catch (error) {
          deletedCount.failure += 1;
          return { productId, status: 'rejected', reason: error } as const;
        }
      })
    );

    setBulkDeleteLoading(false);
    setShowBulkDeleteConfirm(false);
    setSelectedProductIds([]);

    if (deletedCount.failure > 0) {
      triggerSuccess(`Deleted: ${deletedCount.success}, Failed: ${deletedCount.failure}`);
    } else {
      triggerSuccess(`Deleted: ${deletedCount.success}`);
    }
  };

  const handleCancelSelection = () => {
    setSelectedProductIds([]);
  };

  const resetCategoryForm = () => {
    setEditingCategoryId(null);
    setEditingCategoryName(null);
    setNewCategoryName('');
    setNewCategoryType('cake');
    setNewCategoryIcon('Cake');
    setNewCategoryImage('');
    setNewCategoryBannerImage('');
    setNewCategoryTagline('');
    setCategoryBannerFile(null);
  };

  const handleEditCategoryInit = (categoryInfo: CategoryInfo) => {
    setEditingCategoryId(categoryInfo.id ?? null);
    setEditingCategoryName(categoryInfo.name);
    setNewCategoryName(categoryInfo.name);
    setNewCategoryType(categoryInfo.type);
    setNewCategoryIcon(categoryInfo.icon);
    setNewCategoryImage(categoryInfo.image);
    setNewCategoryBannerImage(categoryInfo.bannerImage);
    setNewCategoryTagline(categoryInfo.tagline);
    setCategoryBannerFile(null);
    setActiveTab('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedName = newCategoryName.trim();
    if (!normalizedName) {
      alert('Category name is required.');
      return;
    }

    let finalBannerUrl = newCategoryBannerImage || '';

    if (newCategoryBannerFile) {
      try {
        const uploaded = await uploadProductImage(newCategoryBannerFile);
        finalBannerUrl = uploaded;
      } catch (err: any) {
        alert(`Failed to upload banner image: ${err.message || err}`);
        return;
      }
    }

    const categoryPayload: Omit<CategoryInfo, 'id'> = {
      name: normalizedName as Category,
      type: newCategoryType,
      icon: newCategoryIcon || 'Cake',
      image: newCategoryImage || '',
      bannerImage: finalBannerUrl,
      tagline: newCategoryTagline || '',
    };

    try {
      if (editingCategoryId) {
        await updateCategoryInFirestore(editingCategoryId, categoryPayload);
        triggerSuccess('Category updated!');
      } else {
        await addCategoryToFirestore(categoryPayload);
        triggerSuccess('Category added!');
      }
    } catch (err: any) {
      alert(`Error saving category: ${err.message}`);
    } finally {
      resetCategoryForm();
    }
  };

  const handleDeleteCategory = async (categoryId: string | undefined, categoryName: string) => {
    const categoryProductCount = products.filter((product) => product.category === categoryName).length;
    if (categoryProductCount > 0) {
      alert('This category contains products. Move or delete them first.');
      return;
    }

    if (!window.confirm(`Delete category "${categoryName}"? This will not delete products.`)) {
      return;
    }

    if (!categoryId) {
      triggerSuccess('Category removed from local list.');
      return;
    }

    try {
      await deleteCategoryFromFirestore(categoryId);
      triggerSuccess('Category deleted.');
    } catch (err: any) {
      alert(`Error deleting category: ${err.message}`);
    }
  };

  // Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const cleanWhatsapp = bakerySettings.whatsappNumber?.replace(/[\+\s]/g, '') ?? '';
      const payload = {
        ...bakerySettings,
        whatsappNumber: cleanWhatsapp,
      };
      await updateBakerySettings(payload);
      triggerSuccess('Bakery settings updated successfully!');
    } catch (err: any) {
      alert(`Error saving settings: ${err.message}`);
    } finally {
      setSavingSettings(false);
    }
  };

  // Gallery Handler
  const handleAddGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryTitle.trim()) return;

    let finalUrl = newGalleryUrl;
    if (newGalleryFile) {
      setUploadingGallery(true);
      try {
        finalUrl = await uploadProductImage(newGalleryFile);
      } catch (err) {
        console.error(err);
      } finally {
        setUploadingGallery(false);
      }
    }

    if (!finalUrl) {
      finalUrl = 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600';
    }

    const newItem: GalleryItem = {
      id: `g_${Date.now()}`,
      title: newGalleryTitle,
      category: newGalleryCategory,
      imageUrl: finalUrl
    };

    setGalleryItems([newItem, ...galleryItems]);
    setNewGalleryTitle('');
    setNewGalleryUrl('');
    setNewGalleryFile(null);
    triggerSuccess('Added new image to bakery gallery!');
  };

  const handleDeleteGalleryItem = (id: string) => {
    setGalleryItems(galleryItems.filter((g) => g.id !== id));
    triggerSuccess('Gallery item removed.');
  };

  // Testimonial Handler
  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newReview.trim()) return;

    const newT: Testimonial = {
      id: `t_${Date.now()}`,
      author: newAuthor,
      role: newRole || 'Happy Customer',
      review: newReview,
      rating: newRating,
      avatarUrl: newAvatarUrl || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150`,
      visible: true
    };

    setTestimonials([newT, ...testimonials]);
    setNewAuthor('');
    setNewRole('');
    setNewReview('');
    setNewAvatarUrl('');
    triggerSuccess('Customer testimonial published!');
  };

  const handleToggleTestimonial = (id: string) => {
    setTestimonials(testimonials.map((t) => t.id === id ? { ...t, visible: !t.visible } : t));
    triggerSuccess('Updated testimonial visibility.');
  };

  const handleDeleteTestimonial = (id: string) => {
    setTestimonials(testimonials.filter((t) => t.id !== id));
    triggerSuccess('Testimonial removed.');
  };

  // Filtered Products List
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;

    let matchesAvailability = true;
    if (selectedAvailabilityFilter === 'available') matchesAvailability = p.available !== false;
    if (selectedAvailabilityFilter === 'soldout') matchesAvailability = p.available === false;
    if (selectedAvailabilityFilter === 'featured') matchesAvailability = !!p.isFeatured;
    if (selectedAvailabilityFilter === 'trending') matchesAvailability = !!p.isTrending;
    if (selectedAvailabilityFilter === 'recommended') matchesAvailability = !!p.isRecommended;

    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const isAllVisibleSelected = useMemo(() => {
    if (filteredProducts.length === 0) return false;
    return filteredProducts.every((product) => selectedProductIds.includes(product.id));
  }, [filteredProducts, selectedProductIds]);

  const isSomeVisibleSelected = useMemo(() => {
    return filteredProducts.some((product) => selectedProductIds.includes(product.id));
  }, [filteredProducts, selectedProductIds]);

  useEffect(() => {
    if (selectAllCheckboxRef.current) {
      selectAllCheckboxRef.current.indeterminate = isSomeVisibleSelected && !isAllVisibleSelected;
    }
  }, [isSomeVisibleSelected, isAllVisibleSelected]);

  useEffect(() => {
    if (selectedProductIds.length === 0) return;
    const visibleIds = new Set(filteredProducts.map((product) => product.id));
    setSelectedProductIds((prev) => prev.filter((id) => visibleIds.has(id)));
  }, [filteredProducts]);

  // Analytics Computation
  const totalProducts = products.length;
  const availableProducts = products.filter((p) => p.available !== false).length;
  const soldOutProducts = totalProducts - availableProducts;
  const featuredCount = products.filter((p) => p.isFeatured).length;
  const trendingCount = products.filter((p) => p.isTrending).length;
  const recommendedCount = products.filter((p) => p.isRecommended).length;
  const activeCategories = categories.filter((cat) => products.some((p) => p.category === cat.name)).length;
  const totalCategories = categories.length;
  const currency = bakerySettings.currencySymbol || '₹';

  const normalizedPrices = products.map((p) => {
    const rawPrice = typeof p.price === 'number' ? p.price : (p.priceNum || 0);
    return Number.isFinite(rawPrice) ? rawPrice : 0;
  });
  const totalPrice = normalizedPrices.reduce((acc, price) => acc + price, 0);
  const avgPrice = totalProducts > 0 ? (totalPrice / totalProducts).toFixed(0) : '0';

  // Category Distribution for Recharts
  const categoryCounts = categories
    .map((cat) => ({
      name: cat.name,
      count: products.filter((p) => p.category === cat.name).length,
    }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);

  // Price Ranges for Recharts
  const priceRanges = [
    { name: `Under ${currency}300`, count: normalizedPrices.filter((price) => price < 300).length },
    { name: `${currency}300 - ${currency}600`, count: normalizedPrices.filter((price) => price >= 300 && price <= 600).length },
    { name: `${currency}600 - ${currency}1000`, count: normalizedPrices.filter((price) => price > 600 && price <= 1000).length },
    { name: `Above ${currency}1000`, count: normalizedPrices.filter((price) => price > 1000).length },
  ].filter((r) => r.count > 0);

  // Unauthenticated Login Screen
  if (!user) {
    return (
      <div className="w-full px-5 md:px-16 py-12 max-w-[1200px] mx-auto min-h-[70vh] flex flex-col justify-center">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="font-label-caps text-[#825425] tracking-widest uppercase block mb-1 font-semibold text-xs flex items-center justify-center gap-1">
            <Lock className="w-3.5 h-3.5" /> Protected Store Administration
          </span>
          <h1 className="font-display-lg text-3xl md:text-5xl text-[#1b1c1a] font-bold mb-3">
            Bakery Management Portal
          </h1>
          <p className="font-body-md text-[#51443a] text-sm md:text-base leading-relaxed">
            Access store settings, menu products, real-time availability, gallery photos, and customer reviews.
          </p>
        </div>

        <div className="max-w-md mx-auto w-full bg-white p-8 border border-[#d5c3b6] shadow-md rounded-xl">
          <div className="w-14 h-14 rounded-full bg-[#825425] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Lock className="w-7 h-7" />
          </div>

          <h3 className="font-headline-sm text-2xl font-bold text-[#1b1c1a] text-center mb-1">
            Admin Authentication
          </h3>
          <p className="font-body-md text-xs text-[#51443a] text-center mb-6">
            Sign in with admin credentials to manage live bakery database.
          </p>

          {authError && (
            <div className="mb-4 bg-red-50 text-red-700 p-3 border border-red-200 text-xs rounded flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1b1c1a] uppercase tracking-wider mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-[#d5c3b6] rounded text-sm focus:outline-none focus:border-[#825425]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1b1c1a] uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-[#d5c3b6] rounded text-sm focus:outline-none focus:border-[#825425]"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-[#825425] hover:bg-[#6a421c] text-white py-3 font-semibold text-sm rounded uppercase tracking-wider transition-colors shadow flex items-center justify-center gap-2"
            >
              {authLoading ? 'Authenticating...' : 'Sign In to Portal'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-[#825425] bg-[#fbf6f0] p-2.5 rounded border border-[#e8d2bd]">
              💡 Default credentials are pre-filled. Click Sign In to open portal immediately.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard Layout
  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-8 max-w-[1400px] mx-auto">
      {/* Top Header & User Profile Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 border border-[#e8d8cb] rounded-xl shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#825425] mb-1">
            <ShieldCheck className="w-4 h-4 text-[#825425]" /> Verified Store Administrator
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1b1c1a]">
            {bakerySettings.bakeryName || 'Fresh Bakers'} Control Center
          </h1>
          <p className="text-xs md:text-sm text-[#635345] mt-0.5">
            Manage live items, categories, testimonials, gallery, hero highlights, and WhatsApp store setup.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-[#1b1c1a]">{user.email}</p>
            <p className="text-[11px] text-[#825425] font-medium">Full Access Active</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-3.5 py-2 border border-red-200 text-red-700 bg-red-50/50 hover:bg-red-100 rounded-lg text-xs font-bold transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* Success Banner */}
      {successMsg && (
        <div className="mb-6 bg-[#825425] text-white p-4 rounded-xl shadow-sm flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2.5 font-semibold text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button
            onClick={() => setSuccessMsg('')}
            className="text-xs uppercase font-bold tracking-wider hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 border-b border-[#e8d8cb]">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'dashboard'
              ? 'bg-[#825425] text-white shadow-sm'
              : 'bg-white text-[#51443a] hover:bg-[#f8f1ea] border border-[#e8d8cb]'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" /> Overview & Charts
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'products'
              ? 'bg-[#825425] text-white shadow-sm'
              : 'bg-white text-[#51443a] hover:bg-[#f8f1ea] border border-[#e8d8cb]'
          }`}
        >
          <Package className="w-4 h-4" /> Products ({totalProducts})
        </button>

        <button
          onClick={() => setActiveTab('curated')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'curated'
              ? 'bg-[#825425] text-white shadow-sm'
              : 'bg-white text-[#51443a] hover:bg-[#f8f1ea] border border-[#e8d8cb]'
          }`}
        >
          <Tag className="w-4 h-4" /> Featured & Trending
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'categories'
              ? 'bg-[#825425] text-white shadow-sm'
              : 'bg-white text-[#51443a] hover:bg-[#f8f1ea] border border-[#e8d8cb]'
          }`}
        >
          <FolderTree className="w-4 h-4" /> Categories ({totalCategories})
        </button>

        <button
          onClick={() => setActiveTab('gallery')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'gallery'
              ? 'bg-[#825425] text-white shadow-sm'
              : 'bg-white text-[#51443a] hover:bg-[#f8f1ea] border border-[#e8d8cb]'
          }`}
        >
          <ImageIcon className="w-4 h-4" /> Gallery ({galleryItems.length})
        </button>

        <button
          onClick={() => setActiveTab('testimonials')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'testimonials'
              ? 'bg-[#825425] text-white shadow-sm'
              : 'bg-white text-[#51443a] hover:bg-[#f8f1ea] border border-[#e8d8cb]'
          }`}
        >
          <MessageSquareQuote className="w-4 h-4" /> Testimonials ({testimonials.length})
        </button>

        <button
          onClick={() => setActiveTab('hero')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'hero'
              ? 'bg-[#825425] text-white shadow-sm'
              : 'bg-white text-[#51443a] hover:bg-[#f8f1ea] border border-[#e8d8cb]'
          }`}
        >
          <Sparkles className="w-4 h-4" /> Hero Highlights
        </button>

        <button
          onClick={() => setActiveTab('contact')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'contact'
              ? 'bg-[#825425] text-white shadow-sm'
              : 'bg-white text-[#51443a] hover:bg-[#f8f1ea] border border-[#e8d8cb]'
          }`}
        >
          <PhoneCall className="w-4 h-4" /> Contact & WhatsApp
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'settings'
              ? 'bg-[#825425] text-white shadow-sm'
              : 'bg-white text-[#51443a] hover:bg-[#f8f1ea] border border-[#e8d8cb]'
          }`}
        >
          <SettingsIcon className="w-4 h-4" /> Store Settings
        </button>
      </div>

      {/* TAB 1: DASHBOARD OVERVIEW & CHARTS */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Key KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 border border-[#e8d8cb] rounded-xl shadow-sm">
              <div className="flex items-center justify-between text-[#825425] mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#635345]">Total Products</span>
                <Package className="w-5 h-5" />
              </div>
              <p className="text-3xl font-extrabold text-[#1b1c1a]">{totalProducts}</p>
              <p className="text-[11px] text-[#825425] mt-1 font-medium">{availableProducts} Available for order</p>
            </div>

            <div className="bg-white p-5 border border-[#e8d8cb] rounded-xl shadow-sm">
              <div className="flex items-center justify-between text-[#825425] mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#635345]">Active Categories</span>
                <FolderTree className="w-5 h-5" />
              </div>
              <p className="text-3xl font-extrabold text-[#1b1c1a]">{activeCategories}</p>
              <p className="text-[11px] text-[#825425] mt-1 font-medium">Categories currently used by products</p>
            </div>

            <div className="bg-white p-5 border border-[#e8d8cb] rounded-xl shadow-sm">
              <div className="flex items-center justify-between text-[#825425] mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#635345]">Avg Product Price</span>
                <DollarSign className="w-5 h-5" />
              </div>
              <p className="text-3xl font-extrabold text-[#1b1c1a]">{currency}{avgPrice}</p>
              <p className="text-[11px] text-[#825425] mt-1 font-medium">Catalog Price Point</p>
            </div>

            <div className="bg-white p-5 border border-[#e8d8cb] rounded-xl shadow-sm">
              <div className="flex items-center justify-between text-[#825425] mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#635345]">WhatsApp Orders</span>
                <PhoneCall className="w-5 h-5" />
              </div>
              <p className="text-3xl font-extrabold text-[#1b1c1a]">Active</p>
              <p className="text-[11px] text-green-700 font-bold mt-1">+{bakerySettings.whatsappNumber || '15550192824'}</p>
            </div>
          </div>

          {/* Interactive Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Category Breakdown Bar Chart */}
            <div className="bg-white p-6 border border-[#e8d8cb] rounded-xl shadow-sm">
              <h3 className="text-base font-bold text-[#1b1c1a] mb-1 flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-[#825425]" /> Products per Category
              </h3>
              <p className="text-xs text-[#635345] mb-6">Distribution of catalog items across bakery categories</p>

              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryCounts} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 10, fill: '#51443a' }}
                      angle={-35}
                      textAnchor="end"
                      interval={0}
                    />
                    <YAxis tick={{ fontSize: 11, fill: '#51443a' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#fff', borderColor: '#d5c3b6', borderRadius: '8px', fontSize: '12px' }}
                    />
                    <Bar dataKey="count" fill="#825425" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Price Range Distribution Pie Chart */}
            <div className="bg-white p-6 border border-[#e8d8cb] rounded-xl shadow-sm">
              <h3 className="text-base font-bold text-[#1b1c1a] mb-1 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#825425]" /> Price Tier Breakdown
              </h3>
              <p className="text-xs text-[#635345] mb-6">Products grouped by price brackets ({currency})</p>

              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={priceRanges}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {priceRanges.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#d5c3b6', borderRadius: '8px', fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Quick Action Operations */}
          <div className="bg-white p-6 border border-[#e8d8cb] rounded-xl shadow-sm">
            <h3 className="text-base font-bold text-[#1b1c1a] mb-4">Quick Management Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => {
                  resetProductForm();
                  setActiveTab('products');
                }}
                className="flex items-center justify-between p-4 bg-[#fbf6f0] hover:bg-[#f5ebd8] border border-[#e8d2bd] rounded-lg transition-colors text-left"
              >
                <div>
                  <p className="text-xs font-bold text-[#1b1c1a] flex items-center gap-1">
                    <Plus className="w-4 h-4 text-[#825425]" /> Add New Product
                  </p>
                  <p className="text-[11px] text-[#635345] mt-0.5">Upload photo & details</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className="flex items-center justify-between p-4 bg-[#fbf6f0] hover:bg-[#f5ebd8] border border-[#e8d2bd] rounded-lg transition-colors text-left"
              >
                <div>
                  <p className="text-xs font-bold text-[#1b1c1a] flex items-center gap-1">
                    <PhoneCall className="w-4 h-4 text-[#825425]" /> Update WhatsApp Number
                  </p>
                  <p className="text-[11px] text-[#635345] mt-0.5">Direct customer order channel</p>
                </div>
              </button>

              <button
                onClick={async () => {
                  if (window.confirm('Reset/Seed missing initial products into database?')) {
                    await seedInitialProductsIfEmpty();
                    await seedInitialSettingsIfEmpty();
                    triggerSuccess('Database synced with initial catalog data!');
                  }
                }}
                className="flex items-center justify-between p-4 bg-[#fbf6f0] hover:bg-[#f5ebd8] border border-[#e8d2bd] rounded-lg transition-colors text-left"
              >
                <div>
                  <p className="text-xs font-bold text-[#1b1c1a] flex items-center gap-1">
                    <RefreshCw className="w-4 h-4 text-[#825425]" /> Re-sync Catalog Seed
                  </p>
                  <p className="text-[11px] text-[#635345] mt-0.5">Populate empty collections</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Add / Edit Product Form */}
          <div className="bg-white p-6 md:p-8 border border-[#e8d8cb] rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e8d8cb]">
              <div>
                <h3 className="text-lg font-bold text-[#1b1c1a] flex items-center gap-2">
                  {editingId ? <Edit2 className="w-5 h-5 text-[#825425]" /> : <Plus className="w-5 h-5 text-[#825425]" />}
                  {editingId ? 'Edit Product Item' : 'Add New Bakery Product'}
                </h3>
                <p className="text-xs text-[#635345]">
                  {editingId ? 'Update pricing, availability status, or image.' : 'Add fresh cakes, bouquets, or hampers to store.'}
                </p>
              </div>

              {editingId && (
                <button
                  onClick={resetProductForm}
                  className="px-3 py-1.5 border border-[#d5c3b6] text-xs font-bold rounded hover:bg-slate-50"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Royal Belgian Truffle Cake"
                    className="w-full px-3.5 py-2.5 border border-[#d5c3b6] rounded-lg text-sm focus:outline-none focus:border-[#825425]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full px-3.5 py-2.5 border border-[#d5c3b6] rounded-lg text-sm bg-white focus:outline-none focus:border-[#825425]"
                  >
                    {categories.map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">
                    Price ({currency}) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={priceNum}
                    onChange={(e) => setPriceNum(parseFloat(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 border border-[#d5c3b6] rounded-lg text-sm focus:outline-none focus:border-[#825425]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">
                  Product Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Rich dark chocolate sponge layered with Dutch cocoa ganache and fresh cherry filling."
                  className="w-full px-3.5 py-2 border border-[#d5c3b6] rounded-lg text-sm focus:outline-none focus:border-[#825425]"
                />
              </div>

              {/* Image Upload & URL Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-[#fbf6f0] border border-[#e8d2bd] rounded-lg">
                <div>
                  <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5 text-[#825425]" /> Option 1: Upload File to Firebase Storage
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImageFile(e.target.files[0]);
                      }
                    }}
                    className="w-full text-xs text-[#51443a] file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-[#825425] file:text-white hover:file:bg-[#6a421c]"
                  />
                  {imageFile && (
                    <p className="text-[11px] text-green-700 font-semibold mt-1">
                      Selected file: {imageFile.name} (Will upload on save)
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5 text-[#825425]" /> Option 2: Image Web URL
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3.5 py-2 border border-[#d5c3b6] rounded-lg text-sm focus:outline-none focus:border-[#825425] bg-white"
                  />
                </div>

                {/* Live Preview Thumbnail */}
                {(imageUrl || imageFile) && (
                  <div className="md:col-span-2 flex items-center gap-3 pt-2">
                    <span className="text-xs font-bold text-[#1b1c1a]">Image Preview:</span>
                    <img
                      src={imageFile ? URL.createObjectURL(imageFile) : imageUrl}
                      alt="Preview"
                      className="w-12 h-12 object-cover rounded-md border border-[#d5c3b6]"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Toggles & Options */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                <label className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={available}
                    onChange={(e) => setAvailable(e.target.checked)}
                    className="w-4 h-4 accent-[#825425]"
                  />
                  <span className="text-xs font-bold text-[#1b1c1a]">In Stock</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEggless}
                    onChange={(e) => setIsEggless(e.target.checked)}
                    className="w-4 h-4 accent-[#825425]"
                  />
                  <span className="text-xs font-bold text-[#1b1c1a]">100% Eggless</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 accent-[#825425]"
                  />
                  <span className="text-xs font-bold text-[#1b1c1a]">Featured</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isTrending}
                    onChange={(e) => setIsTrending(e.target.checked)}
                    className="w-4 h-4 accent-[#825425]"
                  />
                  <span className="text-xs font-bold text-[#1b1c1a]">Trending</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isRecommended}
                    onChange={(e) => setIsRecommended(e.target.checked)}
                    className="w-4 h-4 accent-[#825425]"
                  />
                  <span className="text-xs font-bold text-[#1b1c1a]">Recommend</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSignature}
                    onChange={(e) => setIsSignature(e.target.checked)}
                    className="w-4 h-4 accent-[#825425]"
                  />
                  <span className="text-xs font-bold text-[#1b1c1a]">Signature</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">
                  Ingredients (Comma Separated)
                </label>
                <input
                  type="text"
                  value={ingredientsText}
                  onChange={(e) => setIngredientsText(e.target.value)}
                  placeholder="Organic wheat flour, Belgian dark cocoa, whipped cream, cherries"
                  className="w-full px-3.5 py-2 border border-[#d5c3b6] rounded-lg text-sm focus:outline-none focus:border-[#825425]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetProductForm}
                  className="px-4 py-2 border border-[#d5c3b6] text-xs font-bold rounded-lg text-[#51443a] hover:bg-slate-50"
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  disabled={savingProduct || uploadingImage}
                  className="bg-[#825425] hover:bg-[#6a421c] text-white px-6 py-2.5 text-xs font-bold rounded-lg uppercase tracking-wider transition-colors shadow flex items-center gap-2"
                >
                  {savingProduct ? 'Saving to Database...' : editingId ? 'Update Product' : 'Add to Bakery Catalog'}
                </button>
              </div>
            </form>
          </div>

          {/* Product List Table & Controls */}
          <div className="bg-white p-6 border border-[#e8d8cb] rounded-xl shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#e8d8cb]">
              <div>
                <h3 className="text-base font-bold text-[#1b1c1a]">Live Product Inventory</h3>
                <p className="text-xs text-[#635345]">Showing {filteredProducts.length} of {totalProducts} items</p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative min-w-[200px]">
                  <Search className="w-4 h-4 text-[#825425] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-9 pr-3 py-1.5 border border-[#d5c3b6] rounded-lg text-xs focus:outline-none focus:border-[#825425]"
                  />
                </div>

                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 border border-[#d5c3b6] rounded-lg text-xs bg-white focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedAvailabilityFilter}
                  onChange={(e) => setSelectedAvailabilityFilter(e.target.value)}
                  className="px-3 py-1.5 border border-[#d5c3b6] rounded-lg text-xs bg-white focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="available">In Stock Only</option>
                  <option value="soldout">Sold Out Only</option>
                  <option value="featured">Featured Only</option>
                  <option value="trending">Trending Only</option>
                  <option value="recommended">Recommended Only</option>
                </select>
              </div>
            </div>

            {selectedProductIds.length > 0 && (
              <div className="sticky top-0 z-20 mb-4 bg-[#faf3e9] border border-[#e8d8cb] rounded-3xl p-4 shadow-sm transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#4a341f]">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#d9c6b0] text-[#5c3714]">✓</span>
                    {selectedProductIds.length} Products Selected
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleDeleteSelectedProducts}
                      className="bg-[#825425] hover:bg-[#6a421c] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      Delete Selected
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelSelection}
                      className="bg-[#f4ebdf] hover:bg-[#e9dccb] text-[#5c3714] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border border-[#d5c3b6] transition-colors"
                    >
                      Cancel Selection
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#fbf6f0] border-b border-[#e8d8cb] text-[#825425] uppercase tracking-wider font-bold">
                    <th className="p-3 w-[1%]">
                      <label className="inline-flex items-center justify-center w-5 h-5 rounded-lg border border-[#d5c3b6] bg-white text-[#5C2E14]">
                        <input
                          ref={selectAllCheckboxRef}
                          type="checkbox"
                          checked={isAllVisibleSelected}
                          onChange={handleToggleSelectAll}
                          className="peer sr-only"
                        />
                        <span aria-hidden="true" className="w-4 h-4 rounded-sm border border-[#d5c3b6] bg-white peer-checked:bg-[#825425] peer-checked:border-[#825425]"></span>
                      </label>
                    </th>
                    <th className="p-3">Product</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Stock Status</th>
                    <th className="p-3">Badges</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3">
                        <label className="inline-flex items-center justify-center w-5 h-5 rounded-lg border border-[#d5c3b6] bg-white text-[#5C2E14]">
                          <input
                            type="checkbox"
                            checked={selectedProductIds.includes(p.id)}
                            onChange={() => handleToggleSelectProduct(p.id)}
                            className="peer sr-only"
                          />
                          <span aria-hidden="true" className="w-4 h-4 rounded-sm border border-[#d5c3b6] bg-white peer-checked:bg-[#825425] peer-checked:border-[#825425]"></span>
                        </label>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.imageUrl || p.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=150'}
                            alt={p.name}
                            className="w-10 h-10 object-cover rounded-md border border-slate-200 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-[#1b1c1a]">{p.name}</p>
                            <p className="text-[11px] text-[#635345] line-clamp-1">{p.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-[#51443a] font-medium">{p.category}</td>
                      <td className="p-3 font-bold text-[#1b1c1a]">
                        {currency}{typeof p.price === 'number' ? p.price : (p.priceNum || 0)}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleToggleProductStatus(p, 'available')}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1 transition-colors ${
                            p.available !== false
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {p.available !== false ? 'In Stock' : 'Sold Out'}
                        </button>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {p.isFeatured && <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded text-[10px] font-semibold">Featured</span>}
                          {p.isTrending && <span className="bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded text-[10px] font-semibold">Trending</span>}
                          {p.isRecommended && <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-[10px] font-semibold">Recommended</span>}
                          {p.isSignature && <span className="bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded text-[10px] font-semibold">Signature</span>}
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditProductInit(p)}
                            title="Edit Product"
                            className="p-1.5 text-[#825425] hover:bg-[#fbf6f0] rounded border border-transparent hover:border-[#d5c3b6]"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p)}
                            title="Delete Product"
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded border border-transparent hover:border-red-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-500">
                        No products match the selected search or category filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {showBulkDeleteConfirm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                <div className="w-full max-w-md bg-[#FAF6F0] rounded-3xl border border-[#e8d8cb] p-6 shadow-2xl">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-[#24140A]">Delete Selected Products</h3>
                    <p className="text-sm text-[#5C2E14] mt-2">
                      You are about to permanently delete {selectedProductIds.length} selected products. This action cannot be undone.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowBulkDeleteConfirm(false)}
                      className="bg-[#F4EBE1] text-[#5C2E14] px-4 py-3 rounded-full text-xs font-bold uppercase tracking-wider border border-[#d5c3b6] hover:bg-[#e9dccb] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={confirmBulkDelete}
                      disabled={bulkDeleteLoading}
                      className="bg-[#825425] text-white px-4 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#6a421c] transition-colors shadow-sm disabled:opacity-60"
                    >
                      {bulkDeleteLoading ? 'Deleting...' : 'Delete Permanently'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: FEATURED & TRENDING DIRECT TOGGLES */}
      {activeTab === 'curated' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 border border-[#e8d8cb] rounded-xl shadow-sm">
            <h3 className="text-base font-bold text-[#1b1c1a] mb-1">Featured, Trending & Recommend Manager</h3>
            <p className="text-xs text-[#635345] mb-6">
              Quickly toggle highlights to showcase top products on the store homepage hero and collection cards.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <div key={p.id} className="p-4 border border-[#e8d8cb] rounded-lg bg-white hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={p.imageUrl || p.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=150'}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded-md shrink-0 border"
                    />
                    <div>
                      <p className="font-bold text-xs text-[#1b1c1a] line-clamp-1">{p.name}</p>
                      <p className="text-[11px] text-[#825425] font-semibold">{currency}{p.price}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handleToggleProductStatus(p, 'isFeatured')}
                      className={`px-2 py-1 rounded text-[10px] font-bold transition-colors ${
                        p.isFeatured ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Featured
                    </button>

                    <button
                      onClick={() => handleToggleProductStatus(p, 'isTrending')}
                      className={`px-2 py-1 rounded text-[10px] font-bold transition-colors ${
                        p.isTrending ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Trending
                    </button>

                    <button
                      onClick={() => handleToggleProductStatus(p, 'isRecommended')}
                      className={`px-2 py-1 rounded text-[10px] font-bold transition-colors ${
                        p.isRecommended ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Recommend
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 border border-[#e8d8cb] rounded-xl shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-bold text-[#1b1c1a] mb-1">Bakery Categories Directory</h3>
                <p className="text-xs text-[#635345]">
                  Manage category labels used by products and collections. Add, edit, or delete categories here.
                </p>
              </div>
              <button
                onClick={() => {
                  resetCategoryForm();
                  setActiveTab('categories');
                }}
                className="bg-[#825425] text-white px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider"
              >
                Add New Category
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g. Celebration Cakes"
                  className="w-full px-3.5 py-2 border border-[#d5c3b6] rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Category Type</label>
                <select
                  value={newCategoryType}
                  onChange={(e) => setNewCategoryType(e.target.value as CategoryInfo['type'])}
                  className="w-full px-3.5 py-2 border border-[#d5c3b6] rounded-lg text-sm bg-white"
                >
                  <option value="cake">cake</option>
                  <option value="additional">additional</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Category Icon</label>
                <input
                  type="text"
                  value={newCategoryIcon}
                  onChange={(e) => setNewCategoryIcon(e.target.value)}
                  placeholder="Cake"
                  className="w-full px-3.5 py-2 border border-[#d5c3b6] rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Banner Image URL</label>
                <label className="block text-xs text-[#635345] mb-2">Upload Banner Image (will be stored in Cloudinary)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setNewCategoryBannerFile(e.target.files[0]);
                    }
                  }}
                  className="w-full text-xs text-[#51443a] file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-[#825425] file:text-white hover:file:bg-[#6a421c]"
                />
                <p className="text-[11px] text-[#6e5d4f] mt-2">If left empty, existing image (if any) will remain unchanged.</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Tagline</label>
                <input
                  type="text"
                  value={newCategoryTagline}
                  onChange={(e) => setNewCategoryTagline(e.target.value)}
                  placeholder="Short category tagline"
                  className="w-full px-3.5 py-2 border border-[#d5c3b6] rounded-lg text-sm"
                />
              </div>

              <div className="md:col-span-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={resetCategoryForm}
                  className="px-4 py-2 border border-[#d5c3b6] text-xs font-bold rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#825425] text-white px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider"
                >
                  {editingCategoryName ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((cat) => {
                const count = products.filter((p) => p.category === cat.name).length;
                return (
                  <div key={cat.name} className="p-4 border border-[#e8d8cb] rounded-lg bg-[#fbf6f0]">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-sm text-[#1b1c1a]">{cat.name}</p>
                        <p className="text-[11px] text-[#825425] uppercase tracking-wider font-semibold">{cat.type}</p>
                        <p className="text-[11px] text-[#51443a] mt-2 line-clamp-2">{cat.tagline}</p>
                      </div>
                      <span className="bg-[#825425] text-white px-2.5 py-1 rounded-full text-xs font-bold">
                        {count} Items
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() => handleEditCategoryInit(cat)}
                        className="text-[#825425] text-xs font-bold px-3 py-1 border border-[#d5c3b6] rounded-lg hover:bg-[#fbf6f0]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id, cat.name)}
                        className="text-red-600 text-xs font-bold px-3 py-1 border border-red-200 rounded-lg hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: GALLERY MANAGER */}
      {activeTab === 'gallery' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Add Gallery Form */}
          <div className="bg-white p-6 border border-[#e8d8cb] rounded-xl shadow-sm">
            <h3 className="text-base font-bold text-[#1b1c1a] mb-1">Add Showcase Photo</h3>
            <p className="text-xs text-[#635345] mb-6">Upload customer cake photos or store creations to bakery showcase gallery.</p>

            <form onSubmit={handleAddGalleryItem} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Image Title</label>
                <input
                  type="text"
                  required
                  value={newGalleryTitle}
                  onChange={(e) => setNewGalleryTitle(e.target.value)}
                  placeholder="Custom Wedding Floral Cake"
                  className="w-full px-3 py-2 border border-[#d5c3b6] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Category</label>
                <input
                  type="text"
                  value={newGalleryCategory}
                  onChange={(e) => setNewGalleryCategory(e.target.value)}
                  placeholder="Designer Cakes"
                  className="w-full px-3 py-2 border border-[#d5c3b6] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Image URL or File</label>
                <input
                  type="text"
                  value={newGalleryUrl}
                  onChange={(e) => setNewGalleryUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 border border-[#d5c3b6] rounded-lg text-xs"
                />
              </div>

              <div className="md:col-span-3 flex justify-end">
                <button
                  type="submit"
                  disabled={uploadingGallery}
                  className="bg-[#825425] text-white px-5 py-2 text-xs font-bold rounded-lg uppercase tracking-wider"
                >
                  {uploadingGallery ? 'Uploading...' : 'Publish to Gallery'}
                </button>
              </div>
            </form>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryItems.map((item) => (
              <div key={item.id} className="relative group bg-white border border-[#e8d8cb] rounded-lg overflow-hidden">
                <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover" />
                <div className="p-3">
                  <p className="font-bold text-xs text-[#1b1c1a] line-clamp-1">{item.title}</p>
                  <p className="text-[10px] text-[#825425] font-semibold">{item.category}</p>
                </div>
                <button
                  onClick={() => handleDeleteGalleryItem(item.id)}
                  className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-90 hover:opacity-100 shadow"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: TESTIMONIALS */}
      {activeTab === 'testimonials' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Add Testimonial Form */}
          <div className="bg-white p-6 border border-[#e8d8cb] rounded-xl shadow-sm">
            <h3 className="text-base font-bold text-[#1b1c1a] mb-1">Publish Customer Review</h3>
            <p className="text-xs text-[#635345] mb-6">Manage social proof testimonials shown on homepage.</p>

            <form onSubmit={handleAddTestimonial} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Customer Name</label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="Siddharth Rao"
                    className="w-full px-3 py-2 border border-[#d5c3b6] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Occasion / Role</label>
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="1st Birthday Celebration"
                    className="w-full px-3 py-2 border border-[#d5c3b6] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Star Rating (1-5)</label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#d5c3b6] rounded-lg text-xs bg-white"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Review Message</label>
                <textarea
                  rows={2}
                  required
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="The cake design exceeded our expectations and tasted fresh!"
                  className="w-full px-3 py-2 border border-[#d5c3b6] rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#825425] text-white px-5 py-2 text-xs font-bold rounded-lg uppercase tracking-wider"
                >
                  Publish Testimonial
                </button>
              </div>
            </form>
          </div>

          {/* Testimonial List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t) => (
              <div key={t.id} className="p-4 bg-white border border-[#e8d8cb] rounded-xl flex items-start gap-4">
                <img src={t.avatarUrl} alt={t.author} className="w-12 h-12 rounded-full object-cover shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-xs text-[#1b1c1a]">{t.author}</p>
                      <p className="text-[11px] text-[#825425]">{t.role}</p>
                    </div>
                    <div className="flex items-center text-amber-500 gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#51443a] mt-2 italic">"{t.review}"</p>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleToggleTestimonial(t.id)}
                      className="text-[11px] font-bold text-[#825425] flex items-center gap-1"
                    >
                      {t.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      {t.visible ? 'Visible on Store' : 'Hidden'}
                    </button>

                    <button
                      onClick={() => handleDeleteTestimonial(t.id)}
                      className="text-[11px] font-bold text-red-600 flex items-center gap-1 hover:underline"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: HERO HIGHLIGHTS */}
      {activeTab === 'hero' && (
        <div className="bg-white p-6 md:p-8 border border-[#e8d8cb] rounded-xl shadow-sm animate-fadeIn">
          <h3 className="text-base font-bold text-[#1b1c1a] mb-1">Storefront Hero Banner Management</h3>
          <p className="text-xs text-[#635345] mb-6">Customize main hero banner headlines, announcement bar, and hero background image.</p>

          <form onSubmit={handleSaveSettings} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Top Announcement Bar Text</label>
              <input
                type="text"
                value={bakerySettings.announcementText || ''}
                onChange={(e) => setBakerySettings({ ...bakerySettings, announcementText: e.target.value })}
                placeholder="✨ FREE Express Delivery on Orders Above ₹999 | Daily Fresh Oven Batches"
                className="w-full px-3.5 py-2.5 border border-[#d5c3b6] rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Hero Main Title</label>
              <input
                type="text"
                value={bakerySettings.heroTitle || ''}
                onChange={(e) => setBakerySettings({ ...bakerySettings, heroTitle: e.target.value })}
                placeholder="Handcrafted Birthday Cakes & Celebration Hampers"
                className="w-full px-3.5 py-2.5 border border-[#d5c3b6] rounded-lg text-sm font-bold text-[#1b1c1a]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Hero Subtitle</label>
              <textarea
                rows={2}
                value={bakerySettings.heroSubtitle || ''}
                onChange={(e) => setBakerySettings({ ...bakerySettings, heroSubtitle: e.target.value })}
                placeholder="Baking happiness daily with organic stone-ground flours, pure Belgian chocolate..."
                className="w-full px-3.5 py-2 border border-[#d5c3b6] rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Hero Background Image URL</label>
              <input
                type="url"
                value={bakerySettings.heroImageUrl || ''}
                onChange={(e) => setBakerySettings({ ...bakerySettings, heroImageUrl: e.target.value })}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-3.5 py-2.5 border border-[#d5c3b6] rounded-lg text-sm"
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-[#e8d8cb]">
              <button
                type="submit"
                disabled={savingSettings}
                className="bg-[#825425] text-white px-6 py-2.5 text-xs font-bold rounded-lg uppercase tracking-wider shadow"
              >
                {savingSettings ? 'Saving...' : 'Update Hero Banner'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 8: CONTACT & WHATSAPP */}
      {activeTab === 'contact' && (
        <div className="bg-white p-6 md:p-8 border border-[#e8d8cb] rounded-xl shadow-sm animate-fadeIn">
          <h3 className="text-base font-bold text-[#1b1c1a] mb-1">Contact & WhatsApp Order Channel</h3>
          <p className="text-xs text-[#635345] mb-6">Manage bakery contact numbers, store location, and WhatsApp order target number.</p>

          <form onSubmit={handleSaveSettings} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50/60 border border-green-200 rounded-lg">
                <label className="block text-xs font-bold text-green-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <PhoneCall className="w-4 h-4 text-green-700" /> Target WhatsApp Order Number *
                </label>
                <input
                  type="text"
                  required
                  value={bakerySettings.whatsappNumber}
                  onChange={(e) => setBakerySettings({ ...bakerySettings, whatsappNumber: e.target.value })}
                  placeholder="15550192824"
                  className="w-full px-3.5 py-2.5 border border-green-300 rounded-lg text-sm font-bold bg-white focus:outline-none focus:border-green-600"
                />
                <p className="text-[11px] text-green-800 mt-1">
                  Include country code without '+' or spaces (e.g. 15550192824 or 919876543210).
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Store Phone Number</label>
                <input
                  type="text"
                  value={bakerySettings.phone || ''}
                  onChange={(e) => setBakerySettings({ ...bakerySettings, phone: e.target.value })}
                  placeholder="+1 (555) 019-2824"
                  className="w-full px-3.5 py-2.5 border border-[#d5c3b6] rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Store Email</label>
                <input
                  type="email"
                  value={bakerySettings.email || ''}
                  onChange={(e) => setBakerySettings({ ...bakerySettings, email: e.target.value })}
                  placeholder="hello@freshbakers.com"
                  className="w-full px-3.5 py-2.5 border border-[#d5c3b6] rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Instagram Handle</label>
                <input
                  type="text"
                  value={bakerySettings.instagram}
                  onChange={(e) => setBakerySettings({ ...bakerySettings, instagram: e.target.value })}
                  placeholder="@freshbakers"
                  className="w-full px-3.5 py-2.5 border border-[#d5c3b6] rounded-lg text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Physical Store Address</label>
                <input
                  type="text"
                  value={bakerySettings.address}
                  onChange={(e) => setBakerySettings({ ...bakerySettings, address: e.target.value })}
                  placeholder="142 Artisan Boulevard, MG Road"
                  className="w-full px-3.5 py-2.5 border border-[#d5c3b6] rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Operating Hours</label>
                <input
                  type="text"
                  value={bakerySettings.openHours}
                  onChange={(e) => setBakerySettings({ ...bakerySettings, openHours: e.target.value })}
                  placeholder="Tue-Sun: 7am - 4pm"
                  className="w-full px-3.5 py-2.5 border border-[#d5c3b6] rounded-lg text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#e8d8cb]">
              <button
                type="submit"
                disabled={savingSettings}
                className="bg-[#825425] text-white px-6 py-2.5 text-xs font-bold rounded-lg uppercase tracking-wider shadow"
              >
                {savingSettings ? 'Saving Settings...' : 'Save Contact Settings'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 9: GENERAL BAKERY SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white p-6 md:p-8 border border-[#e8d8cb] rounded-xl shadow-sm animate-fadeIn">
          <h3 className="text-base font-bold text-[#1b1c1a] mb-1">General Store Configuration</h3>
          <p className="text-xs text-[#635345] mb-6">Bakery name, currency formatting, and delivery settings.</p>

          <form onSubmit={handleSaveSettings} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Bakery Name</label>
                <input
                  type="text"
                  required
                  value={bakerySettings.bakeryName}
                  onChange={(e) => setBakerySettings({ ...bakerySettings, bakeryName: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-[#d5c3b6] rounded-lg text-sm font-bold text-[#1b1c1a]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Currency Symbol</label>
                <select
                  value={bakerySettings.currencySymbol || '₹'}
                  onChange={(e) => setBakerySettings({ ...bakerySettings, currencySymbol: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-[#d5c3b6] rounded-lg text-sm bg-white font-bold"
                >
                  <option value="₹">₹ (INR - Indian Rupee)</option>
                  <option value="$">$ (USD - US Dollar)</option>
                  <option value="€">€ (EUR - Euro)</option>
                  <option value="£">£ (GBP - British Pound)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Delivery Charge ({currency})</label>
                <input
                  type="number"
                  value={bakerySettings.deliveryFee || 50}
                  onChange={(e) => setBakerySettings({ ...bakerySettings, deliveryFee: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 border border-[#d5c3b6] rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1">Bakery Tagline</label>
              <input
                type="text"
                value={bakerySettings.tagline}
                onChange={(e) => setBakerySettings({ ...bakerySettings, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-[#d5c3b6] rounded-lg text-sm"
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-[#e8d8cb]">
              <button
                type="submit"
                disabled={savingSettings}
                className="bg-[#825425] text-white px-6 py-2.5 text-xs font-bold rounded-lg uppercase tracking-wider shadow"
              >
                {savingSettings ? 'Saving...' : 'Save Bakery Configuration'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

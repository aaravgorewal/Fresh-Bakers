import React, { useState, useEffect } from 'react';
import { ProductItem, Category, BakerySettings } from '../types';
import { CATEGORIES } from '../data/products';
import {
  auth,
  addProductToFirestore,
  updateProductInFirestore,
  deleteProductFromFirestore,
  uploadProductImage,
  seedInitialProductsIfEmpty,
  seedInitialSettingsIfEmpty,
  subscribeToSettings,
  updateBakerySettings,
  DEFAULT_SETTINGS
} from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInAnonymously, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { X, Lock, Upload, Plus, Edit2, Trash2, LogOut, CheckCircle2, AlertCircle, Image as ImageIcon, Settings, Package } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  settings?: BakerySettings;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, products, settings: initialSettings }) => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('admin@freshbakers.com');
  const [password, setPassword] = useState('baker123');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [adminTab, setAdminTab] = useState<'products' | 'settings'>('products');

  // Form state for creating / editing products
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Breads');
  const [priceNum, setPriceNum] = useState<number>(8.5);
  const [description, setDescription] = useState('');
  const [available, setAvailable] = useState<boolean>(true);
  const [fermentationHours, setFermentationHours] = useState<number | ''>(36);
  const [ingredientsStr, setIngredientsStr] = useState('');
  const [isSignature, setIsSignature] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [savingProduct, setSavingProduct] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Settings form state
  const [bakerySettings, setBakerySettings] = useState<BakerySettings>(initialSettings || DEFAULT_SETTINGS);
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
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

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
        } catch (createErr: any) {
          setAuthError(createErr.message || 'Authentication failed');
        }
      } else {
        setAuthError(err.message || 'Login failed');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleAnonymousLogin = async () => {
    setAuthError('');
    setAuthLoading(true);
    try {
      await signInAnonymously(auth);
    } catch (err: any) {
      setAuthError(err.message || 'Anonymous login failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = () => {
    signOut(auth);
    resetForm();
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setCategory('Breads');
    setPriceNum(8.5);
    setDescription('');
    setAvailable(true);
    setFermentationHours(36);
    setIngredientsStr('');
    setIsSignature(false);
    setImageUrl('');
    setImageFile(null);
  };

  const handleEditInit = (product: ProductItem) => {
    setEditingId(product.id);
    setName(product.name);
    setCategory(product.category);
    setPriceNum(typeof product.price === 'number' ? product.price : (product.priceNum || 0));
    setDescription(product.description);
    setAvailable(product.available !== false);
    setFermentationHours(product.fermentationHours || '');
    setIngredientsStr(product.ingredients ? product.ingredients.join(', ') : '');
    setIsSignature(!!product.isSignature);
    setImageUrl(product.imageUrl || product.image || '');
    setImageFile(null);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProduct(true);
    setSuccessMsg('');

    try {
      let finalImageUrl = imageUrl;

      if (imageFile) {
        setUploadingImage(true);
        finalImageUrl = await uploadProductImage(imageFile);
        setUploadingImage(false);
      }

      if (!finalImageUrl) {
        finalImageUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDul2LQs2RG_9n7r3zLnleXJxS0v3iAxlSim0mTOpfBf6_CevWWYAQN6ecQiJesN7OcCq0lqOe6YfVnCAHOooJ0O876EwFe09PT8zYk34cnlpYuCkYL_YlLqgUzdn5E2KW23DZt3BIFlq70B13_vg4Q7ngeR2HrDLOadq3Lc7XgKiBCX1M_6hYH9jWSpHpy0HTREiR11T1LyqNb8iWVXGj5dms0hIlEbTM-jfEQf9TMfu6Bi9OBYN3oBQ';
      }

      const ingredientsList = ingredientsStr
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

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
        fermentationHours: fermentationHours ? Number(fermentationHours) : undefined,
        ingredients: ingredientsList,
        isSignature,
      };

      if (editingId) {
        await updateProductInFirestore(editingId, productPayload);
        setSuccessMsg(`Updated "${name}" in Firestore!`);
      } else {
        await addProductToFirestore(productPayload);
        setSuccessMsg(`Added new item "${name}" to Firestore!`);
      }

      resetForm();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      alert(`Error saving product: ${err.message}`);
    } finally {
      setSavingProduct(false);
      setUploadingImage(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      // Clean up whatsapp number to remove leading + or spaces
      const cleanWhatsapp = bakerySettings.whatsappNumber.replace(/[\+\s]/g, '');
      const payload = {
        ...bakerySettings,
        whatsappNumber: cleanWhatsapp,
      };
      await updateBakerySettings(payload);
      setSuccessMsg('Updated bakery settings in Firestore!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      alert(`Error saving settings: ${err.message}`);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleDelete = async (product: ProductItem) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}" from Firestore?`)) {
      try {
        await deleteProductFromFirestore(product.id);
        setSuccessMsg(`Deleted "${product.name}".`);
        setTimeout(() => setSuccessMsg(''), 4000);
      } catch (err: any) {
        alert(`Error deleting product: ${err.message}`);
      }
    }
  };

  const handleSeedDatabase = async () => {
    if (window.confirm('Populate default artisan products and settings into Firestore?')) {
      await seedInitialProductsIfEmpty();
      await seedInitialSettingsIfEmpty();
      setSuccessMsg('Sample products and settings seeded successfully!');
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-[#fbf9f5] w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-[#825425] shadow-2xl relative p-6 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-[#d5c3b6] pb-4 mb-6">
          <div>
            <span className="font-label-caps text-xs text-[#825425] tracking-widest uppercase block mb-1 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" /> Firebase Auth & Firestore Admin Portal
            </span>
            <h2 className="font-headline-md text-2xl text-[#1b1c1a] font-bold">Bakery Admin Console</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#837469] hover:text-[#1b1c1a] transition-colors"
            aria-label="Close admin modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Auth status or login form */}
        {!user ? (
          <div className="max-w-md mx-auto py-8">
            <div className="bg-[#f5f3ef] p-6 border border-[#d5c3b6] shadow-sm">
              <h3 className="font-headline-sm text-lg font-bold text-[#1b1c1a] mb-2 text-center">
                Admin Authentication
              </h3>
              <p className="font-body-md text-xs text-[#51443a] text-center mb-6">
                Log in via Firebase Authentication to manage `products` and `settings` collections in Firestore.
              </p>

              {authError && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 text-xs mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {authError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#51443a] uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#d5c3b6] px-3 py-2 text-sm text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#51443a] uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-[#d5c3b6] px-3 py-2 text-sm text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full btn-primary py-2.5 text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  {authLoading ? 'Authenticating...' : 'Sign In as Admin'}
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-[#d5c3b6] text-center">
                <span className="text-xs text-[#837469] block mb-2">Or quick test session:</span>
                <button
                  onClick={handleAnonymousLogin}
                  disabled={authLoading}
                  className="btn-secondary text-xs py-2 px-4 uppercase tracking-widest w-full"
                >
                  Sign In Anonymously (Demo Admin)
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Top Bar for Logged In User */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-[#e6ded9] p-3 border border-[#d5c3b6] mb-6 text-xs text-[#1b1c1a]">
              <div className="flex items-center gap-2 mb-2 sm:mb-0">
                <span className="w-2.5 h-2.5 rounded-full bg-green-600 animate-pulse"></span>
                <span>
                  Logged in as <strong className="font-mono">{user.email || 'Anonymous Admin'}</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSeedDatabase}
                  className="text-[#825425] hover:underline font-semibold uppercase tracking-wider text-[11px]"
                >
                  Seed Default Data
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1 text-[#51443a] hover:text-black font-semibold uppercase tracking-wider text-[11px]"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-[#d5c3b6] mb-6 gap-2">
              <button
                onClick={() => setAdminTab('products')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                  adminTab === 'products'
                    ? 'border-[#825425] text-[#825425] bg-white'
                    : 'border-transparent text-[#51443a] hover:text-black'
                }`}
              >
                <Package className="w-4 h-4" /> Products Collection ({products.length})
              </button>
              <button
                onClick={() => setAdminTab('settings')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                  adminTab === 'settings'
                    ? 'border-[#825425] text-[#825425] bg-white'
                    : 'border-transparent text-[#51443a] hover:text-black'
                }`}
              >
                <Settings className="w-4 h-4" /> Settings Collection
              </button>
            </div>

            {successMsg && (
              <div className="bg-[#825425] text-white p-3 text-xs uppercase tracking-wider font-semibold mb-6 flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" /> {successMsg}
              </div>
            )}

            {adminTab === 'products' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Product Add / Edit Form */}
                <div className="lg:col-span-5 bg-white p-5 border border-[#d5c3b6] shadow-sm">
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#d5c3b6]">
                    <h3 className="font-headline-sm text-lg font-bold text-[#1b1c1a]">
                      {editingId ? 'Edit Product' : 'Add New Bakery Product'}
                    </h3>
                    {editingId && (
                      <button
                        onClick={resetForm}
                        className="text-xs text-[#825425] underline uppercase font-semibold"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-[#51443a] uppercase tracking-wider mb-1">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Cardamom Bun"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-2.5 py-1.5 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-[#51443a] uppercase tracking-wider mb-1">
                          Category *
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value as Category)}
                          className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-2.5 py-1.5 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
                        >
                          {CATEGORIES.map((c) => (
                            <option key={c.name} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-[#51443a] uppercase tracking-wider mb-1">
                          Price ($ number) *
                        </label>
                        <input
                          type="number"
                          step="0.25"
                          required
                          value={priceNum}
                          onChange={(e) => setPriceNum(parseFloat(e.target.value) || 0)}
                          className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-2.5 py-1.5 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#51443a] uppercase tracking-wider mb-1">
                        Description *
                      </label>
                      <textarea
                        rows={2}
                        required
                        placeholder="Wild yeast, 36h ferment..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-2.5 py-1.5 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center pt-2">
                        <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#51443a] uppercase tracking-wider text-[11px]">
                          <input
                            type="checkbox"
                            checked={available}
                            onChange={(e) => setAvailable(e.target.checked)}
                            className="w-4 h-4 accent-[#825425]"
                          />
                          Available for Order
                        </label>
                      </div>

                      <div className="flex items-center pt-2">
                        <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#51443a] uppercase tracking-wider text-[11px]">
                          <input
                            type="checkbox"
                            checked={isSignature}
                            onChange={(e) => setIsSignature(e.target.checked)}
                            className="w-4 h-4 accent-[#825425]"
                          />
                          Signature Bake
                        </label>
                      </div>
                    </div>

                    {/* Image Upload / URL Input */}
                    <div>
                      <label className="block font-semibold text-[#51443a] uppercase tracking-wider mb-1 flex items-center gap-1">
                        <ImageIcon className="w-3.5 h-3.5 text-[#825425]" /> Image (imageUrl)
                      </label>
                      <div className="space-y-2">
                        <div className="border border-dashed border-[#d5c3b6] p-2 bg-[#f5f3ef] text-center">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setImageFile(e.target.files[0]);
                              }
                            }}
                            className="hidden"
                            id="firebase-image-upload"
                          />
                          <label
                            htmlFor="firebase-image-upload"
                            className="cursor-pointer text-[11px] font-semibold text-[#825425] hover:underline flex items-center justify-center gap-1"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            {imageFile ? imageFile.name : 'Upload to Firebase Storage'}
                          </label>
                        </div>

                        <div className="text-[10px] text-[#837469] text-center uppercase font-bold">OR PASTE URL</div>

                        <input
                          type="url"
                          placeholder="Image URL (imageUrl)"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-2.5 py-1.5 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={savingProduct || uploadingImage}
                      className="w-full btn-primary py-2.5 text-xs uppercase tracking-widest flex items-center justify-center gap-2 mt-2"
                    >
                      {savingProduct ? (
                        'Saving to Firestore...'
                      ) : editingId ? (
                        'Update Firestore Product'
                      ) : (
                        <>
                          <Plus className="w-4 h-4" /> Add Product to Menu
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Product List in Firestore */}
                <div className="lg:col-span-7">
                  <h3 className="font-headline-sm text-lg font-bold text-[#1b1c1a] mb-3">
                    Live Firestore Products ({products.length})
                  </h3>

                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                    {products.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between p-3 bg-white border border-[#d5c3b6] shadow-2xs hover:border-[#825425] transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={p.imageUrl || p.image}
                            alt={p.name}
                            className="w-12 h-12 object-cover border border-[#d5c3b6] shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="font-serif-display font-bold text-sm text-[#1b1c1a] truncate flex items-center gap-2">
                              {p.name}
                              {p.available === false && (
                                <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded uppercase tracking-wider">
                                  Unavailable
                                </span>
                              )}
                            </h4>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-[#825425] font-bold">
                                ${typeof p.price === 'number' ? p.price.toFixed(2) : p.price}
                              </span>
                              <span className="text-[#837469] text-[10px] uppercase font-semibold">
                                ({p.category})
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleEditInit(p)}
                            className="p-1.5 text-[#51443a] hover:text-[#825425] transition-colors"
                            title="Edit product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p)}
                            className="p-1.5 text-red-600 hover:text-red-800 transition-colors"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Settings Tab */
              <div className="max-w-xl mx-auto bg-white p-6 border border-[#d5c3b6] shadow-sm">
                <h3 className="font-headline-sm text-lg font-bold text-[#1b1c1a] mb-2 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#825425]" /> Firestore Settings Collection (`settings/main`)
                </h3>
                <p className="text-xs text-[#51443a] mb-6">
                  Manage store identity, contact info, and WhatsApp ordering number stored in Firestore.
                </p>

                <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-[#51443a] uppercase tracking-wider mb-1">
                      Bakery Name (bakeryName) *
                    </label>
                    <input
                      type="text"
                      required
                      value={bakerySettings.bakeryName}
                      onChange={(e) => setBakerySettings({ ...bakerySettings, bakeryName: e.target.value })}
                      className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-3 py-2 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#51443a] uppercase tracking-wider mb-1">
                      Tagline (tagline) *
                    </label>
                    <input
                      type="text"
                      required
                      value={bakerySettings.tagline}
                      onChange={(e) => setBakerySettings({ ...bakerySettings, tagline: e.target.value })}
                      className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-3 py-2 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#51443a] uppercase tracking-wider mb-1">
                      WhatsApp Number (whatsappNumber with country code, no + or spaces) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 15550192824"
                      value={bakerySettings.whatsappNumber}
                      onChange={(e) => setBakerySettings({ ...bakerySettings, whatsappNumber: e.target.value })}
                      className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-3 py-2 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
                    />
                    <span className="text-[10px] text-[#837469] mt-1 block">
                      Format: Country code followed by phone number (no + sign, spaces, or hyphens).
                    </span>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#51443a] uppercase tracking-wider mb-1">
                      Address (address) *
                    </label>
                    <input
                      type="text"
                      required
                      value={bakerySettings.address}
                      onChange={(e) => setBakerySettings({ ...bakerySettings, address: e.target.value })}
                      className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-3 py-2 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#51443a] uppercase tracking-wider mb-1">
                        Instagram (instagram) *
                      </label>
                      <input
                        type="text"
                        required
                        value={bakerySettings.instagram}
                        onChange={(e) => setBakerySettings({ ...bakerySettings, instagram: e.target.value })}
                        className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-3 py-2 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#51443a] uppercase tracking-wider mb-1">
                        Open Hours (openHours) *
                      </label>
                      <input
                        type="text"
                        required
                        value={bakerySettings.openHours}
                        onChange={(e) => setBakerySettings({ ...bakerySettings, openHours: e.target.value })}
                        className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-3 py-2 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={savingSettings}
                    className="w-full btn-primary py-2.5 text-xs uppercase tracking-widest flex items-center justify-center gap-2 mt-4"
                  >
                    {savingSettings ? 'Saving Settings...' : 'Save Bakery Settings to Firestore'}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { ProductItem, Category, BakerySettings } from '../types';
import { CATEGORIES } from '../data/products';
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
  DEFAULT_SETTINGS
} from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { Lock, Upload, Plus, Edit2, Trash2, LogOut, CheckCircle2, AlertCircle, Image as ImageIcon, Settings, Package, ToggleLeft, ToggleRight } from 'lucide-react';

interface AdminViewProps {
  products: ProductItem[];
  settings?: BakerySettings;
}

export const AdminView: React.FC<AdminViewProps> = ({ products, settings: initialSettings }) => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('admin@freshbakers.com');
  const [password, setPassword] = useState('baker123');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<'products' | 'settings'>('products');

  // Form state for creating / editing products
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Breads');
  const [priceNum, setPriceNum] = useState<number>(8.5);
  const [description, setDescription] = useState('');
  const [available, setAvailable] = useState<boolean>(true);
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
    resetForm();
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setCategory('Breads');
    setPriceNum(8.5);
    setDescription('');
    setAvailable(true);
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
    setImageUrl(product.imageUrl || product.image || '');
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleAvailability = async (product: ProductItem) => {
    const newStatus = !product.available;
    try {
      await updateProductInFirestore(product.id, { available: newStatus });
      setSuccessMsg(`Updated status for "${product.name}" to ${newStatus ? 'Available' : 'Sold Out'}.`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      alert(`Error updating product availability: ${err.message}`);
    }
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
      };

      if (editingId) {
        await updateProductInFirestore(editingId, productPayload);
        setSuccessMsg(`Successfully updated "${name}"!`);
      } else {
        await addProductToFirestore(productPayload);
        setSuccessMsg(`Successfully added "${name}" to products!`);
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
      const cleanWhatsapp = bakerySettings.whatsappNumber.replace(/[\+\s]/g, '');
      const payload = {
        ...bakerySettings,
        whatsappNumber: cleanWhatsapp,
      };
      await updateBakerySettings(payload);
      setSuccessMsg('Bakery settings updated successfully!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      alert(`Error saving settings: ${err.message}`);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleDelete = async (product: ProductItem) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        await deleteProductFromFirestore(product.id);
        setSuccessMsg(`Product "${product.name}" deleted successfully.`);
        setTimeout(() => setSuccessMsg(''), 4000);
      } catch (err: any) {
        alert(`Error deleting product: ${err.message}`);
      }
    }
  };

  return (
    <div className="w-full px-5 md:px-16 py-12 max-w-[1200px] mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="font-label-caps text-[#825425] tracking-widest uppercase block mb-1 font-semibold text-xs flex items-center justify-center gap-1">
          <Lock className="w-3.5 h-3.5" /> Protected Administration Route
        </span>
        <h1 className="font-display-lg text-3xl md:text-5xl text-[#1b1c1a] font-bold mb-3">
          Bakery Admin Dashboard
        </h1>
        <p className="font-body-md text-[#51443a] text-sm md:text-base leading-relaxed">
          Manage live menu items, availability status, product photos, and store contact settings.
        </p>
      </div>

      {/* Success Banner */}
      {successMsg && (
        <div className="max-w-4xl mx-auto mb-8 bg-[#825425] text-white p-4 border border-[#6a421c] shadow-sm flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2 font-semibold text-sm">
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

      {/* Login Form or Dashboard View */}
      {!user ? (
        <div className="max-w-md mx-auto py-6">
          <div className="bg-white p-8 border border-[#d5c3b6] shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#825425] text-white flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="font-headline-sm text-xl font-bold text-[#1b1c1a] text-center mb-1">
              Admin Login
            </h3>
            <p className="font-body-md text-xs text-[#51443a] text-center mb-6">
              Enter admin credentials to manage store items and settings.
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
                  className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-3.5 py-2.5 text-sm text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
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
                  className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-3.5 py-2.5 text-sm text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full btn-primary py-3 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
              >
                {authLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          {/* Admin Header Info Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center bg-[#f5f3ef] p-4 border border-[#d5c3b6] mb-8 text-xs text-[#1b1c1a]">
            <div className="flex items-center gap-2.5 mb-2 sm:mb-0">
              <span className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>
                Authenticated as: <strong className="font-semibold text-[#825425]">{user.email || 'Admin'}</strong>
              </span>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 bg-[#e6ded9] hover:bg-[#d5c3b6] text-[#51443a] font-semibold uppercase tracking-wider text-xs px-3 py-1.5 transition-colors border border-[#d5c3b6]"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>

          {/* Admin Section Tabs */}
          <div className="flex border-b border-[#d5c3b6] mb-8 gap-3">
            <button
              onClick={() => setActiveAdminTab('products')}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeAdminTab === 'products'
                  ? 'border-[#825425] text-[#825425] bg-white'
                  : 'border-transparent text-[#51443a] hover:text-[#1b1c1a] bg-[#f5f3ef]'
              }`}
            >
              <Package className="w-4 h-4" /> Products ({products.length})
            </button>
            <button
              onClick={() => setActiveAdminTab('settings')}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeAdminTab === 'settings'
                  ? 'border-[#825425] text-[#825425] bg-white'
                  : 'border-transparent text-[#51443a] hover:text-[#1b1c1a] bg-[#f5f3ef]'
              }`}
            >
              <Settings className="w-4 h-4" /> Bakery Settings
            </button>
          </div>

          {activeAdminTab === 'products' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Product Form (Simple Form UI) */}
              <div className="lg:col-span-5 bg-white p-6 border border-[#d5c3b6] shadow-sm">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#d5c3b6]">
                  <h3 className="font-headline-sm text-xl font-bold text-[#1b1c1a]">
                    {editingId ? 'Edit Product Item' : 'Add New Menu Item'}
                  </h3>
                  {editingId && (
                    <button
                      onClick={resetForm}
                      className="text-xs text-[#825425] underline uppercase font-semibold hover:text-[#51443a]"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-[#51443a] uppercase tracking-wider mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sourdough Loaf"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-3 py-2 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
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
                        className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-3 py-2 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
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
                        Price (₹) *
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        required
                        value={priceNum}
                        onChange={(e) => setPriceNum(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-3 py-2 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#51443a] uppercase tracking-wider mb-1">
                      Description *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Freshly baked artisan product..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-3 py-2 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
                    />
                  </div>

                  {/* Availability Toggle */}
                  <div className="p-3 bg-[#f5f3ef] border border-[#d5c3b6]">
                    <label className="flex items-center gap-3 cursor-pointer font-semibold text-[#1b1c1a] uppercase tracking-wider text-xs">
                      <input
                        type="checkbox"
                        checked={available}
                        onChange={(e) => setAvailable(e.target.checked)}
                        className="w-4 h-4 accent-[#825425]"
                      />
                      Item Available for Sale
                    </label>
                    <span className="text-[11px] text-[#837469] mt-1 block">
                      Unchecking this marks the product as "Sold Out".
                    </span>
                  </div>

                  {/* Image Upload directly to Firebase Storage */}
                  <div>
                    <label className="block font-semibold text-[#51443a] uppercase tracking-wider mb-1 flex items-center gap-1">
                      <ImageIcon className="w-3.5 h-3.5 text-[#825425]" /> Product Photo (imageUrl)
                    </label>
                    <div className="space-y-2">
                      <div className="border border-dashed border-[#d5c3b6] p-3 bg-[#f5f3ef] text-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setImageFile(e.target.files[0]);
                            }
                          }}
                          className="hidden"
                          id="admin-image-file-input"
                        />
                        <label
                          htmlFor="admin-image-file-input"
                          className="cursor-pointer text-xs font-bold text-[#825425] hover:underline flex items-center justify-center gap-1.5"
                        >
                          <Upload className="w-4 h-4" />
                          {imageFile ? imageFile.name : 'Upload File to Firebase Storage'}
                        </label>
                      </div>

                      <div className="text-[10px] text-[#837469] text-center uppercase font-bold">OR PASTE DIRECT IMAGE URL</div>

                      <input
                        type="url"
                        placeholder="https://..."
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-3 py-2 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={savingProduct || uploadingImage}
                    className="w-full btn-primary py-3 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 mt-2"
                  >
                    {savingProduct ? (
                      'Saving to Firestore...'
                    ) : editingId ? (
                      'Update Product'
                    ) : (
                      <>
                        <Plus className="w-4 h-4" /> Add Product to Menu
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Product List */}
              <div className="lg:col-span-7">
                <h3 className="font-headline-sm text-xl font-bold text-[#1b1c1a] mb-4">
                  Menu Items ({products.length})
                </h3>

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border border-[#d5c3b6] hover:border-[#825425] transition-colors gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={p.imageUrl || p.image}
                          alt={p.name}
                          className={`w-14 h-14 object-cover border border-[#d5c3b6] shrink-0 ${
                            p.available === false ? 'grayscale' : ''
                          }`}
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-base text-[#1b1c1a] truncate flex items-center gap-2">
                            {p.name}
                          </h4>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-[#825425] font-bold">
                              ₹{typeof p.price === 'number' ? p.price.toFixed(2) : p.price}
                            </span>
                            <span className="text-[#837469] text-[11px] uppercase font-semibold">
                              ({p.category})
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-[#f5f3ef]">
                        {/* Toggle Availability Button */}
                        <button
                          onClick={() => handleToggleAvailability(p)}
                          className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 border transition-colors ${
                            p.available !== false
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                              : 'bg-red-50 text-red-800 border-red-300 hover:bg-red-100'
                          }`}
                          title="Click to toggle available status"
                        >
                          {p.available !== false ? (
                            <>
                              <ToggleRight className="w-4 h-4 text-emerald-600" /> Available
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-4 h-4 text-red-600" /> Sold Out
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleEditInit(p)}
                          className="p-1.5 text-[#51443a] hover:text-[#825425] transition-colors border border-[#d5c3b6] bg-[#f5f3ef]"
                          title="Edit product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          className="p-1.5 text-red-600 hover:text-red-800 transition-colors border border-[#d5c3b6] bg-red-50"
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
            /* Settings Tab (Simple Form UI) */
            <div className="max-w-xl mx-auto bg-white p-8 border border-[#d5c3b6] shadow-sm">
              <h3 className="font-headline-sm text-xl font-bold text-[#1b1c1a] mb-2 flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#825425]" /> Edit Bakery Settings
              </h3>
              <p className="text-xs text-[#51443a] mb-6 leading-relaxed">
                Update store configuration stored in the Firestore `settings` document.
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
                    WhatsApp Number (whatsappNumber with country code) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 15550192824"
                    value={bakerySettings.whatsappNumber}
                    onChange={(e) => setBakerySettings({ ...bakerySettings, whatsappNumber: e.target.value })}
                    className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-3 py-2 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
                  />
                  <span className="text-[11px] text-[#837469] mt-1 block">
                    Used to construct wa.me links across the app.
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#51443a] uppercase tracking-wider mb-1">
                      Instagram Link / Handle (instagram) *
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
                      Opening Hours (openHours) *
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
                  className="w-full btn-primary py-3 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 mt-4"
                >
                  {savingSettings ? 'Saving Settings...' : 'Save Settings to Firestore'}
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

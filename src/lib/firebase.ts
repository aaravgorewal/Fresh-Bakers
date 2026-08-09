import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';
import { ProductItem, BakerySettings, CategoryInfo } from '../types';
import { PRODUCTS, CATEGORIES } from '../data/products';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);

export const auth = getAuth(app);
export const storage = getStorage(app);

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UNSIGNED_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UNSIGNED_UPLOAD_PRESET;
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
const SEED_STATUS_DOC = 'seed_status';

const normalizeText = (value: unknown, fallback = ''): string =>
  typeof value === 'string' ? value : fallback;

const normalizeNumber = (value: unknown, fallback = 0): number => {
  if (typeof value === 'number') return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeBoolean = (value: unknown, fallback = true): boolean =>
  value === false ? false : fallback;

const buildProductCreatePayload = (product: Partial<ProductItem>): Record<string, any> => ({
  name: normalizeText(product.name),
  category: product.category || 'Birthday Cakes',
  price: normalizeNumber(product.price ?? product.priceNum, 499),
  description: normalizeText(product.description),
  imageUrl: normalizeText(product.imageUrl ?? product.image),
  available: normalizeBoolean(product.available, true),
  fermentationHours: product.fermentationHours ?? null,
  ingredients: Array.isArray(product.ingredients) ? product.ingredients : [],
  isSignature: !!product.isSignature,
  isFeatured: !!product.isFeatured,
  isTrending: !!product.isTrending,
  isRecommended: !!product.isRecommended,
  isEggless: product.isEggless !== false,
  gallery: Array.isArray(product.gallery) ? product.gallery : [],
  weightOptions: Array.isArray(product.weightOptions) ? product.weightOptions : [],
  createdAt: new Date().toISOString(),
});

const buildProductUpdatePayload = (productData: Partial<ProductItem>): Record<string, any> => {
  const payload: Record<string, any> = {};

  if (productData.name !== undefined) payload.name = productData.name;
  if (productData.category !== undefined) payload.category = productData.category;
  if (productData.price !== undefined) payload.price = Number(productData.price);
  if (productData.priceNum !== undefined) payload.priceNum = Number(productData.priceNum);
  if (productData.description !== undefined) payload.description = productData.description;
  if (productData.imageUrl !== undefined) payload.imageUrl = productData.imageUrl;
  if (productData.image !== undefined && payload.imageUrl === undefined) payload.imageUrl = productData.image;
  if (productData.imageAlt !== undefined) payload.imageAlt = productData.imageAlt;
  if (productData.available !== undefined) payload.available = productData.available;
  if (productData.isSignature !== undefined) payload.isSignature = !!productData.isSignature;
  if (productData.isFeatured !== undefined) payload.isFeatured = !!productData.isFeatured;
  if (productData.isTrending !== undefined) payload.isTrending = !!productData.isTrending;
  if (productData.isRecommended !== undefined) payload.isRecommended = !!productData.isRecommended;
  if (productData.isEggless !== undefined) payload.isEggless = !!productData.isEggless;
  if (productData.ingredients !== undefined) payload.ingredients = productData.ingredients;
  if (productData.fermentationHours !== undefined) payload.fermentationHours = productData.fermentationHours;
  if (productData.gallery !== undefined) payload.gallery = productData.gallery;
  if (productData.weightOptions !== undefined) payload.weightOptions = productData.weightOptions;

  return payload;
};

const normalizeProductDocument = (docSnap: any): ProductItem => {
  const data = docSnap.data() as Record<string, any>;
  const imageUrl = normalizeText(data.imageUrl ?? data.image);
  const priceVal = normalizeNumber(data.price ?? data.priceNum, 0);

  return {
    id: docSnap.id,
    name: normalizeText(data.name),
    category: normalizeText(data.category) || 'Birthday Cakes',
    price: priceVal,
    description: normalizeText(data.description),
    imageUrl,
    available: data.available !== false,
    image: imageUrl,
    priceNum: priceVal,
    imageAlt: normalizeText(data.imageAlt) || normalizeText(data.name) || 'Bakery product photo',
    fermentationHours:
      typeof data.fermentationHours === 'number' ? data.fermentationHours : undefined,
    ingredients: Array.isArray(data.ingredients) ? data.ingredients : [],
    gallery: Array.isArray(data.gallery) ? data.gallery : [],
    isSignature: !!data.isSignature,
    isFeatured: !!data.isFeatured,
    isTrending: !!data.isTrending,
    isRecommended: !!data.isRecommended,
    isEggless: data.isEggless !== false,
  };
};

const cleanSettingsData = (settingsData: Partial<BakerySettings>): Record<string, any> => {
  const cleanedData: Record<string, any> = {};

  Object.entries(settingsData).forEach(([key, value]) => {
    if (value === undefined || key === 'id') return;
    if (key === 'whatsappNumber' && typeof value === 'string') {
      cleanedData[key] = value.replace(/[\+\s]/g, '');
    } else if ((key === 'deliveryFee' || key === 'minOrder') && value !== null && value !== undefined) {
      cleanedData[key] = Number(value);
    } else {
      cleanedData[key] = value;
    }
  });

  return cleanedData;
};

// Error handling helper per Firebase Integration guidelines
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const PRODUCTS_COLLECTION = 'products';
const SETTINGS_COLLECTION = 'settings';
const MAIN_SETTINGS_DOC = 'main';

export const DEFAULT_SETTINGS: BakerySettings = {
  bakeryName: 'Fresh Bakers Co.',
  tagline: 'Artisan bakery & handcrafted Indian celebration cakes baked fresh daily.',
  whatsappNumber: '919876543210',
  address: '142 MG Road, Indiranagar, Bengaluru, Karnataka 560038',
  email: 'hello@freshbakers.in',
  phone: '+91 98765 43210',
  instagram: '@freshbakers_india',
  openHours: 'Mon-Sun: 8:00 AM - 10:00 PM',
  currencySymbol: '₹',
  heroTitle: 'Handcrafted Birthday Cakes & Celebration Hampers',
  heroSubtitle: 'Baking happiness daily across India with pure Belgian chocolate, eggless gateaux, and fresh floral artistry.',
  announcementText: '✨ FREE Express Delivery on Orders Above ₹999 | Fresh Oven Batches Daily',
  heroImageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1600',
  deliveryFee: 50,
  minOrder: 299,
};

// Seed initial products into Firestore if database collection is empty AND user is authenticated
export const seedInitialProductsIfEmpty = async (): Promise<void> => {
  try {
    if (!auth.currentUser) {
      console.log('Firestore products collection seeding deferred until admin login.');
      return;
    }

    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    if (!querySnapshot.empty) return;

    const seedSentinelRef = doc(db, SETTINGS_COLLECTION, SEED_STATUS_DOC);
    const seedSnap = await getDoc(seedSentinelRef);
    if (seedSnap.exists() && seedSnap.data()?.hasSeeded) {
      console.log('Products collection is empty because products were deleted by admin. Skipping re-seed.');
      return;
    }

    console.log('Seeding initial products to Firestore...');
    for (const product of PRODUCTS) {
      await setDoc(doc(db, PRODUCTS_COLLECTION, product.id), buildProductCreatePayload(product));
    }

    await setDoc(seedSentinelRef, { hasSeeded: true, seededAt: new Date().toISOString() });
    console.log('Seeding products complete.');
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, PRODUCTS_COLLECTION);
  }
};

// Seed initial bakery settings into Firestore if empty AND user is authenticated
export const seedInitialSettingsIfEmpty = async (): Promise<void> => {
  try {
    if (!auth.currentUser) return;
    const docRef = doc(db, SETTINGS_COLLECTION, MAIN_SETTINGS_DOC);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        ...DEFAULT_SETTINGS,
        updatedAt: new Date().toISOString()
      });
      console.log('Seeded default bakery settings to Firestore.');
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${SETTINGS_COLLECTION}/${MAIN_SETTINGS_DOC}`);
  }
};

const CATEGORIES_COLLECTION = 'categories';

export const seedInitialCategoriesIfEmpty = async (): Promise<void> => {
  try {
    if (!auth.currentUser) {
      console.log('Firestore categories seeding deferred until admin login.');
      return;
    }

    const querySnapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
    if (querySnapshot.empty) {
      console.log('Seeding initial categories to Firestore...');
      for (const category of CATEGORIES) {
        await addDoc(collection(db, CATEGORIES_COLLECTION), {
          name: category.name,
          image: category.image,
          bannerImage: category.bannerImage,
          icon: category.icon,
          tagline: category.tagline,
          type: category.type,
        });
      }
      console.log('Seeding categories complete.');
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, CATEGORIES_COLLECTION);
  }
};

export const subscribeToCategories = (callback: (categories: CategoryInfo[]) => void) => {
  const colRef = collection(db, CATEGORIES_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const list: CategoryInfo[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<CategoryInfo, 'id'>),
      }));
      callback(list);
    },
    (err) => {
      handleFirestoreError(err, OperationType.LIST, CATEGORIES_COLLECTION);
    }
  );
};

export const addCategoryToFirestore = async (categoryData: Omit<CategoryInfo, 'id'>) => {
  try {
    const colRef = collection(db, CATEGORIES_COLLECTION);
    const docRef = await addDoc(colRef, categoryData);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, CATEGORIES_COLLECTION);
    throw error;
  }
};

export const updateCategoryInFirestore = async (id: string, categoryData: Partial<Omit<CategoryInfo, 'id'>>) => {
  try {
    const docRef = doc(db, CATEGORIES_COLLECTION, id);
    await setDoc(docRef, categoryData, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${CATEGORIES_COLLECTION}/${id}`);
    throw error;
  }
};

export const deleteCategoryFromFirestore = async (id: string) => {
  try {
    const docRef = doc(db, CATEGORIES_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${CATEGORIES_COLLECTION}/${id}`);
    throw error;
  }
};

// Listen to products real-time
export const subscribeToProducts = (callback: (products: ProductItem[]) => void) => {
  const colRef = collection(db, PRODUCTS_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const list: ProductItem[] = snapshot.docs.map(normalizeProductDocument);
      callback(list);
    },
    (err) => {
      handleFirestoreError(err, OperationType.LIST, PRODUCTS_COLLECTION);
    }
  );
};

// Listen to settings real-time
export const subscribeToSettings = (callback: (settings: BakerySettings) => void) => {
  const docRef = doc(db, SETTINGS_COLLECTION, MAIN_SETTINGS_DOC);
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      callback({
        id: docSnap.id,
        bakeryName: data.bakeryName || DEFAULT_SETTINGS.bakeryName,
        tagline: data.tagline || DEFAULT_SETTINGS.tagline,
        whatsappNumber: data.whatsappNumber || DEFAULT_SETTINGS.whatsappNumber,
        address: data.address || DEFAULT_SETTINGS.address,
        email: data.email || DEFAULT_SETTINGS.email,
        phone: data.phone || DEFAULT_SETTINGS.phone,
        instagram: data.instagram || DEFAULT_SETTINGS.instagram,
        openHours: data.openHours || DEFAULT_SETTINGS.openHours,
        currencySymbol: data.currencySymbol || DEFAULT_SETTINGS.currencySymbol,
        heroTitle: data.heroTitle || DEFAULT_SETTINGS.heroTitle,
        heroSubtitle: data.heroSubtitle || DEFAULT_SETTINGS.heroSubtitle,
        announcementText: data.announcementText || DEFAULT_SETTINGS.announcementText,
        heroImageUrl: data.heroImageUrl || DEFAULT_SETTINGS.heroImageUrl,
        deliveryFee: data.deliveryFee !== undefined ? data.deliveryFee : DEFAULT_SETTINGS.deliveryFee,
        minOrder: data.minOrder !== undefined ? data.minOrder : DEFAULT_SETTINGS.minOrder,
      });
    } else {
      callback(DEFAULT_SETTINGS);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, `${SETTINGS_COLLECTION}/${MAIN_SETTINGS_DOC}`);
  });
};

// Admin settings update
export const updateBakerySettings = async (settingsData: Partial<BakerySettings>) => {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, MAIN_SETTINGS_DOC);
    await setDoc(docRef, {
      ...cleanSettingsData(settingsData),
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${SETTINGS_COLLECTION}/${MAIN_SETTINGS_DOC}`);
    throw error;
  }
};

// Admin product CRUD
export const addProductToFirestore = async (productData: Omit<ProductItem, 'id'>) => {
  try {
    const colRef = collection(db, PRODUCTS_COLLECTION);
    const docRef = await addDoc(colRef, buildProductCreatePayload(productData));
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, PRODUCTS_COLLECTION);
    throw error;
  }
};

export const updateProductInFirestore = async (id: string, productData: Partial<ProductItem>) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const updatePayload = buildProductUpdatePayload(productData);
    await setDoc(docRef, updatePayload, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${PRODUCTS_COLLECTION}/${id}`);
    throw error;
  }
};

const getStoragePathFromDownloadUrl = (downloadUrl: string): string | null => {
  try {
    const parsed = new URL(downloadUrl);
    if (!parsed.hostname.includes('firebasestorage.googleapis.com')) {
      return null;
    }
    const pathIndex = parsed.pathname.indexOf('/o/');
    if (pathIndex === -1) {
      return null;
    }
    const encodedPath = parsed.pathname.slice(pathIndex + 3);
    return decodeURIComponent(encodedPath);
  } catch {
    return null;
  }
};

export const deleteProductFromFirestore = async (id: string) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const productSnapshot = await getDoc(docRef);
    if (productSnapshot.exists()) {
      const productData = productSnapshot.data();
      const imageUrl = productData?.imageUrl || productData?.image;
      if (typeof imageUrl === 'string') {
        const storagePath = getStoragePathFromDownloadUrl(imageUrl);
        if (storagePath) {
          try {
            await deleteObject(ref(storage, storagePath));
          } catch (storageError) {
            console.warn('Failed to delete associated storage object:', storageError);
          }
        }
      }
    }
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${PRODUCTS_COLLECTION}/${id}`);
    throw error;
  }
};

// Image Upload to Cloudinary
export const uploadProductImage = async (file: File): Promise<string> => {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UNSIGNED_UPLOAD_PRESET) {
    throw new Error('Cloudinary configuration is missing. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UNSIGNED_UPLOAD_PRESET.');
  }

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UNSIGNED_UPLOAD_PRESET);

    console.log('Cloudinary upload URL:', CLOUDINARY_UPLOAD_URL);

    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Cloudinary upload failed: ${errorText}`);
    }

    const data = await response.json();
    if (!data?.secure_url) {
      throw new Error('Cloudinary did not return a secure_url');
    }

    return data.secure_url;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'cloudinary/products');
    throw error;
  }
};

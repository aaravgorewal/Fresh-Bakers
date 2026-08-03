import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, signInAnonymously } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';
import { ProductItem, BakerySettings } from '../types';
import { PRODUCTS } from '../data/products';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export const auth = getAuth(app);
export const storage = getStorage(app);

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
  tagline: 'Artisan sourdoughs & handcrafted pastries baked fresh daily.',
  whatsappNumber: '15550192824',
  address: '142 Artisan Boulevard, Breadville',
  email: 'hello@freshbakers.com',
  phone: '+1 555-019-2824',
  instagram: '@freshbakers',
  openHours: 'Tue-Sun: 7am - 4pm',
  currencySymbol: '₹',
  heroTitle: 'Handcrafted Birthday Cakes & Celebration Hampers',
  heroSubtitle: 'Baking happiness daily with organic stone-ground flours, pure Belgian chocolate, and fresh floral artistry.',
  announcementText: '✨ FREE Express Delivery on Orders Above ₹999 | Daily Fresh Oven Batches',
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
    if (querySnapshot.empty) {
      const seedSentinelRef = doc(db, SETTINGS_COLLECTION, 'seed_status');
      const seedSnap = await getDoc(seedSentinelRef);
      if (seedSnap.exists() && seedSnap.data()?.hasSeeded) {
        console.log('Products collection is empty because products were deleted by admin. Skipping re-seed.');
        return;
      }

      console.log('Seeding initial products to Firestore...');
      for (const product of PRODUCTS) {
        await setDoc(doc(db, PRODUCTS_COLLECTION, product.id), {
          name: product.name,
          category: product.category,
          price: product.priceNum ?? product.price ?? 499,
          description: product.description || '',
          imageUrl: product.image || product.imageUrl || '',
          available: product.available !== false,
          fermentationHours: product.fermentationHours || null,
          ingredients: product.ingredients || [],
          isSignature: !!product.isSignature,
          isFeatured: !!product.isFeatured,
          isTrending: !!product.isTrending,
          isRecommended: !!product.isRecommended,
          isEggless: product.isEggless !== false,
          createdAt: new Date().toISOString()
        });
      }
      await setDoc(seedSentinelRef, { hasSeeded: true, seededAt: new Date().toISOString() });
      console.log('Seeding products complete.');
    }
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

// Listen to products real-time
export const subscribeToProducts = (callback: (products: ProductItem[]) => void) => {
  const colRef = collection(db, PRODUCTS_COLLECTION);
  return onSnapshot(colRef, (snapshot) => {
    if (snapshot.empty) {
      callback([]);
      return;
    }
    const list: ProductItem[] = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      const priceVal = typeof data.price === 'number' ? data.price : (Number(data.priceNum) || 0);
      const imgVal = data.imageUrl || data.image || '';
      return {
        id: docSnap.id,
        name: data.name || '',
        category: data.category || 'Birthday Cakes',
        price: priceVal,
        description: data.description || '',
        imageUrl: imgVal,
        available: data.available !== false,
        // UI compatibility properties
        image: imgVal,
        priceNum: priceVal,
        imageAlt: data.imageAlt || data.name || 'Bakery product photo',
        fermentationHours: data.fermentationHours || undefined,
        ingredients: data.ingredients || [],
        isSignature: !!data.isSignature,
        isFeatured: !!data.isFeatured,
        isTrending: !!data.isTrending,
        isRecommended: !!data.isRecommended,
        isEggless: data.isEggless !== false,
      };
    });
    callback(list);
  }, (err) => {
    handleFirestoreError(err, OperationType.LIST, PRODUCTS_COLLECTION);
  });
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
      ...settingsData,
      updatedAt: new Date().toISOString()
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
    const docRef = await addDoc(colRef, {
      name: productData.name,
      price: Number(productData.price),
      category: productData.category,
      description: productData.description || '',
      imageUrl: productData.imageUrl || productData.image || '',
      available: productData.available !== false,
      fermentationHours: productData.fermentationHours || null,
      ingredients: productData.ingredients || [],
      isSignature: !!productData.isSignature,
      isFeatured: !!productData.isFeatured,
      isTrending: !!productData.isTrending,
      isRecommended: !!productData.isRecommended,
      isEggless: productData.isEggless !== false,
      gallery: productData.gallery || [],
      weightOptions: productData.weightOptions || [],
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, PRODUCTS_COLLECTION);
    throw error;
  }
};

export const updateProductInFirestore = async (id: string, productData: Partial<ProductItem>) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const updatePayload: Record<string, any> = {};

    if (productData.name !== undefined) updatePayload.name = productData.name;
    if (productData.category !== undefined) updatePayload.category = productData.category;
    if (productData.price !== undefined) updatePayload.price = Number(productData.price);
    if (productData.description !== undefined) updatePayload.description = productData.description;
    if (productData.imageUrl !== undefined) updatePayload.imageUrl = productData.imageUrl;
    if (productData.image !== undefined && !productData.imageUrl) updatePayload.imageUrl = productData.image;
    if (productData.available !== undefined) updatePayload.available = productData.available;
    if (productData.isSignature !== undefined) updatePayload.isSignature = !!productData.isSignature;
    if (productData.isFeatured !== undefined) updatePayload.isFeatured = !!productData.isFeatured;
    if (productData.isTrending !== undefined) updatePayload.isTrending = !!productData.isTrending;
    if (productData.isRecommended !== undefined) updatePayload.isRecommended = !!productData.isRecommended;
    if (productData.isEggless !== undefined) updatePayload.isEggless = !!productData.isEggless;
    if (productData.ingredients !== undefined) updatePayload.ingredients = productData.ingredients;
    if (productData.fermentationHours !== undefined) updatePayload.fermentationHours = productData.fermentationHours;

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      const fallback = PRODUCTS.find((p) => p.id === id);
      const fullDoc = {
        name: productData.name || fallback?.name || 'Bakery Item',
        category: productData.category || fallback?.category || 'Birthday Cakes',
        price: productData.price !== undefined ? Number(productData.price) : (fallback?.priceNum ?? 499),
        description: productData.description || fallback?.description || '',
        imageUrl: productData.imageUrl || productData.image || fallback?.image || '',
        available: productData.available !== undefined ? productData.available : (fallback?.available !== false),
        fermentationHours: fallback?.fermentationHours || null,
        ingredients: productData.ingredients || fallback?.ingredients || [],
        isSignature: productData.isSignature !== undefined ? !!productData.isSignature : !!fallback?.isSignature,
        isFeatured: productData.isFeatured !== undefined ? !!productData.isFeatured : !!fallback?.isFeatured,
        isTrending: productData.isTrending !== undefined ? !!productData.isTrending : !!fallback?.isTrending,
        isRecommended: productData.isRecommended !== undefined ? !!productData.isRecommended : !!fallback?.isRecommended,
        isEggless: productData.isEggless !== undefined ? !!productData.isEggless : (fallback?.isEggless !== false),
        createdAt: new Date().toISOString(),
        ...updatePayload,
      };
      await setDoc(docRef, fullDoc);
    } else {
      await updateDoc(docRef, updatePayload);
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${PRODUCTS_COLLECTION}/${id}`);
    throw error;
  }
};

export const deleteProductFromFirestore = async (id: string) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${PRODUCTS_COLLECTION}/${id}`);
    throw error;
  }
};

// Image Upload to Firebase Storage
export const uploadProductImage = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(snapshot.ref);
  return downloadUrl;
};

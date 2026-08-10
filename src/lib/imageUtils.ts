/**
 * Utility to inject Cloudinary optimization flags (f_auto, q_auto, dynamic width)
 * into image URLs without modifying stored Firestore data.
 */
export const getOptimizedImageUrl = (url: string, width = 800): string => {
  if (!url || typeof url !== 'string') return url;

  // Cloudinary image URL handling
  if (url.includes('res.cloudinary.com')) {
    if (url.includes('/f_auto') || url.includes('/q_auto')) {
      return url;
    }
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
  }

  // Unsplash image URL handling
  if (url.includes('images.unsplash.com')) {
    if (url.includes('w=')) {
      return url.replace(/w=\d+/, `w=${width}`);
    }
    return `${url}&w=${width}&auto=format&fit=crop&q=80`;
  }

  return url;
};

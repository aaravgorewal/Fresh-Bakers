import React from 'react';
import { motion } from 'motion/react';

// 1. Scroll Reveal Component
interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  className?: string;
  scale?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  distance = 30,
  duration = 0.6,
  className = '',
  scale = false,
}) => {
  let initialX = 0;
  let initialY = 0;

  if (direction === 'up') initialY = distance;
  if (direction === 'down') initialY = -distance;
  if (direction === 'left') initialX = distance;
  if (direction === 'right') initialX = -distance;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: initialX,
        y: initialY,
        scale: scale ? 0.94 : 1,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// 2. Image Zoom Container
interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  badge?: React.ReactNode;
  overlayOnHover?: boolean;
}

export const ImageZoom: React.FC<ImageZoomProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-square',
  badge,
  overlayOnHover = true,
}) => {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-[#f7f2ec] ${aspectRatio} ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600';
        }}
      />
      {overlayOnHover && (
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.15 }}
          className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-300"
        />
      )}
      {badge && <div className="absolute top-3 left-3 z-10">{badge}</div>}
    </div>
  );
};

// 3. Motion Ripple Button
type RippleButtonProps = Omit<React.ComponentPropsWithoutRef<typeof motion.button>, 'children'> & {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp';
  icon?: React.ReactNode;
};

export const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  icon,
  onClick,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center gap-2 font-bold transition-all overflow-hidden rounded-lg active:scale-95 cursor-pointer';

  const variantStyles = {
    primary: 'bg-[#7B3F00] hover:bg-[#5B2E00] text-white shadow-md hover:shadow-lg',
    secondary: 'bg-[#FFF8F2] hover:bg-[#FDF1E5] text-[#7B3F00] border border-[#F2E0D0]',
    outline: 'border-2 border-[#7B3F00] text-[#7B3F00] hover:bg-[#7B3F00] hover:text-white',
    ghost: 'text-[#2C1A0E] hover:bg-[#FDF1E5] hover:text-[#7B3F00]',
    whatsapp: 'bg-[#22C55E] hover:bg-[#16a34a] text-white shadow-md hover:shadow-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {/* Shine sweep overlay */}
      <motion.span
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.75, ease: 'easeInOut' }}
        className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 pointer-events-none"
      />
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

// 4. Loading Skeletons
export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`bg-white border border-[#e8d8cb] rounded-2xl p-4 shadow-sm space-y-4 animate-pulse ${className}`}>
      <div className="w-full aspect-square bg-[#f0e8e0] rounded-xl" />
      <div className="space-y-2">
        <div className="h-4 bg-[#f0e8e0] rounded w-3/4" />
        <div className="h-3 bg-[#f0e8e0] rounded w-1/2" />
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="h-5 bg-[#f0e8e0] rounded w-1/3" />
        <div className="h-9 bg-[#f0e8e0] rounded-lg w-24" />
      </div>
    </div>
  );
};

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className = '',
}) => {
  return (
    <div className={`space-y-2 animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3.5 bg-[#f0e8e0] rounded"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  );
};

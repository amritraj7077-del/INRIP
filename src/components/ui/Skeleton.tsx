import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton = ({
  className = '',
  variant = 'text',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) => {
  const baseClasses = 'bg-slate-200 dark:bg-slate-700';
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: '',
    none: '',
  };

  const style: React.CSSProperties = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1rem' : undefined),
  };

  if (animation === 'wave') {
    return (
      <motion.div
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        style={style}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    );
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  );
};

export const CardSkeleton = () => (
  <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
    <Skeleton variant="circular" width={56} height={56} className="mb-4" />
    <Skeleton variant="text" width="60%" height={24} className="mb-2" />
    <Skeleton variant="text" width="100%" height={16} />
    <Skeleton variant="text" width="80%" height={16} className="mt-2" />
  </div>
);

export const FeatureCardSkeleton = () => (
  <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 h-full">
    <Skeleton variant="rectangular" width={56} height={56} className="mb-4" />
    <Skeleton variant="text" width="70%" height={24} className="mb-2" />
    <Skeleton variant="text" width="100%" height={16} />
    <Skeleton variant="text" width="90%" height={16} className="mt-2" />
  </div>
);

export const HeroSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <Skeleton variant="text" width="80%" height={48} className="mb-4" />
        <Skeleton variant="text" width="60%" height={48} className="mb-4" />
        <Skeleton variant="text" width="100%" height={24} className="mb-6" />
        <div className="flex gap-4">
          <Skeleton variant="rectangular" width={180} height={48} />
          <Skeleton variant="rectangular" width={180} height={48} />
        </div>
      </div>
      <div className="hidden lg:block">
        <Skeleton variant="rectangular" width="100%" height={400} className="rounded-3xl" />
      </div>
    </div>
  </div>
);

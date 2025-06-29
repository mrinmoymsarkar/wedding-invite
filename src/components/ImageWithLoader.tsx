import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  aspectRatio?: 'square' | 'auto';
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ 
  src, 
  alt, 
  className = '', 
  onClick,
  aspectRatio = 'square'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div 
      className={`relative overflow-hidden ${aspectRatio === 'square' ? 'aspect-square' : ''} ${className}`}
      onClick={onClick}
    >
      {/* Loading placeholder */}
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-700 dark:to-dark-600 flex items-center justify-center"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent animate-shimmer"></div>
          
          {/* Loading icon */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex flex-col items-center space-y-2 text-gray-400 dark:text-gray-500"
          >
            <ImageIcon className="h-8 w-8" />
            <div className="text-xs font-medium">Loading...</div>
          </motion.div>
          
          {/* Animated dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-bengali-crimson/30 dark:bg-bengali-gold/30 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-dark-700 flex items-center justify-center">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <div className="text-xs">Failed to load</div>
          </div>
        </div>
      )}

      {/* Actual image */}
      <motion.img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded && !hasError ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`w-full h-full object-cover ${onClick ? 'cursor-pointer' : ''} ${
          isLoaded ? 'group-hover:scale-110 transition-transform duration-500' : ''
        }`}
        loading="lazy"
      />
    </div>
  );
};

export default ImageWithLoader;
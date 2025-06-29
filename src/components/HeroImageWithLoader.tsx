import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Users } from 'lucide-react';

interface HeroImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
}

const HeroImageWithLoader: React.FC<HeroImageWithLoaderProps> = ({ 
  src, 
  alt, 
  className = ''
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
    <div className={`relative ${className}`}>
      {/* Loading placeholder that mimics the actual image */}
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-br from-bengali-cream to-bengali-ivory dark:from-dark-700 dark:to-dark-600 rounded-lg md:rounded-xl overflow-hidden"
        >
          {/* Background pattern similar to the wedding image */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 via-orange-50/30 to-yellow-100/50 dark:from-pink-900/20 dark:via-orange-900/10 dark:to-yellow-900/20"></div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent animate-shimmer"></div>
          
          {/* Wedding couple silhouette placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Couple silhouette */}
              <motion.div
                animate={{ 
                  scale: [0.9, 1, 0.9],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex items-end justify-center space-x-2"
              >
                {/* Bride figure */}
                <div className="relative">
                  <div className="w-16 h-20 md:w-20 md:h-24 bg-gradient-to-b from-bengali-crimson/20 to-bengali-deep-red/30 rounded-t-full"></div>
                  <div className="w-20 h-12 md:w-24 md:h-16 bg-gradient-to-b from-bengali-crimson/15 to-bengali-deep-red/25 rounded-b-full -mt-2"></div>
                  {/* Bride's veil */}
                  <motion.div
                    animate={{ 
                      scaleX: [1, 1.1, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    className="absolute -top-2 -left-2 w-24 h-16 md:w-28 md:h-20 bg-white/20 dark:bg-white/10 rounded-full"
                  ></motion.div>
                </div>
                
                {/* Groom figure */}
                <div className="relative">
                  <div className="w-14 h-20 md:w-18 md:h-24 bg-gradient-to-b from-bengali-gold/20 to-bengali-amber/30 rounded-t-full"></div>
                  <div className="w-16 h-12 md:w-20 md:h-16 bg-gradient-to-b from-bengali-gold/15 to-bengali-amber/25 rounded-b-full -mt-2"></div>
                </div>
              </motion.div>
              
              {/* Floating hearts around couple */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-bengali-crimson/30 dark:text-bengali-gold/30"
                  style={{
                    top: `${10 + Math.sin(i * Math.PI / 3) * 40}%`,
                    left: `${10 + Math.cos(i * Math.PI / 3) * 40}%`
                  }}
                  animate={{
                    y: [0, -10, 0],
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.2, 0.6, 0.2]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut"
                  }}
                >
                  <Heart className="h-3 w-3 md:h-4 md:w-4" fill="currentColor" />
                </motion.div>
              ))}
              
              {/* Sparkles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-bengali-gold/40 dark:text-bengali-amber/40"
                  style={{
                    top: `${Math.random() * 80 + 10}%`,
                    left: `${Math.random() * 80 + 10}%`
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="h-2 w-2 md:h-3 md:w-3" />
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Loading text at bottom */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
            <motion.div
              animate={{ 
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="text-sm md:text-base font-medium font-bengali text-bengali-deep-red dark:text-bengali-gold mb-1">
                ছবি লোড হচ্ছে...
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Loading wedding illustration...
              </div>
            </motion.div>
            
            {/* Animated progress dots */}
            <div className="flex justify-center space-x-1 mt-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 md:w-2 md:h-2 bg-bengali-crimson dark:bg-bengali-gold rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Decorative elements */}
          <motion.div
            className="absolute top-4 right-4 w-6 h-6 md:w-8 md:h-8 border-2 border-bengali-gold/30 rounded-full"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          <motion.div
            className="absolute bottom-4 left-4 w-4 h-4 md:w-6 md:h-6 border-2 border-bengali-crimson/30 rounded-full"
            animate={{
              rotate: [360, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{
              rotate: { duration: 6, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
          />
          
          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-lg md:rounded-xl border-2"
            animate={{
              borderColor: [
                "rgba(255, 215, 0, 0.3)",
                "rgba(220, 20, 60, 0.3)",
                "rgba(255, 193, 7, 0.3)",
                "rgba(255, 215, 0, 0.3)"
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-700 dark:to-dark-600 rounded-lg md:rounded-xl flex items-center justify-center">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <Users className="h-8 w-8 md:h-12 md:w-12 mx-auto mb-2 opacity-50" />
            <div className="text-sm font-medium mb-1">Wedding image unavailable</div>
            <div className="text-xs">Please check your connection</div>
          </div>
        </div>
      )}

      {/* Actual image */}
      <motion.img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: isLoaded && !hasError ? 1 : 0,
          scale: isLoaded && !hasError ? 1 : 0.95
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full h-auto rounded-lg md:rounded-xl shadow-md md:shadow-lg"
        loading="eager" // Load immediately since it's above the fold
      />
    </div>
  );
};

export default HeroImageWithLoader;
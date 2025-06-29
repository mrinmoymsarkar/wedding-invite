import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { GALLERY_CONFIG, GALLERY_CATEGORIES } from '../config/gallery-config';
import { CONTENT_CONFIG } from '../config/content-config';
import ImageWithLoader from './ImageWithLoader';

const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredImages = activeCategory === 'all' 
    ? GALLERY_CONFIG 
    : GALLERY_CONFIG.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = selectedImage;
    const totalImages = filteredImages.length;
    
    if (direction === 'prev') {
      setSelectedImage(currentIndex === 0 ? totalImages - 1 : currentIndex - 1);
    } else {
      setSelectedImage(currentIndex === totalImages - 1 ? 0 : currentIndex + 1);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-white dark:bg-dark-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-bengali-gold/20 rounded-full"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + Math.sin(i) * 40}%`
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Enhanced Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4"
            animate={{
              backgroundImage: [
                'linear-gradient(45deg, #DC143C, #FFD700)',
                'linear-gradient(135deg, #FFD700, #FFC107)',
                'linear-gradient(225deg, #FFC107, #DC143C)',
                'linear-gradient(315deg, #DC143C, #FFD700)'
              ]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >
            {t('gallery.title')}
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 font-bengali mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {t('gallery.title_local')}
          </motion.p>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-bengali-deep-red to-bengali-gold mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          
          <motion.p 
            className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {CONTENT_CONFIG.gallery.description}
          </motion.p>
        </motion.div>

        {/* Enhanced Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {GALLERY_CATEGORIES.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 overflow-hidden ${
                activeCategory === category.id
                  ? 'text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600'
              }`}
            >
              {/* Animated Background for Active Button */}
              {activeCategory === category.id && (
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      'linear-gradient(45deg, #DC143C, #FFD700)',
                      'linear-gradient(135deg, #FFD700, #FFC107)',
                      'linear-gradient(225deg, #FFC107, #DC143C)',
                      'linear-gradient(315deg, #DC143C, #FFD700)'
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
              
              {/* Sparkle Effect for Active Button */}
              {activeCategory === category.id && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-white/50"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${30 + Math.sin(i) * 20}%`
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    >
                      <Sparkles className="h-2 w-2" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
              
              <span className="relative z-10 block">{category.name}</span>
              <span className="relative z-10 block text-xs font-bengali">{category.local}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                transition={{ 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  scale: 1.02
                }}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-magical transition-all duration-500"
                onClick={() => openLightbox(index)}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Magical Border */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  animate={{
                    background: [
                      'linear-gradient(0deg, rgba(255, 215, 0, 0.3), rgba(220, 20, 60, 0.3))',
                      'linear-gradient(90deg, rgba(220, 20, 60, 0.3), rgba(255, 193, 7, 0.3))',
                      'linear-gradient(180deg, rgba(255, 193, 7, 0.3), rgba(255, 215, 0, 0.3))',
                      'linear-gradient(270deg, rgba(255, 215, 0, 0.3), rgba(220, 20, 60, 0.3))'
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ padding: '2px' }}
                >
                  <div className="w-full h-full bg-white dark:bg-dark-800 rounded-xl" />
                </motion.div>

                <div className="relative z-10 aspect-square">
                  <ImageWithLoader
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-full"
                  />
                </div>

                {/* Enhanced Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="absolute bottom-4 left-4 right-4">
                    <motion.p 
                      className="text-white text-sm font-medium"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {image.caption}
                    </motion.p>
                  </div>
                  
                  {/* Sparkle Effects */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-bengali-gold"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${20 + i * 20}%`
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        rotate: [0, 180, 360],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    >
                      <Sparkles className="h-3 w-3" />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              {/* Animated Background Pattern */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 20%, rgba(220, 20, 60, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 50% 50%, rgba(255, 193, 7, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 20%, rgba(220, 20, 60, 0.1) 0%, transparent 50%)'
                  ]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <motion.div
                initial={{ scale: 0.8, rotateY: -15 }}
                animate={{ scale: 1, rotateY: 0 }}
                exit={{ scale: 0.8, rotateY: 15 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filteredImages[selectedImage].url}
                  alt={filteredImages[selectedImage].caption}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-magical"
                />
                
                {/* Enhanced Navigation Buttons */}
                <motion.button
                  onClick={() => navigateImage('prev')}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors backdrop-blur-sm"
                >
                  <ChevronLeft className="h-6 w-6" />
                </motion.button>
                
                <motion.button
                  onClick={() => navigateImage('next')}
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors backdrop-blur-sm"
                >
                  <ChevronRight className="h-6 w-6" />
                </motion.button>

                {/* Enhanced Close Button */}
                <motion.button
                  onClick={closeLightbox}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors backdrop-blur-sm"
                >
                  <X className="h-6 w-6" />
                </motion.button>

                {/* Enhanced Caption */}
                <motion.div 
                  className="absolute bottom-4 left-4 right-4 text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-white text-lg font-medium bg-black/50 rounded-lg px-4 py-2 backdrop-blur-sm">
                    {filteredImages[selectedImage].caption}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
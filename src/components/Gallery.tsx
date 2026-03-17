import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, Users, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { GALLERY_CONFIG, GALLERY_CATEGORIES } from '../config/gallery-config';
import { CONTENT_CONFIG } from '../config/content-config';
import ImageWithLoader from './ImageWithLoader';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const FOLDER = 'wedding-photos';
const RECEPTION_DATE = new Date('2026-03-22T23:59:00+05:30');

const Gallery: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const allEventsPast = new Date() > RECEPTION_DATE;
  const [activeCategory, setActiveCategory] = useState<string>(allEventsPast ? 'all' : 'memories');
  const [uploadedPhotos, setUploadedPhotos] = useState<{ id: number; url: string; caption: string; category: string }[]>([]);

  // Load uploaded photos from localStorage + Cloudinary list
  useEffect(() => {
    const loadUploads = async () => {
      const photos: { id: number; url: string; caption: string; category: string }[] = [];
      const seenIds = new Set<string>();

      // localStorage first (has correct category from upload)
      const localMap = new Map<string, { url: string; category: string }>();
      try {
        const local = JSON.parse(localStorage.getItem('wedding-uploaded-photos') || '[]');
        local.forEach((p: any, i: number) => {
          localMap.set(p.id, { url: p.url, category: p.category || '' });
          if (!seenIds.has(p.id)) {
            seenIds.add(p.id);
            photos.push({
              id: 20000 + i,
              url: p.url,
              caption: '',
              category: p.category || '',
            });
          }
        });
      } catch { /* ignore */ }

      // Cloudinary list endpoint (supplements with photos from other devices)
      if (CLOUD_NAME) {
        try {
          const res = await fetch(`https://res.cloudinary.com/${CLOUD_NAME}/image/list/${FOLDER}.json`);
          if (res.ok) {
            const data = await res.json();
            (data.resources || []).forEach((r: any, i: number) => {
              const publicId = r.public_id;
              if (!seenIds.has(publicId)) {
                seenIds.add(publicId);
                photos.push({
                  id: 10000 + i,
                  url: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_800,q_auto,f_auto/${publicId}.${r.format}`,
                  caption: r.context?.custom?.caption || '',
                  category: r.context?.custom?.category || '',
                });
              }
            });
          }
        } catch { /* ignore */ }
      }

      setUploadedPhotos(photos);
    };

    loadUploads();
  }, []);

  const allCategories = GALLERY_CATEGORIES;

  // Merge config images + uploaded photos for the active category
  const configImages = GALLERY_CONFIG.filter(img => activeCategory === 'all' || img.category === activeCategory);
  const uploadImages = uploadedPhotos.filter(p => activeCategory === 'all' || p.category === activeCategory);
  const filteredImages = [...configImages, ...uploadImages];
  const isComingSoon = activeCategory !== 'all' && activeCategory !== 'memories' && filteredImages.length === 0;

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
    <section id="gallery" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-bengali-ivory dark:bg-dark-800">
        <div className="absolute inset-0 bg-royal-pattern opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-elegant italic text-bengali-gold text-lg mb-4"
          >
            Our Memories
          </motion.p>

          <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl text-royal-charcoal dark:text-bengali-ivory mb-4">
            {t('gallery.title')}
          </h2>

          <p className="bengali-text text-xl text-bengali-deep-red dark:text-bengali-gold mb-8">
            {t('gallery.title_local')}
          </p>

          {/* Elegant divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-bengali-gold/50" />
            <div className="w-2 h-2 rotate-45 border border-bengali-gold/50" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-bengali-gold/50" />
          </div>

          <p className="font-body text-royal-charcoal/70 dark:text-bengali-ivory/70 max-w-2xl mx-auto leading-relaxed">
            {CONTENT_CONFIG.gallery.description}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16"
        >
          {allCategories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`px-5 py-2.5 rounded-full font-body text-sm tracking-wide transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-bengali-deep-red text-bengali-ivory dark:bg-bengali-gold dark:text-royal-charcoal'
                  : 'bg-bengali-ivory dark:bg-dark-700 text-royal-charcoal/70 dark:text-bengali-ivory/70 border border-bengali-gold/20 hover:border-bengali-gold/40'
              }`}
            >
              <span className="block">{category.name}</span>
              <span className="block bengali-text text-xs opacity-70">{category.local}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid or Coming Soon / No Photos */}
        {isComingSoon ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-24 md:py-32"
          >
            <Camera className="h-16 w-16 text-bengali-gold/40 mb-6" />
            {allEventsPast ? (
              <>
                <h3 className="heading-display text-2xl md:text-3xl text-royal-charcoal/70 dark:text-bengali-ivory/70 mb-3">
                  {language === 'bn' ? 'এখনো কোনো ছবি নেই' : language === 'mr' ? 'अजून फोटो नाहीत' : 'No photos yet'}
                </h3>
                <p className="font-body text-royal-charcoal/50 dark:text-bengali-ivory/50 text-center max-w-md mb-6">
                  {language === 'bn'
                    ? 'এই বিভাগে প্রথম ছবি শেয়ার করুন!'
                    : language === 'mr'
                    ? 'या विभागात पहिला फोटो शेअर करा!'
                    : 'Be the first to share photos in this section!'}
                </p>
                <Link
                  to="/photos"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-bengali-deep-red hover:bg-bengali-vermillion dark:bg-bengali-gold dark:hover:bg-bengali-marigold text-bengali-ivory dark:text-royal-charcoal font-body font-medium transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  {language === 'bn' ? 'ছবি আপলোড করুন' : language === 'mr' ? 'फोटो अपलोड करा' : 'Upload Photos'}
                </Link>
              </>
            ) : (
              <>
                <h3 className="heading-display text-2xl md:text-3xl text-royal-charcoal/70 dark:text-bengali-ivory/70 mb-3">
                  {language === 'bn' ? 'শীঘ্রই আসছে' : language === 'mr' ? 'लवकरच येत आहे' : 'Coming Soon'}
                </h3>
                <p className="font-body text-royal-charcoal/50 dark:text-bengali-ivory/50 text-center max-w-md">
                  {language === 'bn'
                    ? 'এই মুহূর্তগুলো শীঘ্রই যোগ করা হবে। অনুগ্রহ করে পরে আবার দেখুন!'
                    : language === 'mr'
                    ? 'हे क्षण लवकरच जोडले जातील. कृपया नंतर पुन्हा भेट द्या!'
                    : 'These moments will be added soon. Please check back later!'}
                </p>
              </>
            )}
          </motion.div>
        ) : (
          <>
            {/* Config / curated images */}
            {configImages.length > 0 && (
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {configImages.map((image, index) => (
                    <motion.div
                      key={image.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ y: -4 }}
                      className="group cursor-pointer"
                      onClick={() => openLightbox(index)}
                    >
                      <div className="relative aspect-square overflow-hidden rounded-lg elegant-card dark:elegant-card-dark">
                        <ImageWithLoader
                          src={image.url}
                          alt={image.caption}
                          className="w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-royal-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <p className="font-body text-bengali-ivory text-sm">{image.caption}</p>
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute top-0 right-0 w-full h-px bg-bengali-gold/60" />
                          <div className="absolute top-0 right-0 h-full w-px bg-bengali-gold/60" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Uploaded by Guests sub-section */}
            {uploadImages.length > 0 && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 mt-16 mb-8"
                >
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-bengali-gold/20" />
                  <div className="flex items-center gap-2 text-royal-charcoal/50 dark:text-bengali-ivory/50">
                    <Users className="h-4 w-4" />
                    <span className="font-body text-sm tracking-wide">
                      {language === 'bn' ? 'অতিথিদের তোলা ছবি' : language === 'mr' ? 'पाहुण्यांनी काढलेले फोटो' : 'Uploaded by Guests'}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-bengali-gold/20" />
                </motion.div>

                <motion.div
                  layout
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {uploadImages.map((image, index) => (
                      <motion.div
                        key={image.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        whileHover={{ y: -4 }}
                        className="group cursor-pointer"
                        onClick={() => openLightbox(configImages.length + index)}
                      >
                        <div className="relative aspect-square overflow-hidden rounded-lg elegant-card dark:elegant-card-dark">
                          <ImageWithLoader
                            src={image.url}
                            alt={image.caption}
                            className="w-full h-full"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-royal-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <p className="font-body text-bengali-ivory text-sm">{image.caption}</p>
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute top-0 right-0 w-full h-px bg-bengali-gold/60" />
                            <div className="absolute top-0 right-0 h-full w-px bg-bengali-gold/60" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </>
            )}
          </>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-royal-charcoal/95 dark:bg-black/95 flex items-center justify-center p-4 md:p-8"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={filteredImages[selectedImage].url}
                    alt={filteredImages[selectedImage].caption}
                    className="w-full max-h-[80vh] object-contain rounded-lg"
                  />

                  {/* Navigation */}
                  <button
                    onClick={() => navigateImage('prev')}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-bengali-ivory/10 hover:bg-bengali-ivory/20 text-bengali-ivory transition-colors backdrop-blur-sm"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  <button
                    onClick={() => navigateImage('next')}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-bengali-ivory/10 hover:bg-bengali-ivory/20 text-bengali-ivory transition-colors backdrop-blur-sm"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>

                  {/* Close button */}
                  <button
                    onClick={closeLightbox}
                    className="absolute top-2 md:top-4 right-2 md:right-4 p-3 rounded-full bg-bengali-ivory/10 hover:bg-bengali-ivory/20 text-bengali-ivory transition-colors backdrop-blur-sm"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Caption */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mt-6"
                >
                  <p className="font-body text-bengali-ivory/90">
                    {filteredImages[selectedImage].caption}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bengali-gold/20 to-transparent" />
    </section>
  );
};

export default Gallery;

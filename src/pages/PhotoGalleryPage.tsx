import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Camera, ChevronLeft, ChevronRight, X, Upload, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const FOLDER = 'wedding-photos';

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  context?: { custom?: { caption?: string } };
}

const PhotoGalleryPage: React.FC = () => {
  const [photos, setPhotos] = useState<CloudinaryResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    const allPhotos: CloudinaryResource[] = [];

    // 1. Try Cloudinary list endpoint (works if Resource List is enabled + photos are tagged)
    if (CLOUD_NAME) {
      try {
        const res = await fetch(
          `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${FOLDER}.json`
        );
        if (res.ok) {
          const data = await res.json();
          const resources = (data.resources || []).map((r: any) => ({
            ...r,
            secure_url: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${r.public_id}.${r.format}`,
          }));
          allPhotos.push(...resources);
        }
      } catch { /* ignore */ }
    }

    // 2. Merge with localStorage (photos uploaded from this device)
    try {
      const local = JSON.parse(localStorage.getItem('wedding-uploaded-photos') || '[]');
      const existingIds = new Set(allPhotos.map((p) => p.public_id));
      for (const photo of local) {
        if (!existingIds.has(photo.id)) {
          allPhotos.push({
            public_id: photo.id,
            secure_url: photo.url,
            width: 0,
            height: 0,
          });
        }
      }
    } catch { /* ignore */ }

    setPhotos(allPhotos);
    setLoading(false);
  };

  const getThumbnail = (photo: CloudinaryResource) => {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_400,h_400,c_fill,q_auto,f_auto/${photo.public_id}`;
  };

  const getFullImage = (photo: CloudinaryResource) => {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_1200,q_auto,f_auto/${photo.public_id}`;
  };

  const navigate = (direction: 'prev' | 'next') => {
    if (selectedIndex === null) return;
    if (direction === 'prev') {
      setSelectedIndex(selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1);
    } else {
      setSelectedIndex(selectedIndex === photos.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-bengali-ivory dark:bg-dark-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-bengali-ivory/95 dark:bg-dark-900/95 backdrop-blur-md border-b border-bengali-gold/10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-body text-sm text-royal-charcoal/70 dark:text-bengali-ivory/70 hover:text-bengali-vermillion dark:hover:text-bengali-gold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
          <h1 className="heading-display text-lg text-bengali-deep-red dark:text-bengali-gold">
            Photo Gallery
          </h1>
          <Link
            to="/photos"
            className="flex items-center gap-1.5 font-body text-sm text-bengali-gold hover:text-bengali-vermillion transition-colors"
          >
            <Upload className="h-4 w-4" />
            Upload
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="h-10 w-10 text-bengali-gold/60 animate-spin mb-4" />
            <p className="font-body text-royal-charcoal/50 dark:text-bengali-ivory/50">
              Loading photos...
            </p>
          </div>
        ) : photos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24"
          >
            <Camera className="h-16 w-16 text-bengali-gold/30 mb-6" />
            <h2 className="heading-display text-2xl text-royal-charcoal/70 dark:text-bengali-ivory/70 mb-3">
              No photos yet
            </h2>
            <p className="font-body text-royal-charcoal/50 dark:text-bengali-ivory/50 text-center max-w-sm mb-8">
              Be the first to share a memory from the celebration!
            </p>
            <Link
              to="/photos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-bengali-deep-red hover:bg-bengali-vermillion dark:bg-bengali-gold dark:hover:bg-bengali-marigold text-bengali-ivory dark:text-royal-charcoal font-body font-medium transition-colors"
            >
              <Camera className="h-5 w-5" />
              Upload Photos
            </Link>
          </motion.div>
        ) : (
          <>
            <p className="font-body text-sm text-royal-charcoal/50 dark:text-bengali-ivory/50 mb-6">
              {photos.length} photo{photos.length !== 1 ? 's' : ''} shared
            </p>

            {/* Masonry-ish Grid */}
            <div className="columns-2 sm:columns-3 gap-3 space-y-3">
              {photos.map((photo, index) => (
                <motion.div
                  key={photo.public_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="break-inside-avoid cursor-pointer group"
                  onClick={() => setSelectedIndex(index)}
                >
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={getThumbnail(photo)}
                      alt={photo.context?.custom?.caption || 'Wedding photo'}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getFullImage(photos[selectedIndex])}
                alt="Full size"
                className="w-full max-h-[85vh] object-contain rounded-lg"
              />

              <button
                onClick={() => navigate('prev')}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={() => navigate('next')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-2 right-2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
              >
                <X className="h-5 w-5" />
              </button>

              {photos[selectedIndex].context?.custom?.caption && (
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-center mt-4 font-body text-white/80"
                >
                  {photos[selectedIndex].context.custom.caption}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGalleryPage;

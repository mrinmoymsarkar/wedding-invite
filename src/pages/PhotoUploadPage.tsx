import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, X, Check, Image, ArrowLeft, Loader2, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';
const UPLOAD_PASSCODE = import.meta.env.VITE_UPLOAD_PASSCODE || '';
const FOLDER = 'wedding-photos';
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB per file
const MAX_FILES_PER_SESSION = 20;
const PASSCODE_STORAGE_KEY = 'wedding-photo-access';

const UPLOAD_CATEGORIES = [
  { id: 'gaye-holud', name: 'Gaye Holud', local: 'গায়ে হলুদ' },
  { id: 'ceremony', name: 'Ceremony', local: 'বিয়ে' },
  { id: 'reception', name: 'Reception', local: 'অভ্যর্থনা' },
  { id: 'pre-wedding', name: 'Pre-Wedding', local: 'প্রি-ওয়েডিং' },
];

interface UploadedPhoto {
  id: string;
  url: string;
  thumbnailUrl: string;
  category: string;
}

const PhotoUploadPage: React.FC = () => {
  const [authorized, setAuthorized] = useState(() => {
    if (!UPLOAD_PASSCODE) return true; // no passcode configured = open access
    return sessionStorage.getItem(PASSCODE_STORAGE_KEY) === 'granted';
  });
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [uploaded, setUploaded] = useState<UploadedPhoto[]>([]);
  const [uploadCount, setUploadCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const configured = CLOUD_NAME && UPLOAD_PRESET;

  const compressImage = (file: File, maxWidth = 2048, quality = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      // Skip non-image or already small files
      if (!file.type.startsWith('image/') || file.size < 500 * 1024) {
        resolve(file);
        return;
      }

      const img = new window.Image();
      img.onload = () => {
        let { width, height } = img;

        // Only downscale if wider than maxWidth
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { resolve(file); return; }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob && blob.size < file.size) {
              resolve(new File([blob], file.name, { type: 'image/jpeg' }));
            } else {
              resolve(file); // keep original if compression didn't help
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => resolve(file);
      img.src = URL.createObjectURL(file);
    });
  };

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput.trim().toLowerCase() === UPLOAD_PASSCODE.toLowerCase()) {
      sessionStorage.setItem(PASSCODE_STORAGE_KEY, 'granted');
      setAuthorized(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  // Generate previews when files change
  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach(URL.revokeObjectURL);
  }, [files]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);

    // File size validation
    const oversized = selected.filter((f) => f.size > MAX_FILE_SIZE);
    if (oversized.length) {
      setError(`${oversized.map((f) => f.name).join(', ')} exceed${oversized.length === 1 ? 's' : ''} 15MB limit.`);
      return;
    }

    // Session upload limit
    const totalAfterAdd = files.length + selected.length;
    if (totalAfterAdd + uploadCount > MAX_FILES_PER_SESSION) {
      setError(`You can upload up to ${MAX_FILES_PER_SESSION} photos per session.`);
      return;
    }

    setFiles((prev) => [...prev, ...selected]);
    setError(null);
  }, [files.length, uploadCount]);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const uploadPhotos = async () => {
    if (!files.length || !configured) return;

    if (!selectedCategory) {
      setError('Please select an event section before uploading.');
      return;
    }

    setUploading(true);
    setError(null);
    setUploadProgress(files.map(() => 0));

    const results: UploadedPhoto[] = [];

    for (let i = 0; i < files.length; i++) {
      try {
        const compressed = await compressImage(files[i]);
        const formData = new FormData();
        formData.append('file', compressed);
        formData.append('upload_preset', UPLOAD_PRESET);
        formData.append('folder', FOLDER);
        formData.append('tags', `${FOLDER},${selectedCategory}`);
        const contextParts = [`category=${selectedCategory}`];
        if (caption) contextParts.push(`caption=${caption}`);
        formData.append('context', contextParts.join('|'));

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          { method: 'POST', body: formData }
        );

        if (!res.ok) throw new Error('Upload failed');

        const data = await res.json();
        results.push({
          id: data.public_id,
          url: data.secure_url,
          thumbnailUrl: data.secure_url.replace('/upload/', '/upload/w_300,h_300,c_fill/'),
          category: selectedCategory,
        });

        setUploadProgress((prev) => {
          const next = [...prev];
          next[i] = 100;
          return next;
        });
      } catch {
        setError(`Failed to upload ${files[i].name}. Please try again.`);
        setUploading(false);
        return;
      }
    }

    setUploaded((prev) => [...prev, ...results]);
    setUploadCount((prev) => prev + results.length);

    // Persist to localStorage for gallery page
    try {
      const existing = JSON.parse(localStorage.getItem('wedding-uploaded-photos') || '[]');
      localStorage.setItem('wedding-uploaded-photos', JSON.stringify([...results, ...existing]));
    } catch { /* ignore */ }

    setFiles([]);
    setCaption('');
    setUploading(false);
  };

  if (!configured) {
    return (
      <div className="min-h-screen bg-bengali-ivory dark:bg-dark-900 flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <Camera className="h-16 w-16 text-bengali-gold/40 mx-auto mb-6" />
          <h1 className="heading-display text-2xl text-royal-charcoal dark:text-bengali-ivory mb-4">
            Setup Required
          </h1>
          <p className="font-body text-royal-charcoal/70 dark:text-bengali-ivory/70 mb-6">
            Add your Cloudinary credentials to <code className="text-bengali-vermillion">.env</code>:
          </p>
          <div className="bg-dark-800 rounded-lg p-4 text-left text-sm font-mono text-bengali-ivory/80">
            <p>VITE_CLOUDINARY_CLOUD_NAME=your_cloud</p>
            <p>VITE_CLOUDINARY_UPLOAD_PRESET=your_preset</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-8 font-body text-bengali-gold hover:text-bengali-vermillion transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-bengali-ivory dark:bg-dark-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-sm w-full text-center"
        >
          <Camera className="h-14 w-14 text-bengali-gold mx-auto mb-6" />
          <h1 className="heading-display text-2xl text-royal-charcoal dark:text-bengali-ivory mb-2">
            Share Your Photos
          </h1>
          <p className="font-body text-sm text-royal-charcoal/60 dark:text-bengali-ivory/60 mb-8">
            Enter the access code to upload photos
            <br />
            <span className="text-xs text-royal-charcoal/40 dark:text-bengali-ivory/40">
              Hint: Our wedding date in DDMMYYYY format :)
            </span>
          </p>
          <form onSubmit={handlePasscodeSubmit} className="space-y-4">
            <input
              type="text"
              value={passcodeInput}
              onChange={(e) => { setPasscodeInput(e.target.value); setPasscodeError(false); }}
              placeholder="Enter code"
              autoFocus
              className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border text-center font-body text-lg tracking-widest text-royal-charcoal dark:text-bengali-ivory placeholder:text-royal-charcoal/30 dark:placeholder:text-bengali-ivory/30 outline-none transition-colors ${
                passcodeError
                  ? 'border-red-400 dark:border-red-500'
                  : 'border-bengali-gold/20 focus:border-bengali-gold/50'
              }`}
            />
            {passcodeError && (
              <p className="font-body text-sm text-red-500">Incorrect code. Please try again.</p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-bengali-deep-red hover:bg-bengali-vermillion dark:bg-bengali-gold dark:hover:bg-bengali-marigold text-bengali-ivory dark:text-royal-charcoal font-body font-medium transition-colors"
            >
              Continue
            </button>
          </form>
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-6 font-body text-sm text-royal-charcoal/50 dark:text-bengali-ivory/50 hover:text-bengali-gold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bengali-ivory dark:bg-dark-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-bengali-ivory/95 dark:bg-dark-900/95 backdrop-blur-md border-b border-bengali-gold/10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-body text-sm text-royal-charcoal/70 dark:text-bengali-ivory/70 hover:text-bengali-vermillion dark:hover:text-bengali-gold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
          <h1 className="heading-display text-lg text-bengali-deep-red dark:text-bengali-gold">
            Share Photos
          </h1>
          <Link
            to="/photos/gallery"
            className="flex items-center gap-1.5 font-body text-sm text-bengali-gold hover:text-bengali-vermillion transition-colors"
          >
            <Image className="h-4 w-4" />
            Gallery
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Drop / Tap Zone */}
          <motion.button
            onClick={() => fileInputRef.current?.click()}
            whileTap={{ scale: 0.98 }}
            className="w-full border-2 border-dashed border-bengali-gold/30 hover:border-bengali-gold/60 rounded-2xl p-8 md:p-12 transition-colors duration-300 flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-bengali-gold/10 flex items-center justify-center">
              <Camera className="h-8 w-8 text-bengali-gold" />
            </div>
            <div className="text-center">
              <p className="font-body text-royal-charcoal dark:text-bengali-ivory font-medium">
                Tap to add photos
              </p>
              <p className="font-body text-sm text-royal-charcoal/50 dark:text-bengali-ivory/50 mt-1">
                Take a photo or choose from gallery
              </p>
            </div>
          </motion.button>
        </motion.div>

        {/* Preview Grid */}
        <AnimatePresence>
          {previews.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className="grid grid-cols-3 gap-3 mb-6">
                {previews.map((url, i) => (
                  <motion.div
                    key={url}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative aspect-square rounded-xl overflow-hidden group"
                  >
                    <img
                      src={url}
                      alt={`Preview ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {uploading ? (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        {uploadProgress[i] === 100 ? (
                          <Check className="h-8 w-8 text-green-400" />
                        ) : (
                          <Loader2 className="h-8 w-8 text-white animate-spin" />
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => removeFile(i)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Event Section Tag (Required) */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2.5">
                  <Tag className="h-4 w-4 text-bengali-gold" />
                  <p className="font-body text-sm font-medium text-royal-charcoal dark:text-bengali-ivory">
                    Which event is this from? <span className="text-bengali-deep-red dark:text-red-400">*</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {UPLOAD_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-full font-body text-sm transition-all duration-200 ${
                        selectedCategory === cat.id
                          ? 'bg-bengali-deep-red text-bengali-ivory dark:bg-bengali-gold dark:text-royal-charcoal'
                          : 'bg-white dark:bg-dark-700 text-royal-charcoal/70 dark:text-bengali-ivory/70 border border-bengali-gold/20 hover:border-bengali-gold/40'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="ml-1.5 text-xs opacity-60">{cat.local}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Caption */}
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Add a caption (optional)"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-bengali-gold/20 focus:border-bengali-gold/50 outline-none font-body text-royal-charcoal dark:text-bengali-ivory placeholder:text-royal-charcoal/30 dark:placeholder:text-bengali-ivory/30 transition-colors mb-4"
              />

              {/* Upload Button */}
              <motion.button
                onClick={uploadPhotos}
                disabled={uploading}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-bengali-deep-red hover:bg-bengali-vermillion dark:bg-bengali-gold dark:hover:bg-bengali-marigold text-bengali-ivory dark:text-royal-charcoal font-body font-medium text-base flex items-center justify-center gap-3 transition-colors disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    Upload {files.length} photo{files.length > 1 ? 's' : ''}
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30"
            >
              <p className="font-body text-sm text-red-700 dark:text-red-300">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video CTA - WhatsApp */}
        <div className="mb-8 p-4 rounded-2xl bg-white dark:bg-dark-800 border border-bengali-gold/10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm font-medium text-royal-charcoal dark:text-bengali-ivory">
                Want to share videos?
              </p>
              <p className="font-body text-xs text-royal-charcoal/50 dark:text-bengali-ivory/50">
                Join our WhatsApp group to share videos & more
              </p>
            </div>
            <a
              href="https://chat.whatsapp.com/BbPVj43eVCeI3ubcGOfhKx?mode=gi_t"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white font-body text-sm font-medium transition-colors"
            >
              Join
            </a>
          </div>
        </div>

        {/* Recently Uploaded */}
        <AnimatePresence>
          {uploaded.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Check className="h-5 w-5 text-green-500" />
                <h2 className="font-body font-medium text-royal-charcoal dark:text-bengali-ivory">
                  Just uploaded
                </h2>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {uploaded.map((photo) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="aspect-square rounded-xl overflow-hidden"
                  >
                    <img
                      src={photo.thumbnailUrl}
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PhotoUploadPage;

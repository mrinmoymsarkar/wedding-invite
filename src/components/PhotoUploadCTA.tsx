import React from 'react';
import { motion } from 'framer-motion';
import { Camera, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const PhotoUploadCTA: React.FC = () => {
  const { language } = useLanguage();

  const text = {
    en: {
      tagline: 'Capture the Moments',
      heading: 'Share Your Photos',
      description: 'Got photos from the celebration? Upload them here and they\'ll appear in our gallery for everyone to enjoy.',
      button: 'Upload Photos',
    },
    bn: {
      tagline: 'মুহূর্তগুলো ধরে রাখুন',
      heading: 'আপনার ছবি শেয়ার করুন',
      description: 'উৎসবের ছবি আছে? এখানে আপলোড করুন এবং সবাই গ্যালারিতে দেখতে পাবে।',
      button: 'ছবি আপলোড করুন',
    },
    mr: {
      tagline: 'क्षण टिपा',
      heading: 'तुमचे फोटो शेअर करा',
      description: 'सोहळ्याचे फोटो आहेत? इथे अपलोड करा आणि ते गॅलरीत सर्वांना दिसतील.',
      button: 'फोटो अपलोड करा',
    },
  };

  const t = text[language as keyof typeof text] || text.en;

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bengali-ivory via-bengali-pearl to-bengali-ivory dark:from-dark-900 dark:via-dark-800 dark:to-dark-900" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            viewport={{ once: true }}
            className="w-16 h-16 mx-auto mb-6 rounded-full bg-bengali-gold/10 dark:bg-bengali-gold/5 flex items-center justify-center"
          >
            <Camera className="h-7 w-7 text-bengali-gold" />
          </motion.div>

          <p className="font-elegant italic text-bengali-gold text-lg mb-3">
            {t.tagline}
          </p>

          <h2 className="heading-display text-3xl md:text-4xl text-royal-charcoal dark:text-bengali-ivory mb-4">
            {t.heading}
          </h2>

          <p className="font-body text-royal-charcoal/60 dark:text-bengali-ivory/60 max-w-lg mx-auto mb-8 leading-relaxed">
            {t.description}
          </p>

          <Link to="/photos">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-bengali-deep-red hover:bg-bengali-vermillion dark:bg-bengali-gold dark:hover:bg-bengali-marigold text-bengali-ivory dark:text-royal-charcoal font-body font-medium transition-colors"
            >
              <Camera className="h-5 w-5" />
              {t.button}
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PhotoUploadCTA;

import React from 'react';
import { Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-16 relative overflow-hidden">
      {/* Animated background elements */}
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
              opacity: [0, 0.6, 0]
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <motion.img
                src="https://1fimd9lwq61lrowk.public.blob.vercel-storage.com/wediing-icon-MWGi3zHWRSwveW4CaK9EM7s57pDP54.png"
                alt="Wedding Icon"
                className="h-8 w-8"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="text-xl font-heading font-bold bg-gradient-to-r from-bengali-crimson to-bengali-gold bg-clip-text text-transparent">
                {t('footer.brand')}
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {t('footer.tagline')}
            </p>
            <motion.p 
              className="text-bengali-gold font-bengali"
              animate={{ 
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {t('footer.blessing_footer')}
            </motion.p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-heading font-semibold text-bengali-gold">
              {t('footer.quick_links')}
            </h3>
            <nav className="space-y-2">
              {[
                { name: t('nav.home'), href: '#home' },
                { name: t('nav.events'), href: '#events' },
                { name: t('nav.gallery'), href: '#gallery' },
                { name: t('nav.culture'), href: '#culture' },
                { name: t('nav.rsvp'), href: '#rsvp' }
              ].map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  whileHover={{ 
                    scale: 1.05,
                    x: 5
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="block text-gray-400 hover:text-bengali-gold transition-colors duration-200"
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-heading font-semibold text-bengali-gold">
              {t('footer.contact_families')}
            </h3>
            <div className="space-y-3">
              <motion.div 
                className="flex items-center space-x-3 text-gray-400"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Phone className="h-4 w-4 text-bengali-crimson" />
                <span>+91 98765 43210</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 text-gray-400"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="h-4 w-4 text-bengali-crimson" />
                <span>tani.sunny.wedding@gmail.com</span>
              </motion.div>
              <motion.div 
                className="flex items-start space-x-3 text-gray-400"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin className="h-4 w-4 text-bengali-crimson mt-1" />
                <span>Heritage Palace, West Bengal<br />India</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Wedding Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-heading font-semibold text-bengali-gold">
              {t('footer.wedding_timeline')}
            </h3>
            <div className="space-y-3">
              <motion.div 
                className="flex items-center space-x-3 text-gray-400"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Calendar className="h-4 w-4 text-bengali-crimson" />
                <div>
                  <div className="text-sm">Mehendi - Feb 27</div>
                  <div className="text-xs text-gray-500">4:00 PM</div>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 text-gray-400"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Calendar className="h-4 w-4 text-bengali-crimson" />
                <div>
                  <div className="text-sm">Gaye Holud - Feb 28</div>
                  <div className="text-xs text-gray-500">10:00 AM</div>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 text-gray-400"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Calendar className="h-4 w-4 text-bengali-crimson" />
                <div>
                  <div className="text-sm">Wedding - Feb 29</div>
                  <div className="text-xs text-gray-500">8:00 PM</div>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 text-gray-400"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Calendar className="h-4 w-4 text-bengali-crimson" />
                <div>
                  <div className="text-sm">Reception - Mar 01</div>
                  <div className="text-xs text-gray-500">7:00 PM</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          className="border-t border-gray-800 mt-12 pt-8"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <p className="text-gray-400 mb-4">
              {t('footer.copyright')}
            </p>
            <motion.p 
              className="text-bengali-gold font-bengali text-sm"
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(255, 215, 0, 0)",
                  "0 0 10px rgba(255, 215, 0, 0.3)",
                  "0 0 0px rgba(255, 215, 0, 0)"
                ]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {t('footer.quote')}
            </motion.p>
            <p className="text-gray-500 text-xs mt-1">
              {t('footer.quote_translation')}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
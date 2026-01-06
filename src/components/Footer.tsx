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
    <footer className="relative bg-royal-charcoal dark:bg-dark-950 text-bengali-ivory overflow-hidden">
      {/* Top decorative border */}
      <div className="h-px bg-gradient-to-r from-transparent via-bengali-gold/40 to-transparent" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-royal-pattern opacity-5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.img
                src="https://1fimd9lwq61lrowk.public.blob.vercel-storage.com/wediing-icon-MWGi3zHWRSwveW4CaK9EM7s57pDP54.png"
                alt="Wedding Icon"
                className="h-8 w-8 opacity-90"
              />
              <div className="heading-display text-xl text-bengali-gold">
                {t('footer.brand')}
              </div>
            </div>
            <p className="font-body text-bengali-ivory/60 leading-relaxed mb-6 text-sm">
              {t('footer.tagline')}
            </p>
            <p className="bengali-text text-bengali-gold/80 text-sm">
              {t('footer.blessing_footer')}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="heading-display text-lg text-bengali-gold mb-6">
              {t('footer.quick_links')}
            </h3>
            <nav className="flex flex-col gap-3">
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
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="text-left font-body text-sm text-bengali-ivory/60 hover:text-bengali-gold transition-colors duration-300"
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
          >
            <h3 className="heading-display text-lg text-bengali-gold mb-6">
              {t('footer.contact_families')}
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-bengali-ivory/60 text-sm">
                <Phone className="h-4 w-4 text-bengali-gold/60" />
                <span className="font-body">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-bengali-ivory/60 text-sm">
                <Mail className="h-4 w-4 text-bengali-gold/60" />
                <span className="font-body">tani.sunny.wedding@gmail.com</span>
              </div>
              <div className="flex items-start gap-3 text-bengali-ivory/60 text-sm">
                <MapPin className="h-4 w-4 text-bengali-gold/60 mt-0.5" />
                <span className="font-body">Heritage Palace, West Bengal<br />India</span>
              </div>
            </div>
          </motion.div>

          {/* Wedding Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="heading-display text-lg text-bengali-gold mb-6">
              {t('footer.wedding_timeline')}
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { event: 'Mehendi', date: 'Feb 27', time: '4:00 PM' },
                { event: 'Gaye Holud', date: 'Feb 28', time: '10:00 AM' },
                { event: 'Wedding', date: 'Feb 29', time: '8:00 PM' },
                { event: 'Reception', date: 'Mar 01', time: '7:00 PM' }
              ].map((item) => (
                <div key={item.event} className="flex items-center gap-3 text-bengali-ivory/60">
                  <Calendar className="h-4 w-4 text-bengali-gold/60" />
                  <div>
                    <div className="font-body text-sm">{item.event} - {item.date}</div>
                    <div className="font-body text-xs text-bengali-ivory/40">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-bengali-gold/10"
        >
          <div className="text-center">
            <p className="font-body text-bengali-ivory/40 text-sm mb-4">
              {t('footer.copyright')}
            </p>
            <p className="bengali-text text-bengali-gold/60 text-sm mb-1">
              {t('footer.quote')}
            </p>
            <p className="font-elegant italic text-bengali-ivory/30 text-xs">
              {t('footer.quote_translation')}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom decorative element */}
      <div className="h-1 bg-gradient-to-r from-bengali-burgundy via-bengali-gold/50 to-bengali-burgundy" />
    </footer>
  );
};

export default Footer;

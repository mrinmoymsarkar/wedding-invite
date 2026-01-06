import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from './LanguageSelector';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.events'), href: '#events' },
    { name: t('nav.gallery'), href: '#gallery' },
    { name: t('nav.culture'), href: '#culture' },
    { name: t('nav.rsvp'), href: '#rsvp' }
  ];

  const themeOptions = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'auto', icon: Monitor, label: 'Auto' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-bengali-ivory/95 dark:bg-dark-900/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      {/* Top decorative line */}
      <div className="h-px bg-gradient-to-r from-transparent via-bengali-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3"
          >
            <motion.img
              src="https://1fimd9lwq61lrowk.public.blob.vercel-storage.com/wediing-icon-MWGi3zHWRSwveW4CaK9EM7s57pDP54.png"
              alt="Wedding Icon"
              className="h-8 w-8"
              animate={{
                rotate: [0, 3, -3, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="heading-display text-xl text-bengali-deep-red dark:text-bengali-gold">
              {t('footer.brand')}
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navigation.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="relative font-body text-sm tracking-wider text-royal-charcoal/80 dark:text-bengali-ivory/80 hover:text-bengali-deep-red dark:hover:text-bengali-gold transition-colors duration-300 underline-hover py-2"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
              </motion.button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div data-tutorial="language-selector">
              <LanguageSelector />
            </div>

            {/* Theme Selector */}
            <div className="relative" data-tutorial="theme-selector">
              <motion.button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-full border border-bengali-gold/20 text-royal-charcoal/70 dark:text-bengali-ivory/70 hover:border-bengali-gold/40 hover:text-bengali-gold transition-all duration-300"
              >
                {theme === 'light' && <Sun className="h-4 w-4" />}
                {theme === 'dark' && <Moon className="h-4 w-4" />}
                {theme === 'auto' && <Monitor className="h-4 w-4" />}
              </motion.button>

              <AnimatePresence>
                {isThemeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-36 elegant-card dark:elegant-card-dark rounded-lg py-2 overflow-hidden"
                  >
                    {themeOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.value}
                          onClick={() => {
                            setTheme(option.value as any);
                            setIsThemeMenuOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition-colors duration-200 ${
                            theme === option.value
                              ? 'text-bengali-deep-red dark:text-bengali-gold bg-bengali-gold/5'
                              : 'text-royal-charcoal/70 dark:text-bengali-ivory/70 hover:bg-bengali-gold/5'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="font-body">{option.label}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2.5 rounded-full border border-bengali-gold/20 text-royal-charcoal/70 dark:text-bengali-ivory/70"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-6 border-t border-bengali-gold/10">
                <nav className="flex flex-col gap-1">
                  {navigation.map((item, index) => (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="text-left py-3 px-2 font-body text-royal-charcoal/80 dark:text-bengali-ivory/80 hover:text-bengali-deep-red dark:hover:text-bengali-gold transition-colors duration-200 border-b border-bengali-gold/5 last:border-0"
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom decorative line */}
      <div className={`h-px transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'} bg-gradient-to-r from-transparent via-bengali-gold/20 to-transparent`} />
    </motion.header>
  );
};

export default Header;

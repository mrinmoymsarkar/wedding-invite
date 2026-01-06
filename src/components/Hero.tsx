import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { WEDDING_CONFIG } from '../config/wedding-config';
import { CONTENT_CONFIG } from '../config/content-config';
import HeroImageWithLoader from './HeroImageWithLoader';
import PDFInvitation from './PDFInvitation';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const weddingDate = new Date(`${WEDDING_CONFIG.wedding.mainDate}T20:00:00+05:30`);

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // Elegant floating accent shapes
  const FloatingAccents = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Large decorative circle - top right */}
      <motion.div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-bengali-gold/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Medium circle - bottom left */}
      <motion.div
        className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full border border-bengali-deep-red/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />

      {/* Small accent - floating */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-3 h-3 bg-bengali-gold/30 rounded-full"
        animate={{
          y: [-10, 10, -10],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-bengali-deep-red/20 rounded-full"
        animate={{
          y: [10, -10, 10],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Sophisticated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bengali-ivory via-bengali-cream to-bengali-ivory dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-royal-pattern opacity-40" />

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bengali-cream/50 to-bengali-cream dark:via-dark-900/50 dark:to-dark-900" />
      </div>

      <FloatingAccents />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-32 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left side - Content */}
          <div className="lg:col-span-6 text-center lg:text-left order-2 lg:order-1">

            {/* Elegant top blessing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <p className="text-bengali-gold font-elegant italic text-lg md:text-xl tracking-wide">
                {t('hero.sacred_union')}
              </p>
            </motion.div>

            {/* Main couple names - dramatic typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-6"
            >
              <h1 className="heading-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-royal-charcoal dark:text-bengali-ivory leading-none">
                {WEDDING_CONFIG.couple.coupleNames}
              </h1>
            </motion.div>

            {/* Bengali names */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-10"
            >
              <p className="bengali-text text-2xl md:text-3xl text-bengali-deep-red dark:text-bengali-gold">
                {WEDDING_CONFIG.couple.coupleNamesLocal}
              </p>
            </motion.div>

            {/* Elegant divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="w-32 h-px bg-gradient-to-r from-transparent via-bengali-gold to-transparent mx-auto lg:mx-0 mb-10"
            />

            {/* Wedding details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="space-y-4 mb-12"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 text-royal-charcoal/80 dark:text-bengali-ivory/80">
                <Calendar className="h-5 w-5 text-bengali-gold" />
                <span className="font-body text-lg tracking-wide">{t('hero.wedding_date')}</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 text-royal-charcoal/80 dark:text-bengali-ivory/80">
                <MapPin className="h-5 w-5 text-bengali-gold" />
                <span className="font-body text-lg tracking-wide">{WEDDING_CONFIG.wedding.mainVenue}</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <motion.button
                onClick={() => document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="btn-royal flex items-center justify-center gap-3"
              >
                <Heart className="h-4 w-4" />
                <span>{t('hero.rsvp_button')}</span>
              </motion.button>

              <PDFInvitation />
            </motion.div>

            {/* Traditional blessing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="max-w-md mx-auto lg:mx-0"
            >
              <p className="bengali-text text-bengali-deep-red/80 dark:text-bengali-gold/80 text-base md:text-lg italic mb-2">
                "{WEDDING_CONFIG.blessings.main.bengali}"
              </p>
              <p className="font-elegant text-royal-charcoal/60 dark:text-bengali-ivory/60 text-sm italic">
                {WEDDING_CONFIG.blessings.main.translation}
              </p>
            </motion.div>
          </div>

          {/* Right side - Image */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative max-w-lg mx-auto lg:max-w-none"
            >
              {/* Ornate frame effect */}
              <div className="absolute -inset-4 md:-inset-6">
                <div className="absolute top-0 left-0 w-16 h-16 md:w-24 md:h-24 border-t-2 border-l-2 border-bengali-gold/40" />
                <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 border-t-2 border-r-2 border-bengali-gold/40" />
                <div className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 border-b-2 border-l-2 border-bengali-gold/40" />
                <div className="absolute bottom-0 right-0 w-16 h-16 md:w-24 md:h-24 border-b-2 border-r-2 border-bengali-gold/40" />
              </div>

              {/* Image container */}
              <motion.div
                className="relative elegant-card dark:elegant-card-dark rounded-sm overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.4 }}
              >
                <HeroImageWithLoader
                  src={WEDDING_CONFIG.branding.heroImageUrl}
                  alt={`${WEDDING_CONFIG.couple.coupleNames} Wedding Illustration`}
                />

                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-bengali-burgundy/10 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Floating accent */}
              <motion.div
                className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-8 h-8 md:w-12 md:h-12 bg-bengali-gold/20 rounded-full blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-20 md:mt-24"
        >
          <div className="max-w-3xl mx-auto">
            {/* Section label */}
            <div className="text-center mb-8">
              <p className="font-elegant italic text-bengali-gold text-lg tracking-wide">
                {CONTENT_CONFIG.hero.countdownTitle}
              </p>
            </div>

            {/* Countdown boxes */}
            <div className="grid grid-cols-4 gap-3 md:gap-6">
              {[
                { value: timeLeft.days, label: t('hero.countdown.days') },
                { value: timeLeft.hours, label: t('hero.countdown.hours') },
                { value: timeLeft.minutes, label: t('hero.countdown.minutes') },
                { value: timeLeft.seconds, label: t('hero.countdown.seconds') }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.8 + index * 0.1 }}
                  className="countdown-box text-center"
                >
                  <motion.div
                    className="heading-display text-3xl sm:text-4xl md:text-5xl text-bengali-deep-red dark:text-bengali-gold mb-1"
                    key={item.value}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.value.toString().padStart(2, '0')}
                  </motion.div>
                  <div className="font-body text-xs md:text-sm text-royal-charcoal/60 dark:text-bengali-ivory/60 uppercase tracking-wider">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bengali-gold/30 to-transparent" />
    </section>
  );
};

export default Hero;

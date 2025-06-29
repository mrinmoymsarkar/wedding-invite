import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Heart, Sparkles } from 'lucide-react';
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
    const weddingDate = new Date(`${WEDDING_CONFIG.wedding.mainDate}T${WEDDING_CONFIG.wedding.mainTime.replace(' ', '')}:00+05:30`);

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

  // Floating hearts animation
  const FloatingHearts = () => (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-bengali-crimson/20 dark:text-bengali-gold/20"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? Math.min(window.innerWidth, 400) : 400),
            y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
            scale: 0
          }}
          animate={{ 
            y: -50,
            scale: [0, 1, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut"
          }}
        >
          <Heart className="h-4 w-4 md:h-6 md:w-6" fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );

  // Sparkle animation
  const SparkleEffect = () => (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-bengali-gold/30 dark:text-bengali-amber/30"
          style={{
            left: `${15 + (i * 10)}%`,
            top: `${25 + Math.sin(i) * 25}%`
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
        </motion.div>
      ))}
    </div>
  );

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-20 pb-8 md:pb-16">
      {/* Background with cultural pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-bengali-cream via-white to-bengali-ivory dark:from-dark-900 dark:via-dark-800 dark:to-dark-700">
        <div className="absolute inset-0 bg-alpana-pattern opacity-5"></div>
        
        {/* Enhanced animated decorative elements - reduced for mobile */}
        <motion.div 
          className="absolute top-20 left-4 md:left-10 w-16 h-16 md:w-32 md:h-32 border-2 md:border-4 border-bengali-gold/20 rounded-full"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        <motion.div 
          className="absolute bottom-20 right-4 md:right-10 w-12 h-12 md:w-24 md:h-24 border-2 md:border-4 border-bengali-crimson/20 rounded-full"
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
        />
        
        <motion.div 
          className="absolute top-1/2 left-1/4 w-8 h-8 md:w-16 md:h-16 border-2 md:border-4 border-bengali-amber/20 rounded-full"
          animate={{ 
            rotate: 360,
            x: [0, 10, 0],
            y: [0, -10, 0]
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }
          }}
        />

        {/* Additional decorative elements */}
        <motion.div 
          className="absolute top-1/3 right-1/3 w-10 h-10 md:w-20 md:h-20 border border-bengali-orange/15 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
      </div>

      {/* Floating hearts */}
      <FloatingHearts />
      
      {/* Sparkle effects */}
      <SparkleEffect />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Bengali Blessing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 md:mb-8"
            >
              <motion.p 
                className="text-bengali-deep-red dark:text-bengali-gold font-bengali text-xl md:text-2xl lg:text-3xl mb-2"
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(220, 20, 60, 0)",
                    "0 0 10px rgba(220, 20, 60, 0.3)",
                    "0 0 0px rgba(220, 20, 60, 0)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {WEDDING_CONFIG.blessings.main.bengali}
              </motion.p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{t('hero.sacred_union')}</p>
            </motion.div>

            {/* Couple Names */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 md:mb-8"
            >
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-gray-900 dark:text-white mb-3 md:mb-4 leading-tight"
                animate={{ 
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {WEDDING_CONFIG.couple.coupleNames}
              </motion.h1>
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-bengali"
                animate={{ 
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                {WEDDING_CONFIG.couple.coupleNamesLocal}
              </motion.p>
            </motion.div>

            {/* Wedding Date & Venue */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8 md:mb-12 space-y-3 md:space-y-4"
            >
              <motion.div 
                className="flex items-center justify-center lg:justify-start space-x-2 text-gray-700 dark:text-gray-300"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Calendar className="h-4 w-4 md:h-5 md:w-5 text-bengali-crimson dark:text-bengali-gold" />
                </motion.div>
                <span className="text-base md:text-lg">{t('hero.wedding_date')}</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center lg:justify-start space-x-2 text-gray-700 dark:text-gray-300"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 text-bengali-crimson dark:text-bengali-gold" />
                </motion.div>
                <span className="text-base md:text-lg">{WEDDING_CONFIG.wedding.mainVenue}</span>
              </motion.div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-4 md:space-y-6 mb-6 md:mb-8"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  onClick={() => document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' })}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(220, 20, 60, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 5px 15px rgba(220, 20, 60, 0.2)",
                      "0 8px 25px rgba(220, 20, 60, 0.3)",
                      "0 5px 15px rgba(220, 20, 60, 0.2)"
                    ]
                  }}
                  transition={{ 
                    boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="bg-gradient-to-r from-bengali-deep-red to-bengali-crimson hover:from-bengali-crimson hover:to-bengali-deep-red text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center space-x-2"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Heart className="h-4 w-4 md:h-5 md:w-5" />
                  </motion.div>
                  <span>{t('hero.rsvp_button')}</span>
                </motion.button>

                {/* PDF Invitation Button */}
                <PDFInvitation />
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm px-4 lg:px-0">
                {CONTENT_CONFIG.hero.welcomeMessage}
              </p>
            </motion.div>

            {/* Traditional Blessing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-center lg:text-left"
            >
              <motion.p 
                className="text-bengali-deep-red dark:text-bengali-gold font-bengali text-base md:text-lg italic px-4 lg:px-0"
                animate={{ 
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {WEDDING_CONFIG.blessings.main.bengali}
              </motion.p>
              <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-2 px-4 lg:px-0">
                {WEDDING_CONFIG.blessings.main.translation}
              </p>
            </motion.div>
          </div>

          {/* Right side - Wedding Image with Loader */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative max-w-md mx-auto lg:max-w-none"
            >
              {/* Decorative background elements */}
              <motion.div
                className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-bengali-gold/20 to-bengali-crimson/20 rounded-2xl md:rounded-3xl blur-lg md:blur-xl"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Main image container with loader */}
              <motion.div
                className="relative bg-white dark:bg-dark-800 rounded-xl md:rounded-2xl p-2 md:p-4 shadow-xl md:shadow-2xl"
                whileHover={{ 
                  scale: 1.02,
                  rotateY: window.innerWidth >= 768 ? 5 : 0,
                  rotateX: window.innerWidth >= 768 ? 5 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                <HeroImageWithLoader
                  src={WEDDING_CONFIG.branding.heroImageUrl}
                  alt={`${WEDDING_CONFIG.couple.coupleNames} Wedding Illustration`}
                />
                
                {/* Floating elements around the image - smaller on mobile */}
                <motion.div
                  className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-8 md:h-8 bg-bengali-gold rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div
                  className="absolute -bottom-1 -left-1 md:-bottom-2 md:-left-2 w-3 h-3 md:w-6 md:h-6 bg-bengali-crimson rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [360, 180, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                
                {/* Sparkle effects around image - reduced for mobile */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 md:w-2 md:h-2 bg-bengali-gold rounded-full"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${10 + Math.random() * 80}%`
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.7,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Glowing border effect */}
              <motion.div
                className="absolute inset-0 rounded-xl md:rounded-2xl border border-bengali-gold/30"
                animate={{
                  borderColor: [
                    "rgba(255, 215, 0, 0.3)",
                    "rgba(220, 20, 60, 0.3)",
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
          </div>
        </div>

        {/* Countdown Timer - Full width below */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 md:mt-16"
        >
          <motion.div 
            className="bg-white/70 dark:bg-dark-800/70 backdrop-blur-md rounded-xl md:rounded-2xl p-6 md:p-8 shadow-cultural max-w-4xl mx-auto"
            whileHover={{ 
              scale: 1.01,
              boxShadow: "0 20px 60px rgba(220, 20, 60, 0.2)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-xl md:text-2xl font-heading font-semibold text-gray-900 dark:text-white mb-4 md:mb-6 text-center">
              {CONTENT_CONFIG.hero.countdownTitle}
            </h3>
            <div className="grid grid-cols-4 gap-2 md:gap-4">
              {[
                { value: timeLeft.days, label: t('hero.countdown.days') },
                { value: timeLeft.hours, label: t('hero.countdown.hours') },
                { value: timeLeft.minutes, label: t('hero.countdown.minutes') },
                { value: timeLeft.seconds, label: t('hero.countdown.seconds') }
              ].map((item, index) => (
                <motion.div 
                  key={item.label}
                  className="text-center"
                  animate={{ 
                    scale: index === 3 ? [1, 1.1, 1] : 1 // Animate seconds
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: index === 3 ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div 
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-bengali-deep-red dark:text-bengali-gold mb-1 md:mb-2"
                    animate={{ 
                      color: index === 3 ? [
                        "rgb(139, 0, 0)",
                        "rgb(220, 20, 60)",
                        "rgb(139, 0, 0)"
                      ] : undefined
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: index === 3 ? Infinity : 0
                    }}
                  >
                    {item.value.toString().padStart(2, '0')}
                  </motion.div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
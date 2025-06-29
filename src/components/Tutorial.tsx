import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Languages, Sun, Moon, Monitor, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface TutorialStep {
  id: string;
  target: string;
  title: { en: string; bn: string; mr: string };
  description: { en: string; bn: string; mr: string };
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

const Tutorial: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0, transform: '' });
  const { language } = useLanguage();
  const { theme } = useTheme();

  const tutorialSteps: TutorialStep[] = [
    {
      id: 'language',
      target: '[data-tutorial="language-selector"]',
      title: {
        en: 'Change Language',
        bn: 'ভাষা পরিবর্তন করুন',
        mr: 'भाषा बदला'
      },
      description: {
        en: 'Click here to switch between English, Bengali (বাংলা), and Marathi (मराठी) languages.',
        bn: 'ইংরেজি, বাংলা এবং মারাঠি ভাষার মধ্যে পরিবর্তন করতে এখানে ক্লিক করুন।',
        mr: 'इंग्रजी, बंगाली आणि मराठी भाषांमध्ये बदलण्यासाठी येथे क्लिक करा.'
      },
      position: 'bottom'
    },
    {
      id: 'theme',
      target: '[data-tutorial="theme-selector"]',
      title: {
        en: 'Switch Theme',
        bn: 'থিম পরিবর্তন করুন',
        mr: 'थीम बदला'
      },
      description: {
        en: 'Toggle between light, dark, or auto theme modes to match your preference.',
        bn: 'আপনার পছন্দ অনুযায়ী হালকা, গাঢ় বা স্বয়ংক্রিয় থিম মোডের মধ্যে টগল করুন।',
        mr: 'तुमच्या पसंतीनुसार हलका, गडद किंवा स्वयंचलित थीम मोडमध्ये बदला.'
      },
      position: 'bottom'
    }
  ];

  // Prevent scrolling when tutorial is visible
  useEffect(() => {
    if (isVisible) {
      // Store current scroll position
      const scrollY = window.scrollY;
      
      // Prevent scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      
      // Prevent touch events on body
      document.body.style.touchAction = 'none';
      
      return () => {
        // Restore scrolling
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.height = '';
        document.body.style.touchAction = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isVisible]);

  const updateTooltipPosition = () => {
    if (isMobile) {
      // For mobile, we don't need to calculate position as we use fixed centering
      return;
    }

    const targetElement = getTargetElement();
    if (!targetElement) {
      setTooltipPosition({ top: 100, left: 100, transform: '' });
      return;
    }

    const rect = targetElement.getBoundingClientRect();
    const step = tutorialSteps[currentStep];
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    
    switch (step.position) {
      case 'bottom':
        setTooltipPosition({
          top: rect.bottom + scrollY + 15,
          left: rect.left + scrollX + rect.width / 2,
          transform: 'translateX(-50%)'
        });
        break;
      case 'top':
        setTooltipPosition({
          top: rect.top + scrollY - 15,
          left: rect.left + scrollX + rect.width / 2,
          transform: 'translateX(-50%) translateY(-100%)'
        });
        break;
      case 'left':
        setTooltipPosition({
          top: rect.top + scrollY + rect.height / 2,
          left: rect.left + scrollX - 15,
          transform: 'translateX(-100%) translateY(-50%)'
        });
        break;
      case 'right':
        setTooltipPosition({
          top: rect.top + scrollY + rect.height / 2,
          left: rect.right + scrollX + 15,
          transform: 'translateY(-50%)'
        });
        break;
      default:
        setTooltipPosition({
          top: rect.bottom + scrollY + 15,
          left: rect.left + scrollX + rect.width / 2,
          transform: 'translateX(-50%)'
        });
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleResize = () => {
      checkMobile();
      if (isVisible && !isMobile) {
        setTimeout(updateTooltipPosition, 100);
      }
    };

    const handleScroll = () => {
      if (isVisible && !isMobile) {
        updateTooltipPosition();
      }
    };

    checkMobile();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    const tutorialSeen = localStorage.getItem('wedding-tutorial-seen');
    if (!tutorialSeen) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      setHasSeenTutorial(true);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, isMobile, currentStep]);

  useEffect(() => {
    if (isVisible && !isMobile) {
      setTimeout(updateTooltipPosition, 100);
    }
  }, [isVisible, currentStep, isMobile]);

  const closeTutorial = () => {
    setIsVisible(false);
    localStorage.setItem('wedding-tutorial-seen', 'true');
    setHasSeenTutorial(true);
  };

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      closeTutorial();
    }
  };

  const skipTutorial = () => {
    closeTutorial();
  };

  const getCurrentStepData = () => {
    const step = tutorialSteps[currentStep];
    return {
      title: step.title[language],
      description: step.description[language]
    };
  };

  const getTargetElement = () => {
    const step = tutorialSteps[currentStep];
    return document.querySelector(step.target);
  };

  const getSpotlightPosition = () => {
    if (isMobile) {
      return { left: '50%', top: '20%' };
    }

    const targetElement = getTargetElement();
    if (!targetElement) return { left: '50%', top: '50%' };

    const rect = targetElement.getBoundingClientRect();
    return {
      left: rect.left + rect.width / 2,
      top: rect.top + rect.height / 2
    };
  };

  if (hasSeenTutorial && !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay - blocks all interactions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            style={{ 
              touchAction: 'none',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              msUserSelect: 'none'
            }}
            onTouchMove={(e) => e.preventDefault()}
            onWheel={(e) => e.preventDefault()}
          />

          {/* Spotlight effect */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${getSpotlightPosition().left}px ${getSpotlightPosition().top}px, transparent 60px, rgba(0,0,0,0.7) 120px)`
              }}
            />
          )}

          {/* Tutorial Tooltip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`z-50 bg-white dark:bg-dark-800 rounded-xl shadow-2xl border border-gray-200 dark:border-dark-600 p-6 ${
              isMobile 
                ? 'fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-sm mx-auto' 
                : 'absolute max-w-sm'
            }`}
            style={isMobile ? {} : {
              top: tooltipPosition.top,
              left: tooltipPosition.left,
              transform: tooltipPosition.transform,
              position: 'absolute'
            }}
          >
            {/* Close button */}
            <button
              onClick={closeTutorial}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors z-10"
            >
              <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>

            {/* Content */}
            <div className="pr-6">
              <div className="flex items-center space-x-2 mb-3">
                {currentStep === 0 ? (
                  <Languages className="h-5 w-5 text-bengali-crimson dark:text-bengali-gold" />
                ) : (
                  <>
                    {theme === 'light' && <Sun className="h-5 w-5 text-bengali-crimson dark:text-bengali-gold" />}
                    {theme === 'dark' && <Moon className="h-5 w-5 text-bengali-crimson dark:text-bengali-gold" />}
                    {theme === 'auto' && <Monitor className="h-5 w-5 text-bengali-crimson dark:text-bengali-gold" />}
                  </>
                )}
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {getCurrentStepData().title}
                </h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-xs mb-4 leading-relaxed">
                {getCurrentStepData().description}
              </p>

              {/* Mobile-specific instruction */}
              {isMobile && (
                <div className="mb-4 p-3 bg-bengali-cream/50 dark:bg-dark-700 rounded-lg">
                  <p className="text-xs text-bengali-deep-red dark:text-bengali-gold">
                    {currentStep === 0 
                      ? (language === 'bn' ? 'উপরের ডানদিকে ভাষা বোতামটি দেখুন' : 
                         language === 'mr' ? 'वरच्या उजव्या बाजूला भाषा बटन पहा' : 
                         'Look for the language button in the top right')
                      : (language === 'bn' ? 'উপরের ডানদিকে থিম বোতামটি দেখুন' : 
                         language === 'mr' ? 'वरच्या उजव्या बाजूला थीम बटन पहा' : 
                         'Look for the theme button in the top right')
                    }
                  </p>
                </div>
              )}

              {/* Progress indicator */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  {tutorialSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentStep
                          ? 'bg-bengali-crimson dark:bg-bengali-gold'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={skipTutorial}
                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  >
                    {language === 'bn' ? 'এড়িয়ে যান' : language === 'mr' ? 'वगळा' : 'Skip'}
                  </button>
                  
                  <motion.button
                    onClick={nextStep}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-1 bg-bengali-crimson dark:bg-bengali-gold text-white dark:text-dark-900 px-3 py-1 rounded-full text-xs font-medium hover:bg-bengali-deep-red dark:hover:bg-bengali-amber transition-colors"
                  >
                    <span>
                      {currentStep === tutorialSteps.length - 1
                        ? (language === 'bn' ? 'সম্পন্ন' : language === 'mr' ? 'पूर्ण' : 'Done')
                        : (language === 'bn' ? 'পরবর্তী' : language === 'mr' ? 'पुढे' : 'Next')
                      }
                    </span>
                    {currentStep < tutorialSteps.length - 1 && (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Arrow pointer - only show on desktop */}
            {!isMobile && (
              <div
                className={`absolute w-3 h-3 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 transform rotate-45 ${
                  tutorialSteps[currentStep].position === 'bottom'
                    ? '-top-1.5 left-1/2 -translate-x-1/2 border-b-0 border-r-0'
                    : tutorialSteps[currentStep].position === 'top'
                    ? '-bottom-1.5 left-1/2 -translate-x-1/2 border-t-0 border-l-0'
                    : tutorialSteps[currentStep].position === 'right'
                    ? 'top-1/2 -left-1.5 -translate-y-1/2 border-r-0 border-b-0'
                    : 'top-1/2 -right-1.5 -translate-y-1/2 border-l-0 border-t-0'
                }`}
              />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Tutorial;
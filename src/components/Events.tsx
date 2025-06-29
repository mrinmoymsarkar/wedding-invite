import React from 'react';
import { motion } from 'framer-motion';
import EnhancedEventCard from './EnhancedEventCard';
import { weddingEvents } from '../data/events';
import { useLanguage } from '../contexts/LanguageContext';

const Events: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="events" className="py-20 bg-gray-50 dark:bg-dark-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-bengali-gold/5 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-24 h-24 bg-bengali-crimson/5 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Enhanced Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4"
            animate={{
              textShadow: [
                '0 0 0px rgba(220, 20, 60, 0)',
                '0 0 20px rgba(220, 20, 60, 0.3)',
                '0 0 0px rgba(220, 20, 60, 0)'
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {t('events.title')}
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 font-bengali mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {t('events.title_local')}
          </motion.p>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-bengali-deep-red to-bengali-gold mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          
          <motion.p 
            className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {t('events.description')}
          </motion.p>
        </motion.div>

        {/* Events Grid with Staggered Animation */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {weddingEvents.map((event, index) => (
            <EnhancedEventCard key={event.id} event={event} index={index} />
          ))}
        </motion.div>

        {/* Additional Information with Enhanced Styling */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="mt-16 relative"
        >
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white via-bengali-cream/30 to-white dark:from-dark-800 dark:via-dark-700 dark:to-dark-800 rounded-2xl"
            animate={{
              background: [
                'linear-gradient(45deg, rgba(255,255,255,1), rgba(255,248,220,0.3), rgba(255,255,255,1))',
                'linear-gradient(135deg, rgba(255,248,220,0.3), rgba(255,255,255,1), rgba(255,248,220,0.3))',
                'linear-gradient(225deg, rgba(255,255,255,1), rgba(255,248,220,0.3), rgba(255,255,255,1))',
                'linear-gradient(315deg, rgba(255,248,220,0.3), rgba(255,255,255,1), rgba(255,248,220,0.3))'
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className="relative z-10 bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-dreamy">
            <motion.h3 
              className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 text-center"
              whileHover={{ scale: 1.05 }}
            >
              {t('events.guest_info_title')}
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: t('events.cultural_etiquette'),
                  items: [
                    'Please remove shoes before entering ceremonial areas',
                    'Modest dress is appreciated for religious ceremonies',
                    'Photography may be restricted during sacred rituals',
                    'Touching elders\' feet is a sign of respect',
                    'Wait for the couple\'s blessing before taking gifts'
                  ]
                },
                {
                  title: t('events.practical_details'),
                  items: [
                    'Parking will be available at all venues',
                    'Vegetarian and non-vegetarian meals will be served',
                    'Special arrangements for elderly guests',
                    'Contact family for accommodation assistance',
                    'Traditional Bengali sweets will be distributed'
                  ]
                }
              ].map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, x: sectionIndex === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + sectionIndex * 0.2, duration: 0.6 }}
                >
                  <motion.h4 
                    className="font-semibold text-bengali-deep-red dark:text-bengali-gold mb-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    {section.title}
                  </motion.h4>
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <motion.li 
                        key={idx}
                        className="text-gray-600 dark:text-gray-400 text-sm flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + sectionIndex * 0.2 + idx * 0.1 }}
                        whileHover={{ x: 5, color: '#DC143C' }}
                      >
                        <motion.span 
                          className="text-bengali-crimson dark:text-bengali-gold mr-2 mt-1"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity, 
                            delay: idx * 0.2 
                          }}
                        >
                          •
                        </motion.span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;
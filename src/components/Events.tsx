import React from 'react';
import { motion } from 'framer-motion';
import EnhancedEventCard from './EnhancedEventCard';
import { weddingEvents } from '../data/events';
import { useLanguage } from '../contexts/LanguageContext';

const Events: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="events" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-bengali-cream dark:bg-dark-900">
        <div className="absolute inset-0 bg-royal-pattern opacity-30" />
      </div>

      {/* Subtle decorative elements */}
      <motion.div
        className="absolute top-20 right-10 w-48 h-48 rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, rgba(201, 162, 39, 0.5) 0%, transparent 70%)'
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-elegant italic text-bengali-gold text-lg mb-4"
          >
            Celebrate With Us
          </motion.p>

          <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl text-royal-charcoal dark:text-bengali-ivory mb-4">
            {t('events.title')}
          </h2>

          <p className="bengali-text text-xl text-bengali-deep-red dark:text-bengali-gold mb-8">
            {t('events.title_local')}
          </p>

          {/* Elegant divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-bengali-gold/50" />
            <div className="w-2 h-2 rotate-45 border border-bengali-gold/50" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-bengali-gold/50" />
          </div>

          <p className="font-body text-royal-charcoal/70 dark:text-bengali-ivory/70 max-w-2xl mx-auto leading-relaxed">
            {t('events.description')}
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {weddingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <EnhancedEventCard event={event} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Guest Information */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-24"
        >
          <div className="elegant-card dark:elegant-card-dark rounded-lg p-8 md:p-12">
            <h3 className="heading-display text-2xl md:text-3xl text-royal-charcoal dark:text-bengali-ivory text-center mb-10">
              {t('events.guest_info_title')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
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
                <div key={section.title}>
                  <h4 className="heading-display text-lg text-bengali-deep-red dark:text-bengali-gold mb-6">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.items.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + sectionIndex * 0.1 + idx * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3 font-body text-sm text-royal-charcoal/70 dark:text-bengali-ivory/70"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-bengali-gold/60 mt-2 flex-shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bengali-gold/20 to-transparent" />
    </section>
  );
};

export default Events;

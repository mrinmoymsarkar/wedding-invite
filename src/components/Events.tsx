import React from 'react';
import { motion } from 'framer-motion';
import EnhancedEventCard from './EnhancedEventCard';
import { useWeddingEvents } from '../data/events';
import { useLanguage } from '../contexts/LanguageContext';

const Events: React.FC = () => {
  const { t } = useLanguage();
  const weddingEvents = useWeddingEvents();

  return (
    <section id="events" className="relative py-24 md:py-32 overflow-hidden">
      {/* Mountain Silhouette Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1200 120" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
          <path
            d="M0,120 L0,80 L100,60 L200,75 L300,40 L400,55 L500,25 L600,50 L700,20 L800,45 L900,30 L1000,55 L1100,35 L1200,50 L1200,120 Z"
            className="fill-bengali-parchment dark:fill-dark-950 opacity-50"
          />
          <path
            d="M0,120 L0,90 L150,70 L300,85 L450,55 L600,70 L750,45 L900,65 L1050,50 L1200,60 L1200,120 Z"
            className="fill-bengali-parchment dark:fill-dark-950"
          />
        </svg>
      </div>

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
            {t('events.celebrate_with_us')}
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
                    t('events.etiquette_1'),
                    t('events.etiquette_2'),
                    t('events.etiquette_3'),
                    t('events.etiquette_4'),
                    t('events.etiquette_5')
                  ]
                },
                {
                  title: t('events.practical_details'),
                  items: [
                    t('events.practical_1'),
                    t('events.practical_2'),
                    t('events.practical_3'),
                    t('events.practical_4'),
                    t('events.practical_5')
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

      {/* Wave Divider Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none overflow-hidden">
        <motion.svg
          viewBox="0 0 1200 120"
          className="absolute top-0 w-[200%] h-full"
          animate={{ x: [0, -600] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60 T1500,60 T1800,60 T2100,60 T2400,60 L2400,120 L0,120 Z"
            className="fill-bengali-parchment/50 dark:fill-dark-950/50"
          />
        </motion.svg>
        <motion.svg
          viewBox="0 0 1200 120"
          className="absolute top-0 w-[200%] h-full"
          animate={{ x: [-300, -900] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          preserveAspectRatio="none"
        >
          <path
            d="M0,70 Q150,40 300,70 T600,70 T900,70 T1200,70 T1500,70 T1800,70 T2100,70 T2400,70 L2400,120 L0,120 Z"
            className="fill-bengali-parchment dark:fill-dark-950"
          />
        </motion.svg>
      </div>
    </section>
  );
};

export default Events;

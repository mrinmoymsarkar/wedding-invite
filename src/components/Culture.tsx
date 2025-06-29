import React from 'react';
import { motion } from 'framer-motion';
import { Scroll, Heart, Star } from 'lucide-react';
import { culturalInformation } from '../data/cultural-info';
import { useLanguage } from '../contexts/LanguageContext';

const Culture: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="culture" className="py-20 bg-gray-50 dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            {t('culture.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-bengali mb-6">
            {t('culture.title_local')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-bengali-deep-red to-bengali-gold mx-auto mb-6"></div>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('culture.description')}
          </p>
        </motion.div>

        {/* Cultural Information Cards */}
        <div className="space-y-12">
          {culturalInformation.map((info, index) => (
            <motion.div
              key={info.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
            >
              {/* Content */}
              <div className="flex-1 bg-white dark:bg-dark-800 rounded-2xl p-8 shadow-cultural">
                <div className="flex items-center space-x-3 mb-4">
                  <Scroll className="h-6 w-6 text-bengali-crimson dark:text-bengali-gold" />
                  <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
                    {info.title}
                  </h3>
                </div>
                
                <p className="text-bengali-deep-red dark:text-bengali-gold font-bengali text-lg mb-4">
                  {info.bengaliTitle}
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {info.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-bengali-deep-red dark:text-bengali-gold mb-3 flex items-center">
                    <Heart className="h-4 w-4 mr-2" />
                    {t('events.cultural_significance')}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {info.significance}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-bengali-deep-red dark:text-bengali-gold mb-3 flex items-center">
                    <Star className="h-4 w-4 mr-2" />
                    {t('culture.key_traditions')}
                  </h4>
                  <ul className="space-y-2">
                    {info.traditions.map((tradition, idx) => (
                      <li key={idx} className="text-gray-600 dark:text-gray-400 flex items-start">
                        <span className="text-bengali-crimson dark:text-bengali-gold mr-2 mt-1">•</span>
                        {tradition}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Decorative Pattern */}
              <div className="flex-shrink-0">
                <div className="w-64 h-64 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-bengali-gold to-bengali-amber rounded-full opacity-10"></div>
                  <div className="absolute inset-4 bg-gradient-to-tl from-bengali-crimson to-bengali-deep-red rounded-full opacity-20"></div>
                  <div className="absolute inset-8 bg-alpana-pattern rounded-full opacity-30"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-32 h-32 border-4 border-bengali-gold/30 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Traditional Blessings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-bengali-cream to-bengali-ivory dark:from-dark-800 dark:to-dark-700 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
            {t('culture.blessings_title')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-bengali-deep-red dark:text-bengali-gold">
                {t('culture.bride_blessing')}
              </h4>
              <p className="text-bengali-deep-red dark:text-bengali-gold font-bengali text-lg italic">
                {t('culture.bride_blessing_text')}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t('culture.bride_blessing_translation')}
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-bengali-deep-red dark:text-bengali-gold">
                {t('culture.couple_blessing')}
              </h4>
              <p className="text-bengali-deep-red dark:text-bengali-gold font-bengali text-lg italic">
                {t('culture.couple_blessing_text')}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t('culture.couple_blessing_translation')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Culture;
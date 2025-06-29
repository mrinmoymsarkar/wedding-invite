import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown, Plus, Download, Clock, Sparkles } from 'lucide-react';
import { EventDetails } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import CalendarButton from './CalendarButton';

interface CalendarIntegrationProps {
  event: EventDetails;
  compact?: boolean;
}

const CalendarIntegration: React.FC<CalendarIntegrationProps> = ({ 
  event, 
  compact = false 
}) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  if (compact) {
    return (
      <div className="flex flex-wrap gap-2">
        <CalendarButton event={event} variant="google" className="text-xs px-3 py-1.5" />
        <CalendarButton event={event} variant="ics" className="text-xs px-3 py-1.5" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative bg-gradient-to-r from-bengali-cream/80 to-bengali-ivory/80 dark:from-dark-700/80 dark:to-dark-600/80 rounded-xl p-4 border-2 border-bengali-gold/30 dark:border-bengali-gold/20 backdrop-blur-sm overflow-hidden"
    >
      {/* Animated Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(220, 20, 60, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(255, 193, 7, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, rgba(220, 20, 60, 0.2) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Sparkles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-bengali-gold/30 dark:text-bengali-amber/30"
          style={{
            left: `${20 + i * 30}%`,
            top: `${15 + Math.sin(i) * 20}%`
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="h-2 w-2" />
        </motion.div>
      ))}

      {/* Header */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.01 }}
        className="w-full flex items-center justify-between text-left relative z-10"
      >
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ 
              rotate: isExpanded ? 360 : 0,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 0.3 },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="p-2 bg-gradient-to-br from-bengali-gold to-bengali-amber rounded-lg shadow-md"
          >
            <Calendar className="h-5 w-5 text-gray-900" />
          </motion.div>
          <div>
            <h4 className="font-semibold text-bengali-deep-red dark:text-bengali-gold">
              {t('calendar.add_to_calendar')}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('calendar.never_miss_event')}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ 
            rotate: isExpanded ? 180 : 0,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 0.3 },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="p-1 rounded-full bg-bengali-crimson/10 dark:bg-bengali-gold/10"
        >
          <ChevronDown className="h-5 w-5 text-bengali-crimson dark:text-bengali-gold" />
        </motion.div>
      </motion.button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-bengali-gold/30 dark:border-bengali-gold/20 relative z-10"
          >
            {/* Event Quick Info */}
            <motion.div 
              className="mb-4 p-3 bg-white/70 dark:bg-dark-800/70 rounded-lg border border-bengali-gold/20 backdrop-blur-sm"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Clock className="h-4 w-4 text-bengali-crimson dark:text-bengali-gold" />
                </motion.div>
                <span className="text-sm font-medium text-bengali-deep-red dark:text-bengali-gold">
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} at {event.time}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {event.venue}
              </p>
            </motion.div>

            {/* Calendar Options */}
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium text-bengali-deep-red dark:text-bengali-gold mb-3 flex items-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="mr-2"
                  >
                    <Plus className="h-4 w-4" />
                  </motion.div>
                  {t('calendar.choose_calendar')}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <CalendarButton event={event} variant="google" />
                  <CalendarButton event={event} variant="outlook" />
                </div>
              </div>

              <div className="pt-3 border-t border-bengali-gold/20 dark:border-bengali-gold/10">
                <h5 className="text-sm font-medium text-bengali-deep-red dark:text-bengali-gold mb-3 flex items-center">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="mr-2"
                  >
                    <Download className="h-4 w-4" />
                  </motion.div>
                  {t('calendar.download_file')}
                </h5>
                <CalendarButton event={event} variant="ics" className="w-full justify-center" />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  {t('calendar.ics_description')}
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 p-3 bg-gradient-to-r from-bengali-gold/20 to-bengali-amber/20 dark:from-bengali-gold/10 dark:to-bengali-amber/10 rounded-lg border border-bengali-gold/30"
            >
              <div className="flex items-start space-x-2">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="mt-0.5 flex-shrink-0"
                >
                  <Plus className="h-4 w-4 text-bengali-crimson dark:text-bengali-gold" />
                </motion.div>
                <div className="text-xs text-bengali-deep-red dark:text-bengali-gold">
                  <p className="font-medium mb-1">{t('calendar.reminder_included')}</p>
                  <p className="text-gray-600 dark:text-gray-400">{t('calendar.reminder_description')}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Border Animation */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          borderColor: [
            "rgba(255, 215, 0, 0.3)",
            "rgba(220, 20, 60, 0.3)",
            "rgba(255, 193, 7, 0.3)",
            "rgba(255, 215, 0, 0.3)"
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          border: '1px solid transparent'
        }}
      />
    </motion.div>
  );
};

export default CalendarIntegration;
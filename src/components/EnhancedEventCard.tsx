import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Scroll, Heart, Star, Mountain, Waves } from 'lucide-react';
import { motion } from 'framer-motion';
import { EventDetails } from '../types';
import CalendarIntegration from './CalendarIntegration';

interface EnhancedEventCardProps {
  event: EventDetails;
  index: number;
}

const EnhancedEventCard: React.FC<EnhancedEventCardProps> = ({ event, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        y: -10,
        rotateY: 5,
        scale: 1.02
      }}
      className="relative bg-white dark:bg-dark-800 rounded-2xl shadow-cultural hover:shadow-magical transition-all duration-500 overflow-hidden group perspective-1000"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Magical Border Animation */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          background: [
            'linear-gradient(0deg, rgba(255, 215, 0, 0.3), rgba(220, 20, 60, 0.3))',
            'linear-gradient(90deg, rgba(220, 20, 60, 0.3), rgba(255, 193, 7, 0.3))',
            'linear-gradient(180deg, rgba(255, 193, 7, 0.3), rgba(255, 215, 0, 0.3))',
            'linear-gradient(270deg, rgba(255, 215, 0, 0.3), rgba(220, 20, 60, 0.3))'
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          padding: '2px',
          background: 'linear-gradient(45deg, rgba(255, 215, 0, 0.3), rgba(220, 20, 60, 0.3))'
        }}
      >
        <div className="w-full h-full bg-white dark:bg-dark-800 rounded-2xl" />
      </motion.div>

      {/* Location-themed Background Elements */}
      {event.id === 'biye' && (
        <>
          {/* Mountain silhouette for Siliguri */}
          <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-[5] opacity-[0.08]">
            <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
              <path d="M0,100 L0,60 L40,40 L80,55 L120,25 L160,45 L200,15 L240,35 L280,20 L320,50 L360,30 L400,45 L400,100 Z" fill="currentColor" className="text-bengali-wine dark:text-bengali-gold" />
              <path d="M0,100 L0,70 L50,55 L100,65 L150,45 L200,60 L250,40 L300,55 L350,50 L400,60 L400,100 Z" fill="currentColor" className="text-bengali-wine/50 dark:text-bengali-gold/50" />
            </svg>
          </div>
          {/* Floating snow/mist particles */}
          <motion.div
            className="absolute top-10 right-10 w-2 h-2 rounded-full bg-white/20 pointer-events-none"
            animate={{ y: [0, 100], opacity: [0, 0.5, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="absolute top-20 right-20 w-1.5 h-1.5 rounded-full bg-white/15 pointer-events-none"
            animate={{ y: [0, 80], opacity: [0, 0.4, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute top-5 left-1/4 w-1 h-1 rounded-full bg-white/20 pointer-events-none"
            animate={{ y: [0, 120], opacity: [0, 0.3, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          />
        </>
      )}

      {event.id === 'reception' && (
        <>
          {/* Animated waves for Alibag beach */}
          <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-[5] overflow-hidden opacity-[0.12]">
            <motion.svg
              viewBox="0 0 400 50"
              className="absolute bottom-0 w-[200%] h-full"
              animate={{ x: [0, -400] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              preserveAspectRatio="none"
            >
              <path d="M0,25 Q50,10 100,25 T200,25 T300,25 T400,25 T500,25 T600,25 T700,25 T800,25 L800,50 L0,50 Z" fill="currentColor" className="text-blue-400/60" />
            </motion.svg>
            <motion.svg
              viewBox="0 0 400 50"
              className="absolute bottom-0 w-[200%] h-full"
              animate={{ x: [-200, -600] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              preserveAspectRatio="none"
            >
              <path d="M0,30 Q50,20 100,30 T200,30 T300,30 T400,30 T500,30 T600,30 T700,30 T800,30 L800,50 L0,50 Z" fill="currentColor" className="text-blue-500/40" />
            </motion.svg>
          </div>
          {/* Sun reflection sparkles */}
          <motion.div
            className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-yellow-300/30 pointer-events-none"
            animate={{ scale: [0, 1, 0], opacity: [0, 0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-1.5 h-1.5 rounded-full bg-yellow-200/20 pointer-events-none"
            animate={{ scale: [0, 1, 0], opacity: [0, 0.5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
          />
        </>
      )}

      {/* Content Container */}
      <div className="relative z-10">
        {/* Event Image with Enhanced Effects */}
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
          <motion.img
            src={event.photo}
            alt={event.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          
          {/* Gradient Overlay - Location themed */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: isHovered
                ? event.id === 'biye'
                  ? 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(100, 150, 180, 0.15), transparent)' // Mountain cool tones
                  : event.id === 'reception'
                  ? 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(255, 180, 100, 0.15), transparent)' // Beach warm sunset
                  : 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(220, 20, 60, 0.2), transparent)'
                : 'linear-gradient(to top, rgba(0,0,0,0.7), transparent, transparent)'
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Location Badge */}
          {event.id === 'biye' && (
            <motion.div
              className="absolute top-4 left-4 bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Mountain className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Himalayas</span>
            </motion.div>
          )}
          {event.id === 'reception' && (
            <motion.div
              className="absolute top-4 left-4 bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Waves className="h-3.5 w-3.5 text-cyan-500" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Beach Town</span>
            </motion.div>
          )}

          {/* Floating Birds for Mountains */}
          {event.id === 'biye' && (
            <>
              <motion.div
                className="absolute top-8 right-16 pointer-events-none"
                animate={{ x: [-50, 100], y: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <svg width="16" height="8" viewBox="0 0 16 8" className="text-gray-600/40">
                  <path d="M0,4 Q4,0 8,4 Q12,0 16,4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
              </motion.div>
              <motion.div
                className="absolute top-12 right-24 pointer-events-none"
                animate={{ x: [-30, 120], y: [0, -5, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 2 }}
              >
                <svg width="12" height="6" viewBox="0 0 16 8" className="text-gray-500/30">
                  <path d="M0,4 Q4,0 8,4 Q12,0 16,4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
              </motion.div>
            </>
          )}

          {/* Floating Seagulls for Beach */}
          {event.id === 'reception' && (
            <>
              <motion.div
                className="absolute top-10 right-12 pointer-events-none"
                animate={{ x: [80, -50], y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              >
                <svg width="18" height="10" viewBox="0 0 18 10" className="text-white/50">
                  <path d="M0,5 Q4,1 9,5 Q14,1 18,5" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </motion.div>
              <motion.div
                className="absolute top-16 right-28 pointer-events-none"
                animate={{ x: [60, -80], y: [0, -5, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "linear", delay: 3 }}
              >
                <svg width="14" height="8" viewBox="0 0 18 10" className="text-white/40">
                  <path d="M0,5 Q4,1 9,5 Q14,1 18,5" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </motion.div>
            </>
          )}

          {/* Floating Elements */}
          <motion.div
            className="absolute top-4 right-4"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Star className="h-6 w-6 text-bengali-gold" fill="currentColor" />
          </motion.div>

          {/* Event Title with Animation */}
          <motion.div 
            className="absolute bottom-4 left-4 right-4 text-white"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <motion.h3 
              className="text-2xl font-heading font-bold mb-1"
              whileHover={{ scale: 1.05 }}
            >
              {event.name}
            </motion.h3>
            <motion.p 
              className="text-bengali-gold font-bengali text-lg"
              animate={{
                textShadow: [
                  '0 0 5px rgba(255, 215, 0, 0.5)',
                  '0 0 15px rgba(255, 215, 0, 0.8)',
                  '0 0 5px rgba(255, 215, 0, 0.5)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {event.bengaliName}
            </motion.p>
          </motion.div>

          {/* Ripple Effect on Hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full h-full rounded-full bg-white/20" />
            </motion.div>
          )}
        </div>

        {/* Event Details with Staggered Animation */}
        <motion.div 
          className="p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          {/* Date, Time, Venue with Icons */}
          <div className="space-y-3 mb-6">
            {[
              { 
                icon: Calendar, 
                text: new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }),
                delay: 0
              },
              { 
                icon: Clock, 
                text: event.time,
                delay: 0.1
              },
              {
                icon: MapPin,
                text: event.venue,
                delay: 0.2,
                locationIcon: event.id === 'biye' ? Mountain : event.id === 'reception' ? Waves : null
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="flex items-center space-x-3 text-gray-600 dark:text-gray-400"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + item.delay + 0.6 }}
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <item.icon className="h-5 w-5 text-bengali-crimson dark:text-bengali-gold" />
                </motion.div>
                <span className="flex items-center gap-2">
                  {item.text}
                  {item.locationIcon && (
                    <motion.span
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      title={event.id === 'biye' ? 'Foothills of the Himalayas' : 'Coastal Beach Town'}
                    >
                      <item.locationIcon className="h-4 w-4 text-bengali-gold opacity-80" />
                    </motion.span>
                  )}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Calendar Integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.8 }}
            className="mb-6"
          >
            <CalendarIntegration event={event} />
          </motion.div>

          {/* Description with Typewriter Effect */}
          <motion.p 
            className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 1 }}
          >
            {event.description}
          </motion.p>

          {/* Significance Section */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 1.2 }}
          >
            <motion.h4 
              className="font-semibold text-bengali-deep-red dark:text-bengali-gold mb-2 flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Scroll className="h-4 w-4 mr-2" />
              </motion.div>
              Cultural Significance
            </motion.h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {event.significance}
            </p>
          </motion.div>

          {/* Rituals with Animated List */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 1.4 }}
          >
            <h4 className="font-semibold text-bengali-deep-red dark:text-bengali-gold mb-3">
              Traditional Rituals
            </h4>
            <ul className="space-y-2">
              {event.rituals.map((ritual, idx) => (
                <motion.li 
                  key={idx}
                  className="text-gray-600 dark:text-gray-400 text-sm flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 1.6 + idx * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.span 
                    className="text-bengali-crimson dark:text-bengali-gold mr-2 mt-1"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: idx * 0.3 
                    }}
                  >
                    •
                  </motion.span>
                  {ritual}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Dress Code with Enhanced Styling */}
          <motion.div 
            className="relative bg-gradient-to-r from-bengali-cream to-bengali-ivory dark:from-dark-700 dark:to-dark-600 rounded-lg p-4 overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 1.8 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Animated Background Pattern */}
            <motion.div
              className="absolute inset-0 opacity-10"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, rgba(220, 20, 60, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 100%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 0%, rgba(220, 20, 60, 0.3) 0%, transparent 50%)'
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="relative z-10">
              <motion.h4 
                className="font-semibold text-bengali-deep-red dark:text-bengali-gold mb-2 flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Heart className="h-4 w-4 mr-2" fill="currentColor" />
                </motion.div>
                Dress Code
              </motion.h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {event.dresscode}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: isHovered 
            ? '0 0 50px rgba(220, 20, 60, 0.3), 0 0 100px rgba(255, 215, 0, 0.2)'
            : '0 0 0px rgba(220, 20, 60, 0), 0 0 0px rgba(255, 215, 0, 0)'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default EnhancedEventCard;
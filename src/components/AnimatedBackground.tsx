import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Aurora Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(220, 20, 60, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(255, 193, 7, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, rgba(220, 20, 60, 0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Petals */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute w-3 h-3 bg-bengali-crimson/20 dark:bg-bengali-gold/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            scale: 0,
            rotate: 0
          }}
          animate={{
            y: -100,
            scale: [0, 1, 0.5, 0],
            rotate: [0, 180, 360],
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth + (Math.random() - 0.5) * 200,
              Math.random() * window.innerWidth
            ]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Constellation Effect */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-bengali-gold/30 dark:text-bengali-amber/30"
          style={{
            left: `${10 + (i * 7)}%`,
            top: `${15 + Math.sin(i) * 40}%`
          }}
          animate={{
            scale: [0.5, 1.2, 0.5],
            opacity: [0.2, 0.8, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        >
          <Star className="h-2 w-2" fill="currentColor" />
        </motion.div>
      ))}

      {/* Magical Orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-16 h-16 rounded-full"
          style={{
            background: `radial-gradient(circle, ${
              i % 2 === 0 
                ? 'rgba(220, 20, 60, 0.1)' 
                : 'rgba(255, 215, 0, 0.1)'
            } 0%, transparent 70%)`,
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Sparkle Trail */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-bengali-gold/40 dark:text-bengali-amber/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="h-1 w-1" />
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedBackground;
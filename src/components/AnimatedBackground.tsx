import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Subtle ambient gradient */}
      <motion.div
        className="absolute inset-0 opacity-20 dark:opacity-10"
        animate={{
          background: [
            'radial-gradient(ellipse at 20% 30%, rgba(201, 162, 39, 0.15) 0%, transparent 50%)',
            'radial-gradient(ellipse at 80% 70%, rgba(93, 15, 26, 0.1) 0%, transparent 50%)',
            'radial-gradient(ellipse at 50% 50%, rgba(201, 162, 39, 0.1) 0%, transparent 50%)',
            'radial-gradient(ellipse at 20% 30%, rgba(201, 162, 39, 0.15) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Very subtle floating accent - top */}
      <motion.div
        className="absolute top-[15%] right-[20%] w-64 h-64 rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, rgba(201, 162, 39, 0.5) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, -15, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Subtle floating accent - bottom */}
      <motion.div
        className="absolute bottom-[20%] left-[15%] w-48 h-48 rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, rgba(93, 15, 26, 0.4) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -15, 0],
          y: [0, 20, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />

      {/* Minimal decorative dots */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-1 h-1 rounded-full bg-bengali-gold/20 dark:bg-bengali-gold/10"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + Math.sin(i * 2) * 25}%`
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Single elegant rotating ring - very subtle */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-bengali-gold/[0.03] dark:border-bengali-gold/[0.02]"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Second ring - counter rotation */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-bengali-deep-red/[0.02] dark:border-bengali-deep-red/[0.01]"
        animate={{
          rotate: -360
        }}
        transition={{
          duration: 90,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default AnimatedBackground;

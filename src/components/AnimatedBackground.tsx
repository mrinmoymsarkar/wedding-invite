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

      {/* Distant Mountain Silhouette - Left side (hidden on mobile) */}
      <div className="hidden md:block absolute bottom-0 left-0 w-1/3 h-40 opacity-[0.04] dark:opacity-[0.02] pointer-events-none">
        <svg viewBox="0 0 400 160" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,160 L0,120 L50,80 L100,100 L150,50 L200,80 L250,40 L300,70 L350,60 L400,90 L400,160 Z" fill="currentColor" className="text-blue-900" />
          <path d="M0,160 L0,130 L60,100 L120,115 L180,70 L240,95 L300,65 L360,85 L400,100 L400,160 Z" fill="currentColor" className="text-blue-800/60" />
        </svg>
      </div>

      {/* Distant floating birds - top left (hidden on mobile) */}
      <motion.div
        className="hidden md:block absolute top-[15%] left-[10%] opacity-[0.08]"
        animate={{ x: [0, 150], y: [0, -20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <svg width="24" height="12" viewBox="0 0 24 12" className="text-gray-700">
          <path d="M0,6 Q6,0 12,6 Q18,0 24,6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
      </motion.div>
      <motion.div
        className="hidden md:block absolute top-[20%] left-[5%] opacity-[0.05]"
        animate={{ x: [0, 200], y: [0, -15, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 5 }}
      >
        <svg width="18" height="9" viewBox="0 0 24 12" className="text-gray-600">
          <path d="M0,6 Q6,0 12,6 Q18,0 24,6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
      </motion.div>

      {/* Subtle Wave Pattern - Right side bottom (hidden on mobile) */}
      <div className="hidden md:block absolute bottom-0 right-0 w-1/3 h-24 opacity-[0.03] dark:opacity-[0.02] pointer-events-none overflow-hidden">
        <motion.svg
          viewBox="0 0 400 100"
          className="absolute bottom-0 w-[300%] h-full"
          animate={{ x: [0, -400] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          preserveAspectRatio="none"
        >
          <path d="M0,50 Q100,20 200,50 T400,50 T600,50 T800,50 T1000,50 T1200,50 L1200,100 L0,100 Z" fill="currentColor" className="text-cyan-600" />
        </motion.svg>
        <motion.svg
          viewBox="0 0 400 100"
          className="absolute bottom-0 w-[300%] h-full"
          animate={{ x: [-200, -600] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          preserveAspectRatio="none"
        >
          <path d="M0,60 Q100,35 200,60 T400,60 T600,60 T800,60 T1000,60 T1200,60 L1200,100 L0,100 Z" fill="currentColor" className="text-cyan-500/70" />
        </motion.svg>
      </div>

      {/* Floating seagull - right side (hidden on mobile) */}
      <motion.div
        className="hidden md:block absolute top-[25%] right-[15%] opacity-[0.06]"
        animate={{ x: [0, -120], y: [0, 10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg width="20" height="10" viewBox="0 0 24 12" className="text-gray-500">
          <path d="M0,6 Q6,0 12,6 Q18,0 24,6" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </motion.div>
    </div>
  );
};

export default AnimatedBackground;

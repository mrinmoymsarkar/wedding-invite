/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Royal Bengali Heritage palette
        bengali: {
          'deep-red': '#5D0F1A',
          'crimson': '#8B1E3F',
          'gold': '#C9A227',
          'amber': '#E8D5A3',
          'cream': '#FAF3E0',
          'ivory': '#FFFEF7',
          'orange': '#B85C38',
          'saffron': '#D4A574',
          'burgundy': '#3D0A11',
          'teal': '#1A4D4D',
          'sage': '#4A6741'
        },
        royal: {
          burgundy: '#5D0F1A',
          'burgundy-deep': '#3D0A11',
          gold: '#C9A227',
          'gold-pale': '#E8D5A3',
          cream: '#FAF3E0',
          ivory: '#FFFEF7',
          teal: '#1A4D4D',
          charcoal: '#1C1C1C'
        },
        dark: {
          950: '#050505',
          900: '#0a0a0a',
          800: '#1a1a1a',
          700: '#2a2a2a',
          600: '#3a3a3a'
        }
      },
      fontFamily: {
        'bengali': ['Noto Sans Bengali', 'system-ui', 'sans-serif'],
        'marathi': ['Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        'heading': ['Cormorant Garamond', 'Georgia', 'serif'],
        'display': ['Cormorant Garamond', 'Georgia', 'serif'],
        'elegant': ['Crimson Pro', 'Georgia', 'serif'],
        'body': ['DM Sans', 'system-ui', 'sans-serif']
      },
      animation: {
        'alpana': 'alpana 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'heart-float': 'heartFloat 8s ease-in-out infinite',
        'sparkle': 'sparkle 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'wedding-dance': 'weddingDance 4s ease-in-out infinite',
        'romantic-sway': 'romanticSway 6s ease-in-out infinite',
        'magical-rotate': 'magicalRotate 8s linear infinite',
        'gentle-bounce': 'gentleBounce 3s ease-in-out infinite',
        'text-glow': 'textGlow 3s ease-in-out infinite',
        'border-dance': 'borderDance 4s ease-in-out infinite',
        'card-hover': 'cardHover 0.3s ease-out',
        'ripple': 'ripple 2s ease-out infinite',
        'morph': 'morph 6s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
        'floating-petals': 'floatingPetals 12s linear infinite',
        'typewriter': 'typewriter 4s steps(40) infinite',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'zoom-in': 'zoomIn 0.6s ease-out',
        'flip-in': 'flipIn 0.8s ease-out',
        'elastic': 'elastic 1s ease-out',
        'wave': 'wave 2s ease-in-out infinite',
        'pendulum': 'pendulum 4s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'aurora': 'aurora 8s ease-in-out infinite',
        'constellation': 'constellation 10s linear infinite'
      },
      keyframes: {
        alpana: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.7' },
          '50%': { transform: 'scale(1.1) rotate(180deg)', opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        heartFloat: {
          '0%': { transform: 'translateY(100vh) scale(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100px) scale(1) rotate(360deg)', opacity: '0' }
        },
        sparkle: {
          '0%, 100%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
          '50%': { transform: 'scale(1) rotate(180deg)', opacity: '1' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(220, 20, 60, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(220, 20, 60, 0.6), 0 0 30px rgba(255, 215, 0, 0.3)' }
        },
        weddingDance: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '25%': { transform: 'translateX(10px) rotate(5deg)' },
          '50%': { transform: 'translateX(0) rotate(0deg)' },
          '75%': { transform: 'translateX(-10px) rotate(-5deg)' }
        },
        romanticSway: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-5px) rotate(2deg)' },
          '66%': { transform: 'translateY(5px) rotate(-2deg)' }
        },
        magicalRotate: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(90deg) scale(1.1)' },
          '50%': { transform: 'rotate(180deg) scale(1)' },
          '75%': { transform: 'rotate(270deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' }
        },
        gentleBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        textGlow: {
          '0%, 100%': { 
            textShadow: '0 0 5px rgba(220, 20, 60, 0.3)',
            transform: 'scale(1)'
          },
          '50%': { 
            textShadow: '0 0 20px rgba(220, 20, 60, 0.8), 0 0 30px rgba(255, 215, 0, 0.5)',
            transform: 'scale(1.02)'
          }
        },
        borderDance: {
          '0%, 100%': { 
            borderColor: 'rgba(255, 215, 0, 0.3)',
            borderWidth: '2px'
          },
          '25%': { 
            borderColor: 'rgba(220, 20, 60, 0.5)',
            borderWidth: '3px'
          },
          '50%': { 
            borderColor: 'rgba(255, 193, 7, 0.4)',
            borderWidth: '2px'
          },
          '75%': { 
            borderColor: 'rgba(139, 0, 0, 0.6)',
            borderWidth: '3px'
          }
        },
        cardHover: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(-5px) scale(1.02)' }
        },
        ripple: {
          '0%': { 
            transform: 'scale(0)',
            opacity: '1'
          },
          '100%': { 
            transform: 'scale(4)',
            opacity: '0'
          }
        },
        morph: {
          '0%, 100%': { borderRadius: '20px' },
          '25%': { borderRadius: '50px 20px' },
          '50%': { borderRadius: '20px 50px' },
          '75%': { borderRadius: '50px' }
        },
        gradientShift: {
          '0%, 100%': { 
            background: 'linear-gradient(45deg, rgba(220, 20, 60, 0.1), rgba(255, 215, 0, 0.1))'
          },
          '25%': { 
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 193, 7, 0.1))'
          },
          '50%': { 
            background: 'linear-gradient(225deg, rgba(255, 193, 7, 0.1), rgba(139, 0, 0, 0.1))'
          },
          '75%': { 
            background: 'linear-gradient(315deg, rgba(139, 0, 0, 0.1), rgba(220, 20, 60, 0.1))'
          }
        },
        floatingPetals: {
          '0%': { 
            transform: 'translateY(100vh) translateX(0) rotate(0deg)',
            opacity: '0'
          },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { 
            transform: 'translateY(-100px) translateX(100px) rotate(360deg)',
            opacity: '0'
          }
        },
        typewriter: {
          '0%': { width: '0' },
          '50%': { width: '100%' },
          '100%': { width: '0' }
        },
        slideInLeft: {
          '0%': { 
            transform: 'translateX(-100px)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        slideInRight: {
          '0%': { 
            transform: 'translateX(100px)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        zoomIn: {
          '0%': { 
            transform: 'scale(0.5)',
            opacity: '0'
          },
          '100%': { 
            transform: 'scale(1)',
            opacity: '1'
          }
        },
        flipIn: {
          '0%': { 
            transform: 'rotateY(-90deg)',
            opacity: '0'
          },
          '100%': { 
            transform: 'rotateY(0)',
            opacity: '1'
          }
        },
        elastic: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1.2)' },
          '75%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' }
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(-10px)' },
          '50%': { transform: 'translateY(0)' },
          '75%': { transform: 'translateY(10px)' }
        },
        pendulum: {
          '0%, 100%': { transform: 'rotate(-15deg)' },
          '50%': { transform: 'rotate(15deg)' }
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        aurora: {
          '0%, 100%': { 
            background: 'linear-gradient(45deg, rgba(220, 20, 60, 0.1), rgba(255, 215, 0, 0.1), rgba(255, 193, 7, 0.1))'
          },
          '33%': { 
            background: 'linear-gradient(45deg, rgba(255, 215, 0, 0.1), rgba(255, 193, 7, 0.1), rgba(220, 20, 60, 0.1))'
          },
          '66%': { 
            background: 'linear-gradient(45deg, rgba(255, 193, 7, 0.1), rgba(220, 20, 60, 0.1), rgba(255, 215, 0, 0.1))'
          }
        },
        constellation: {
          '0%': { 
            transform: 'translateX(0) translateY(0)',
            opacity: '0.3'
          },
          '25%': { 
            transform: 'translateX(20px) translateY(-10px)',
            opacity: '1'
          },
          '50%': { 
            transform: 'translateX(0) translateY(-20px)',
            opacity: '0.5'
          },
          '75%': { 
            transform: 'translateX(-20px) translateY(-10px)',
            opacity: '1'
          },
          '100%': { 
            transform: 'translateX(0) translateY(0)',
            opacity: '0.3'
          }
        }
      },
      backgroundImage: {
        'alpana-pattern': `radial-gradient(circle at 25% 25%, #FFD700 2px, transparent 2px),
                          radial-gradient(circle at 75% 75%, #DC143C 2px, transparent 2px)`,
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'wedding-pattern': `
          radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.1) 2px, transparent 2px),
          radial-gradient(circle at 80% 80%, rgba(220, 20, 60, 0.1) 2px, transparent 2px),
          radial-gradient(circle at 40% 60%, rgba(255, 193, 7, 0.1) 1px, transparent 1px)
        `,
        'aurora-gradient': 'linear-gradient(45deg, rgba(220, 20, 60, 0.1), rgba(255, 215, 0, 0.1), rgba(255, 193, 7, 0.1))',
        'magical-gradient': 'conic-gradient(from 0deg, rgba(220, 20, 60, 0.2), rgba(255, 215, 0, 0.2), rgba(255, 193, 7, 0.2), rgba(220, 20, 60, 0.2))'
      },
      boxShadow: {
        'cultural': '0 10px 40px rgba(220, 20, 60, 0.15)',
        'gold': '0 10px 40px rgba(255, 215, 0, 0.15)',
        'romantic': '0 15px 50px rgba(220, 20, 60, 0.2), 0 5px 15px rgba(255, 215, 0, 0.1)',
        'wedding-glow': '0 0 30px rgba(220, 20, 60, 0.3), 0 0 60px rgba(255, 215, 0, 0.2)',
        'magical': '0 0 50px rgba(220, 20, 60, 0.4), 0 0 100px rgba(255, 215, 0, 0.3)',
        'dreamy': '0 20px 60px rgba(220, 20, 60, 0.15), 0 10px 30px rgba(255, 215, 0, 0.1)',
        'ethereal': '0 0 40px rgba(255, 215, 0, 0.2), inset 0 0 40px rgba(220, 20, 60, 0.1)'
      },
      backdropBlur: {
        'xs': '2px',
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      }
    },
  },
  plugins: [],
};
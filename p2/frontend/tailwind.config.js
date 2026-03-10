/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Intrex refined color palette
        bg: {
          primary: '#09090E',    // Near-black with blue undertone
          secondary: '#0C0D15',  // Slightly lighter for rhythm
          surface: '#0F1018',    // Card surfaces
        },
        brand: {
          primary: '#6D5BFF',    // Electric purple
          secondary: '#00D4FF',  // Electric cyan
          success: '#10F0A0',    // Neon mint
          accent: '#F59E0B',     // Warm amber for testimonials
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#9CA3C8',
          tertiary: '#4B5280',
        },
      },
      fontFamily: {
        serif: ['Instrument Serif', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(circle at 30% 50%, rgba(109, 91, 255, 0.15) 0%, transparent 50%)',
        'gradient-ai': 'linear-gradient(90deg, #6D5BFF 0%, #00D4FF 100%)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
        'count-up': 'count-up 2s ease-out forwards',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'slide-in-underline': 'slide-in-underline 0.3s ease-out',
        'radar-pulse': 'radar-pulse 2s ease-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'count-up': {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-up': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-underline': {
          'from': { transform: 'translateX(-100%)' },
          'to': { transform: 'translateX(0)' },
        },
        'radar-pulse': {
          '0%': { 
            transform: 'scale(1)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(2)',
            opacity: '0',
          },
        },
      },
      boxShadow: {
        'glow-purple': '0 0 24px rgba(109, 91, 255, 0.4)',
        'glow-cyan': '0 0 24px rgba(0, 212, 255, 0.3)',
        'glow-mint': '0 0 24px rgba(16, 240, 160, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

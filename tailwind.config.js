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
        studio: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          750: '#e2e8f0',
          800: '#f8fafc',
          850: '#e2e8f0',
          900: '#f1f5f9',
          950: '#ffffff',
        },
        gold: {
          400: '#d97706',
          500: '#b45309',
          600: '#92400e',
        },
        crimson: {
          500: '#dc2626',
          600: '#b91c1c',
          700: '#991b1b',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Outfit', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Plus Jakarta Sans"', 'Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}

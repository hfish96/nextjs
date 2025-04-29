/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#1a1d29',
          100: '#232838',
          200: '#2c3348',
          300: '#343e5c',
          400: '#3d4a70',
          500: '#4a5d95',
          600: '#5471c9',
          700: '#698fff',
          800: '#7ba3ff',
          900: '#a9c5ff',
        },
        dark: {
          950: '#000000', /* True black for OLED */
          900: '#0a0a0f',
          850: '#121218',
          800: '#17171f',
          700: '#1c1c26',
          600: '#22222e',
          500: '#2a2a3a',
          400: '#343449',
          300: '#3e3e59',
        },
        gray: {
          750: '#343447',
          650: '#484861',
          550: '#5e5e79',
        },
        accent: {
          blue: '#4d7aff',
          green: '#4ade80',
          red: '#ef4567',
          yellow: '#eab308',
          purple: '#8b5cf6',
        },
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'morph-slow': 'morph 8s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'morph': {
          '0%': { 'border-radius': '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { 'border-radius': '30% 60% 70% 40%/50% 60% 30% 60%' },
          '100%': { 'border-radius': '60% 40% 30% 70%/60% 30% 70% 40%' }
        }
      }
    },
  },
  plugins: [],
}


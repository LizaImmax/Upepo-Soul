import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Upepo Soul Color Palette - Sacred & Heart-Centered
        gold: {
          50: '#fefaf0',
          100: '#fef5dc',
          200: '#fdeab8',
          300: '#f5dd94',
          400: '#e9d07a',
          500: '#D9B24C', // Sacred Gold - Primary Brand
          600: '#E2C675', // Warm Gold variant
          700: '#c9a33e',
          800: '#a68632',
          900: '#876c28',
        },
        orchid: {
          50: '#f9f5fd',
          100: '#f2e9fb',
          200: '#e8d9f7',
          300: '#d6bef2',
          400: '#c4a4eb',
          500: '#B78CE2', // Soft Orchid Purple - Spiritual
          600: '#a374d9',
          700: '#8d5dc9',
          800: '#7449b0',
          900: '#5d3a8f',
        },
        lotus: {
          50: '#fdf8f9',
          100: '#fbf0f3',
          200: '#f8e3e9',
          300: '#f3d1dc',
          400: '#edb9c9',
          500: '#E7C1CC', // Lotus Pink - Heart-centered
          600: '#dda3b3',
          700: '#c9859a',
          800: '#b06880',
          900: '#8f5467',
        },
        sand: {
          50: '#fdfcfb',
          100: '#f9f7f3',
          200: '#f4f0e9',
          300: '#ede6d9',
          400: '#E8DCC5', // Warm Sand Beige - Grounding
          600: '#d4c4a8',
          700: '#bfaa8c',
          800: '#a18f73',
          900: '#83745c',
        },
        moonlit: {
          50: '#fdfcfe',
          100: '#F7F7FB', // Moonlit White - Purity
          200: '#f2f2f7',
          300: '#e8e8f0',
          400: '#d9d9e6',
          500: '#c5c5d6',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F8F5ED', // Warm ivory
          light: '#FCFAF5',
          warm: '#F8F5ED',
        },
        cream: {
          DEFAULT: '#EFE8DA', // Soft cream
          soft: '#EFE8DA',
          dark: '#E4D9C5',
        },
        gold: {
          DEFAULT: '#C5A46D', // Champagne gold
          champagne: '#C5A46D',
          antique: '#A88B59', // Antique gold
          light: '#DBC59E',
          dark: '#8E7345',
        },
        brown: {
          DEFAULT: '#493B2D', // Deep brown
          deep: '#493B2D',
          muted: '#695745',
          light: '#887460',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        kannada: ['"Noto Serif Kannada"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'paper': '0 4px 20px -2px rgba(73, 59, 45, 0.08), 0 2px 6px -1px rgba(73, 59, 45, 0.04)',
        'paper-lg': '0 10px 30px -4px rgba(73, 59, 45, 0.12), 0 4px 10px -2px rgba(73, 59, 45, 0.06)',
        'inner-gold': 'inset 0 0 0 1px rgba(197, 164, 109, 0.35)',
      },
      borderWidth: {
        'hairline': '0.5px',
      },
      maxWidth: {
        'mobile': '390px',
      },
    },
  },
  plugins: [],
}

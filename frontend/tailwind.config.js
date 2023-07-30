const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        glitch: {
          pink: '#ff00ff',
          yellow: '#ffff00',
          cyan: "#00ffff"
        },
      },
      spacing: {
        88: '22rem',
      },
    },
  },
  plugins: [],
};
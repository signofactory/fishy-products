const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backdropFilter: {
      none: 'none',
      blur: 'blur(4px)',
    },
    extend: {
      fontFamily: {
        chicago: ['Chicago', 'sans-serif'],
        sans: ['Arial', ...defaultTheme.fontFamily.sans],
      },
      transitionDelay: {
        600: '600ms;',
      },
      colors: {
        rose: {
          light: '#F4ECEA',
          dark: '#C9B6B1',
        },
        lightBlue: {
          lightest: '#edf7fa',
          light: '#DBEFF5',
          dark: '#82B1BF',
          darkest: '#2C4D57',
        },
        orchid: {
          50: '#f9f9fe',
          100: '#ebebfe',
          150: '#E0E2FE',
          200: '#cdcfff',
          300: '#b3b6f2',
          dark: '#8f94ff',
          darkest: '#424CB5',
        },
      },
    },
  },
  variants: {
    extend: {
      scale: ['active'],
      textColor: ['disabled'],
      backgroundColor: ['disabled'],
      borderColor: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-filters')],
};

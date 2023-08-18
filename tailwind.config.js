/** @type {import('tailwindcss').Config} */

const obj = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '320px',
      sm: '768px',
      md: '992px',
      lg: '1200px',
    },
    colors: {
      primary: '#1c4f26',
      secondary: '#ffc80b',
      'primary-text': '#141414',
      'secondary-text': '#686868',
      divider: '#e6ebf1',
      'alt-divider': '#EFF3F8',
      disable: '#cccccc',
      gray: '#686868',
      'light-gray': '#f5f5f5',
      paper: '#ffffff',
      default: '#fafafb',
      common: {
        black: '#000',
        white: '#fff',
        error: '#cf2e2e',
        success: '#2e7d32',
        info: '#0288d1',
        warning: '#ed6c02',
      },

      dark: {
        primary: '#52935f',
        secondary: '#cda416',
        'primary-text': '#ffffff',
        'secondary-text': '#999999',
        divider: 'rgba(255, 255, 255, 0.05)',
        disable: '#cccccc',
        gray: '#686868',
        'light-gray': '#292929',
        paper: '#1e1e1e',
        default: '#121212',
      },
    },
    fontFamily: {
      publicSans: ['Public Sans', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
    },
    extend: {
      dropShadow: {
        '2xl': '0 25px 25px rgb(88 88 88 / 8%)',
        '2xl-dark': '0 25px 25px rgb(0 0 0 / 60%)',
      },
    },
  },
  plugins: [require('tailwindcss-debug-screens')],
};

export default obj;

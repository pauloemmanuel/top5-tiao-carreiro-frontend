/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ed',
          100: '#fdeed5',
          200: '#fad9ab',
          300: '#f6be75',
          400: '#f19c3d',
          500: '#ed7f16',
          600: '#de650c',
          700: '#b8500c',
          800: '#934011',
          900: '#7c3811',
        },
        wood: {
          50: '#faf8f3',
          100: '#f4f0e6',
          200: '#e8dfc7',
          300: '#dbc8a0',
          400: '#cdac73',
          500: '#c19754',
          600: '#b38749',
          700: '#95703e',
          800: '#7a5d37',
          900: '#654d30',
        }
      },
      fontFamily: {
        'country': ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

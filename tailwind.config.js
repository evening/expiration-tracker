/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-unused-vars
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
      primary: { 100: 'hsl(185, 53%, 63%)', 200: 'hsl(186, 49%, 55%)', 300: 'hsl(186, 43%, 47%)', 400: 'hsl(186, 37%, 39%)', 500: 'hsl(186, 31%, 31%)' },
      secondary: { 100: 'hsl(339, 68%, 74%)', 200: 'hsl(338, 61%, 68%)', 300: 'hsl(338, 55%, 62%)', 400: 'hsl(338, 49%, 56%)', 500: 'hsl(338, 43%, 50%)' },
      accent: { 100: 'hsl(40, 77%, 57%)', 200: 'hsl(37, 71%, 52%)', 300: 'hsl(35, 65%, 47%)', 400: 'hsl(32, 60%, 43%)', 500: 'hsl(30, 55%, 39%)' },
      neutral: { 100: 'hsl(307, 36%, 13%)', 200: 'hsl(306, 36%, 9%)', 300: 'hsl(305, 37%, 5%)', 400: 'hsl(304, 37%, 3%)', 500: 'hsl(304, 37%, 0%)' },
      base1: { 100: 'hsl(30, 13%, 96%)', 200: 'hsl(30, 16%, 91%)', 300: 'hsl(30, 19%, 85%)', 400: 'hsl(30, 22%, 80%)', 500: 'hsl(30, 25%, 75%)' },
      base2: { 100: 'hsl(30, 7%, 93%)', 200: 'hsl(30, 11%, 87%)', 300: 'hsl(30, 15%, 81%)', 400: 'hsl(30, 19%, 75%)', 500: 'hsl(30, 23%, 71%)' },
      base3: { 100: 'hsl(30, 11%, 87%)', 200: 'hsl(30, 15%, 81%)', 300: 'hsl(30, 19%, 75%)', 400: 'hsl(30, 23%, 71%)', 500: 'hsl(30, 27%, 69%)' },
      white: 'hsl(0, 0%, 96%)',
      black: 'hsl(0, 0%, 4%)',
      danger: { 100: 'hsl(0, 100%, 80%)', 200: 'hsl(0, 100%, 73%)', 300: 'hsl(0, 100%, 60%)', 400: 'hsl(0, 100%, 43%)', 500: 'hsl(0, 100%, 27%)' },
      warning: { 100: 'hsl(36, 100%, 90%)', 200: 'hsl(36, 100%, 83%)', 300: 'hsl(36, 94%, 47%)', 400: 'hsl(24, 93%, 50%)', 500: 'hsl(33, 90%, 53%)' },
      success: { 100: 'hsl(109, 65%, 82%)', 200: 'hsl(109, 52%, 66%)', 300: 'hsl(109, 44%, 52%)', 400: 'hsl(109, 60%, 37%)', 500: 'hsl(109, 52%, 23%)' },
      gray: {
        100: 'hsl(0, 0%, 83%)',
        200: 'hsl(36, 22%, 80%)',
        300: 'hsl(72, 18%, 76%)',
        400: 'hsl(108, 14%, 72%)',
        500: 'hsl(144, 10%, 68%)',
        600: 'hsl(180, 6%, 64%)',
        700: 'hsl(216, 2%, 60%)',
        800: 'hsl(252, 2%, 56%)',
        900: 'hsl(288, 2%, 52%)',
        1000: 'hsl(0, 0%, 50%)'
      },
      transparent: 'transparent'
    },
    fontFamily: {
      sans: ['proxima-soft', 'sans-serif'],
      serif: ['serif'],
      mono: ['monospace']
    },
    fontWeight: {
      'extra-light': 100,
      light: 300,
      normal: 400,
      medium: 500,
      bold: 700,
      'extra-bold': 800,
      black: 900

    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio')
  ]
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Red
        brand: {
          DEFAULT: '#DB3B2B',
          800: '#E26153',
          600: '#E9897E',
          400: '#F1B0A9',
          200: '#F9D2D2',
          50: '#FEF4F4',
        },
        // Gray
        gray: {
          DEFAULT: '#C3C3C3',
          800: '#CFCFCF',
          600: '#DBDBDB',
          400: '#E7E7E7',
          200: '#F3F3F3',
          100: '#F8F8F8',
        },
        // Functional colors
        error: '#E04C41',
        ok: '#39B54A',
        warning: '#F15A29',
        yellow: '#F7931E',
        'warning-light': '#FFF7AD',
        'blue-link': '#2980B9',
      },
      fontFamily: {
        'manrope': ['Manrope', 'sans-serif'],
      },
      fontSize: {
        // Headings
        'h0': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'h1': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        // Subtitles
        'subtitle1': ['24px', { lineHeight: '1.3', fontWeight: '700' }],
        'subtitle2': ['20px', { lineHeight: '1.4', fontWeight: '700' }],
        // Body
        'body1': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'body2': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'body3': ['12px', { lineHeight: '1.5', fontWeight: '400' }],
        // Button
        'button': ['13px', { lineHeight: '1.5', fontWeight: '600' }],
      },
    },
  },
  plugins: [],
}

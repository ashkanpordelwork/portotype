/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazirmatn', 'system-ui', 'sans-serif'],
      },
      colors: {
        // پالت نقشینه — گرم و دوستانه
        sand: { 50: '#FBF7F0', 100: '#F5EEE0', 200: '#EADFC6', 300: '#DDCBA3' },
        ink: { 900: '#1F2419', 700: '#3A4133', 500: '#6B7359', 300: '#A9AE9C' },
        leaf: { 50: '#EEF6E8', 100: '#DCEBCF', 400: '#7FB069', 500: '#5E9C4A', 600: '#4A8039', 700: '#3A6630' },
        sun: { 400: '#F2B955', 500: '#E9A23B', 600: '#D4882B' },
        sky: { 400: '#6FB7D6', 500: '#4F9FC4' },
        clay: { 400: '#D98C7A', 500: '#C76B54' },
        // مراحل رشد (stage)
        stage: {
          seed: '#B5895A',    // نشانه
          sprout: '#A8C66C',  // جوانه
          bloom: '#5E9C4A',   // شکوفا
          fruit: '#3A6630',   // پربار
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(31,36,25,0.06)',
        'card': '0 6px 24px rgba(31,36,25,0.08)',
        'pop': '0 10px 30px rgba(31,36,25,0.14)',
        'btn3d': '0 4px 0 rgba(58,65,51,0.35)',
        'btn3d-press': '0 2px 0 rgba(58,65,51,0.35)',
      },
      keyframes: {
        'fade-in': { from: { opacity: 0 }, to: { opacity: 1 } },
      },
      animation: { 'fade-in': 'fade-in 0.25s ease-out' },
    },
  },
  plugins: [],
}

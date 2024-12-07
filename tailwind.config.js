/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SF Pro Display', 'system-ui', 'sans-serif'],
      },
      colors: {
        'apple-gray': {
          50: '#fbfbfd',
          100: '#f5f5f7',
          900: '#1d1d1f',
        },
      },
      height: {
        'screen-90': '90vh',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
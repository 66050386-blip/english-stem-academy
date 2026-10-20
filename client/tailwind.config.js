/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        duo: {
          green: '#58cc02',
          'green-dark': '#46a302',
          'green-light': '#d7ffb8',
          blue: '#1cb0f6',
          'blue-dark': '#1899d6',
          'blue-light': '#ddf4ff',
          yellow: '#ffc800',
          'yellow-dark': '#e5a500',
          'yellow-light': '#fff5cc',
          orange: '#ff9600',
          'orange-dark': '#e58600',
          red: '#ff4b4b',
          'red-dark': '#ea2b2b',
          'red-light': '#ffdfe0',
          purple: '#ce82ff',
          'purple-dark': '#a855f7',
          card: '#ffffff',
          'card-dark': '#1e293b',
          border: '#e5e7eb',
          'border-dark': '#334155',
        },
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
      },
      fontFamily: {
        sans: ['"Prompt"', '"Nunito"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'duo': '0 4px 0 0',
        'duo-lg': '0 6px 0 0',
      }
    },
  },
  plugins: [],
}

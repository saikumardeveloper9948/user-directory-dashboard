/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c3d66',
        },
        success: {
          light: '#d1fae5',
          lighter: '#a7f3d0',
          border: '#6ee7b7',
          text: '#065f46',
          icon: '#10b981',
        },
        highlight: {
          light: '#fbbf24',
          dark: '#d97706',
          text: '#78350f',
          text_dark: '#fef3c7',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}

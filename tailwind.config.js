/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#C6FFE3',
        'custom-green2': '#09AF60',
        'max-value-blue': '#1E90FF',
        'error-red': '#FF6347',
        'warning-yellow': '#FFC107',
      },
      animation: {
        wiggle: 'wiggle 0.5s ease-in-out infinite',
        wiggles: 'wiggles 0.2s ease-in-out',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'translateX(-3px)' },
          '50%': { transform: 'translateX(3px)' },
        },
        wiggles: {
          '0%, 100%': { transform: 'translateX(-7px)' },
          '50%': { transform: 'translateX(7px)' },
        },
      },
    },
  },
  plugins: [],
}

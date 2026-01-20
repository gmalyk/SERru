/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-primary': '#4CAF50',
        'green-dark': '#2E7D32',
        'green-light': '#81C784',
        'yellow-accent': '#FFC107',
      },
    },
  },
  plugins: [],
}

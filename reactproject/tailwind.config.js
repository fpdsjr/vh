/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-button': '#1F6EFA',
        'gray-button': '#6D757E',
        'container-background': '#E9E9E9',
        'result-background': '#FDF4CE'
      },
    },
  },
  plugins: [],
}


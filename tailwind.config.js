/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "app-bg": '#F7F8FD',
        "app-bg-darker": '#F2F4FF',
        "purple": '#AD1FEA',
        "purple-2": '#4661E6',
        "dark-purple": '#373F68',
        "dark-purple-gray": '#3A4374',
        "grayish": '#647196',
        "red": '#D73737',
        "red-lighter": '#E98888'
      }
    },
  },
  plugins: [],
}

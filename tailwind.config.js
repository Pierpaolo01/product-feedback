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
        "dark-purple": '#373F68',
      }
    },
  },
  plugins: [],
}

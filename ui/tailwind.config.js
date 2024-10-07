/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'maize': '#FFF58C',
        'cornflower-blue': '#7789FF',
        'teal': '#36827F',
        'ghost-white': '#F2F4FF'
      }
    },
  },
  plugins: [],
}
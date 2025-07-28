/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "close-menu": "url('../public/assets/close.png')",
        "open-menu": "url('../public/assets/menu.png')",
        "patron-bg": "url('../public/assets/image.png')"
      }
    },
  },
  plugins: [],
}


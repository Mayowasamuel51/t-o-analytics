/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        PURPLE: "#c418ac",
        landingBG: "#f4def1",
        textColor: "#d9d9d9",
        inputColor: "#D9D9D9",
        BLUE: "#2d2065",
        courseText: "#d5d2e0"
      }
    },
    fontFamily: {
      myFont: ["Plus Jakarta Sans"]
    }
  },
  plugins: [],
}


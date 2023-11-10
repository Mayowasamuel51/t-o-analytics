/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        PURPLE: "#c418ac",
        landingBG: "#f4def1",
        textColor: "d9d9d9",
        BLUE: "#2d2065",
      }
    },
    fontFamily: {
      myFont: ["Plus Jakarta Sans"]
    }
  },
  plugins: [],
}


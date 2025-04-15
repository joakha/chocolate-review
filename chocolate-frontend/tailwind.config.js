/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chocolate: {
          dark: "#4E2A1E",
          milk: "#7B3F00",
          light: "#A97142",
          white: "#F3E5AB",
        },
        caramel: "#D2B48C",
        hazelnut: "#8B5A2B",
        berry: "#5D2E46",
        mint: "#A3C585",
        gold: "#C69C6D",
      },
      container: {
        padding: {
          md: "2rem"
        }
      }
    },
  },
  plugins: [],
}


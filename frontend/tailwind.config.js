/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f7f7fb",
          100: "#eef0f8",
          200: "#d5d9ec",
          300: "#b5bfe0",
          400: "#7d8ec8",
          500: "#4f66b3",
          600: "#394c9c",
          700: "#2d3d80",
          800: "#242f63",
          900: "#1c244d",
        },
        accent: {
          400: "#4debb0",
          500: "#24d291",
          600: "#16b37a",
        },
        surface: {
          50: "#0f131c",
          100: "#131927",
          200: "#192236",
          300: "#1f2a45",
        },
      },
      boxShadow: {
        panel: "0 14px 30px rgba(15, 19, 28, 0.35)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

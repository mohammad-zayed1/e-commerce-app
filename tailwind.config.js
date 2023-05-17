/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F5EBEB",
        pagination: "#867070",

      }
    },
  },
  plugins: [require("daisyui")],
};



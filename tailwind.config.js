/** @type {import('tailwindcss').Config} */
module.exports = {
  corePluginsL: {
    preflight: false,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    extend: {
      colors: {
        primary: "#217AFF",
        secondary: "#F5FDFF",
      },
    },
  },
  plugins: [],
};

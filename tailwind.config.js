/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef7ff",
          100: "#d8ebff",
          500: "#0b6efd",
          700: "#0951b8",
        },
      },
    },
  },
  plugins: [],
};

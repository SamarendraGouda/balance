/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        5: '20px',
        5.5: '25px',
        10: '40px',
        7.5: '30px',
      },
    },
  },
  plugins: [],
};

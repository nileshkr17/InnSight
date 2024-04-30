/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    colors: {
      brand: "#074498",
      "brand-secondary": "#cbae37",
    },
    fontFamily: {
      sans: ["Jost", "sans-serif"],
    },
  },
};
export const plugins = [];

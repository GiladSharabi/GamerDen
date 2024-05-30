import withMT from "@material-tailwind/react/utils/withMT";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        poetsen: ["Poetsen One", "sans-serif"],
        jersey: ['"Jersey 25"', "sans-serif"],
      },
      backgroundImage: {
        "main-background-black": "url('src/images/background-black.jpg')",
      },
    },
  },
  plugins: [],
};

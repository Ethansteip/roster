// tailwind.config.js
module.exports = {
  content: [
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./icons/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "roster-blue": "#0071E3",
        "roster-offwhite": "#FAFAFA",
        "roster-gray": "#363D4F",
        "roster-gray2": "#212121",
        "rotser-gray3": "#060B13",
        "roster-green": "#4bad9c",
      },
    },
    // ...
  },
};

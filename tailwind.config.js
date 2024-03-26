/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@spartan-ng/ui-core/hlm-tailwind-preset")],
  content: [
    "./src/**/*.{html,ts}",
    "./ui-button-helm/**/*.{html,ts}",
    "./libs/ui/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [],
};

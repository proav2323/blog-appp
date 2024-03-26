/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@spartan-ng/ui-core/hlm-tailwind-preset")],
  content: [
    "./src/**/*.{html,ts}",
    "./ui-button-helm/**/*.{html,ts}",
    "./ui-icon-helm/**/*.{html,ts}",
    "./ui-dialog-helm/**/*.{html,ts}",
    "./ui-input-helm/**/*.{html,ts}",
    "./ui-label-helm/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [],
};

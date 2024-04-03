/** @type {import('tailwindcss').Config} */

import { nextui } from "@nextui-org/react";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3E38F5",
        primaryDark: "#2E2A8F",
        primaryLight: "#4E4AF5",
        blackConf: "#12131a",
        blackConfLight: "#1d1e2a",
      },
    },
  },
  plugins: [nextui()],
};

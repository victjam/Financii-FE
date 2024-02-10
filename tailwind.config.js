/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3E38F5",
        primaryDark: "#2E2A8F",
        primaryLight: "#4E4AF5",
      },
    },
  },
  plugins: [],
};

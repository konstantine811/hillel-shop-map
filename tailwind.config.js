/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        gray: {
          100: "#f7f7f7",
        },
      },
    },
  },
  plugins: [require("rippleui")],
};

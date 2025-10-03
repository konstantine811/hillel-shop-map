/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        gray: {
          100: "#ececec",
        },
        black: {
          100: "#020202",
        },
      },
      dropShadow: {
        text: "1px 1px 2px rgba(255,255,255,0.5)",
      },
    },
  },
  plugins: [require("rippleui")],
};

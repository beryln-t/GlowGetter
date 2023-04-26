/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        80: "20rem",
        400: "25rem",
        1000: "62.5rem",
      },
      maxWidth: {
        custom: "62.5rem",
        400: "25rem",
      },
      marginRight: {
        7: "1.75rem",
      },
      fontSize: {
        xxs: "0.625rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: "corporate",
  },
};

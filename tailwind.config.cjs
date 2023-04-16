/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainbg: "var(--mainbg)",
        bgc: "var(--bgc)",
        fontc: "var(--fontc)",
        bg2: "var(--bg2)",
        logoicon: "var(--icon)",
        logogreen: "var(--icon)",
        bg3: "var(--bg3)",
      },
    },
  },
  plugins: [],
};

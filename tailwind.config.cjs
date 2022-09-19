/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      
      colors: {
        bgc: "var(--bgc)",
        fontc: "var(--fontc)",
        bg2: "var(--bg2)",
       icon: '#868686',
      logogreen:"var(--icon)",
      }
      
    }
  },
  plugins: [],
}
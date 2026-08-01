/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./contexts/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0d1f33",
          800: "#142b45",
          700: "#1b385a"
        },
        brass: "#c9ab74",
        parchment: "#e7dcc3"
      },
      boxShadow: {
        panel: "0 18px 45px rgba(5, 13, 22, 0.35)",
        marker: "0 8px 22px rgba(10, 20, 35, 0.35)"
      },
      backgroundImage: {
        "nav-texture": "linear-gradient(90deg, rgba(10,26,42,0.96), rgba(18,41,66,0.96))"
      }
    }
  },
  plugins: []
};

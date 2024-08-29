/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#287F71",
          secondary: "#EB862A",
          tertiary: "#ABDDD3",
        },
        neutral: {
          light: "#97A3B6",
          dark: "#111729",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontWeight: {
        bold: "700",
        medium: "500",
        regular: "400",
      },
    },
  },
  plugins: [],
};

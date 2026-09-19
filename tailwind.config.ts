import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-jakarta)", "var(--font-body)", "sans-serif"],
        heading: ["var(--font-syne)", "var(--font-heading)", "sans-serif"],
        syne: ["var(--font-syne)", "sans-serif"],
        jakarta: ["var(--font-jakarta)", "sans-serif"],
      },
      colors: {
        bengal: {
          50: "#f2f9f5",
          100: "#e1f2e8",
          200: "#c4e5d2",
          300: "#98d2b3",
          400: "#65b88f",
          500: "#3f9c71",
          600: "#2e7d5a",
          700: "#266449",
          800: "#21503c",
          900: "#0d1a13",
          950: "#050a07",
        },
        slate: {
          950: "#030712",
        },
      },
    },
  },
  plugins: [],
};

export default config;

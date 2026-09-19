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
        body: ["var(--font-jakarta)", "sans-serif"],
        heading: ["var(--font-syne)", "sans-serif"],
        syne: ["var(--font-syne)", "sans-serif"],
        jakarta: ["var(--font-jakarta)", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      colors: {
        bengal: {
          base: "#080D0A",
          surface: "#0E1612",
          elevated: "#141E18",
          border: "rgba(255, 255, 255, 0.08)",
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
          950: "#080D0A",
        },
        brass: {
          DEFAULT: "#C5A880",
          light: "#DFCCA9",
          dark: "#9A7E56",
          subtle: "rgba(197, 168, 128, 0.08)",
          muted: "#B3966F",
        },
        alabaster: "#F4F6F4",
        sand: "#E6E1D8",
        mist: "#9EABA2",
      },
      letterSpacing: {
        tightest: "-0.035em",
        tighter: "-0.025em",
        widest: "0.25em",
        editorial: "0.3em",
      },
      lineHeight: {
        editorial: "1.75",
      },
    },
  },
  plugins: [],
};

export default config;

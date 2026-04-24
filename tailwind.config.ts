import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#fbf8f1",
        linen: "#eee4d2",
        champagne: "#d7bd7f",
        brass: "#a47f36",
        charcoal: "#1c1a17",
        ink: "#11100f",
        smoke: "#f5f0e7"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Cormorant Garamond", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(28, 26, 23, 0.10)",
        glow: "0 18px 70px rgba(215, 189, 127, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;

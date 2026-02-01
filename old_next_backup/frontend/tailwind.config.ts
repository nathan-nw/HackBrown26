import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "primary": "#13ec5b",
        "forest-dark": "#0B1D15",
        "forest-deep": "#051610", 
        "forest-light": "#1A3326",
        "paper": "#F5F5F7",
        "text-primary-dark": "#ffffff",
        "text-secondary-dark": "#9CABA3",
        "text-primary-light": "#0B1D15",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        serif: ["var(--font-noto-serif)", "serif"],
        display: ["var(--font-manrope)", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
export default config;

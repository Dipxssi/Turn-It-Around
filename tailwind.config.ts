import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#00338D",
        blue: "#0091DA",
        "navy-hover": "#002A6E",
        "blue-hover": "#0077B8",
        white: "#FFFFFF",
        "light-grey": "#F2F2F2",
        border: "#E0E0E0",
        "text-dark": "#1A1A1A",
        "text-muted": "#757575",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;


import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
          light: "hsl(var(--primary-light))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          light: "hsl(var(--accent-light))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        semantic: {
          success: "#1B8354",
          warning: "#C87D1F",
          error: "#C93B2B",
          info: "#2B6CB0",
        },
        brand: {
          forest: "#174D3B",
          emerald: "#26745A",
          sage: "#E7F0E9",
          ivory: "#FAF9F5",
          white: "#FFFFFF",
          sand: "#F1EEE6",
          gold: "#B99A5B",
          lightGold: "#E9D9B7",
          textPrimary: "#25342D",
          textSecondary: "#738078",
          textMuted: "#929A94",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm, 8px)",
        md: "var(--radius-md, 12px)",
        lg: "var(--radius-lg, 20px)",
        xl: "var(--radius-xl, 28px)",
        full: "9999px",
      },
      fontFamily: {
        sans: ["var(--font-ibm-plex-sans-arabic)", "sans-serif"],
        traditional: ["var(--font-noto-naskh-arabic)", "serif"],
      },
      boxShadow: {
        subtle: "0 2px 8px -2px rgba(23, 77, 59, 0.05), 0 1px 4px -1px rgba(23, 77, 59, 0.03)",
        card: "0 4px 20px -4px rgba(23, 77, 59, 0.08)",
        elevation: "0 12px 32px -6px rgba(23, 77, 59, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;

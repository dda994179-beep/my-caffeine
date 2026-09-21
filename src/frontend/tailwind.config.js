import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "oklch(var(--success) / <alpha-value>)",
          foreground: "oklch(var(--background))",
        },
        warning: {
          DEFAULT: "oklch(var(--warning) / <alpha-value>)",
          foreground: "oklch(var(--background))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        subtle: "0 1px 2px oklch(0.1 0.01 60 / 0.4), 0 1px 1px oklch(0.1 0.01 60 / 0.3)",
        elevated: "0 12px 32px -12px oklch(0.08 0.01 60 / 0.75), 0 2px 8px -4px oklch(0.08 0.01 60 / 0.5)",
        "inset-soft": "inset 0 1px 0 oklch(1 0 0 / 0.06)",
        glow: "0 0 0 1px oklch(0.78 0.17 70 / 0.35), 0 14px 38px -16px oklch(0.76 0.17 68 / 0.5)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "drift-glow": {
          "0%": { transform: "translate3d(-3%, -2%, 0) scale(1.05)", opacity: "0.75" },
          "50%": { transform: "translate3d(3%, 2%, 0) scale(1.15)", opacity: "1" },
          "100%": { transform: "translate3d(-2%, 3%, 0) scale(1.08)", opacity: "0.8" },
        },
        "grid-scroll": {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "0 56px" },
        },
        "road-run": {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "0 90px" },
        },
        "float-particle": {
          "0%": { transform: "translate3d(0, 0, 0) scale(0.8)", opacity: "0" },
          "15%": { opacity: "0.55" },
          "85%": { opacity: "0.35" },
          "100%": {
            transform: "translate3d(var(--drift-x, 24px), -120px, 0) scale(1.15)",
            opacity: "0",
          },
        },
        "pulse-ring": {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.06)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scroll-cue": {
          "0%": { transform: "translateY(0)", opacity: "0.2" },
          "40%": { opacity: "1" },
          "100%": { transform: "translateY(14px)", opacity: "0" },
        },
        "marquee-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "drift-glow": "drift-glow 22s ease-in-out infinite alternate",
        "grid-scroll": "grid-scroll 14s linear infinite",
        "road-run": "road-run 3.2s linear infinite",
        "float-particle": "float-particle 9s linear infinite",
        "pulse-ring": "pulse-ring 3.4s ease-in-out infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "scroll-cue": "scroll-cue 1.8s ease-in-out infinite",
        "marquee-x": "marquee-x 26s linear infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};

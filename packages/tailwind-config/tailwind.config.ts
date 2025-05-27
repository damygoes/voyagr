import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  darkMode: "class",
  theme: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      card: "var(--card)",
      "card-foreground": "var(--card-foreground)",
      popover: "var(--popover)",
      "popover-foreground": "var(--popover-foreground)",
      primary: "var(--primary)",
      "primary-foreground": "var(--primary-foreground)",
      secondary: "var(--secondary)",
      "secondary-foreground": "var(--secondary-foreground)",
      muted: "var(--muted)",
      "muted-foreground": "var(--muted-foreground)",
      accent: "var(--accent)",
      "accent-foreground": "var(--accent-foreground)",
      destructive: "var(--destructive)",
      border: "var(--border)",
      input: "var(--input)",
      ring: "var(--ring)",
      "chart-1": "var(--chart-1)",
      "chart-2": "var(--chart-2)",
      "chart-3": "var(--chart-3)",
      "chart-4": "var(--chart-4)",
      "chart-5": "var(--chart-5)",
      sidebar: "var(--sidebar)",
      "sidebar-foreground": "var(--sidebar-foreground)",
      "sidebar-primary": "var(--sidebar-primary)",
      "sidebar-primary-foreground": "var(--sidebar-primary-foreground)",
      "sidebar-accent": "var(--sidebar-accent)",
      "sidebar-accent-foreground": "var(--sidebar-accent-foreground)",
      "sidebar-border": "var(--sidebar-border)",
      "sidebar-ring": "var(--sidebar-ring)",
    },
    fontSize: {
      "6xl": "4.313rem", // 69px,
      "5xl": "3rem", // 48px
      "4xl": "2.25rem", // 36px
      "3xl": "1.875rem", // 30px
      "2xl": "1.5rem", // 24px
      xl: "1.25rem", // 20px
      lg: "1.125rem", // 18px
      base: "1rem", // 16px (rename from `md`)
      sm: "0.875rem", // 14px
      xs: "0.75rem", // 12px
    },
    spacing: {
      "3xs": "0.25rem", // 4px – micro spacing, border radius, fine gaps
      "2xs": "0.5rem", // 8px – small inner padding, button spacing
      xs: "0.75rem", // 12px – default compact spacing
      sm: "1rem", // 16px – baseline padding/margin
      md: "1.5rem", // 24px – section spacing, larger gaps
      lg: "2rem", // 32px – grouping, cards, modals
      xl: "3rem", // 48px – layout breaks, modal margins
      "2xl": "4rem", // 64px – full section padding
      "3xl": "5rem", // 80px – hero sections, top-level layout spacing
    },
    extend: {},
  },
  plugins: [],
};
export default config;

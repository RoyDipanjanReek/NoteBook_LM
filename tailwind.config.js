const colorVar = (token) => `rgb(var(${token}) / <alpha-value>)`;

const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: colorVar("--color-background"),
        surface: {
          DEFAULT: colorVar("--color-surface"),
          strong: colorVar("--color-surface-strong"),
          inverse: colorVar("--color-surface-inverse"),
        },
        foreground: colorVar("--color-foreground"),
        primary: {
          DEFAULT: colorVar("--color-primary"),
          strong: colorVar("--color-primary-strong"),
          soft: colorVar("--color-primary-soft"),
          contrast: colorVar("--color-primary-contrast"),
        },
        muted: {
          DEFAULT: colorVar("--color-muted"),
          soft: colorVar("--color-muted-soft"),
        },
        border: colorVar("--color-border"),
        success: {
          DEFAULT: colorVar("--color-success"),
          soft: colorVar("--color-success-soft"),
        },
        error: {
          DEFAULT: colorVar("--color-error"),
          soft: colorVar("--color-error-soft"),
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        eyebrow: ["0.75rem", { letterSpacing: "0.24em", lineHeight: "1rem" }],
        title: ["1.875rem", { letterSpacing: "-0.04em", lineHeight: "1.1" }],
        hero: ["3.5rem", { letterSpacing: "-0.05em", lineHeight: "1" }],
      },
      spacing: {
        4.5: "1.125rem",
        18: "4.5rem",
        22: "5.5rem",
      },
      borderRadius: {
        panel: "1.5rem",
        field: "1rem",
        pill: "999px",
      },
      boxShadow: {
        panel: "0 20px 45px -24px rgba(54, 45, 34, 0.22)",
        lift: "0 24px 60px -28px rgba(54, 45, 34, 0.3)",
        inset: "inset 0 1px 0 rgba(255, 255, 255, 0.55)",
      },
      backgroundImage: {
        "page-wash":
          "radial-gradient(circle at top left, rgba(228, 236, 229, 0.85), transparent 32%), radial-gradient(circle at top right, rgba(250, 227, 194, 0.5), transparent 24%)",
      },
    },
  },
};

export default config;

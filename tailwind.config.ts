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
        ink: "#111827",
        slate: "#4b5563",
        line: "#e5e7eb",
        surface: "#f8fafc",
        navy: {
          50: "#eff6ff",
          100: "#dbeafe",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e3a8a"
        }
      },
      boxShadow: {
        panel: "0 8px 24px rgba(15, 23, 42, 0.06)"
      },
      maxWidth: {
        "screen-panel": "1200px"
      }
    },
  },
  plugins: [],
};

export default config;

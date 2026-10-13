/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: {
          900: "#0b0e14",
          800: "#131722",
          700: "#1d2333",
        },
        neon: {
          cyan: "#00f3ff",
          purple: "#bd00ff",
          pink: "#ff007f",
          emerald: "#10b981",
          amber: "#f59e0b",
        },
      },
      fontFamily: {
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "SF Mono",
          "Menlo",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

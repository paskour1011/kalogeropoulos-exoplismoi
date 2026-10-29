/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)", ink: "var(--ink)", muted: "var(--muted)",
        line: "var(--line)", "line-strong": "var(--line-strong)",
        "kraft-soft": "var(--kraft-soft)", "kraft-ink": "var(--kraft-ink)",
        green: "var(--green)", "green-deep": "var(--green-deep)", "on-green": "var(--on-green)",
        lime: "var(--lime)",
      },
      fontFamily: {
        sans: ["Commissioner", '"Noto Sans"', '"Segoe UI"', "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

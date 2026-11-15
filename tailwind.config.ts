import type { Config } from "tailwindcss";
// Brand colors sampled from drtanyaojones.com: deep teal header/footer, gold headings, teal buttons.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#10201f", navy: "#1d4042", gov: "#163234", brass: "#d3af37", teal: "#438e92", cream: "#f3f7f6", mist: "#e1ebeb" },
      fontFamily: {
        display: ['"Source Serif 4 Variable"', "Georgia", "serif"],
        sans: ['"Inter Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

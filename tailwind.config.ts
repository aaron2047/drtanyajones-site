import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#0e1626", navy: "#14233d", brass: "#c79a3b", cream: "#f7f3ea", mist: "#e8e4d8", gov: "#0d132d" },
      fontFamily: {
        display: ['"Source Serif 4 Variable"', "Georgia", "serif"],
        sans: ['"Inter Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

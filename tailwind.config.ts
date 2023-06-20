import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "var(--entro-blue)",
      }
    },
  },
  plugins: [],
} satisfies Config;

/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        box: "var(--box)",
        glow: "var(--glow)",
        lock: "var(--lock)",
      },
      textShadow: {
        DEFAULT: "0 0 3px black",
        lg: "0 0 8px black",
        none: "0 0",
      },
      boxShadow: {
        top: "0px -15px 10px -4px var(--glow)",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
};

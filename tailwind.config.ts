import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        retro__dark: "3.5px 3.5px 0px 0px rgba(28, 25, 23, 0.85)",
        retro__inset: "inset 3.5px 3.5px 0px 0px rgba(28, 25, 23, 0.85)",
        retro__circle: "2.5px 2px 0px 0px rgba(28, 25, 23, 0.85)",
      },
      colors: {
        dark: "#141407",
        ivory: "#FDF7E1",
        blue: "#259EDF",
        pink: "#F196E5",
        yellow: "#FFE04A",
        green: "#47AF3C",
        grey: "#BEBEC4",
        orange: "#FFC541",
        red: "#F8423F",
      },
      fontFamily: {
        'sans': ['"Varela Round"', ...defaultTheme.fontFamily.sans],
        'header': ['"Poetsen One", sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} satisfies Config;
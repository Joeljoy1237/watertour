import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2ca01c',  // Main primary color
          50: '#e6f7e6',
          100: '#c3e6c3',
          200: '#9fd49f',
          300: '#7ac27a',
          400: '#56b156',
          500: '#2ca01c', // Same as DEFAULT
          600: '#24901c',
          700: '#1c801c',
          800: '#146f14',
          900: '#0d5f0d',
          950: '#064f06',
        },
        secondary: '#F5E6CC',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'inter': ['Inter', 'sans-serif'],
        },
        colors: {
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
        },
      },
    },
    plugins: [],
  }
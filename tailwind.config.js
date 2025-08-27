/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#EFFCF6',
          100: '#C6F7E2',
          200: '#8EEDC7',
          300: '#65D6AD',
          400: '#3EBD93',
          500: '#27AB83',
          600: '#199473', // Primary dark color
          700: '#147D64',
          800: '#0C6B58',
          900: '#065f4e',
        },
        green: {
          50: '#EFFCF6',
          100: '#C6F7E2',
          200: '#8EEDC7',
          300: '#65D6AD',
          400: '#3EBD93',
          500: '#27AB83',
          600: '#199473',
          700: '#147D64',
          800: '#0C6B58',
          900: '#065f4e',
        }
      }
    },
  },
  plugins: [],
};
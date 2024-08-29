/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          700: "#7f7f7f" 
        }
      },
      height: {
        "475px": "475px"
      },
      spacing: {
        '128': '32rem'
      }
    },
  },
  plugins: [],
}
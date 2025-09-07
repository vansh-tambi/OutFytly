import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#8A2BE1',
        'ink': '#3A2A45',
        'plum': '#201825',
        'lavender': '#BEA0D3',
      },
    },
  },
  plugins: [
    scrollbar,
  ],
}
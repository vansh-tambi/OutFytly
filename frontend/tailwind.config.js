/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      colors: {
        primary: "#8A2BE1",   // main purple
        plum: "#3A2A45",      // dark plum
        ink: "#201825",       // near-black bg
        lavender: "#B3A0D3",  // pastel accent
      },
      boxShadow: {
        soft: "0 8px 30px rgba(58,42,69,0.18)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

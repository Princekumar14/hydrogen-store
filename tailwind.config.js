/** @type {import('tailwindcss').Config} */
const config =  {
    // prefix: 'pp-',
    content: ["./app/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          navy: "#1A2A3A",
          cream: "#F5F2EA",
          gold: "#C3A343",
          gray: "#8C8C8C",
        },
        fontFamily:{
            playfair: ["Playfair Display", "serif"],
            source: ["Source Sans Pro", "sans-serif"]
        }
      },
    },
    plugins: [],
}
export default config;
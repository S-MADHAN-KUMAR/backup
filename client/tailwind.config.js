/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", 'sans-serif'], // Corrected to match the imported font
        audiowide: ['Audiowide', 'sans-serif'],
      },
      screens: {
        'xs': '375px', 
        'sm': '640px',
        'md': '768px',  
        'lg': '1024px',
        'xl': '1280px', 
        '2xl': '1536px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
};

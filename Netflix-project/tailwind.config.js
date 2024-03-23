/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'Nsans-light' :['Nsanns Light'],
        'Nsans-Medium' :['Nsanns Medium'],
        'Nsans-Bold' :['Nsanns Bold'],
        
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
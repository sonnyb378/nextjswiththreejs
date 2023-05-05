/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'Bebas': ['Bebas Neue', 'cursive'],
      'Rampart': ['Rampart One', 'cursive'],
    }
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar")],
  variants: {
    extend: {
      strokeColor: ['group', 'group-hover'],
      textColor: ['group', 'group-hover'],
    }
  },

}


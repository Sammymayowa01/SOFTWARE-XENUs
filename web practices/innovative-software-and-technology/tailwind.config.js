/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        'navy-blue': '#0A1A2F',
        'electric-blue': '#1D4ED8',
        'accent-blue': '#3B82F6',
        'grey': '#111827',
        'dark-grey': '#1F2937',
        'light-grey': '#E5E7EB',
        'white': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate")
  ],
}

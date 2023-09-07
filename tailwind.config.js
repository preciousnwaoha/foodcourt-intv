/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {
      backdropBlur: {
        xs: '2px',
        xxs: '1px',
      },
      color: {
        'fav-bg': 'rgba(0, 0, 0, 0.28)',
        'text-200': '#212224',
        '300': '#96999C',
        'text-400':'#6F7376',
        'text-500': '#5E6164',
        'text-600': '#2E3031'
        },
    }
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    screens: {
      'sm': '354px',
      'lg': '426px'
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

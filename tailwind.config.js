/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,scss,ts}"
  ],
  options: {
    safelist: {
      deep: [/^theme/, /^dark/, /^mat/, /^mdc/]
    }
  },
  prefix: '',
  theme: {
    extend: {}
  },
  plugins: []
}

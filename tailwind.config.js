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
    extend: {
      height: {
        '250': '250'
      },
      padding: {
        'top-260': '260px',
        'top-30': '30px'
      },
    }
  },
  plugins: []
}

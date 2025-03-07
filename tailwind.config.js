// /** @type {import('tailwindcss').Config} */
// /** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'btc': '#ff9900',
        }
      },
    },
    plugins: [],
  }
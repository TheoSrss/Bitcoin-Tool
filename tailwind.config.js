/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                colortest: "hsl(290, 50%, 50%)",
                test: "hsl(210, 50%, 50%)", // Utilisez ici directement une valeur HSL valide
            },
        },
    },
    plugins: [],
};
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./*.html",
        "./scripts.js"
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Inter', 'sans-serif'],
            },
            colors: {
                'brand': {
                    DEFAULT: '#f97316',
                    hover: '#fb923c',
                    dark: '#ea580c',
                }
            },
            backdropBlur: {
                'xs': '2px',
            },
        },
    },
    plugins: [],
}

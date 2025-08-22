/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
        '../js/Components/**/*.vue',
        '../js/*.js',
        // Explicit exclusions to avoid loops
        '!./node_modules/**/*',
        '!../node_modules/**/*',
        '!../**/node_modules/**/*',
    ],

    plugins: [require('@tailwindcss/forms')],
};

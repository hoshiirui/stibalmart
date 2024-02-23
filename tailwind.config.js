import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        fontFamily: {
            serif: ["Noto Serif JP", "serif"],
        },
        extend: {
            // backgroundImage: {
            //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            //   "gradient-conic":
            //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            // },
            colors: {
                primary500: "#E8A6B7",
                primary700: "#A75379",
                fontBlack: "#464646",
            },
            screens: {
                // sm: "640px",
                // => @media (min-width: 576px) { ... }

                md: "768px",
                // => @media (min-width: 960px) { ... }

                lg: "1280px",
                // => @media (min-width: 1440px) { ... }
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: "16px",
                    sm: "16px",
                    md: "64px",
                    lg: "88px",
                },
            },
        },
    },

    plugins: [forms],
};

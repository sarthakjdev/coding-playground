/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        './sections/**/*.{js,ts,jsx,tsx}'
    ],
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './sections/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                mainbg: '#0A0F21',
                primary: '#7A5BE8',
                primary2: '#E76EC7',
                secondary: '#D45915',
                aboutBg: `rgb(209, 194, 194, 0.1)`,
                bgShade: '#396CEE',
                cardBorder: '#877979',
                gradientCol1: '#C7D3FB',
                gradientCol2: 'rgba(183, 101, 213, 0.8)',
                gradientCol3: '#D8D8D8'
            },
            typography: {
                DEAFAULT: {
                    css: {
                        h1: {
                            fontFamily: 'Poppins',
                        },
                        h2: {
                            fontFamily: 'Poppins',
                        },
                        h3: {
                            fontFamily: 'Poppins',
                        },
                        h4: {
                            fontFamily: 'Poppins',
                        },
                        h5: {
                            fontFamily: 'Poppins',
                        },
                        h6: {
                            fontFamily: 'Poppins',
                        },
                    }
                }
            },
            fontFamily: {
                primary: ['Poppins', 'sans-serif'],
                secondary: ['Montserrat', 'sans-serif']
            },
            width: {
                '30': '30%',
                '40': '40%',
                '70': '70%',
                '90': '90%',
                '16rem': '16rem',
                half: '50%',
                quarter_past: '75%'
            },
            height: {
                '90vh': '90vh',
                '70vh': '65vh',
                '100vh': '100vh',
                '30vh': '30vh'
            },
            zIndex: {
                '100': 100
            },
            maxHeight: {
                '30': '7rem'
            },
            blur: {
                full: '300px'
            },
            backdropBlur: {
                xs: '2px'
            },
            rotate: {
                '360': '360deg'
            },
            keyframes: {
                slide: {
                    '0%': { transform: 'translate(0 , 0)' },
                    '100%': { transform: 'translate(-100% , 0)' }
                }
            },
            animation: {
                'slide': 'slide 50s linear infinite',
                'slide-delayed': 'slide 50s 25s linear infinite'
            },
            transitionDelay: {
                '25000': '1000ms'
            },
            screens: {
                '2xl': { 'max': '1535px' },
                // => @media (max-width: 1535px) { ... }

                'xl': { 'max': '1279px' },
                // => @media (max-width: 1279px) { ... }

                'lg': { 'max': '1023px' },
                // => @media (max-width: 1023px) { ... }

                'midLg': { 'max': '900px' },
                // => @media (max-width: 900px) { ... }

                'md': { 'max': '769px' },
                // => @media (max-width: 767px) { ... }

                'sm': { 'max': '639px' },
                // => @media (max-width: 639px) { ... }
            },
        },
    },
    plugins: [],
}

module.exports = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
        './app/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary)',
                orange2: 'var(--orange-2)',
                noir: 'var(--noir)',
                grisBleute: 'var(--gris-bleute)',
                blanc: 'var(--blanc)',
                nuanceDeBlanc1: 'var(--nuance-de-blanc-1)',
                gris: 'var(--gris)',
                nuanceDeBlanc2: 'var(--nuance-de-blanc-2)',
            },
            screens: {
                xs: '480px',
            },
        },
    },
    plugins: [],
}

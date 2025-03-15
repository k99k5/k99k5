import defaultTheme from 'tailwindcss/defaultTheme'

export default {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
            }
        }
    }
}

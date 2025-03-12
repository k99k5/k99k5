import defaultTheme from 'tailwindcss/defaultTheme'

export default {
    theme: {
        extend: {
            fontFamily: {
                sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
            }
        }
    }
}
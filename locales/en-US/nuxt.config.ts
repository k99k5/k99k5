// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "node:path";

export default defineNuxtConfig({
    // content: {
    //     sources: {
    //         // overwrite default source AKA `content` directory
    //         content: {
    //             driver: 'fs',
    //             base: resolve(__dirname, 'content')
    //         },
    //     },
    // },

    i18n: {
        locales: [
            {
                code: 'en-US',
                file: resolve(__dirname, 'theme.json')
            },
        ],
        bundle: {
            optimizeTranslationDirective: false,
        },
        //@ts-ignore
        defaultLocale: 'en-US',
    }
})

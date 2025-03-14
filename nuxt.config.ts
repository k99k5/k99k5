// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';
import tailwindcss from "@tailwindcss/vite";
import {fileURLToPath, resolve} from "node:url";
import Components from 'unplugin-vue-components/vite';
import {PrimeVueResolver} from '@primevue/auto-import-resolver';
import echoConfig from "./echo.config";

export default defineNuxtConfig({
    extends: [
        `./locales/${process.env?.NUXT_PUBLIC_SITE_LANG ?? 'zh-CN'}`
    ],

    modules: [
        '@primevue/nuxt-module',
        '@nuxt/image',
        '@nuxt/scripts',
        '@nuxt/fonts',
        'nuxt-link-checker',
        'nuxt-schema-org',
        '@nuxtjs/robots',
        '@nuxtjs/i18n',
        '@nuxtjs/sitemap',
        'nuxt-seo-utils',
        'nuxt-og-image',
        '@nuxt/content',
        '@nuxtjs/color-mode',
        '@nuxt/icon'
    ],

    compatibilityDate: "2024-11-01",

    future: {
        compatibilityVersion: 4
    },

    devtools: {
        enabled: true
    },

    content: {
        preview: {
            api: 'https://api.nuxt.studio'
        },
    },

    fonts: {
        provider: 'bunny',
    },

    nitro: {
        prerender: {
            routes: [
                '/',
                '/sitemap.xml',
                '/robots.txt',
            ],
            crawlLinks: true
        }
    },

    sitemap: {
        sitemaps: true,
        autoLastmod: true,
        sources: [
            '/api/__sitemap__/urls'
        ],
    },

    ogImage: {
        zeroRuntime: true,
        fonts: [
            'Noto+Sans+SC:400'
        ],
        defaults: {
            emojis: 'twemoji',
        },
    },

    hooks: {},

    colorMode: {
        preference: 'system', // default value of $colorMode.preference
        fallback: 'light',
        disableTransition: false
    },

    runtimeConfig: {
        public: {
            ...echoConfig
        }
    },

    routeRules: {
        "/api/search.json": {
            prerender: true,
        },
    },

    typescript: {
        strict: false,
    },

    experimental: {
        viewTransition: true,
    },

    alias: {
        '~': fileURLToPath(new URL(".", import.meta.url)),
        '@': fileURLToPath(new URL(".", import.meta.url)),
        '~~': fileURLToPath(new URL(".", import.meta.url)),
        '@@': fileURLToPath(new URL(".", import.meta.url)),
        assets: fileURLToPath(new URL("./assets", import.meta.url)),
        public: fileURLToPath(new URL("./public", import.meta.url)),
    },

    css: ['~/assets/css/main.css'],

    vite: {
        plugins: [
            tailwindcss(),
            Components({
                resolvers: [
                    PrimeVueResolver()
                ]
            }),
        ],
        css: {
            preprocessorOptions: {
                scss: {api: "modern-compiler"},
            },
        },
    },

    primevue: {
        importTheme: {from: '~/app/themes/echo'},
    },

    icon: {
        serverBundle: 'local',
    },
});

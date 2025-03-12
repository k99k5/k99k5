// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";
import {fileURLToPath, resolve} from "node:url";
import {defineCollection} from "@nuxt/content";

export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: {enabled: true},
    modules: [
        "@nuxtjs/seo",
        "@nuxt/content",
        "@nuxt/image",
        "@nuxthq/studio",
        "@nuxt/ui",
        "@nuxt/scripts",
        "@nuxt/fonts",
        "nuxt-link-checker",
        "nuxt-schema-org",
    ],

    fonts: {
        provider: 'bunny',
    },

    sitemap: {
        sitemaps: true,
        autoLastmod: true,
        sources: ["/api/__sitemap__/urls"],
    },

    ogImage: {
        zeroRuntime: true,
        fonts: ["Noto+Sans+SC:400"],
        defaults: {
            emojis: "twemoji",
        },
    },

    hooks: {
        // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
        'components:extend': (components) => {
            const globals = components.filter(c => ['UButton'].includes(c.pascalName))
            globals.forEach(c => c.global = true)
        }
    },

    colorMode: {
        disableTransition: false
    },

    routeRules: {
        "/api/search.json": {
            prerender: true,
        },
    },

    typescript: {
        strict: false,
    },

    alias: {
        "~": fileURLToPath(new URL(".", import.meta.url)),
        "@": fileURLToPath(new URL(".", import.meta.url)),
        "~~": fileURLToPath(new URL(".", import.meta.url)),
        "@@": fileURLToPath(new URL(".", import.meta.url)),
        assets: fileURLToPath(new URL("./assets", import.meta.url)),
        public: fileURLToPath(new URL("./public", import.meta.url)),
    },

    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [
            tailwindcss(),
        ],
        css: {
            preprocessorOptions: {
                scss: {api: "modern-compiler"},
            },
        },
    },
});

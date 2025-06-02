// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import {fileURLToPath, resolve} from "node:url";
import Components from 'unplugin-vue-components/vite';
import echoConfig from "./echo.config";
import {execSync} from "node:child_process";
import { title } from 'node:process';
import { json } from "node:stream/consumers";

export default defineNuxtConfig({
    appId: echoConfig.siteName,

    extends: [
        `./locales/${process?.env?.NUXT_PUBLIC_SITE_LANG ?? 'zh-CN'}`
    ],

    modules: [
        '@nuxt/ui',
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
        '@nuxt/icon',
        'nuxt-github-pages',
    ],

    compatibilityDate: "2025-04-01",

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
        build: {
            markdown: {},
            pathMeta: {
                slugifyOptions: {
                    remove: /[$*+~()'"!\-=#?:@]/g,
                }
            }
        }
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
        zeroRuntime: false,
        fonts: [
            'Noto+Sans+SC:400'
        ],
        defaults: {
            renderer: 'satori',
            emojis: 'twemoji',
        },
    },

    hooks: {
        'content:file:afterParse': (ctx) => {
            // remove _posts/
            ctx.content.path = (ctx.content.path as string).replace(/_posts\//, '') as string;

            // priority
            if (/\/[0-9]+\./.test(ctx.file.path)){
                const priority = ctx.file.path.match(/[0-9]+\./)?.[0]?.replace('.', '') || '0';
                ctx.content.priority = parseInt(priority);
            }

            // auto set date
            if (echoConfig.autoGitDate){
                const dates = execSync(`git log --follow --format="%ad" -- "${ctx.file.path}"`).toString().trim().split('\n');
                if (!ctx.content?.date) {
                    ctx.content.date = new Date( dates[dates.length - 1] || Date.now()).toISOString();
                }
                if (!ctx.content?.updated) {
                    ctx.content.updated = new Date( dates[0] || Date.now()).toISOString();
                }
            }

            // remove \n
            if (ctx.content.description){
                ctx.content.description = (ctx.content.description as string).replace(/[\n\\n]+/g, ' ').trim();
            }
        }
    },

    colorMode: {
        preference: 'system', // default value of $colorMode.preference
        fallback: 'light',
        disableTransition: true
    },

    site: {
        title: echoConfig.siteName,
        description: echoConfig.siteDescription,
        url: echoConfig.siteUrl,
        name: echoConfig.siteName,
        trailingSlash: true,
    },

    runtimeConfig: {
        public: {
            ...echoConfig,
            appName: echoConfig.siteName,
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
        componentIslands: {
            selectiveClient: true,
        },
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
        ],
        css: {
            preprocessorOptions: {
                scss: {api: "modern-compiler"},
            },
        },
    },

    ui: {
        theme: {
            colors: ['primary', 'secondary', 'info', 'success', 'warning', 'error']
        }
    },

    icon: {
        serverBundle: 'local',
    },
});

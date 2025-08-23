import { resolve } from "node:path";
import tailwindcss from '@tailwindcss/vite';

const {
    NODE_ENV,
    SITE_NAME,
    SITE_URL,
    PAYLOAD_SERVER_URL,
    PAYLOAD_API_ROUTE,
} = process.env;

const isDev = NODE_ENV !== "production";

export default defineNuxtConfig({
    devtools: { enabled: true },
    compatibilityDate: "2024-08-21",

    modules: [
        "@nuxt/image",
        "@nuxt/eslint",
        "@nuxt/fonts",
        "@pinia/nuxt",
        "@nuxt/icon",
    ],

    icon: {
        provider: 'server'
    },

    vite: {
        plugins: [
            tailwindcss()
        ],
    },

    css: ["~/assets/styles/styles.css"],

    alias: {
        "#payload/types": resolve(__dirname, "./payload-types.ts"),
    },

    runtimeConfig: {
        public: {
            siteName: SITE_NAME,
            siteUrl: isDev ? 'http://localhost:3000' : SITE_URL,
            payloadServerUrl: isDev ? 'http://localhost:3001' : PAYLOAD_SERVER_URL,
            payloadApiRoute: PAYLOAD_API_ROUTE,
            language: "nl-NL",
            isDev,
        },
    },

    nitro: {
        preset: 'vercel',
    },

    ssr: true,

    routeRules: {
        '/api/**': {
            proxy: `${PAYLOAD_SERVER_URL}${PAYLOAD_API_ROUTE}/**`,
            cors: true
        },
        '/admin/**': {
            proxy: `${PAYLOAD_SERVER_URL}/admin/**`,
            cors: true
        }
    },
    
    build: {
        transpile: ["ts-invariant/process"],
    },
});

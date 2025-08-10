import { resolve } from "path";
import tailwindcss from '@tailwindcss/vite';

const {
    NODE_ENV,
    SITE_NAME,
    SITE_URL,
    PAYLOAD_SERVER_URL,
    PAYLOAD_API_ROUTE,
    BLOB_READ_WRITE_TOKEN,
    BLOB_BASE_URL
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

    vite: {
        plugins: [
            tailwindcss()
        ],
        define: {
            'process.env.NODE_ENV': JSON.stringify('production'),
        },
    },

    css: ["~/assets/styles/styles.css"],

    components: [
        {
            path: "@/components",
            global: true,
        },
    ],


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

    build: {
        transpile: ["ts-invariant/process"],
    },
});

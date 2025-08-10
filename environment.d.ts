declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: "development" | "production";
		NITRO_HOST: string;
		NITRO_PORT: string;
		NUXT_PUBLIC_PAYLOAD_SITE_NAME: string;
		NUXT_PUBLIC_PAYLOAD_SITE_URL: string;
		NUXT_PUBLIC_PAYLOAD_PORT: string;
		NUXT_PUBLIC_PAYLOAD_API_ROUTE: string;
		NUXT_PUBLIC_PAYLOAD_UPLOAD_ROUTE: string;
	}
}

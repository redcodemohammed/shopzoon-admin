export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  typescript: { strict: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://api.cms.astraiq.net',
      logtoEndpoint: process.env.NUXT_PUBLIC_LOGTO_ENDPOINT || '',
      logtoAppId: process.env.NUXT_PUBLIC_LOGTO_APP_ID || '',
      logtoResource: process.env.NUXT_PUBLIC_LOGTO_RESOURCE || 'https://api.cms.astraiq.net',
      logtoScopes: process.env.NUXT_PUBLIC_LOGTO_SCOPES || 'openid profile email offline_access'
    }
  },
  routeRules: {
    '/login': { ssr: false },
    '/auth/callback': { ssr: false }
  },
  compatibilityDate: '2026-06-10'
})

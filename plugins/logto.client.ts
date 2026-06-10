import { createLogto } from '@logto/vue'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public

  if (!config.logtoEndpoint || !config.logtoAppId) return

  nuxtApp.vueApp.use(createLogto, {
    endpoint: config.logtoEndpoint,
    appId: config.logtoAppId,
    resources: [config.logtoResource],
    scopes: config.logtoScopes.split(' ').filter(Boolean)
  })
})

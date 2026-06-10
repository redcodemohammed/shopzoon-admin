export default defineNuxtRouteMiddleware((to) => {
  const publicRoutes = ['/login', '/auth/callback']
  if (publicRoutes.includes(to.path)) return

  const config = useRuntimeConfig().public
  if (!config.logtoEndpoint || !config.logtoAppId) return

  if (import.meta.client) {
    const auth = useAuth()
    if (!auth.isAuthenticated.value) return navigateTo('/login')
  }
})

import { useLogto } from '@logto/vue'

export const useAuth = () => {
  const config = useRuntimeConfig().public

  if (import.meta.server || !config.logtoEndpoint || !config.logtoAppId) {
    return {
      isConfigured: computed(() => Boolean(config.logtoEndpoint && config.logtoAppId)),
      isAuthenticated: ref(false),
      user: ref(null),
      signIn: async () => {},
      signOut: async () => {},
      getAccessToken: async () => undefined as string | undefined
    }
  }

  const logto = useLogto()
  return {
    isConfigured: computed(() => true),
    isAuthenticated: logto.isAuthenticated,
    user: logto.user,
    signIn: () => logto.signIn(`${window.location.origin}/auth/callback`),
    signOut: () => logto.signOut(window.location.origin),
    getAccessToken: () => logto.getAccessToken(config.logtoResource)
  }
}

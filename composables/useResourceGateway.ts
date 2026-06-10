import { createResourceUseCases } from '~/core/application/resource-use-cases'
import { CmsHttpClient } from '~/core/infrastructure/cms-http-client'
import { HttpResourceRepository } from '~/core/infrastructure/http-resource-repository'

export const useResourceGateway = () => {
  const config = useRuntimeConfig().public
  const auth = useAuth()
  const client = new CmsHttpClient({ baseUrl: config.apiBaseUrl, getAccessToken: auth.getAccessToken })
  return createResourceUseCases(new HttpResourceRepository(client))
}

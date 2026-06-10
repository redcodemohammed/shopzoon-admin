import type { CmsEntity, ResourceDefinition } from '../domain/types'
import type { QueryContext, ResourceRepository } from '../application/repositories'
import { CmsHttpClient } from './cms-http-client'
import { interpolatePath, withQuery } from './url-template'

export class HttpResourceRepository implements ResourceRepository {
  constructor(private readonly client: CmsHttpClient) {}

  list(resource: ResourceDefinition, context: QueryContext = {}) {
    return this.client.request<CmsEntity[]>(withQuery(interpolatePath(resource.basePath, context.params), context.query))
  }

  get(resource: ResourceDefinition, id: string, context: QueryContext = {}) {
    const params = this.withId(resource, id, context.params)
    return this.client.request<CmsEntity>(interpolatePath(resource.detailPath || `${resource.basePath}/{id}`, params))
  }

  create(resource: ResourceDefinition, payload: Record<string, unknown>, context: QueryContext = {}) {
    return this.client.request<CmsEntity>(interpolatePath(resource.basePath, context.params), {
      method: 'POST',
      body: JSON.stringify(payload)
    })
  }

  update(resource: ResourceDefinition, id: string, payload: Record<string, unknown>, context: QueryContext = {}) {
    const params = this.withId(resource, id, context.params)
    return this.client.request<CmsEntity>(interpolatePath(resource.detailPath || `${resource.basePath}/{id}`, params), {
      method: resource.methodForUpdate || 'PUT',
      body: JSON.stringify(payload)
    })
  }

  async remove(resource: ResourceDefinition, id: string, context: QueryContext = {}) {
    const params = this.withId(resource, id, context.params)
    await this.client.request<void>(interpolatePath(resource.detailPath || `${resource.basePath}/{id}`, params), { method: 'DELETE' })
  }

  private withId(resource: ResourceDefinition, id: string, params: Record<string, string> = {}) {
    return { ...params, [resource.idParam || 'id']: id }
  }
}

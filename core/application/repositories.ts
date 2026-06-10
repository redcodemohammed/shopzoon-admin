import type { CmsEntity, EntityId, ResourceDefinition } from '../domain/types'

export interface QueryContext {
  params?: Record<string, string>
  query?: Record<string, string | number | boolean | undefined>
}

export interface ResourceRepository {
  list(resource: ResourceDefinition, context?: QueryContext): Promise<CmsEntity[]>
  get(resource: ResourceDefinition, id: EntityId, context?: QueryContext): Promise<CmsEntity>
  create(resource: ResourceDefinition, payload: Record<string, unknown>, context?: QueryContext): Promise<CmsEntity>
  update(resource: ResourceDefinition, id: EntityId, payload: Record<string, unknown>, context?: QueryContext): Promise<CmsEntity>
  remove(resource: ResourceDefinition, id: EntityId, context?: QueryContext): Promise<void>
}

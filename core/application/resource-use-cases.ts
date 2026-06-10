import type { ResourceDefinition } from '../domain/types'
import type { QueryContext, ResourceRepository } from './repositories'

export const createResourceUseCases = (repository: ResourceRepository) => ({
  list: (resource: ResourceDefinition, context?: QueryContext) => repository.list(resource, context),
  get: (resource: ResourceDefinition, id: string, context?: QueryContext) => repository.get(resource, id, context),
  create: (resource: ResourceDefinition, payload: Record<string, unknown>, context?: QueryContext) => repository.create(resource, payload, context),
  update: (resource: ResourceDefinition, id: string, payload: Record<string, unknown>, context?: QueryContext) => repository.update(resource, id, payload, context),
  remove: (resource: ResourceDefinition, id: string, context?: QueryContext) => repository.remove(resource, id, context)
})

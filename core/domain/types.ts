export type EntityId = string

export interface CmsEntity {
  id?: EntityId
  slug?: string
  name?: string
  title?: string
  status?: string
  created_at?: string
  updated_at?: string
  [key: string]: unknown
}

export interface ApiEnvelope<T> {
  data?: T
  error?: string
  message?: string
  meta?: Record<string, unknown>
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface FieldDefinition {
  key: string
  label: string
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'json' | 'date' | 'select'
  required?: boolean
  placeholder?: string
  options?: Array<{ label: string, value: string | boolean | number }>
  helper?: string
}

export interface ResourceDefinition {
  key: string
  label: string
  pluralLabel: string
  description: string
  icon: string
  group: 'content' | 'catalog' | 'commerce' | 'settings'
  basePath: string
  detailPath?: string
  listOperation: string
  createOperation?: string
  updateOperation?: string
  deleteOperation?: string
  methodForUpdate?: 'PUT' | 'PATCH'
  idParam?: string
  parentParams?: FieldDefinition[]
  fields: FieldDefinition[]
  tableColumns: string[]
  readOnly?: boolean
}

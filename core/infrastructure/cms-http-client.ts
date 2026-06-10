import type { ApiEnvelope } from '../domain/types'

export interface CmsHttpClientOptions {
  baseUrl: string
  getAccessToken?: () => Promise<string | undefined>
}

export class CmsHttpClient {
  constructor(private readonly options: CmsHttpClientOptions) {}

  async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const token = await this.options.getAccessToken?.()
    const headers = new Headers(init.headers)
    headers.set('Accept', 'application/json')

    if (init.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json')
    if (token) headers.set('Authorization', `Bearer ${token}`)

    const response = await fetch(`${this.options.baseUrl}${path}`, { ...init, headers })
    const text = await response.text()
    const json = text ? JSON.parse(text) : undefined

    if (!response.ok) {
      const message = json?.message || json?.error || response.statusText
      throw new Error(`${response.status} ${message}`)
    }

    return this.unwrap<T>(json)
  }

  private unwrap<T>(payload: ApiEnvelope<T> | T): T {
    if (payload && typeof payload === 'object' && 'data' in payload) return (payload as ApiEnvelope<T>).data as T
    return payload as T
  }
}

export const interpolatePath = (template: string, params: Record<string, string> = {}) =>
  template.replace(/\{([^}]+)\}/g, (_, key: string) => encodeURIComponent(params[key] ?? ''))

export const withQuery = (path: string, query: Record<string, string | number | boolean | undefined> = {}) => {
  const search = new URLSearchParams()
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== '') search.set(key, String(value))
  })
  const qs = search.toString()
  return qs ? `${path}?${qs}` : path
}

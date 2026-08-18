export const ROUTES = {
  HOME: '/',
  DETAILS: '/game/:slug',
  SEARCH: '/search',
  LIBRARY: '/library',
  COMMUNITY: '/community',
  NOT_FOUND: '/*'
}

export function buildPath<T extends keyof typeof ROUTES>(
  route: T,
  params?: Record<string, string | number>
): string {
  if (!params) return ROUTES[route]
  return ROUTES[route].replace(/:[a-zA-Z]+/g, (match) =>
    String(params[match.slice(1)])
  )
}

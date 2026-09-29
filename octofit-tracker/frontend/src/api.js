const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return { items: payload, pagination: null }
  }

  const items = payload?.data ?? payload?.results ?? payload?.items ?? payload?.docs ?? []
  const pagination = payload?.pagination ?? payload?.meta ?? null

  return {
    items: Array.isArray(items) ? items : [],
    pagination,
  }
}

export function buildApiEndpoint(resource) {
  return `${apiBaseUrl}/${resource}/`
}

export async function fetchCollection(resource, endpoint = buildApiEndpoint(resource)) {
  const response = await fetch(endpoint)

  if (!response.ok) {
    throw new Error(`Request failed for ${resource}: ${response.status}`)
  }

  return normalizeCollection(await response.json())
}

export function formatDate(value) {
  if (!value) {
    return 'Not set'
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}
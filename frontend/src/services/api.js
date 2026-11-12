/**
 * Cliente HTTP base para a API Laravel.
 * O Vite faz proxy de /api/* para o backend, então usamos caminhos relativos.
 */
const TOKEN_KEY = 'citizenhub.token'

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
}

export class ApiError extends Error {
  constructor(message, status, errors = {}) {
    super(message)
    this.status = status
    this.errors = errors
  }
}

export async function api(path, { method = 'GET', body, headers = {} } = {}) {
  const token = tokenStorage.get()

  const res = await fetch(`/api${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new ApiError(data.message || 'Erro inesperado.', res.status, data.errors)
  }

  return data
}

/** Simula latência de rede enquanto o backend não existe. */
export const fakeDelay = (ms = 700) => new Promise((resolve) => setTimeout(resolve, ms))

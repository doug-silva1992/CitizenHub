import { ApiError, fakeDelay, tokenStorage } from './api'

/**
 * Serviço de autenticação.
 *
 * ⚠️ MOCK: enquanto o backend não existe, os usuários ficam no localStorage.
 * Quando a API estiver pronta, substitua o corpo de cada função pela chamada
 * comentada logo acima dela (os formatos de entrada/saída já estão alinhados).
 */
const USERS_KEY = 'citizenhub.mock.users'
const SESSION_KEY = 'citizenhub.mock.session'

const readUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
const writeUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users))
const publicUser = ({ password: _password, ...user }) => user

// return api('/login', { method: 'POST', body: { email, password } })  -> { user, token }
export async function login({ email, password }) {
  await fakeDelay()
  const user = readUsers().find((u) => u.email.toLowerCase() === email.toLowerCase())

  if (!user || user.password !== password) {
    throw new ApiError('E-mail ou senha inválidos.', 422, {
      email: ['E-mail ou senha inválidos.'],
    })
  }

  const token = `mock-${crypto.randomUUID()}`
  tokenStorage.set(token)
  localStorage.setItem(SESSION_KEY, user.id)
  return { user: publicUser(user), token }
}

// return api('/register', { method: 'POST', body: data })  -> { user, token }
export async function register({ name, email, password, citizenship }) {
  await fakeDelay()
  const users = readUsers()

  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new ApiError('Este e-mail já está cadastrado.', 422, {
      email: ['Este e-mail já está cadastrado.'],
    })
  }

  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
    citizenship,
    created_at: new Date().toISOString(),
  }
  writeUsers([...users, user])

  const token = `mock-${crypto.randomUUID()}`
  tokenStorage.set(token)
  localStorage.setItem(SESSION_KEY, user.id)
  return { user: publicUser(user), token }
}

// return api('/user')  -> user
export async function me() {
  await fakeDelay(200)
  const id = localStorage.getItem(SESSION_KEY)
  const user = readUsers().find((u) => u.id === id)
  if (!tokenStorage.get() || !user) throw new ApiError('Não autenticado.', 401)
  return publicUser(user)
}

// await api('/logout', { method: 'POST' })
export async function logout() {
  tokenStorage.clear()
  localStorage.removeItem(SESSION_KEY)
}

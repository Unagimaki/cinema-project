import { api } from './base'

export interface AuthResponse {
  token: string
}

export interface LoginPayload {
  username: string
  password: string
}

export interface RegisterPayload extends LoginPayload {
  passwordConfirmation: string
}

/** Вход пользователя */
export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/login', payload)
  return data
}

/** Регистрация пользователя */
export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/register', payload)
  return data
}

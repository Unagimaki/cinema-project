import { defineStore } from 'pinia'
import { LoginPayload } from '@/features/auth/types'
import { login, register } from '@/features/auth/api/auth'
import { RegisterPayload } from './types'
import { handleApiError } from '@/shared/api/handleApiError'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    isAuthenticated: !!localStorage.getItem('token'),
    error: '',
    loading: false,
  }),

  actions: {
    async loginUser(payload: LoginPayload) {
      this.loading = true
      this.error = ''
      try {
        const { token } = await login(payload)
        this.token = token
        this.isAuthenticated = true
        localStorage.setItem('token', token)
      } catch (e) {
        const {message} = handleApiError(e)
        this.error = message
        this.isAuthenticated = false
      } finally {
        this.loading = false
      }
    },

    async registerUser(payload: RegisterPayload) {
      this.loading = true
      this.error = ''
      try {
        const { token } = await register(payload)

        this.token = token
        this.isAuthenticated = true
        localStorage.setItem('token', token)
      } catch (e) {
        const {message} = handleApiError(e)
        this.error = message
        this.isAuthenticated = false
      } finally {
        this.loading = false
      }
    },

    logoutUser() {
      this.token = ''
      this.isAuthenticated = false
      localStorage.removeItem('token')
    },
  },
})

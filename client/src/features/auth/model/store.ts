import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const isAuthenticated = computed(() => !!token.value)

  function login(fakeToken: string) {
    token.value = fakeToken
    localStorage.setItem('token', fakeToken)
  }

  function logout() {
    token.value = null
    localStorage.removeItem('token')
  }
  return { token, isAuthenticated, login, logout }
})

// const store = useAuthStore()


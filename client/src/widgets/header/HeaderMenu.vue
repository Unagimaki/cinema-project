<template>
  <header class="header">
    <nav class="nav">
      <RouterLink to="/">Главная</RouterLink>
      <RouterLink to="/films">Фильмы</RouterLink>
      <RouterLink to="/cinemas">Кинотеатры</RouterLink>
      <RouterLink to="/tickets">Мои билеты</RouterLink>
      <RouterLink v-if="!isAuth" to="/login">Вход</RouterLink>
      <button v-if="isAuth" @click="logout">Выход</button>
    </nav>
  </header>
</template>

<script setup lang="ts">

import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/features/auth/model/store'
import { computed } from 'vue'

const router = useRouter()
const auth = useAuthStore()
const isAuth = computed(() => auth.isAuthenticated)

function logout() {
  auth.logout()
  router.push('/')
}
</script>

<style scoped>
  .header {
    background: #111;
    color: white;
    padding: 12px 24px;
  }
  .nav {
    display: flex;
    gap: 16px;
    align-items: center;
  }
  .nav * {
    color: #fff;
  }
</style>
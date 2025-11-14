<script setup lang="ts">

import { RouterLink, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useUserStore } from '@/entities/user/model/userStore'

const router = useRouter()
const store = useUserStore()
const auth = useUserStore()
const isAuth = computed(() => auth.isAuthenticated)
import { APP_ROUTES } from '@/shared/config/routes'

function logout() {
  auth.logoutUser()
  if (!store.isAuthenticated) {
    router.push(APP_ROUTES.MOVIES)
  }
}
</script>

<template>
  <header class="header">
    <nav class="nav">
      <RouterLink :to=APP_ROUTES.HOME>Главная</RouterLink>
      <RouterLink :to=APP_ROUTES.MOVIES>Фильмы</RouterLink>
      <RouterLink :to=APP_ROUTES.CINEMAS>Кинотеатры</RouterLink>
      <RouterLink :to=APP_ROUTES.BOOKINGS>Мои билеты</RouterLink>
      <RouterLink v-if="!isAuth" :to=APP_ROUTES.LOGIN>Вход</RouterLink>
      <button class="logout_button" v-if="isAuth" @click="logout">Выход</button>
    </nav>
  </header>
</template>

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
  .logout_button {
    color: #000 !important; 
  }
  .nav * {
    color: #fff;
  }
</style>
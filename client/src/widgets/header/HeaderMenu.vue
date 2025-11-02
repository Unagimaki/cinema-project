<template>
  <header class="header">
    <nav class="nav">
      <RouterLink to="/">Главная</RouterLink>
      <RouterLink to="/films">Фильмы</RouterLink>
      <RouterLink to="/cinemas">Кинотеатры</RouterLink>
      <RouterLink to="/tickets">Мои билеты</RouterLink>
      <RouterLink v-if="!isAuth" to="/login">Вход</RouterLink>
      <button class="logout_button" v-if="isAuth" @click="logout">Выход</button>
    </nav>
  </header>
</template>

<script setup lang="ts">

import { RouterLink, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useUserStore } from '@/entities/user/model/userStore'

const router = useRouter()
const auth = useUserStore()
const isAuth = computed(() => auth.isAuthenticated)

function logout() {
  auth.logoutUser()
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
  .logout_button {
    color: #000 !important; 
  }
  .nav * {
    color: #fff;
  }
</style>
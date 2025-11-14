<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/entities/user/model/userStore'
import { useRouter } from 'vue-router'
import { APP_ROUTES } from '@/shared/config/routes'

const store = useUserStore()
const username = ref('')
const password = ref('')
const router = useRouter()

async function onSubmit() {
  await store.loginUser({
    username: username.value,
    password: password.value,
  })
  if (store.isAuthenticated) {
    router.push(APP_ROUTES.BOOKINGS)
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div><input v-model="username" placeholder="Имя пользователя" /></div>
    <div><input type="password" v-model="password" placeholder="Пароль" /></div>

    <p v-if="store.error">{{ store.error }}</p>
    <button type="submit" :disabled="store.loading">
      {{ store.loading ? 'Вход...' : 'Войти' }}
    </button>

    <p class="text-sm mt-2">
      Нет аккаунта?
      <RouterLink :to=APP_ROUTES.REGISTER class="text-blue-500 hover:underline">
        Зарегистрируйтесь
      </RouterLink>
    </p>
  </form>
</template>


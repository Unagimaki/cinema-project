<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/entities/user/model/userStore'
import { useRouter } from 'vue-router'
import { APP_ROUTES } from '@/shared/config/routes'

const store = useUserStore()
const username = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const router = useRouter()

async function onSubmit() {
  if (username.value.trim().length < 8 || password.value.trim().length < 8) {
    alert('Имя пользователя и пароль должны быть не менее 8 символов.')
    return
  }
  if (password.value !== passwordConfirmation.value) {
    alert('Пароли не совпадают.')
    return
  }
  await store.registerUser({
    username: username.value,
    password: password.value,
    passwordConfirmation: passwordConfirmation.value,
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
    <div><input type="password" v-model="passwordConfirmation" placeholder="Подтверждение пароля" /></div>

    <p v-if="store.error">{{ store.error }}</p>
    <button type="submit" :disabled="store.loading">
      {{ store.loading ? 'Регистрация...' : 'Зарегистрироваться' }}
    </button>
  </form>
</template>

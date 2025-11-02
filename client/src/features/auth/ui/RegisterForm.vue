<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/entities/user/model/userStore'
import { useRouter } from 'vue-router'

const store = useUserStore()
const username = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const router = useRouter()

async function onSubmit() {
  await store.registerUser({
    username: username.value,
    password: password.value,
    passwordConfirmation: passwordConfirmation.value,
  })
  if (store.isAuthenticated) {
    router.push('/tickets')
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

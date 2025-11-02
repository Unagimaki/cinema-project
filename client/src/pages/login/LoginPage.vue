<template>
  <div>
    <p>Страница входа</p>
  </div>
  <input type="text" placeholder="Логин"/>
  <input type="text" placeholder="Пароль"/>
  <button @click="login">Войти</button>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/features/auth/model/store';
import { useRouter } from 'vue-router';

  const auth = useAuthStore()
  const router = useRouter()
  const login = () => {    
    auth.login('token')
    router.push('/tickets')
  }
</script>

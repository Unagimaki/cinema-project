<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMovieStore } from '@/entities/movie/model/movieStore'
import { BASE_URL } from '@/shared/config/env'

const route = useRoute()
const store = useMovieStore()

onMounted(() => {
  const id = Number(route.params.id)
  store.fetchMoviesSessionById(id)
})
</script>

<template>
  <div v-if="store.loading">Загрузка...</div>
  <p v-if="store.error">{{ store.error }}</p>

  <div v-if="store.selectedMovie">
    <h1>{{ store.selectedMovie.title }}</h1>
    <p>{{ store.selectedMovie.description }}</p>
    <img :src="`${BASE_URL}${store.selectedMovie.posterImage}`" :alt="store.selectedMovie.title" />


    <h2>Сеансы</h2>
    <ul>
      <li v-for="session in store.sessions" :key="session.id">
        {{ session.id }} — {{ session.startTime }}
      </li>
    </ul>
  </div>
</template>

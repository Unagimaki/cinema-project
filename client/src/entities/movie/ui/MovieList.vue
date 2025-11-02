<script setup lang="ts">
import { useMovieStore } from '../model/movieStore';
import MovieCard from './MovieCard.vue'

const store = useMovieStore()
</script>

<template>
  <div v-if="store.loading">Загрузка...</div>
  <p v-if="store.error">{{ store.error }}</p>
  <div v-else class="movie-list">
    <MovieCard v-for="m in store.movies" :key="m.id" :movie="m" />
  </div>
</template>

<style scoped>
  .movie-list {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: flex-start;
  }
</style>

<script setup lang="ts">
import { useMovieStore } from '@/entities/movie/model/movieStore'
import MovieList from '@/entities/movie/ui/MovieList.vue'
import { onMounted } from 'vue'

const movieStore = useMovieStore()

onMounted(() => {
  movieStore.fetchMovies()
})

</script>

<template>
  <h1>Фильмы</h1>
  <MovieList/>
</template>

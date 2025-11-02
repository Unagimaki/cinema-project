<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Movie } from '../model/types'
import { BASE_URL } from '@/shared/config/env';

const router = useRouter()
const props = defineProps<{ movie: Movie }>()

function goToSessions() {
  router.push(`/movies/${props.movie.id}`)
}
</script>

<template>
  <div class="movie-card-container">
    <div class="movie-card-inner">
      <div class="movie-card-inner_desc">
        <img :src="`${BASE_URL}${movie.posterImage}`" :alt="movie.title" />
        <h3>{{ movie.title }}</h3>
      </div>
      <div class="movie-card-inner_sessions">
        <button @click="goToSessions">Посмотреть сеансы</button>
      </div>
    </div>
  </div>
</template>

<style>

.movie-card-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.movie-card {
  width: 20vw;
}

</style>
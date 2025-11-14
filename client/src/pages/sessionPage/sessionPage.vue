<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMovieSessionStore } from '@/entities/movie-session/model/movieSessionStore'
import SeatGrid from '@/entities/movie-session/ui/SeatGrid.vue'
import BookButton from '@/features/booking/ui/BookButton.vue'

const route = useRoute()
const store = useMovieSessionStore()

onMounted(() => {
  const id = Number(route.params.id)
  store.fetchSession(id)
})

</script>

<template>
  <div v-if="store.loading">Загрузка...</div>
  <p v-if="store.error">{{ store.error }}</p>

  <div v-if="store.session">
    <h1>Выбор мест</h1>

    <SeatGrid />
    <BookButton />
  </div>
</template>

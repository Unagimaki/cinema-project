<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useMovieStore } from '@/entities/movie/model/movieStore'
import { BASE_URL } from '@/shared/config/env'
import { useCinemaStore } from '@/entities/cinema/model/cinemaStore'
import { groupSessionsByDateAndCinema } from '@/entities/movie/lib/transformSessions'
import { APP_ROUTES } from '@/shared/config/routes'

const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()
const cinemaStore = useCinemaStore()

onMounted(async () => {
  const id = Number(route.params.id)
  await Promise.all([
    movieStore.fetchMoviesSessionById(id),
    cinemaStore.fetchCinemas()
  ])
})

const sessionsByDate = computed(() =>
  groupSessionsByDateAndCinema(movieStore.sessions, cinemaStore.cinemas)
)
function goToSession(session: any) {
  router.push(`${APP_ROUTES.SESSIONS}/${session.id}`)
}

</script>

<template>
  <div v-if="movieStore.loading || cinemaStore.loading">Загрузка...</div>
  <p v-if="movieStore.error || cinemaStore.error">
    {{ movieStore.error || cinemaStore.error }}
  </p>

  <div v-if="movieStore.selectedMovie">
    <h1>{{ movieStore.selectedMovie.title }}</h1>
    <p>{{ movieStore.selectedMovie.description }}</p>
    <img
      :src="`${BASE_URL}${movieStore.selectedMovie.posterImage}`"
      :alt="movieStore.selectedMovie.title"
    />

    <h2>Сеансы</h2>
<div v-for="day in sessionsByDate" :key="day.date" class="day-block">
  <h3>{{ new Date(day.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }) }}</h3>
  <hr />
  <div v-for="cinema in day.cinemas" :key="cinema.name" class="cinema-block">
    <h4>{{ cinema.name }}</h4>
    <div class="times">
      <button @click="goToSession(session)" v-for="session in cinema.sessions" :key="session.id" class="time-btn">
        {{ session.time }}
      </button>
    </div>
  </div>
</div>

  </div>
</template>

<style>
.day-block {
  margin-bottom: 24px;
  border-bottom: 1px solid #555;
  padding-bottom: 16px;
}
.cinema-block {
  margin-top: 12px;
}
.times {
  display: flex;
  gap: 8px;
  margin: 8px 0 16px 0;
}
.time-btn {
  background: transparent;
  border: 1px solid #777;
  color: #000;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
}
.time-btn:hover {
  border-color: #fff;
}
</style>

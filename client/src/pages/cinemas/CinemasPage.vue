<template>
  <div>
    <p>Страница кинотеатров</p>
    <ul>
      <li v-for="cinema in cinemasStore.cinemas">
        {{ cinema.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useCinemaStore } from '@/entities/cinema/model/cinemaStore';
import { onMounted } from 'vue';

  const cinemasStore = useCinemaStore()

  onMounted(() => {
    cinemasStore.fetchCinemas()
  })
</script>

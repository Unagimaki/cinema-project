<script setup lang="ts">
import { useMovieSessionStore } from '../model/movieSessionStore'

const store = useMovieSessionStore()

function isBooked(row: number, col: number) {
  return store.bookedSeats.some(
    s => s.rowNumber === row && s.seatNumber === col
  )
}

function isSelected(row: number, col: number) {
  return store.selectedSeats.some(
    s => s.rowNumber === row && s.seatNumber === col
  )
}

function toggle(row: number, col: number) {
  if (isBooked(row, col)) return 
  store.toggleSeat(row, col)
}
</script>

<template>
  <div v-if="store.seats" class="grid">
    <div
      v-for="row in store.seats.rows"
      :key="row"
      class="row"
    >
      <div
        v-for="seat in store.seats.seatsPerRow"
        :key="seat"
        class="seat"
        :class="{
          booked: isBooked(row, seat),
          selected: isSelected(row, seat)
        }"
        @click="toggle(row, seat)"
      >
        {{ seat }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.row {
  display: flex;
  gap: 8px;
}

.seat {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background: #333;
  border: 1px solid #444;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.seat.booked {
  background: #550000;
  cursor: not-allowed;
}

.seat.selected {
  background: #0055aa;
}
</style>

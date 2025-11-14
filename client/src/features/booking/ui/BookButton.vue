<script setup lang="ts">
import { useRouter } from "vue-router"
import { bookSeats } from "../api/bookSeats"
import { useMovieSessionStore } from "@/entities/movie-session/model/movieSessionStore"
import { useUserStore } from "@/entities/user/model/userStore"
import { handleBookingError } from "../lib/handleBookingError"
import { useBookingStore } from "@/entities/booking/model/bookingStore"
import { APP_ROUTES } from "@/shared/config/routes"

const router = useRouter()
const sessionStore = useMovieSessionStore()
const user = useUserStore()
const bookingStore = useBookingStore()

async function submit() {
  if (!user.isAuthenticated) {
    router.push(APP_ROUTES.LOGIN)
    return
  }

  if (!sessionStore.selectedSeats.length) {
    alert("Выберите хотя бы одно место")
    return
  }

  try {
    const res = await bookSeats(sessionStore.session!.id, {
      seats: sessionStore.selectedSeats
    })
    bookingStore.setBooking(res.bookingId)
    

    router.push(APP_ROUTES.BOOKINGS)
  } catch (e) {
    handleBookingError(e)
  } finally {
    sessionStore.selectedSeats = []
  }
}
</script>

<template>
  <button class="book-btn" @click="submit">
    Забронировать
  </button>
</template>

<style scoped>
.book-btn {
  margin-top: 16px;
  background: #007bff;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 6px;
  cursor: pointer;
}
</style>

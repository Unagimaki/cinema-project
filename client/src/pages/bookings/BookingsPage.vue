<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useBookingStore } from '@/entities/booking/model/bookingStore'
import { groupBookings } from '@/entities/booking/lib/groupBooking'

const bookingStore = useBookingStore()

onMounted(() => {
  bookingStore.getBookings()
})

const grouped = computed(() => groupBookings(bookingStore.bookings))
</script>

<template>
  <div>
    <h1>Мои билеты</h1>
    <h3 v-if="!bookingStore.bookings.length">Билетов пока нет</h3>
    <div v-if="bookingStore.loading">Загрузка...</div>
    <p v-if="bookingStore.error">{{ bookingStore.error }}</p>

    <!-- НЕОПЛАЧЕННЫЕ -->
    <section v-if="grouped.unpaid.length">
      <h2>Неоплаченные</h2>
      <div v-for="b in grouped.unpaid" :key="b.id">
        <p>Билет №{{ b.id }}</p>
        <!-- кнопка позже будет PaymentButton -->
        <button @click="bookingStore.payBooking(b.id)">Оплатить</button>
      </div>
    </section>

    <!-- БУДУЩИЕ -->
    <section v-if="grouped.upcoming.length">
      <h2>Будущие</h2>
      <div v-for="b in grouped.upcoming" :key="b.id">
        <p>Билет №{{ b.id }}</p>
        <p>Дата: {{ b.bookedAt }}</p>
      </div>
    </section>

    <!-- ПРОШЕДШИЕ -->
    <section v-if="grouped.past.length">
      <h2>Прошедшие</h2>
      <div v-for="b in grouped.past" :key="b.id">
        <p>Билет №{{ b.id }}</p>
      </div>
    </section>
  </div>
</template>

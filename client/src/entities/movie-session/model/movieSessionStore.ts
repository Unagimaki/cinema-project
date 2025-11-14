import { defineStore } from "pinia";
import { MovieSession } from "./types";
import { handleApiError } from "@/shared/api/handleApiError";
import { getMovieSession } from "./api";

export const useMovieSessionStore = defineStore("MovieSessionStore", {
  state: () => ({
    session: null as MovieSession | null,
    seats: { rows: 0, seatsPerRow: 0 },
    bookedSeats: [] as Array<{ rowNumber: number; seatNumber: number }>,
    selectedSeats: [] as Array<{ rowNumber: number; seatNumber: number }>,
    loading: false,
    error: ''
  }),

  actions: {
    async fetchSession(id: number) {
      this.loading = true;
      this.error = '';

      try {
        const data = await getMovieSession(id)
        console.log(data)        
        this.session = data
        this.seats = data.seats
        this.bookedSeats = data.bookedSeats
      } catch (e) {
        const { message } = handleApiError(e)
        this.error = message
      } finally {
        this.loading = false
      }
    },

    toggleSeat(row: number, seat: number) {
      const exists = this.selectedSeats
        .some(s => s.rowNumber === row && s.seatNumber === seat)
      if (exists) {
        this.selectedSeats = this.selectedSeats.filter(
          s => !(s.rowNumber === row && s.seatNumber === seat)
        )
      } else {
        this.selectedSeats.push({ rowNumber: row, seatNumber: seat })
      }
    }
  }
})

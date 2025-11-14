import { defineStore } from "pinia"
import { Booking } from "./types"
import { handleApiError } from "@/shared/api/handleApiError"
import { getUserBookings } from "./api"
import { paymentBooking } from "@/features/payment/api/payBooking"

export const useBookingStore = defineStore("BookingStore", {
  state: () => ({
    loading: false,
    error: null as string | null,
    latestBookingId: null as number | null,
    bookings: [] as Booking[]
  }),

  actions: {
    setBooking(id: number) {
      this.latestBookingId = id
    },
    async getBookings() {
      this.loading = true
      this.error = null
      try {
        this.bookings = await getUserBookings()
      } catch (error) {
        const {message} = handleApiError(error);
        this.error = message;
      } finally {
        this.loading = false        
      }
    },
    async payBooking(bookingId: string) { 
      this.loading = true
      this.error = null
      try {
        await paymentBooking(bookingId)
        await this.getBookings()        
      } catch (error) {
        const {message} = handleApiError(error);
        this.error = message;
      } finally {
        this.loading = false        
      }
    }
  }
})

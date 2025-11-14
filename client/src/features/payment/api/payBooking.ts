import { api } from "@/shared/api/base"
import { API_ENDPOINTS } from "@/shared/api/endpoints"

export async function paymentBooking(bookingId: string) {
  const { data } = await api.post(API_ENDPOINTS.BOOKINGS.PAY_BOOKING(bookingId))
  return data
}
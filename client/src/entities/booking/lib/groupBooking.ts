import { Booking } from "../model/types"

export function groupBookings(bookings: Booking[], now = new Date()) {
  const unpaid = []
  const upcoming = []
  const past = []

  for (const b of bookings) {
    if (!b.isPaid) {
      unpaid.push(b)
      continue
    }

    const sessionTime = new Date(b.bookedAt)

    if (sessionTime > now) upcoming.push(b)
    else past.push(b)
  }

  return { unpaid, upcoming, past }
}

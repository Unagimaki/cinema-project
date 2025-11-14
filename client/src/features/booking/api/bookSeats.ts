import { api } from "@/shared/api/base"
import { API_ENDPOINTS } from "@/shared/api/endpoints"
import { BookSeatsPayload } from "../types"

export async function bookSeats(sessionId: number, payload: BookSeatsPayload) {
  const { data } = await api.post(API_ENDPOINTS.MOVIES_SESSIONS.BOOKING_MOVIE_SESSION_BY_MOVIE_SESSION_ID(sessionId), payload)
  return data
}


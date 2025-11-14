// src/features/booking/lib/handleBookingError.ts

export function handleBookingError(error: unknown) {
  let message = "Ошибка при бронировании"
  let status: number | null = null

  if (error && typeof error === "object" && "response" in error) {
    const err = error as any
    status = err.response?.status

    switch (status) {
      case 400:
        message = "Неверное тело запроса"
        break

      case 401:
        message = "Неавторизованный доступ"
        break

      case 403:
        message = "Доступ запрещен"
        break
      case 404:
        message = "Киносеанс не найден"
        break

      case 409:
        message = "Места уже забронированы"
        break

      default:
        message = err.response?.data?.message || "Неизвестная ошибка"
    }
  }

  return { message, status }
}

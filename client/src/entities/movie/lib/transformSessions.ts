import type { MovieSession } from '../model/types'
import type { Cinema } from '@/entities/cinema/model/types'

export interface GroupedSessions {
  date: string
  cinemas: {
    id: number
    name: string
    address?: string
    sessions: {
      id: number
      time: string
    }[]
  }[]
}

/**
 * Группирует сеансы по дате и кинотеатру.
 * Время и дата берутся в UTC (без адаптации под локальный пояс).
 */
export function groupSessionsByDateAndCinema(
  sessions: MovieSession[],
  cinemas: Cinema[]
): GroupedSessions[] {
  if (!sessions.length || !cinemas.length) return []

  const map = new Map<string, Map<number, GroupedSessions['cinemas'][0]>>()

  for (const s of sessions) {
    const cinema = cinemas.find(c => c.id === s.cinemaId)
    if (!cinema) continue

    const dateObj = new Date(s.startTime)

    // Формируем дату в UTC
    const dateKey =
      dateObj.getUTCFullYear() +
      '-' +
      String(dateObj.getUTCMonth() + 1).padStart(2, '0') +
      '-' +
      String(dateObj.getUTCDate()).padStart(2, '0')

    if (!map.has(dateKey)) {
      map.set(dateKey, new Map())
    }

    const cinemaMap = map.get(dateKey)!
    if (!cinemaMap.has(cinema.id)) {
      cinemaMap.set(cinema.id, {
        id: cinema.id,
        name: cinema.name,
        address: cinema.address,
        sessions: [],
      })
    }

    // Формат времени без изменения часового пояса
    const hours = String(dateObj.getUTCHours()).padStart(2, '0')
    const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0')
    const time = `${hours}:${minutes}`

    cinemaMap.get(cinema.id)!.sessions.push({
      id: s.id,
      time,
    })
  }

  // Преобразуем в массив
  return Array.from(map.entries()).map(([date, cinemaMap]) => ({
    date,
    cinemas: Array.from(cinemaMap.values()),
  }))
}

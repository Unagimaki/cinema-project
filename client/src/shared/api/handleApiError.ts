import type { AxiosError } from 'axios'

/**
 * Унифицированный парсер ошибок API.
 * Возвращает { message, status } — для отображения в UI и логики в коде.
 */
export function handleApiError(error: unknown): { message: string; status?: number } {
  const defaultMessage = 'Произошла ошибка. Попробуйте позже.'
  if (!error || typeof error !== 'object') return { message: defaultMessage }

  const axiosError = error as AxiosError<{ message?: string }>
  const status = axiosError.response?.status
  const messageFromApi = axiosError.response?.data?.message

  // примеры логики: разные тексты под разные коды
  if (status === 400) return { message: messageFromApi || 'Требуется имя пользователя и пароль', status }
  if (status === 401) return { message: 'Неверный логин или пароль. Проверьте введенные данные и попробуйте снова', status }

  return { message: messageFromApi || defaultMessage, status }
}

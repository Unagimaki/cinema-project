import axios from 'axios'

// Создаём инстанс axios
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // подтягиваем из .env
  headers: {
    'Content-Type': 'application/json',
  },
})

// Интерцептор: перед каждым запросом добавляем токен (если есть)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

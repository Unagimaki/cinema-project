export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    ME: '/me',
  },

  MOVIES: {
    ROOT: '/movies',
    SESSIONS_BY_ID: (movieId: number) => `/movies/${movieId}/sessions`,
  },

  MOVIES_SESSIONS: {
    ROOT: '/movieSessions',
    MOVIE_SESSION_BY_MOVIE_SESSION_ID: (movieSessionsId: number) => `/movieSessions/${movieSessionsId}`,
  },

  CINEMAS: {
    ROOT: '/cinemas',
    SESSIONS: (cinedmaId: number) => `/cinemas/${cinedmaId}/sessions`,
  },

  MOVIE_SESSIONS: {
    BY_ID: (id: number) => `/movieSessions/${id}`,
  },

  BOOKINGS: {
    ROOT: '/bookings',
    PAY: (bookingId: number) => `/bookings/${bookingId}/payments`,
  },

  SETTINGS: '/settings',
} as const

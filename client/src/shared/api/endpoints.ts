export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    ME: '/me',
  },

  MOVIES: {
    ROOT: '/movies',
    THIS_MOVIE_SESSIONS_BY_ID: (movieId: number) => `/movies/${movieId}/sessions`,
  },

  MOVIES_SESSIONS: {
    ROOT: '/movieSessions',
    MOVIE_SESSION_BY_MOVIE_SESSION_ID: (movieSessionsId: number) => `/movieSessions/${movieSessionsId}`,
    BOOKING_MOVIE_SESSION_BY_MOVIE_SESSION_ID: (movieSessionsId: number) => `/movieSessions/${movieSessionsId}/bookings`,
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
    PAY_BOOKING: (bookingId: string) => `/bookings/${bookingId}/payments`,
  },
  USERS: {
    ROOT: '/me',
    GET_USERS_BOOKINGS: '/me/bookings',
  },

  SETTINGS: '/settings',
} as const

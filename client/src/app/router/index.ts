import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../../pages/home/HomePage.vue'
import FilmsPage from '@/pages/films/FilmsPage.vue'
import CinemasPage from '@/pages/cinemas/CinemasPage.vue'
import LoginPage from '@/pages/login/LoginPage.vue'
import RegisterPage from '@/pages/register/RegisterPage.vue'
import { useUserStore } from '@/entities/user/model/userStore'
import MoviesSessionPage from '@/pages/moviesSession/MoviesSessionPage.vue'
import SessionPage from '@/pages/sessionPage/sessionPage.vue'
import BookingsPage from '@/pages/bookings/BookingsPage.vue'
import { APP_ROUTES } from '@/shared/config/routes'

const routes = [
  { path: APP_ROUTES.HOME, name: 'home', component: HomePage },
  { path: APP_ROUTES.MOVIES, name: 'movies', component: FilmsPage },
  { path: `${APP_ROUTES.MOVIES}/:id`, name: 'movie-details', component: MoviesSessionPage },
  { path: APP_ROUTES.CINEMAS, name: 'cinemas', component: CinemasPage },
  { path: APP_ROUTES.BOOKINGS, name: 'bookings', component: BookingsPage, meta: { requiresAuth: true } },
  { path: APP_ROUTES.LOGIN, name: 'login', component: LoginPage },
  { path: APP_ROUTES.REGISTER, name: 'register', component: RegisterPage },
  { path: `${APP_ROUTES.SESSIONS}/:id`, name: 'sessions', component: SessionPage },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const auth = useUserStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login' }
  }
})



export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../../pages/home/HomePage.vue'
import FilmsPage from '@/pages/films/FilmsPage.vue'
import CinemasPage from '@/pages/cinemas/CinemasPage.vue'
import TicketsPage from '@/pages/tickets/TicketsPage.vue'
import LoginPage from '@/pages/login/LoginPage.vue'
import RegisterPage from '@/pages/register/RegisterPage.vue'
import { useUserStore } from '@/entities/user/model/userStore'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/films', name: 'films', component: FilmsPage },
  { path: '/cinemas', name: 'cinemas', component: CinemasPage },
  { path: '/tickets', name: 'tickets', component: TicketsPage, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/register', name: 'register', component: RegisterPage },
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

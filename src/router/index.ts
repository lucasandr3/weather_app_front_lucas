import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
// import { useAuthStore } from '@/stores/auth.ts'
import Guard from '../services/midlleware';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('@/views/LoginView.vue'),
        }
      ],
    },
    {
      path: '/nova-conta',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'nova-conta',
          component: () => import('@/views/RegistroView.vue'),
        }
      ],
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/HomeView.vue'),
          beforeEnter: Guard.isAuthenticated
        },
        {
          path: '/consultar',
          name: 'consultar',
          component: () => import('@/views/ConsultarView.vue'),
          beforeEnter: Guard.isAuthenticated
        },
        {
          path: '/historico',
          name: 'historico',
          component: () => import('@/views/HistoricoView.vue'),
          beforeEnter: Guard.isAuthenticated
        },
        {
          path: '/detalhes/historico/:id',
          name: 'detalhes-historico',
          component: () => import('@/views/DetalhesHistoricoView.vue'),
          beforeEnter: Guard.isAuthenticated
        }
      ],
    }
  ],
})

export default router

import { useAuthStore } from '../stores/auth.ts'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export default {
  isAuthenticated(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    const store = useAuthStore()

    if (!store.isAuthenticated) {
      next('/login');
    }

    next();
  }
}

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface User {
  nome: string;
  email: string;
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(localStorage.getItem('token') || '');
  const user = ref<User | null>(null);

  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser) as User;
    } catch (error) {
      console.error('Erro ao parsear os dados do usuário:', error);
    }
  }

  const isAuthenticated = computed(() => !!token.value);

  function login(userData: User, authToken: string) {
    user.value = userData;
    token.value = authToken;
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
  }

  function logout() {
    user.value = null;
    token.value = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  return { user, token, isAuthenticated, login, logout };
});

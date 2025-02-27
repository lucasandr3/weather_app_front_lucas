import api from './api'
import { useAuthStore } from '../stores/auth.ts'
import { AxiosError } from "axios";

interface ApiError {
  message: string;
}

export const AuthService = {
  async login(email: string, password: string) {
    try {
      const response = await api.post('/login', { email, password })

      const { token, user } = response.data

      const authStore = useAuthStore()
      authStore.login(user, token)

      return response.data
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>
      alert(axiosError.response?.data?.message || "Ocorreu um erro inesperado")
    }
  },

  async registro(nome: string, email: string, password: string) {
    try {
      return await api.post('/registro', { name: nome, email, password })
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>
      alert(axiosError.response?.data?.message || "Ocorreu um erro inesperado");
    }
  }
}

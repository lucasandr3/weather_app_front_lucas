import api from './api'
import { AxiosError } from 'axios'

interface ApiError {
  message: string;
}


export const DashboardService = {
  async dashboard() {
    const token: string | null = localStorage.getItem('token');
    try {
      const response = await api.get(`/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>
      alert(axiosError.response?.data?.message || "Ocorreu um erro inesperado");
    }
  }
}

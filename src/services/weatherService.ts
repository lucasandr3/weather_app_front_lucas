import api from './api'
import { AxiosError } from 'axios'

interface ApiError {
  message: string;
}


export const WeatherService = {
  async weather(cidade: string) {
    const token: string | null = localStorage.getItem('token');
    try {
      const response = await api.get(`/weather?cidade=${cidade}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>
      alert(axiosError.response?.data?.message || "Ocorreu um erro inesperado");
    }
  },
  async historico(filtros: object) {
    const token: string | null = localStorage.getItem('token');
    try {
      const response = await api.get(`/weather/historico`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: filtros
      })
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>
      alert(axiosError.response?.data?.message || "Ocorreu um erro inesperado");
    }
  },
  async buscarDetalhes(id: number) {
    const token: string | null = localStorage.getItem('token');
    try {
      const response = await api.get(`/weather/historico/${id}`, {
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

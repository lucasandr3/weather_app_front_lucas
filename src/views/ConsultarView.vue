<script setup lang="ts">
import { ref } from 'vue'
import { WeatherService } from '@/services/weatherService.ts'
import WindIcon from '@/components/icons/WindIcon.vue'
import LocationIcon from '@/components/icons/LocationIcon.vue'
import WaterIcon from '@/components/icons/WaterIcon.vue'

interface Weather {
  descricao: string
  icone: string
  temperatura: number
  sensacao_termica: number
  temp_min: number
  temp_max: number
  humidade: number
  vento: number
  cidade: string
  pais: string
}

const cidade = ref('')
const isLoading = ref(false)
const weather = ref<Weather>()

const handleWeather = async () => {
  isLoading.value = true
  try {
    weather.value = await WeatherService.weather(cidade.value)
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="bg-white rounded-md">
    <div
      class="bg-white  p-4 border border-gray-200 rounded-md text-gray-900"
    >
      <div class="flex items-center space-x-3">
        <!-- Pesquisa CNPJ -->
        <div class="flex-1">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 "
            >Pesquisar Cidade:</label
          >
          <input
            type="text"
            v-model="cidade"
            name="cidade"
            id="cidade"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-atenas focus:border-atenas block w-full p-2.5"
            placeholder="Informe a cidade"
            required
          />
        </div>

        <!-- Botão -->
        <button
          type="submit"
          @click="handleWeather"
          class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 mt-9"
        >
          <svg
            class="w-5 h-5 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
            ></path>
          </svg>
          {{ isLoading ? 'Pesquisando...' : 'Pesquisar' }}
        </button>
      </div>
    </div>
  </div>

  <div v-if="weather" class="bg-gray-800 text-gray-50 mt-4 p-6 rounded-lg shadow-lg">
    <h2 class="flex items-center text-xl font-bold"><LocationIcon class="mr-2"/> {{ weather.cidade }}, {{ weather.pais }}</h2>

    <div class="flex justify-between mt-4">
      <div>
        <p class="text-gray-300 text-sm">Temperatura</p>
        <p class="text-2xl font-semibold">{{ weather.temperatura }} <sup>ºC</sup></p>
        <div class="flex items-center space-x-2">
          <p class="text-xl font-bold">{{weather.descricao}}</p>
          <img :src="'http://openweathermap.org/img/wn/' + weather.icone + '@2x.png'" alt="Ícone do tempo" />
        </div>
      </div>

      <div>
        <p class="text-gray-300 text-sm">Velocidade do Vento</p>
        <p class="flex items-center text-2xl font-semibold"><WindIcon class="mr-2"/> {{ weather.vento }} <span class="text-sm"> km/h</span></p>
      </div>

      <div>
        <p class="text-gray-300 text-sm">Informações extras</p>
        <p class="text-base font-semibold mb-2">Sensação Térmica <span class="text-sm font-normal">- {{ weather.sensacao_termica }} ºC</span></p>
        <p class="text-base font-semibold mb-2">Temperatura Mínima <span class="text-sm font-normal">- {{ weather.temp_min }} ºC</span></p>
        <p class="text-base font-semibold">Temperatura Máxima <span class="text-sm font-normal">- {{ weather.temp_max }} ºC</span></p>
      </div>

      <div>
        <p class="text-gray-300 text-sm">Humidade relativa do ar</p>
        <p class="flex items-center text-2xl font-semibold">
         <WaterIcon class="mr-2"/> {{ weather.humidade }} <span class="text-sm"> %</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style></style>

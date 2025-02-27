<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { WeatherService } from '@/services/weatherService.ts'
import VoltarIcon from '@/components/icons/VoltarIcon.vue'

interface Historico {
  id: number;
  usuario: string;
  descricao: string;
  icone: string;
  temperatura: number;
  sensacao_termica: number;
  temp_min: number;
  temp_max: number;
  humidade: number;
  vento: number;
  cidade: string;
  pais: string;
  data_consulta: string;
  data_consulta_texto: string;
}

const route = useRoute();
const detalhes = ref<Historico>();

const buscarDetalhes = async () => {
  try {
    const id = parseInt(<string>route.params.id)
    detalhes.value = await WeatherService.buscarDetalhes(id)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  buscarDetalhes()
})
</script>

<template>

  <div class="bg-white p-2 border border-gray-200 rounded-md text-gray-900 mb-2">
    <RouterLink to="/historico" type="button" class="flex text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-0 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-3 w-30">
      <VoltarIcon/>
      Voltar
    </RouterLink>
  </div>

  <div v-if="detalhes" class="bg-white p-4 border border-gray-200 rounded-md text-gray-900">
    <h1 class="text-gray-800 text-lg font-bold">Detalhes da consulta</h1>
    <img :src="'http://openweathermap.org/img/wn/' + detalhes.icone + '@2x.png'" alt="Ícone do tempo" />
    <div class="grid grid-cols-3 gap-4 mb-6">
      <p><strong>Usuário:</strong> {{ detalhes.usuario }}</p>
      <p><strong>Cidade:</strong> {{ detalhes.cidade }} - {{detalhes.pais}}</p>
    </div>
    <div class="grid grid-cols-3 gap-4 mb-2">
      <p><strong>Descrição:</strong> {{ detalhes.descricao }}</p>
      <p><strong>Temperatura:</strong> {{ detalhes.temperatura }} ºC</p>
    </div>
    <div class="grid grid-cols-3 gap-4 mb-2">
      <p><strong>Sensação Térmica:</strong> {{ detalhes.sensacao_termica }} ºC</p>
      <p><strong>Temperatura mínima:</strong> {{ detalhes.temp_min }} ºC</p>
      <p><strong>Temperatura máxima:</strong> {{ detalhes.temp_max }} ºC</p>
    </div>
    <div class="grid grid-cols-3 gap-4 mb-2">
      <p><strong>Humidade relativa do ar:</strong> {{ detalhes.humidade }} %</p>
      <p><strong>Velocidade do vento:</strong> {{ detalhes.vento }} km/h</p>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <p><strong>Data da consulta:</strong> {{ detalhes.data_consulta }}</p>
      <p><strong>Data da consulta por horas:</strong> {{ detalhes.data_consulta_texto }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { WeatherService } from '@/services/weatherService.ts'
import Filtro from '@/components/Filtro.vue'

interface HistoricoLista {
  id: number;
  usuario: string;
  cidade: string;
  data_consulta_texto: string;
}

const historicoLista = ref<HistoricoLista[]>([]);
const isLoading = ref(false);

const buscaHistorico = async (filtros: object) => {
  isLoading.value = true
  try {
    historicoLista.value = await WeatherService.historico(filtros);
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
};

onMounted(() => {
  buscaHistorico({});
});

</script>

<template>
<Filtro @buscarHistorico="buscaHistorico"/>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white">
        Histórico de consultas dos usuários
      </caption>

      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3">
          Usuário
        </th>
        <th scope="col" class="px-6 py-3">
          Cidade
        </th>
        <th scope="col" class="px-6 py-3">
          Data da consulta
        </th>
        <th scope="col" class="px-6 py-3">
          <span>Ação</span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="historico in historicoLista" :key="historico.id" class="bg-white border-b border-gray-200">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {{historico.usuario}}
        </th>
        <td class="px-6 py-4">
          {{historico.cidade}}
        </td>
        <td class="px-6 py-4">
          {{historico.data_consulta_texto}}
        </td>
        <td class="px-6 py-4">
          <router-link
            :to="{ name: 'detalhes-historico', params: { id: historico.id } }"
            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Ver Detalhes
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

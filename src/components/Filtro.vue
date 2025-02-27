<script setup lang="ts">
import { ref } from 'vue';

interface Filtro {
  periodo?: boolean;
  usuario?: string;
  inicio?: string;
  fim?: string;
}

const periodo = ref(false);
const usuario = ref('');
const dataInicial = ref('');
const dataFinal = ref('');
const filtros = ref<Filtro>({
  periodo: false,
  usuario: '',
  inicio: '',
  fim: ''
});

const isLoading = ref(false);


const emit = defineEmits(['buscarHistorico']);

const buscaHistorico = () => {
  filtros.value = {};

  if (periodo.value) {
    filtros.value.periodo = periodo.value;
  }

  if (usuario.value) {
    filtros.value.usuario = usuario.value;
  }

  if (dataInicial.value && dataFinal.value === "") {
    alert('Você deve informar a data fim');
    return
  }

  if (dataFinal.value && dataInicial.value === "") {
    alert('Você deve informar a data inicial');
    return
  }

  if (dataInicial.value && dataFinal.value) {
    filtros.value.inicio = dataInicial.value;
    filtros.value.fim = dataFinal.value;
  }

  isLoading.value = true;
  emit('buscarHistorico', filtros.value);
  isLoading.value = false;
};
</script>

<template>
  <div class="bg-white rounded-md mb-2">
    <div
      class="bg-white p-4 border border-gray-200 rounded-md text-gray-900"
    >
      <div class="flex items-center space-x-4">

        <div>
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900"
          >Pesquisar Período:</label
          >
          <div class="flex items-center ps-3">
            <input
              type="checkbox"
              id="periodo"
              v-model="periodo"
              class="w-6 h-6 text-green-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-0">
            <label
              for="periodo"
              class="w-full py-3 ms-2 text-sm font-medium text-gray-900">
              Últimas 24 horas
            </label>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 sm:gap-2">
          <div class="w-full">
            <label for="data_inicial" class="block mb-2 text-sm font-medium text-gray-900">Data inicial:</label>
            <input type="date" id="data_inicial" v-model="dataInicial" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-atenas focus:border-atenas block w-full p-2.5" placeholder="dd/mm/aaaa">
          </div>
          <div class="w-full">
            <label for="data_final" class="block mb-2 text-sm font-medium text-gray-900">Data final:</label>
            <input type="date" id="data_final" v-model="dataFinal" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-atenas focus:border-atenas block w-full p-2.5" placeholder="dd/mm/aaaa">
          </div>
        </div>

        <div class="flex-1">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900"
          >Pesquisar usuário:</label
          >
          <input
            type="text"
            name="cidade"
            id="cidade"
            v-model="usuario"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-atenas focus:border-atenas block w-full p-2.5"
            placeholder="pesquise um usuário..."
            required
          />
        </div>

        <!-- Botão -->
        <button
          @click="buscaHistorico"
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
</template>

<style scoped>

</style>

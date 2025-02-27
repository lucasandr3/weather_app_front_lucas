<script setup lang="ts">
import UsuariosIcon from '@/components/icons/UsuariosIcon.vue'
import PesquisaIcon from '@/components/icons/PesquisaIcon.vue'
import LocationDashboardIcon from '@/components/icons/LocationDashboardIcon.vue'
import { onMounted, ref } from 'vue'
import { DashboardService } from '@/services/DashboardService.ts'

interface Dashboard {
  usuarios: number;
  consultas: number;
  cidades: number;
}

const dadosDashboard = ref<Dashboard>();

const dashboard = async () => {

  try {
    dadosDashboard.value = await DashboardService.dashboard();
    console.log(dadosDashboard)
  } catch (error) {
    console.error(error)
  }
};

onMounted(() => {
  dashboard();
});
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
    <div class="bg-white shadow-md rounded-lg flex items-center p-4 gap-4 h-32">
      <div class="bg-blue-100 rounded-full p-3">
        <UsuariosIcon/>
      </div>
      <div>
        <p class="text-lg font-bold text-gray-900">Usuários</p>
        <p class="text-gray-500 text-[15px]">{{dadosDashboard?.usuarios}}</p>
      </div>
    </div>

    <div class="bg-white shadow-md rounded-lg flex items-center p-4 gap-4 h-32">
      <div class="bg-blue-100 rounded-full p-3">
        <PesquisaIcon/>
      </div>
      <div>
        <p class="text-lg font-bold text-gray-900">Consultas realizadas</p>
        <p class="text-gray-500 text-[15px]">{{dadosDashboard?.consultas}}</p>
      </div>
    </div>

    <div class="bg-white shadow-md rounded-lg flex items-center p-4 gap-4 h-32">
      <div class="bg-blue-100 rounded-full p-3">
        <LocationDashboardIcon/>
      </div>
      <div>
        <p class="text-lg font-bold text-gray-900">Cidades pesquisadas</p>
        <p class="text-gray-500 text-[15px]">{{dadosDashboard?.cidades}}</p>
      </div>
    </div>
  </div>
</template>

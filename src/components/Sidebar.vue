<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"></div>

  <aside class="bg-white w-64 fixed inset-y-0 left-0 transform -translate-x-full md:translate-x-0 md:relative transition-transform duration-300 shadow-lg h-screen flex flex-col overflow-y-auto z-50">
    <div class="flex bg-slate-700  p-3 sticky top-0 z-10 top-sidebar h-16">
      <a href="javascript:void(0)" class="flex items-center mr-4">
        <img
          src="/logo.svg"
          class="mr-2 h-11"
          alt="Weather App"
        />
        <span class="text-gray-100 self-center text-xl font-semibold whitespace-nowrap">Weather App</span>
      </a>
    </div>
    <nav class="flex-grow overflow-y-auto py-5 px-3 h-screen">
        <ul class="pt-1 space-y-2">
            <li>
                <RouterLink to="/dashboard"
                class="flex items-center p-2 pl-4 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 group">
                    <DashboardIcon/>
                    <span class="ml-3">Dashboard</span>
                </RouterLink>
            </li>

            <li>
                <RouterLink to="/consultar"
                class="flex items-center p-2 pl-4 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 group">
                    <ConsultaIcon/>
                    <span class="ml-3">Consultar</span>
                </RouterLink>
            </li>

          <li>
            <RouterLink to="/historico"
               class="flex items-center p-2 pl-4 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 group">
              <HistoricoIcon/>
              <span class="ml-3">Histórico de Consultas</span>
            </RouterLink>
          </li>
        </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import DashboardIcon from '@/components/icons/DashboardIcon.vue'
import ConsultaIcon from '@/components/icons/ConsultaIcon.vue'
import HistoricoIcon from '@/components/icons/HistoricoIcon.vue'
</script>

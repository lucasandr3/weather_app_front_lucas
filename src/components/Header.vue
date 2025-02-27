<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.ts'
import { computed } from 'vue';
import { useRouter } from 'vue-router'

const authStore = useAuthStore();
const router = useRouter();

const nomeUsuario = computed(() => authStore.user?.nome || 'Usuário');
const emailUsuario = computed(() => authStore.user?.email || 'email@exemplo.com');

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <header
    class="bg-slate-700 shadow-md p-3 flex items-center justify-between sticky top-0 h-16 w-full z-50"
  >
    <div class="flex justify-start items-center">
      <button id="menuButton" class="md:hidden text-2xl text-white">
        <svg
          class="w-7 h-7"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="2"
            d="M5 7h14M5 12h14M5 17h14"
          />
        </svg>
      </button>
    </div>

    <div class="flex flex-wrap justify-between items-center">
      <div class="flex items-center lg:order-2">
        <button class="flex mx-3 text-sm rounded-full md:mr-0">
          <span class="flex flex-col items-start ml-1 p-1">
            <span class="mb-0 mr-3 font-bold text-white">{{nomeUsuario}}</span>
            <span class="mr-3 font-medium text-white text-[13px]">{{emailUsuario}}</span>
          </span>
        </button>
        <button
          @click="logout" class="flex items-center mx-3 text-sm text-white rounded-full md:mr-0 cursor-pointer">
          <span class="flex flex-col items-start ml-1 p-1">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path></svg>
          </span>
          Sair
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped></style>

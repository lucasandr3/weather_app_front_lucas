<script setup lang="ts">
import { ref } from 'vue';
import { AuthService } from '@/services/authService.ts'
import { useRouter } from 'vue-router'

const nome = ref('');
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const router = useRouter();

const registro = async () => {
  isLoading.value = true;
  try {
    const response = await AuthService.registro(nome.value, email.value, password.value);

    if (response?.status === 201) {
      await router.push('/login');
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <section class="bg-gray-50">
    <div class="relative flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-screen bg-cover bg-center">
      <div class="w-full bg-white rounded-lg shadow-lg border border-gray-200  md:mt-0 sm:max-w-md xl:p-0 relative z-10">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-700 md:text-2xl">
            <a href="javascript:void(0)" class="flex items-center text-2xl font-semibold text-gray-700 relative z-10">
              <!-- Logo para modo claro -->
              <img class="w-14 h-auto mr-2 block dark:hidden" src="/logo.svg" alt="logo">

              <!-- Logo para modo escuro -->
              <img class="w-14 h-auto mr-2 hidden dark:block" src="/logo.svg" alt="logo-dark">

              Bem vindo
            </a>
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="registro">
            <p class="text-sm mb-4">informe seus dados para criar sua conta.</p>
            <div>
              <label for="nome" class="block mb-2 text-sm font-medium text-gray-900">Seu nome:</label>
              <input v-model="nome" type="text" id="nome" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5" placeholder="Informe seu nome" required>
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Seu e-mail</label>
              <input v-model="email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5" placeholder="Informe seu e-mail de acesso" required>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Senha de acesso</label>
              <input v-model="password" type="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5" required>
            </div>
            <div class="flex items-center justify-between">
              <RouterLink to="/login" class="text-sm font-medium text-atenas hover:underline dark:text-white">Já tem conta? Faça login</RouterLink>
            </div>
            <button type="submit" class="w-full text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-3.5 text-center dark:bg-green-600 dark:hover:bg-green-800 dark:focus:ring-green-800">
              <template v-if="!isLoading">
                Criar Conta
              </template>
              <template v-else>
                <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-1 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
                processando...
              </template>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

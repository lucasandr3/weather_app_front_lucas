<script setup lang="ts">
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
</script>

<template>
  <div class="antialiased flex h-screen bg-gray-50">
    <Sidebar />
    <div class="bg-slate-100 flex-1 h-screen overflow-y-auto">
      <Header />
      <main class="p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

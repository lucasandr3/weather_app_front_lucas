import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '@/stores/auth';
import HeaderComponent from '@/components/HeaderComponent.vue';
import { createRouter, createWebHistory } from 'vue-router';

describe('HeaderComponent.vue', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: '/login', name: 'Login' }]
  });

  it('deve renderizar corretamente o nome e e-mail do usuário', () => {
    const wrapper = mount(HeaderComponent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          }),
          router
        ]
      }
    });

    const authStore = useAuthStore();
    authStore.user = { nome: 'Teste User', email: 'teste@example.com' };

    expect(wrapper.text()).toContain('Teste User');
    expect(wrapper.text()).toContain('teste@example.com');
  });

  it('deve chamar logout e redirecionar ao clicar no botão "Sair"', async () => {
    const wrapper = mount(HeaderComponent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          }),
          router
        ]
      }
    });

    const authStore = useAuthStore();
    authStore.logout = vi.fn();

    await wrapper.find('button:has-text("Sair")').trigger('click');

    expect(authStore.logout).toHaveBeenCalled();
  });
});

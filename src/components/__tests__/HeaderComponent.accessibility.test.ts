import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import HeaderComponent from '@/components/HeaderComponent.vue';
import { toHaveNoViolations } from '@testing-library/jest-dom/matchers';
import { axe } from 'jest-axe';

// Extensão de matchers para acessibilidade
expect.extend(toHaveNoViolations);

describe('Acessibilidade do HeaderComponent', () => {
  it('não deve conter violações de acessibilidade', async () => {
    const wrapper = mount(HeaderComponent, {
      global: {
        plugins: [createTestingPinia()]
      }
    });

    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
});

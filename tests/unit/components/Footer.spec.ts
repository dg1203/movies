import Footer from '@/components/Footer.vue';
import { shallowMount } from '@vue/test-utils';

describe('Footer', () => {
  const wrapper = shallowMount(Footer);
  it('Should has div class footer', () => {
    expect(wrapper.find('.footer').exists()).toBe(true);
  });
});

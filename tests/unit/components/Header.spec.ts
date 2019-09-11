import Header from '@/components/Header.vue';
import Search from '@/components/Search.vue';
import { shallowMount } from '@vue/test-utils';

describe('Header', () => {
  const wrapper = shallowMount(Header);
  it('Should has div class nav', () => {
    expect(wrapper.find('.nav').exists()).toBe(true);
  });
  it('Should has Search component', () => {
    expect(wrapper.find(Search).exists()).toBe(true);
  });
});
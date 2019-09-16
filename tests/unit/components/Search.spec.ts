import Search from '@/components/Search.vue';
import { shallowMount } from '@vue/test-utils';

describe('Search', () => {
  const wrapper = shallowMount(Search);
  it('Should has div class search', () => {
    expect(wrapper.find('.search').exists()).toBe(true);
  });
});

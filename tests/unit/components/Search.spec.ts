import Search from '@/components/Search.vue';
import { shallowMount } from '@vue/test-utils';

describe('Search', () => {
  const wrapper = shallowMount(Search, {
    stubs: ['font-awesome-icon'],
  });
  it('Should has div class search', () => {
    expect(wrapper.find('.search').exists()).toBe(true);
  });
  it('Should has search icon', () => {
    expect(wrapper.find('.search__icon').exists()).toBe(true);
  });
  it('Should has form with input when show === true', () => {
    expect(wrapper.find('form').exists()).toBe(false);
    wrapper.find('.search__icon').trigger('click');
    setTimeout(() => {
      expect(wrapper.find('form').exists()).toBe(true);
      expect(wrapper.find('form .search__input').exists()).toBe(true);
      expect(wrapper.find('form button').exists()).toBe(true);
    }, 1000);
    wrapper.find('.search__icon').trigger('click');
    setTimeout(() => {
      expect(wrapper.find('form').exists()).toBe(false);
    }, 1000);
  });
});

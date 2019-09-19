import Search from '@/components/Search.vue';
import { shallowMount } from '@vue/test-utils';

describe('Search', () => {
  const wrapper = shallowMount(Search, {
    stubs: ['font-awesome-icon'],
  });
  wrapper.setData({
    show: false,
    results: [],
    searchKey: '',
    loading: false,
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
  it('Change search key', () => {
    wrapper.setData({
      show: true,
    });
    setTimeout(() => {
      expect(wrapper.vm.$data.searchKey).toBe('');
      wrapper.find('form .search__input').setValue('Search key');
      expect(wrapper.vm.$data.searchKey).toBe('Search key');
      }, 1000);
    });
  it('Result list', async () => {
    expect(wrapper.find('.results').exists()).toBe(false);
    wrapper.find('form').trigger('submit.prevent');
    setTimeout(() => expect(wrapper.find('.results').exists()).toBe(true), 1000);
  });
});

import MovieThumbnail from '@/components/MovieThumbnail.vue';
import { shallowMount } from '@vue/test-utils';

describe('MovieThumbnail', () => {
  const wrapper = shallowMount(MovieThumbnail, {
    propsData: {
      movie: {
        id: 0,
        backdrop_path: '#',
        poster_path: '#',
        title: 'MovieTitle',
        overview: 'MovieDescription',
      },
    },
    stubs: ['router-link'],
  });
  it('Should has div class movie and style background should be prop movie.poster_path', () => {
    expect(wrapper.find('.movie').exists()).toBe(true);
    expect(wrapper.find('.movie').attributes().style).toBe(`background-image: url(https://image.tmdb.org/t/p/w500/${wrapper.props().movie.poster_path});`);
  });
  it('Should have div class bg and style background should be prop movie.backdrop_path', () => {
    expect(wrapper.find('.movie > .bg').exists()).toBe(true);
    expect(wrapper.find('.movie > .bg').attributes().style).toBe(`background-image: url(https://image.tmdb.org/t/p/w500/${wrapper.props().movie.backdrop_path});`);
  });
  it('Should have div class bg and text should be prop movie.title', () => {
    expect(wrapper.find('.movie > .movie__title').exists()).toBe(true);
    expect(wrapper.find('.movie > .movie__title').text()).toBe(wrapper.props().movie.title);
  });
});

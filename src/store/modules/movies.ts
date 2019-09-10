import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import axios from 'axios';
import store from '../index';
import { Movie } from '../models';

@Module({
  dynamic: true,
  store,
  name: 'movies',
  namespaced: true
})
class MoviesModule extends VuexModule {
  private movies: Movie[] = [];
  private loading: boolean = false;
  private page: number = 1;

  @Mutation
  private addMovies(movies: Movie) {
    this.movies.push(...movies);
  }

  @Mutation
  private changeLoading(loading: boolean) {
    this.loading = loading;
  }

  @Action({commit: 'changeLoading'})
  public setLoading(loading: boolean) {
    return loading;
  }

  @Action({commit: 'addMovies'})
  public async fetchMovies(page: number) {
    this.setLoading(true);
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=95f0473db1c299ac66b0270406bf56d7&page=${this.page}`);
    const { results } = response.data;
    const movies = results.map((movie: any) => {
      return {
        id: movie.id,
        backdrop_path: movie.backdrop_path,
        poster_path: movie.poster_path,
        title: movie.title,
        overview: movie.overview
      }
    });
    this.setLoading(false);
    return movies;
  }

  get moviesList(): Movie[] {
    return this.movies;
  }

  get getLoading(): boolean {
    return this.loading;
  }
}

export default getModule(MoviesModule);
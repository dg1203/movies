import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import axios from 'axios';
import store from '../index';
import { getMovies } from '../../services/movie';
import { Movie } from '../models';

@Module({
  dynamic: true,
  store,
  name: 'movies',
  namespaced: true,
})
class MoviesModule extends VuexModule {
  private movies: Movie[] = [];
  private page: number = 1;

  @Action({commit: 'changeLoading'})
  public setLoading(loading: boolean) {
    return loading;
  }

  @Action({commit: 'changePage'})
  public incrementPage(): number {
    return this.page + 1;
  }

  @Action({commit: 'addMovies'})
  public async  fetchMovies() {
    const response: any = await getMovies(this.page);
    const { results } = response.data;
    const movies = results.map((movie: any) => {
      return {
        id: movie.id,
        backdrop_path: movie.backdrop_path,
        poster_path: movie.poster_path,
        title: movie.title,
        overview: movie.overview,
      };
    });
    return movies;
  }

  @Mutation
  private addMovies(movies: Movie[]) {
    this.movies.push(...movies);
  }

  @Mutation
  private changePage(page: number) {
    this.page = page;
  }

  get moviesList(): Movie[] {
    return this.movies;
  }
}

export default getModule(MoviesModule);

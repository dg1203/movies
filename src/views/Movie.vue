<template>
  <div class="movie_container">
    <h1>{{movie.original_title}}</h1>
    <div class="card">
      <div class="card__poster" :style="{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`}"></div>
      <div class="card__container">
        <p>{{movie.overview}}</p>  
      </div> 
    </div>
    <div class="card">
      <div class="card__poster" :style="{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`}"></div>
      <div class="card__container">
        <p>Homepage: <a :href="`${movie.homepage}`" target="_blank">{{movie.homepage}}</a></p>
        <p>Genres:
          <span v-for="(item, index) in movie.genres" :key="index">{{item.name}}, </span>
        </p>
        <p>Release date: {{movie.release_date}}</p>
        <p>Production companies: 
          <span class="production_name" v-for="(item, index) in movie.production_companies" :key="index">
            <img class="production_logo" v-if="item.logo_path" :src="`https://image.tmdb.org/t/p/w500/${item.logo_path}`"/>
            {{item.name}}, 
          </span>
        </p>
      </div> 
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getMovie } from '../services/movie';

@Component
export default class Movie extends Vue {
  private movie: any = null;
  private created(): void {
    this.getMovieById();
  }
  private async getMovieById() {
    try {
      const movie: any = await getMovie(parseInt(this.$route.params.id));
      this.movie = movie.data;
    } catch(error) {
      this.movie = null;
    }
  }
}
</script>

<style lang="scss" scoped>
  .movie_container {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    .card {
      width: 100%;
      display: flex;
      &__poster {
        width: 50%;
        background-size: cover;
        background-position: center;
      }
      &__container {
        width: 50%;
        padding: 25px;
        box-sizing: border-box;
        .production_name {
          cursor: pointer;
          position: relative;
          .production_logo {
            max-height: 200px;
            width: auto;
            display: none;
            position: absolute;
            z-index: 100;
            left: 0;
            background: white;
          }
          &:hover {
            .production_logo {
              display: block;
            }
          }
        }
      }
      &:last-child {
        flex-direction: row-reverse;
        margin-bottom: 25px;
      }
    }
  }
</style>
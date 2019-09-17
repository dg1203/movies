<template>
  <div v-if="movie" class="movie_container">
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
    <div v-if="credits" class="credits">
      <div class="credits__list">
        <div v-for="(person, index) in credits.cast" :key="index" class="person">
          <div class="person__image" :style="{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${person.profile_path})`}"></div>
          <div class="person__name">{{person.name}}</div>
          <div class="person__role">as {{person.character}}</div>
        </div>
      </div>
      <div class="credits__list">
        <div v-for="(person, index) in credits.crew" :key="index" class="person">
          <div class="person__image" :style="{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${person.profile_path})`}"></div>
          <div class="person__name">{{person.name}}</div>
          <div class="person__role">({{person.job}})</div>
        </div>
      </div>
    </div>
    <button v-if="!credits && !loading" @click="getCrewById">Pokaż obsadę/załogę</button>
    <font-awesome-icon v-if="loading" class="fa-spin" icon="spinner" rotate />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getMovie, getCredits } from '../services/movie';

@Component
export default class Movie extends Vue {
  private movie: any = null;
  private credits: any = null;
  private loading: boolean = false;
  private created(): void {
    this.getMovieById();
  }
  private async getMovieById() {
    try {
      const movie: any = await getMovie(parseInt(this.$route.params.id, 10));
      this.movie = movie.data;
    } catch (error) {
      this.movie = null;
    }
  }
  private async getCrewById() {
    this.loading = true;
    try {
      const credits: any = await getCredits(parseInt(this.$route.params.id, 10));
      this.credits = credits.data;
      this.loading = false;
    } catch (error) {
      this.movie = null;
      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
  .credits {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    margin-top: 35px;
    margin-bottom: 30px;
    &__list {
      width: 50%;
      .person {
        width: 100%;
        display: flex;
        border-bottom: 1px solid #e1b12c;
        &__image {
          background-size: cover;
          background-position: center;
          width: 75px;
          height: 75px;
          margin-right: 25px;
        }
        &__name, &__role {
          padding: 10px;
          box-sizing: border-box;
          box-sizing: border-box;
          display: flex;
          align-items: center;
        }
        &:nth-child(odd) {
          background-color: rgba(0,0,0,.1);
        }
      }
    }
  }
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
    button  {
      height: 40px;
      width: 300px;
      color: black;
      text-transform: uppercase;
      font-weight: bold;
      background: #e1b12c;
      border: none;
      outline: none;
      margin-top: 35px;
      cursor: pointer;
      margin-bottom: 30px;
      margin-left: auto;
      margin-right: auto;
      display: block;
      transition: .1s;
      font-size: 1rem;
      &:hover {
        background: black;
        color: #e1b12c;
      }
    }
  }
  .fa-spin {
    color: #e1b12c;
    font-size: 3rem;
    margin-left: auto;
    margin-right: auto;
    display: block;
    margin-top: 35px;
    margin-bottom: 30px;
  }
</style>
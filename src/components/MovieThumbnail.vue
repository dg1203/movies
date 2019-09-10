<template>
  <div class="movie" :style="{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`}">
    <div class="bg" :style="{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`}"></div>
    <div class="movie__title">
      {{movie.title}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Movie } from '../store/models';

@Component
export default class MovieThumbnail extends Vue {
  @Prop() private movie!: Movie;
}
</script>

<style lang="scss" scoped>
  .movie {
    min-width: 23%;
    height: 300px;
    margin-bottom: 10px;
    margin-top: 10px;
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0px 0px 2px 0px;
    transition: 1s;
    &__title {
      position: absolute;
      width: 100%;
      height: 40px;
      background: black;
      bottom: 0;
      color: #e1b12c;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      text-transform: uppercase;
      z-index: 1;
    }
    .bg {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      transition: 1s;
    }
    &:hover {
      box-shadow: 0px 0px 10px 0px;
      .bg {
        opacity: 1;
      }
    }
  }
</style>
<template>
  <div class="home">
    <Slider />
    <div class="container">
      <MovieThumbnail v-for="(item, index) in data" :key="index" :movie="item" />
    </div>
    <button @click="readMore">
      Więcej
      <font-awesome-icon title="Więcej" icon="plus"/>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import movies from '../store/modules/movies';
import { Movie } from '../store/models';
import Slider from '../components/Slider.vue';
import MovieThumbnail from '../components/MovieThumbnail.vue';

@Component({
  components: {
    Slider,
    MovieThumbnail,
  },
})
export default class Home extends Vue {
  private data: Movie[] = movies.moviesList;
  private created(): void {
    movies.fetchMovies();
  }
  private readMore() {
    movies.incrementPage();
    setTimeout(() => movies.fetchMovies(), 500);
  }
}
</script>

<style lang="scss">
  .container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 25px 0px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
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
</style>
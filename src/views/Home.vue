<template>
  <div class="home">
    <Slider />
    <div class="container">
      <MovieThumbnail v-for="(item, index) in data" :key="index" :movie="item" />
    </div>
    <div v-if="loading">Loading...</div>
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
    MovieThumbnail
  },
})
export default class Home extends Vue {
  private loading: boolean =  movies.getLoading;
  private data: Movie[] = movies.moviesList;
  private created(): void {
    movies.fetchMovies(1);
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
</style>
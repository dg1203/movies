<template>
  <div class="home">
    <Slider title="Ludzie kina" />
    <h1>People</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import people from '../store/modules/people';
import { People } from '../store/models';
import Slider from '../components/Slider.vue';
import MovieThumbnail from '../components/MovieThumbnail.vue';

@Component({
  components: {
    Slider,
    MovieThumbnail,
  },
})
export default class PeoplePage extends Vue {
  private data: People[] = people.peopleList;
  private created(): void {
    if (people.peopleList.length === 0) {
      people.fetchPeople();
    }
  }
  /* private readMore() {
    people.incrementPage();
    setTimeout(() => people.fetchMovies(), 500);
  } */
}
</script>

<style lang="scss" scoped>
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
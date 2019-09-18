<template>
  <div class="home">
    <Slider title="Ludzie kina" />
    <div v-if="data.length > 0" class="people_container">
      <router-link v-for="(item, index) in data" :to="{ name: 'person', params: {id: item.id } }" :key="index" class="person">
        <div class="person__image" :style="{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${item.profile_path})`}"></div>
        {{item.name}} ({{item.known_for_department}})
      </router-link>
    </div>
    <button @click="readMore">
      Więcej
      <font-awesome-icon title="Więcej" icon="plus"/>
    </button>
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
  private readMore() {
    people.incrementPage();
    setTimeout(() => people.fetchPeople(), 500);
  }
}
</script>

<style lang="scss" scoped>
  .people_container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 25px 0px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
    .person {
      width: 49%;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      box-shadow: 0px 0px 2px 0px;
      transition: 1s;
      cursor: pointer;
      text-decoration: none;
      color: black;
      &__image {
        width: 100px;
        height: 100px;
        background-size: cover;
        background-position: center;
        margin-right: 15px;
        transition: 1s;
      }
      &:hover {
        box-shadow: 0px 0px 10px 0px black;
      }
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
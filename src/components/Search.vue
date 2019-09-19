<template>
  <div class="search">
    <font-awesome-icon v-if="!show" title="Szukaj" class="search__icon" icon="search-plus" @click="showField"/>
    <font-awesome-icon v-if="show" title="Szukaj" class="search__icon" icon="search-minus" @click="showField"/>
    <transition name="fade">
      <form v-if="show" @submit.prevent="searchMovie">
        <input class="search__field" v-model="searchKey" type="text" placeholder="Szukaj..." />
        <button>
          <font-awesome-icon v-if="!loading" class="search_button" title="Szukaj" icon="play"/>
          <font-awesome-icon v-if="loading" class="search_button fa-spin" title="Szukaj" icon="spinner"/>
        </button>
        <ul v-if="results.length > 0" class="results">
          <li v-for="(result, index) in results" :key="index" @click="clear">
            <router-link :to="{ name: 'movie', params: {id: result.id } }">
              <div v-if="result.poster_path" class="image" :style="{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${result.poster_path})`}"></div>
              {{result.title}}
            </router-link>
          </li>
        </ul>
      </form>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { findMovie } from '../services/movie';

@Component
export default class Search extends Vue {
  private show: boolean = false;
  private searchKey: string = '';
  private results: any = [];
  private loading: boolean = false;
  private showField(): void {
    this.show = !this.show;
  }
  private async searchMovie() {
    this.loading = true;
    const movies = await findMovie(this.searchKey);
    this.results = movies.data.results;
    this.loading = false;
  }
  private clear() {
    this.results = [];
    this.searchKey = '';
  }
}
</script>

<style lang="scss" scoped>
  .search {
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    right: 15px;
    height: 50px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    flex-direction: row-reverse;
    &__icon {
      color: #e1b12c;
      font-size: 2rem;
      opacity: .5;
      transition: .3s;
      margin-left: 15px;
      &:hover {
        opacity: 1;
      }
    }
    &__field {
      width: 400px;
      height: 40px;
      background: transparent;
      color: #e1b12c;
      font-size: 1rem;
      padding: 10px;
      box-sizing: border-box;
      border: none;
      outline: none;
      border-bottom: 2px solid #e1b12c;
      border-left: 2px solid #e1b12c;
    }
    form {
      width: 400px;
      overflow: hidden;
      button {
        background: transparent;
        border: none;
        outline: none;
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        right: 55px;
        cursor: pointer;
      }
      ul {
        width: 89.5%;
        position: absolute;
        max-height: 500px;
        padding: 0px;
        margin: 0px;
        list-style: none;
        background-color: rgba(0,0,0,.8);
        overflow-y: scroll;
        li {
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          color: #e1b12c;
          font-size: 1rem;
          box-sizing: border-box;
          border-bottom: 1px solid #e1b12c;
          a {
            display: flex;
            align-items: center;
            width: 100%;
            text-decoration: none;
            color: #e1b12c;
          }
          .image {
            width: 50px;
            height: 50px;
            background-size: cover;
            background-position: center;
            margin-right: 15px;
          }
          &:hover {
            background: black;
          }
        }
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition-timing-function: ease-in-out;
      width: 400px;
      transition: .3s;
    }
    .fade-enter, .fade-leave-to {
      width: 0px;
    }
    .search_button {
      color: #e1b12c;
      font-size: 1.2rem;
    }
  }
</style>
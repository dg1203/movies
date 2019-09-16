<template>
  <div class="sort_container">
    <button @click="openList">
      {{active}}
      <font-awesome-icon v-if="!open" icon="caret-down" />
      <font-awesome-icon v-if="open" icon="caret-up" />
    </button>
    <div v-if="open" class="list">
      <div v-for="(item, index) in list" :key="index" @click="changeSort(item)" class="list__item">{{item.name}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import movies from '../store/modules/movies';

interface List {
  name: string;
  value: string;
}

@Component
export default class Sort extends Vue {
  private list: List[] = [
    {name: 'Popularne', value: 'popular'},
    {name: 'Aktualnie w kinach', value: 'now_playing'},
    {name: 'Najlepiej oceniane', value: 'top_rated'},
    {name: 'Nadchodzące premiery', value: 'upcoming'},
  ];
  private active: string = '';
  private open: boolean = false;
  private created(): void {
    const active: any = this.list.filter((item: List) => item.value === movies.getSortBy);
    this.active = active[0].name;
  }
  private openList(): void {
    this.open = !this.open;
  }
  private changeSort(item: List): void {
    this.active = item.name;
    this.open = false;
    movies.sortByChange(item.value);
    movies.resetPage();
    setTimeout(() => movies.changeSortMovies(), 500);
  }
}
</script>

<style lang="scss" scoped>
  .sort_container {
    position: absolute;
    z-index: 1;
    width: 300px;
    height: 40px;
    right: 15px;
    bottom: 15px;
    button {
      width: 100%;
      height: 100%;
      cursor: pointer;
      color: #e1b12c;
      font-weight: bold;
      outline: none;
      font-size: 1rem;
      background-color: rgba(0, 0, 0, .8);
      border: 1px solid #e1b12c;
      transition: .3s;
      &:hover {
        background: #e1b12c;
        color: black;
      }
    }
    .list {
      width: 100%;
      background-color: rgba(0, 0, 0, .8);
      color: #e1b12c;
      text-align: center;
      &__item {
        cursor: pointer;
        box-sizing: border-box;
        padding: 10px 5px;
        border-bottom: 1px solid #e1b12c;
        &:hover {
          background: black;
        }
      }
    }
  }
</style>
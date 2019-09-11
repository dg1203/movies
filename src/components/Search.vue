<template>
  <div class="search">
    <font-awesome-icon v-if="!show" title="Szukaj" class="search__icon" icon="search-plus" @click="showField"/>
    <font-awesome-icon v-if="show" title="Szukaj" class="search__icon" icon="search-minus" @click="showField"/>
    <transition name="fade">
      <form v-if="show">
        <input class="search__field" type="text" placeholder="Szukaj..." />
        <button>
          <font-awesome-icon class="search_button" title="Szukaj" icon="play"/>
        </button>
      </form>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Search extends Vue {
  private show: boolean = false;
  private showField() {
    this.show = !this.show;
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
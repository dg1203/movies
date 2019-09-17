<template>
  <div class="nav">
    <ul>
      <li>
        <router-link to="/"><font-awesome-icon icon="home"/></router-link>
        <router-link to="/people">Ludzie kina</router-link>
      </li>
    </ul>
    <Search />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Search from './Search.vue';

@Component({
  components: {
    Search,
  },
})
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
  .nav {
    display: flex;
    width: 100%;
    background: black;
    height: 100px;
    box-shadow: 0px 2px 10px 0px #e1b12c;
    z-index: 1;
    position: relative;
    box-sizing: border-box;
    padding: 15px;
    ul {
      padding: 0px;
      margin: 0px;
      display: flex;
      width: 100%;
      li {
        font-size: 2rem;
        color: #e1b12c;
        font-weight: bold;
        text-decoration: none;
        display: flex;
        a {
          color: #e1b12c;
          padding: 25px;
          display: block;
          box-sizing: border-box;
          text-decoration: none;
        }
      }
    }
  }
</style>
<template>
  <div class="footer"></div>
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

<style scoped>
  .footer {
    display: flex;
    width: 100%;
    background: black;
    height: 60px;
    box-shadow: 0px -2px 10px 0px #e1b12c;
    z-index: 1;
    position: relative;
    box-sizing: border-box;
    padding: 15px;
  }
</style>
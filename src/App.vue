<template>
  <div>
    <Header />
    <router-view/>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

@Component({
  components: {
    Header,
    Footer,
  },
})
export default class App extends Vue {}
</script>

<style lamg="scss">
  body {
    font-family: 'Manjari', sans-serif;
    margin: 0px;
  }
</style>
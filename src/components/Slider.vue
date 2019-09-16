<template>
  <div class="slides">
    <h1>Popularne filmy</h1>
    <Sort />
    <transition name="fade">
      <div v-if="incrementer === 1" :style="{backgroundImage: `url(${slide1})`}" class="slide"></div>
    </transition>
    <transition name="fade">
      <div v-if="incrementer === 2" :style="{backgroundImage: `url(${slide2})`}" class="slide"></div>
    </transition>
    <transition name="fade">
      <div v-if="incrementer === 3" :style="{backgroundImage: `url(${slide3})`}" class="slide"></div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Sort from './Sort.vue';
import slide1 from '../assets/images/slide1.jpg';
import slide2 from '../assets/images/slide2.jpg';
import slide3 from '../assets/images/slide3.jpg';

@Component({
  components: {
    Sort,
  },
})
export default class Slider extends Vue {
  private slide1: any;
  private slide2: any;
  private slide3: any;
  private incrementer: number = 1;
  private created() {
    this.slide1 = slide1;
    this.slide2 = slide2;
    this.slide3 = slide3;
    this.increment();
  }
  private increment(): void {
    setInterval(() => {
      if (this.incrementer === 3) {
        this.incrementer = 1;
      } else {
        this.incrementer++;
      }
    }, 10000);
  }
}
</script>

<style scoped>
  .slides {
    width: 100%;
    height: 600px;
    position: relative;
  }
  .slide {
    width: 100%;
    height: 100%;
    position: absolute;
    background-size: cover;
    background-position: center;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  h1 {
    position: absolute;
    z-index: 1;
    bottom: 50px;
    left: 10%;
    color: #e1b12c;
    font-size: 3rem;
    background-color: rgba(0, 0, 0, .8);
    padding: 15px;
  }
</style>
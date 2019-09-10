<template>
  <div class="slides">
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
import slide_1 from '../assets/images/slide1.jpg';
import slide_2 from '../assets/images/slide2.jpg';
import slide_3 from '../assets/images/slide3.jpg';

@Component
export default class Slider extends Vue {
  private slide1: any;
  private slide2: any;
  private slide3: any;
  private incrementer: number = 1;
  private created() {
    this.slide1 = slide_1;
    this.slide2 = slide_2;
    this.slide3 = slide_3;
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
</style>
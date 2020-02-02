<template>
  <!-- TODO: use vue-carousel -->
  <b-container>
    <Carousel
      autoplay
      perPage="4"
      class="home-recommend images"
    >
      <Slide
        v-for="image in initCarousels"
        :key="image.id"
        v-viewer="{inline: false,movable: false,navbar: true,rotatable: false,scalable: false, fullscreen: false, keyboard: false, title:false }"
      >
        <b-img
          :src="image.Image"
          class="home-recommend-item"
          v-b-popover.hover.top="image.name"
          height="100"
        ></b-img>
      </Slide>
    </Carousel>
  </b-container>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  components: {
    Carousel,
    Slide
  },
  props: {
    initCarousels: {
      required: true
    }
  },
  data() {
    return {
      sliding: null
    }
  },
  methods: {
    onSlideStart() {
      this.sliding = true
    },
    onSlideEnd() {
      this.sliding = false
    }
  }
}
</script>

<style scoped>
.w-100 {
  max-height: 450px;
}
.image-overlay {
  width: 1024px;
  height: 480px;
  position: absolute;
  background-color: #cccccc;
  opacity: 0.5;
}
/* .home-recommend {
  display: flex;
  flex-flow: row nowrap;
  overflow-x: scroll;
} */

/* .home-recommend-item {
  width: 50%;
  height: auto;
  margin-left: 0.25rem;
  border: 1px solid #000;
  max-height: 160px;
} */
</style>
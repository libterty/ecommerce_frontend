<template>
  <b-container>
    <div>
      <b-card
        overlay
        img-src="https://i.imgur.com/JUpkmDj.jpg?1"
        img-alt="EVERYTHING YOU NEED IN TIME FOR CHRISTMAS"
        text-variant="white"
        title="EVERYTHING YOU NEED IN TIME FOR CHRISTMAS"
        class="Home-Advertisement"
      >
        <b-card-text>Christmas Sale is coming ~</b-card-text>
        <br />
        <b-button
          pill
          size="lg"
          variant="primary"
        >Explore More</b-button>
      </b-card>
    </div>
    <br />
    <HomeCarousel :initCarousels="initCarousels" />
    <br />
    <ShoppingCart />
    <HomeGrid :initProducts="initProducts" />
  </b-container>
</template>

<script>
import HomeCarousel from '../components/HomeCarousel.vue'
import HomeGrid from '../components/HomeGrid'
import Request from '../api/index'
import ShoppingCart from '../components/ShoppingCart'
const request = new Request()

export default {
  components: {
    HomeCarousel,
    HomeGrid,
    ShoppingCart
  },
  data() {
    return {
      initProducts: [],
      initCarousels: []
    }
  },
  async created() {
    const res = await request.getHomePageProduts()
    if (res.status === 'success') {
      this.initProducts = res.products
      for (let i = 0; i < 3; i++) {
        this.initCarousels.push(this.initProducts[i])
      }
    }
  }
}
</script>

<style scoped>
.Home-Advertisement {
  border: none;
}
</style>

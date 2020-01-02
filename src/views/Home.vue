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
    <ShoppingCart
      :init-cart="initCart"
      :init-total-price="initTotalPrice"
      @click-to-get-cart="clickToGetCart"
    />
    <br />
    <HomeCarousel :initCarousels="initCarousels" />
    <br />
    <HomeGrid :initProducts="initProducts" />
  </b-container>
</template>

<script>
import HomeCarousel from '../components/HomeCarousel.vue'
import HomeGrid from '../components/HomeGrid'
import ShoppingCart from '../components/ShoppingCart'
import Request from '../api/index'
import { Toast } from '../utils/helpers.js'
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
      initCarousels: [],
      initCart: [],
      initTotalPrice: 0
    }
  },
  async created() {
    try {
      const resCart = await request.getCart()
      if (resCart.status === 'success') {
        this.initCart = resCart.cart
        this.initTotalPrice = resCart.totalPrice
      }
      const res = await request.getHomePageProduts()
      if (res.status === 'success') {
        this.initProducts = res.products
        for (let i = 0; i < 5; i++) {
          this.initCarousels.push(this.initProducts[i])
        }
      }
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: 'Fetch cart failed'
      })
    }
  },
  methods: {
    async clickToGetCart() {
      try {
        const res = await request.getCart()
        if (res.status === 'success') {
          console.log(res)
          this.initCart = res.cart
          this.initTotalPrice = res.totalPrice
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Fetch cart failed'
        })
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

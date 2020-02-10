<template>
  <b-container
    class="no-padding"
    fluid
  >
    <div col="12">
      <b-card
        overlay
        img-height="300"
        img-src="https://i.imgur.com/YZH6y6o.jpg"
        img-alt="MAYNOOTH has everything You Need In Time For Christmas"
        text-variant="white"
        class="Home-Advertisement mt-5 text-left"
      >
        <div class="p-3">
          <b-card-title>
            <span class="teal--text text--lighten-3">MAYNOOTH</span> has everything You Need In Time For Christmas
          </b-card-title>
          <b-card-text>Christmas Sale is coming with discount 🎄🎄🎄</b-card-text>
          <b-card-text>Get your decorations in time</b-card-text>
          <br />
          <v-btn
            raised
            :to="{name:'furniturePagination'}"
            color="error"
            large
            class="mt-3 red lighten-3 dialog-btn"
            style="padding: 0 1em ; margin-right: 3em;"
          >Let Your Life Bright</v-btn>
        </div>
      </b-card>
    </div>

    <!-- <ShoppingCart
      v-if="showCart"
      :init-cart="initCart"
      :init-total-price="initTotalPrice"
      @click-to-get-cart="clickToGetCart"
    />-->
    <br />
    <b-row class="mt-3">
      <b-col
        md="8"
        class="mx-auto"
      >
        <HomeCarousel
          v-if="showProduct"
          :initCarousels="initCarousels"
        />
        <br />
        <HomeGrid
          v-if="showProduct"
          :initProducts="initProducts"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import HomeCarousel from '../components/HomeCarousel.vue'
import HomeGrid from '../components/HomeGrid'
// import ShoppingCart from '../components/ShoppingCart'
import Request from '../api/index'
import { Toast } from '../utils/helpers.js'
const request = new Request()

export default {
  components: {
    HomeCarousel,
    HomeGrid
    // ShoppingCart
  },
  data() {
    return {
      showProduct: false,
      // showCart: true,
      initProducts: [],
      initCarousels: []
      // initCart: [],
      // initTotalPrice: 0
    }
  },
  async created() {
    try {
      const res = await request.getHomePageProduts()
      if (res.status === 'success') {
        this.initProducts = res.products
        for (let i = 0; i < 5; i++) {
          this.initCarousels.push(this.initProducts[i])
        }
        this.showProduct = true
      }
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: 'Fetch products failed'
      })
    }
  },
  methods: {
    // async clickToGetCart() {
    //   try {
    //     const res = await request.getCart()
    //     if (res.status === 'success') {
    //       this.initCart = res.cart
    //       this.initTotalPrice = res.totalPrice
    //     }
    //   } catch (error) {
    //     Toast.fire({
    //       icon: 'warning',
    //       title: 'Nothing in the cart'
    //     })
    //   }
    // }
  }
}
</script>

<style scoped>
.Home-Advertisement {
  border: none;
  width: 100%;
}
.no-padding {
  padding-left: 0;
  padding-right: 0;
}
</style>

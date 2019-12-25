<template>
  <div id="app">
    <Navbar />
    <router-view />

    <!-- <ShoppingCart
      :init-cart="cart"
      :init-total-price="totalPrice"
      @click-to-get-cart="clickToGetCart"
    /> -->

    <!-- <Footer /> -->
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
// import Footer from './components/Footer.vue';
// import ShoppingCart from './components/ShoppingCart'
// import Request from './api/index'
// import { Toast } from './utils/helpers.js'
// const request = new Request()

export default {
  name: 'App',
  data() {
    return {
      cart: [],
      totalPrice: 0
    }
  },
  components: {
    Navbar,
    // ShoppingCart
    // Footer
  },
  // async created() {
  //   try {
  //     const res = await request.getCart()
  //     if (res.status === 'success') {
  //       this.cart = res.cart
  //       this.totalPrice = res.totalPrice
  //     }
  //   } catch (error) {
  //     Toast.fire({
  //       icon: 'error',
  //       title: 'Fetch cart failed'
  //     })
  //   }
  // },
  // methods: {
  //   async clickToGetCart() {
  //     try {
  //       const res = await request.getCart()
  //       if (res.status === 'success') {
  //         console.log(res)
  //         this.cart = res.cart
  //         this.totalPrice = res.totalPrice
  //       }
  //     } catch (error) {
  //       Toast.fire({
  //         icon: 'error',
  //         title: 'Fetch cart failed'
  //       })
  //     }
  //   }
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif, 'Noto Sans TC';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<template>
  <b-container
    fluid
    style="max-width: 75%;"
  >
    <FurnituresDashboard
      :initProduct="initProduct"
      :initImages="initImages"
      :initColors="initColors"
      @after-add-to-cart="afterAddToCart"
    />
    <ShoppingCart
      :init-cart="initCart"
      :init-total-price="initTotalPrice"
      @click-to-get-cart="clickToGetCart"
    />
    <hr />
    <FurnituresDimension
      :initProduct="initProduct"
      :initImages="initImages"
    />
  </b-container>
</template>

<script>
import Request from '../api'
import FurnituresDashboard from '../components/FurnituresDashborad.vue'
import FurnituresDimension from '../components/FurnituresDimension.vue'
import ShoppingCart from '../components/ShoppingCart'
const request = new Request()
import { Toast } from '../utils/helpers.js'

export default {
  components: {
    FurnituresDashboard,
    FurnituresDimension,
    ShoppingCart
  },
  data() {
    return {
      initProduct: {},
      initImages: [],
      initColors: [],
      error: '',
      initCart: [],
      initTotalPrice: 0
    }
  },
  async created() {
    try {
      const res = await request.getCart()
      this.fetchFurniture(document.location.pathname)
      if (res.status === 'success') {
        this.initCart = res.cart
        this.initTotalPrice = res.totalPrice
      }
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: 'Fetch cart failed'
      })
    }
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params
    this.fetchFurniture(`/furnitures/${id}`)
    next()
  },
  methods: {
    async fetchFurniture(furnitureId) {
      try {
        const res = await request.getSpecificProduct(furnitureId)
        if (res.status === 'success') {
          this.initProduct = res.product
          this.initImages = res.Images
          this.initColors = res.Colors
        }
      } catch (error) {
        this.error = error.message
      }
    },
    async afterAddToCart(data) {
      try {
        const res = await request.postCart(data)
        if (res.status === 'success') {
          Toast.fire({
            icon: 'success',
            title: 'Added to cart'
          })
        }
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: 'Fail to add to cart'
        })
      }
    },
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
  },
  watch: {
    initProduct: function(updateData) {
      this.initProduct = updateData
    },
    initImages: function(updateData) {
      this.initImages = updateData
    },
    initColors: function(updateData) {
      this.initColors = updateData
    }
  }
}
</script>
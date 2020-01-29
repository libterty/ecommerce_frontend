<template>
  <b-container v-if="isLoading">
    <Spinner />
  </b-container>

  <b-container
    fluid
    style="max-width: 75%;"
    v-else
  >
    <FurnituresDashboard
      :initProduct="initProduct"
      :initImages="initImages"
      v-if="!isLoading"
      :initColors="initColors"
      :init-cart="initCart"
      :is-loading="isLoading"
      @after-add-to-cart="afterAddToCart"
    />
    <ShoppingCart
      v-if="!isLoading"
      :init-cart="initCart"
      :init-total-price="initTotalPrice"
      @click-to-get-cart="clickToGetCart"
    />
    <hr />
    <FurnituresDimension
      v-if="!isLoading"
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
import Spinner from '../components/Spinner'
const request = new Request()
import { Toast } from '../utils/helpers.js'

export default {
  components: {
    FurnituresDashboard,
    FurnituresDimension,
    ShoppingCart,
    Spinner
  },
  data() {
    return {
      isShow: false,
      initProduct: {},
      initImages: [],
      initColors: [],
      error: '',
      initCart: [],
      initTotalPrice: 0,
      isLoading: true
    }
  },
  async created() {
    try {
      this.fetchFurniture(document.location.pathname)
      this.clickToGetCart()
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: 'Fetch furniture info failed'
      })
    }
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params
    this.fetchFurniture(`furnitures/${id}`)
    next()
  },
  methods: {
    async fetchFurniture(furnitureId) {
      try {
        this.isLoading = true
        const res = await request.getSpecificProduct(furnitureId)
        if (res.status === 'success') {
          this.initProduct = res.product
          this.initImages = res.Images
          this.initColors = res.Colors
        }
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: 'Fetch furniture info failed'
        })
      }
    },
    async afterAddToCart(data) {
      try {
        const res = await request.postCart(data)
        if (res.status === 'success') {
          this.clickToGetCart()
          Toast.fire({
            icon: 'success',
            title: 'Added to cart'
          })
        }
      } catch (error) {
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
          this.initCart = res.cart
          this.initTotalPrice = res.totalPrice
        }
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'warning',
          title: 'Nothing in the cart'
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
    },
    initCart: function(updateData) {
      this.initCart = updateData
    }
  }
}
</script>
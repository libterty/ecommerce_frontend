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
const request = new Request()
import { Toast } from '../utils/helpers.js'

export default {
  components: {
    FurnituresDashboard,
    FurnituresDimension
  },
  data() {
    return {
      initProduct: {},
      initImages: [],
      initColors: [],
      error: ''
    }
  },
  async created() {
    this.fetchFurniture(document.location.pathname)
  },
  // TODO: page doesn't change after route changed
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params
    console.log('to.params', id)
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
        console.log(error)
        this.error = error.message
      }
    },
    async afterAddToCart(data) {
      try {
        const res = await request.postCart(data)
        if (res.status === 'success') {
          console.log('success')
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
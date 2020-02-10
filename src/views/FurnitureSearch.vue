<template>
  <b-container
    class="py-5"
    v-if="isShow"
  >
    <h2>您的收尋結果{{searchResult}}如下</h2>
    <br />
    <hr />
    <FurnitureSearch :initSearchProducts="initSearchProducts" />

    <br />
    <br />
    <a href="javascript:history.back()">回上一頁</a>
  </b-container>
</template>

<script>
import FurnitureSearch from '../components/FurnitureSearch.vue'
import Request from '../api/index'
import { Toast } from '../utils/helpers'
const request = new Request()

export default {
  name: 'furnitures-Search',
  components: {
    FurnitureSearch
  },
  data() {
    return {
      isShow: false,
      initSearchProducts: [],
      searchResult: decodeURI(document.location.search).split('=')[1],
      searchQuery: document.location.search
    }
  },
  async created() {
    try {
      const res = await request.getSearchNav(this.searchQuery)
      if (res.status === 'success') {
        this.initSearchProducts = res.products
        this.isShow = true
      }
    } catch (error) {
      Toast.fire({
        icon: 'warning',
        title: 'Search Items fail'
      })
    }
  },
  watch: {
    $route: async function(to, from) {
      if (from.query.items !== to.query.items) {
        this.searchQuery = document.location.search
        this.searchResult = decodeURI(document.location.search).split('=')[1]
        try {
          const res = await request.getSearchNav(this.searchQuery)
          if (res.status === 'success') {
            this.initSearchProducts = res.products
            this.isShow = true
          }
        } catch (error) {
          Toast.fire({
            icon: 'warning',
            title: 'Search Items fail'
          })
        }
      }
    }
  }
}
</script>
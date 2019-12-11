<template>
  <b-container>
    <div class="Home">Hello Home</div>
  </b-container>
</template>

<script>
import Request from '../api/index';
const request = new Request();

export default {
  data() {
    return {
      initProducts: []
    };
  },
  async created() {
    const res = await request.getHomePageProduts();
    if (res.status === 'success') {
      this.initProducts = res.products;
    }
  }
};
</script>

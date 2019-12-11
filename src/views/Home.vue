<template>
  <b-container>
    <div>
      <b-card
        overlay
        img-src="https://i.imgur.com/d4C2lls.jpg"
        img-alt="EVERYTHING YOU NEED IN TIME FOR CHRISTMAS"
        text-variant="white"
        title="EVERYTHING YOU NEED IN TIME FOR CHRISTMAS"
        class="Home-Advertisement"
      >
        <b-card-text>
          Christmas Sale is coming ~
        </b-card-text>
        <br />
        <b-button pill size="lg" variant="primary">Explore More</b-button>
      </b-card>
    </div>
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

<style scoped>
.Home-Advertisement {
  border: none;
}
</style>

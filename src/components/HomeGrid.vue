<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="product in initProducts"
        :key="product.id"
      >
        <v-card
          min-width="300"
          max-width="300"
          class="text-left remove-link"
          link
          :to="{name:'furnituresItem',params:{id:product.id}}"
        >
          <v-img
            height="200px"
            :src="product.Image"
            :alt="product.name"
          ></v-img>

          <v-card-title class="cyan--text text--darken-4">{{product.name}}</v-card-title>
          <v-card-text>{{product.material}}</v-card-text>
          <v-card-actions>
            <v-rating
              x-small
              class="p-2"
              color="cyan darken-4"
              background-color="cyan darken-4"
              half-increments
              :value="product.rating/2"
              readonly
            ></v-rating>
            <v-chip
              label
              class="mt-3 red lighten-3 white--text"
              :to="{name:'furnituresItem',params:{id:product.id}}"
            >${{product.price}}</v-chip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    initProducts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      show: false
    }
  }
}
</script>

<style scoped>
.cyan--text {
  white-space: nowrap;
  font-size: inherit;
}
.remove-link {
  text-decoration: none;
}
</style>
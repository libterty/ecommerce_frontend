<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        lg="4"
        v-for="initSearchProduct in initSearchProducts"
        :key="initSearchProduct.id"
      >
        <v-card
          min-width="300"
          max-width="300"
          class="text-left remove-link"
          link
          :to="{name:'furnituresItem',params:{id:initSearchProduct.id}}"
        >
          <v-img
            height="300px"
            :src="initSearchProduct.Images[0].url"
            :alt="initSearchProduct.name"
          ></v-img>

          <v-card-title class="cyan--text text--darken-4">{{initSearchProduct.name}}</v-card-title>
          <v-card-text>{{initSearchProduct.Category.name}}</v-card-text>
          <v-card-actions>
            <v-rating
              x-small
              class="p-2"
              color="cyan darken-4"
              background-color="cyan darken-4"
              half-increments
              :value="initSearchProduct.rating/2"
              readonly
            ></v-rating>
            <v-chip
              label
              class="mt-3 red lighten-3 white--text"
              :to="{name:'furnituresItem',params:{id:initSearchProduct.id}}"
            >${{initSearchProduct.price}}</v-chip>
            <v-badge color="red">
              <span slot="badge">{{initSearchProduct.viewCounts + 1}}</span>
              <v-icon
                large
                color="red"
                v-if="initSearchProduct.viewCounts > 20"
              >mdi-fire</v-icon>
              <v-icon
                large
                color="grey"
                v-else
              >mdi-fire</v-icon>
            </v-badge>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    initSearchProducts: {
      type: Object
    }
  },
  filters: {
    shortenDesc(d) {
      if (!d) return 'No description yet'
      return d.substring(0, 50)
    }
  }
}
</script>

<style scoped>
img {
  max-height: 203px;
  max-width: 246px;
  width: auto;
}
p.card-text {
  font-size: small;
  white-space: nowrap;
  overflow: scroll;
}
a.btn.btn-primary {
  color: #cccccc;
}
</style>
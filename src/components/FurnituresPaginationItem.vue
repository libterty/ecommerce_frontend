<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="initProduct in initProducts"
        :key="initProduct.id"
      >
        <v-card
          min-width="300"
          max-width="300"
          class="text-left remove-link"
          link
          :to="{name:'furnituresItem',params:{id:initProduct.id}}"
        >
          <v-img
            height="300px"
            :src="initProduct.Images[0].url"
            :alt="initProduct.name"
          ></v-img>

          <v-card-title class="cyan--text text--darken-4">{{initProduct.name}}</v-card-title>
          <v-card-text>{{initProduct.Category.name}}</v-card-text>
          <v-card-actions>
            <v-rating
              x-small
              class="p-2"
              color="cyan darken-4"
              background-color="cyan darken-4"
              half-increments
              :value="initProduct.rating/2"
              readonly
            ></v-rating>
            <v-chip
              label
              class="mt-3 red lighten-3 white--text"
              :to="{name:'furnituresItem',params:{id:initProduct.id}}"
            >${{initProduct.price}}</v-chip>
            <v-badge color="red">
              <span slot="badge">{{initProduct.viewCounts + 1}}</span>
              <v-icon
                large
                color="red"
                v-if="initProduct.viewCounts > 20"
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
  name: 'FurnituresPaginationItem',
  data() {
    return {
      hover: false
    }
  },
  props: {
    initProducts: {
      type: Object
    }
  },
  filters: {
    shortenDesc(d) {
      if (!d) return 'No description yet'
      return d.substring(0, 25)
    }
  },
  watch: {
    initProduct: function(updateData) {
      this.initProduct = updateData
    }
  }
}
</script>

<style scoped>
h4.card-title {
  white-space: nowrap;
  font-size: medium;
}
p.card-text {
  min-height: 48px;
}
img.card-img-top {
  min-height: 148px;
  max-height: 149px;
}
a.btn.btn-primary {
  white-space: nowrap;
  font-size: x-small;
  color: antiquewhite;
}
button.btn.btn-primary.disabled {
  font-size: x-small;
  white-space: nowrap;
}
.remove-link {
  text-decoration: none;
}
</style>
<template>
  <v-app id="wrapper">
    <v-img
      src="https://i.imgur.com/yH00Y1E.png"
      width="110"
      height="110"
      contain
      class="btn cart-icon"
      @click.stop.prevent="getCart"
    />
    <v-dialog
      scrollable
      v-model="dialog"
      class="dialog"
      max-width="500px"
    >
      <v-card
        class="cart py-3"
        style="height: 50vh;"
      >
        <div class="my-4 top-divider">
          <span class="cart-title">Shopping cart</span>
        </div>
        <v-card-title
          class="text-muted mb-5"
          v-if="initTotalPrice<1"
        >No Data</v-card-title>
        <v-list flat>
          <v-list-item-group>
            <v-list-item
              v-for="item in initCart"
              :key="item.id"
              :to="{name:'furnituresItem',params:{id:item.Product.id}}"
            >
              <v-list-avatar>
                <v-img
                  class="mr-2"
                  :src="item.Image.url"
                  width="100"
                  height="100"
                ></v-img>
              </v-list-avatar>
              <div class="cart-content">
                <v-list-item-title>{{item.Product.name}}</v-list-item-title>
                <small
                  class="text-muted"
                >SOFA,{{item.Product.length}} x {{item.Product.width}} x {{item.Product.height}}(cm)</small>
                <v-list-item-subtitle>
                  <div
                    class="product_color_item"
                    :class="item.Color.name | convertClass"
                  ></div>
                </v-list-item-subtitle>
              </div>
              <v-card-text
                class="float-right"
                style="width: 100px;"
              >x {{item.quantity}}</v-card-text>
              <v-card-text
                style="width: 100px;"
                class="float-right"
              >$ {{item.price}}</v-card-text>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <div class="my-4 bottom-divider">
          <span class="cart-title">Total ${{initTotalPrice}}</span>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            raised
            color="error"
            x-large
            rounded
            style="padding: 0 3em;"
            @click="dialog = false"
            :to="{name:'cart'}"
          >GO TO CART</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import { convertClassFilter } from '../utils/mixins'

export default {
  name: 'ShoppingCart',
  mixins: [convertClassFilter],
  props: {
    initCart: {
      type: Array,
      required: true
    },
    initTotalPrice: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      dialog: false
    }
  },

  methods: {
    getCart() {
      this.dialog = !this.dialog
      this.$emit('click-to-get-cart')
    }
  },
  watch: {
    initCart: function(updateData) {
      this.initCart = updateData
    },
    initTotalPrice: function(updateData) {
      this.initTotalPrice = updateData
    }
  }
}
</script>

<style scoped>
#wrapper {
  height: 0;
  position: absolute;
}
.cart-icon {
  position: fixed;
  right: 10%;
  top: 41%;
  color: white;
  z-index: 9999;
}
.cart {
  position: fixed;
  right: 12%;
  top: 45%;
  width: 535px;
  height: 50%;
  color: white;
  z-index: 1;
  opacity: 0.9;
  border-radius: 8% !important;
  padding: 1em;
  overflow-y: scroll;
}
/* hide scrollbar */
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
.cart-title {
  color: #577c8a;
  font-size: 1.5em;
  background-color: white;
  padding: 0 0.5em;
  border-radius: 8%;
}
.top-divider {
  width: 100%;
  height: 20px;
  border-bottom: 1px solid #707070;
  text-align: left;
  margin-bottom: 2em;
}
.bottom-divider {
  width: 100%;
  height: 20px;
  border-bottom: 1px solid #707070;
  text-align: right;
  margin-bottom: 2em;
}
.product_color_item {
  height: 25px;
  width: 25px;
  border-radius: 99em;
  border: 1px solid rgba(0, 0, 0, 0.375);
  margin-left: 0.25rem;
}
.product_color_blue {
  background-color: blue;
}
.product_color_black {
  background-color: black;
}
.product_color_white {
  background-color: white;
}
.product_color_yellow {
  background-color: yellow;
}
.cart-content {
  text-align: left;
  padding-bottom: 1em;
}
</style> 
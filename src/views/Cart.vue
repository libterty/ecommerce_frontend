<template>
  <v-app class="py-5 mx-5">
    <v-container>
      <UserTabs />

      <v-row no-gutters>
        <v-col
          cols="12"
          md="12"
          sm="12"
        >
          <v-card class="cart py-5 text--darken-3 cyan--text">
            <v-col
              cols="12"
              md="12"
              sm="12"
              class="my-4"
            >
              <span class="cart-title display-1">|Shopping cart|</span>
              <v-card-title
                class="text-muted mb-5 display-1"
                v-if="totalPrice<1"
              >No Data</v-card-title>
            </v-col>

            <v-list flat>
              <v-list-item-group>
                <v-list-item
                  v-for="item in cart"
                  :key="item.id"
                >
                  <v-row no-gutters>
                    <v-col
                      cols="12"
                      md="3"
                      lg="3"
                      sm="3"
                    >
                      <router-link :to="{name:'furnituresItem',params:{id:item.Product.id}}">
                        <v-img
                          :aspect-ratio="16/9"
                          :src="item.Image.url"
                          min-width="210"
                          min-height="300"
                          class="cart-content"
                        ></v-img>
                      </router-link>
                    </v-col>
                    <v-col
                      cols="12"
                      md="3"
                      sm="3"
                      lg="3"
                      class="cart-content"
                    >
                      <router-link :to="{name:'furnituresItem',params:{id:item.Product.id}}">
                        <v-list-item-title class="mb-1">{{item.Product.name}}</v-list-item-title>
                      </router-link>
                      <p
                        class="caption"
                      >Size: {{item.Product.length}} x {{item.Product.width}} x {{item.Product.height}}(cm)</p>
                      <p class="caption">Weight: {{item.Product.weight}}(kg)</p>
                      <p class="caption">Material: {{item.Product.material}}</p>
                      <v-list-item-subtitle>
                        <div
                          class="product_color_item"
                          :class="item.Color.name | convertClass"
                        ></div>
                      </v-list-item-subtitle>
                    </v-col>
                    <v-col
                      cols="12"
                      md="3"
                      sm="3"
                      lg="3"
                      class="cart-content"
                    >
                      <v-btn
                        x-small
                        @click.stop.prevent="subCartItem(item.id)"
                      >-</v-btn>
                      <input
                        id="quantity"
                        v-model.number="item.quantity"
                        type="text"
                        class="form-quantity-input text-center"
                        name="quantity"
                        size="2"
                        disabled
                      />
                      <v-btn
                        x-small
                        @click.stop.prevent="addCartItem(item.id)"
                      >+</v-btn>
                    </v-col>
                    <v-col
                      cols="12"
                      md="2"
                      sm="2"
                      lg="2"
                      class="cart-content"
                    >
                      <v-card-text class="item-price headline">$ {{item.price}}</v-card-text>
                      <v-list-item-action>
                        <v-icon @click.stop.prevent="deleteCartItem(item.id)">mdi-trash-can</v-icon>
                      </v-list-item-action>
                    </v-col>

                    <v-col
                      cols="12"
                      md="12"
                      sm="12"
                    ></v-col>
                  </v-row>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <div class="my-4 bottom-divider">
              <span class="cart-title display-1">Total ${{totalPrice}}</span>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                raised
                color="error"
                x-large
                rounded
                class="mt-3"
                style="padding: 0 3em;"
              >Complete Payment</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import UserTabs from '../components/UserTabs'
import Request from '../api/index'
import { Toast } from '../utils/helpers.js'
import { convertClassFilter, convertLanguageFilter } from '../utils/mixins'
const request = new Request()
export default {
  name: 'Cart',
  mixins: [convertClassFilter, convertLanguageFilter],
  components: {
    UserTabs
  },
  data() {
    return {
      cart: [],
      totalPrice: 0
    }
  },
  async created() {
    await this.fetchCart()
  },
  methods: {
    async fetchCart() {
      try {
        console.log('try to fecth cart')
        const res = await request.getCart()
        if (res.status === 'success') {
          this.cart = res.cart
          this.totalPrice = res.totalPrice
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Fetch cart failed'
        })
      }
    },
    async addCartItem(cartItemId) {
      try {
        const res = await request.addCartItem(cartItemId)
        if (res.status === 'success') {
          Toast.fire({
            icon: 'success',
            title: res.message
          })
        }
        this.fetchCart()
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: 'Add cart item failed'
        })
      }
    },
    async subCartItem(cartItemId) {
      try {
        const res = await request.subCartItem(cartItemId)
        if (res.status === 'success') {
          Toast.fire({
            icon: 'success',
            title: res.message
          })
        }
        this.fetchCart()
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Substract cart item failed'
        })
      }
    },
    async deleteCartItem(cartItemId) {
      try {
        const res = await request.deleteCartItem(cartItemId)
        if (res.status === 'success') {
          Toast.fire({
            icon: 'success',
            title: res.message
          })
        }
        this.fetchCart()
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Add cart item failed'
        })
      }
    }
  },
  watch: {
    cart: function(updateData) {
      this.cart = updateData
    },
    totalPrice: function(updateData) {
      this.totalPrice = updateData
    }
  }
}
</script>
<style scoped>
.cart-title {
  color: #42602d;
  background-color: white;
  padding: 0 0.5em;
  border-radius: 8%;
}
a {
  text-decoration: none;
  color: #577c8a;
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
  padding: 7% 0;
}
* {
  font-family: sans-serif, 'Noto Sans TC';
}
v-list-item-title {
  font: Bold 1.5em/1.5em Arial;
  letter-spacing: 0;
  color: #577c8a;
  opacity: 1;
}
.item-price {
  letter-spacing: 0;
  color: #577c8a;
  opacity: 1;
}
</style> 

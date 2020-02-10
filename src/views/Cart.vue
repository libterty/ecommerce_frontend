<template>
  <v-app class="py-5 mx-5">
    <v-container>
      <UserTabs />

      <v-row no-gutters>
        <v-col
          cols="12"
          lg="12"
        >
          <v-card class="cart py-5 text--darken-3 cyan--text">
            <v-col
              cols="12"
              lg="12"
              class="my-4"
            >
              <span class="cart-title display-1">|Shopping cart|</span>
              <v-card-title
                class="text-muted mb-5 headline"
                v-if="totalPrice<1"
              >No Data</v-card-title>
            </v-col>
            <v-row
              justify="center"
              align="center"
              class="ml-1"
            >
              <v-col
                cols="12"
                lg="10"
              >
                <v-list flat>
                  <v-list-item-group>
                    <v-list-item
                      v-for="item in cart"
                      :key="item.id"
                    >
                      <v-row
                        justify="center"
                        align="center"
                      >
                        <v-col
                          cols="12"
                          lg="3"
                        >
                          <router-link :to="{name:'furnituresItem',params:{id:item.Product.id}}">
                            <v-img
                              :aspect-ratio="16/9"
                              :src="item.Image.url"
                              min-width="210"
                              min-height="250"
                              class="cart-content"
                            ></v-img>
                          </router-link>
                        </v-col>
                        <v-col
                          cols="12"
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
                              class="product_color_item mb-1"
                              :class="item.Color.name | convertClass"
                            ></div>
                          </v-list-item-subtitle>
                        </v-col>
                        <v-col
                          cols="12"
                          lg="3"
                          class="cart-content"
                          v-if="item.Inventories.quantity<item.quantity"
                        >
                          <v-alert
                            dense
                            outlined
                            type="error"
                          >Stock is not enough</v-alert>
                        </v-col>
                        <v-col
                          cols="12"
                          lg="3"
                          class="cart-content"
                          v-else
                        >
                          <v-btn
                            x-small
                            @click.stop.prevent="subCartItem(item.id)"
                          >-</v-btn>
                          <input
                            v-model.number="item.quantity"
                            type="text"
                            class="form-quantity-input text-center quantity"
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
                          lg="2"
                          class="cart-content"
                        >
                          <v-card-text class="item-price headline">$ {{item.price}}</v-card-text>
                          <v-list-item-action>
                            <v-icon @click.stop.prevent="deleteCartItem(item.id)">mdi-trash-can</v-icon>
                          </v-list-item-action>
                        </v-col>
                      </v-row>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>

            <div class="my-4 bottom-divider">
              <span
                class="cart-title display-1"
                style=" padding-right: 1em;"
              >Total ${{totalPrice}}</span>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-row justify="end">
                <v-dialog
                  v-if="!currentUser.address || !currentUser.tel"
                  v-model="dialog"
                  persistent
                  max-width="600px"
                >
                  <template v-slot:activator="{ on }">
                    <v-btn
                      raised
                      color="error"
                      large
                      class="mt-3 red lighten-3 dialog-btn"
                      style="padding: 0 1em ; margin-right: 3em;"
                      v-on="on"
                      :disabled="disablePayment"
                    >Complete Payment</v-btn>
                  </template>
                  <v-card>
                    <v-form ref="shippingForm">
                      <v-card-title>
                        <span class="headline text--darken-3 cyan--text">Shipping Info</span>
                      </v-card-title>
                      <v-card-text>
                        <v-text-field
                          ref="tel"
                          v-model="tel"
                          :rules="telRules"
                          label="Phone Number"
                          placeholder="0912345678"
                          required
                        ></v-text-field>
                        <v-text-field
                          ref="initialAddress"
                          v-model="initialAddress"
                          :rules="initialAddressRules"
                          label="Address Line"
                          placeholder="Snowy Rock Pl"
                          counter="40"
                          required
                        ></v-text-field>
                        <v-text-field
                          ref="district"
                          v-model="district"
                          :rules="districtRules"
                          label="District / Township"
                          required
                          placeholder="士林區"
                        ></v-text-field>
                        <v-text-field
                          ref="zip"
                          v-model="zip"
                          :rules="zipRules"
                          label="ZIP / Postal Code"
                          required
                          placeholder="168"
                        ></v-text-field>
                        <v-autocomplete
                          ref="county"
                          v-model="county"
                          :search-input.sync="county"
                          :rules="countyRules"
                          :items="counties"
                          :error-messages="errorMessages"
                          label="County / City"
                          placeholder="Select..."
                          required
                        ></v-autocomplete>
                      </v-card-text>
                      <v-divider class="mt-12"></v-divider>
                      <v-card-actions>
                        <v-btn
                          text
                          @click="dialog=false"
                        >Cancel</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          text
                          :disabled="shortageStock"
                          @click.stop.prevent="createOrder"
                        >Submit change</v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
                <v-btn
                  v-else
                  raised
                  color="error"
                  large
                  class="mt-3 red lighten-3"
                  style="padding: 0 1em ; margin-right: 3em;"
                  :disabled="disablePayment"
                  @click.stop.prevent="createOrder"
                >Complete Payment</v-btn>
              </v-row>
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
import { mapState } from 'vuex'
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
      totalPrice: 0,
      user: [],
      dialog: false,
      counties: [
        '臺北市',
        '新北市',
        '基隆市',
        '桃園市',
        '新竹縣',
        '新竹市',
        '苗栗縣',
        '臺中市',
        '南投縣',
        '彰化縣',
        '雲林縣',
        '嘉義縣',
        '嘉義市',
        '臺南市',
        '高雄市',
        '屏東縣',
        '宜蘭縣',
        '花蓮縣',
        '臺東縣',
        '澎湖縣',
        '金門縣',
        '連江縣'
      ],
      errorMessages: '',
      tel: '',
      telRules: [
        v => !!v || 'Phone Number is required',
        v => /\d/g.test(v) || 'Must fill in phone number',
        v => v.length <= 10 || 'Phone must be 10 digits'
      ],
      initialAddress: '',
      initialAddressRules: [
        v => !!v || 'Address is required',
        v => v.length <= 40 || 'Address must be less than 40 characters'
      ],
      address: '',
      district: '',
      districtRules: [v => !!v || 'Address is required'],
      zip: '',
      zipRules: [
        v => !!v || 'Zip is required',
        v => v.length <= 3 || 'Zip length must be less than 3'
      ],
      county: '',
      countyRules: [v => !!v || 'County / City is required', this.countyCheck],
      CartId: null,
      discount: 0,
      shortageStock: false
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated']),
    beforeAttach() {
      return {
        tel: this.tel,
        initialAddress: this.initialAddress,
        district: this.district,
        zip: this.zip,
        county: this.county
      }
    },
    form() {
      return {
        tel: this.currentUser.tel
          ? this.currentUser.tel.replace(/[^0-9]/gi, '')
          : this.tel,
        UserId: this.currentUser.id,
        CartId: this.cart.length > 0 ? this.cart[0].CartId : -1,
        address: this.currentUser.address
          ? this.currentUser.address
          : this.zip + this.county + this.district + this.initialAddress
      }
    },
    disablePayment() {
      return this.shortageStock || this.totalPrice < 1
    }
  },
  async created() {
    await this.fetchCart()
  },
  methods: {
    countyCheck() {
      this.errorMessages = !this.county ? 'This field is required' : ''

      return true
    },
    async fetchCart() {
      try {
        const res = await request.getCart()
        if (res.status === 'success') {
          this.cart = res.cart
          this.totalPrice = res.totalPrice
          this.shortageStock = this.cart.some(this.checkInventory)
        }
      } catch (error) {
        Toast.fire({
          icon: 'info',
          title: 'Get your own decorations!'
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
        Toast.fire({
          icon: 'error',
          title: 'The storage is not enough'
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
    },
    async createOrderAPI() {
      try {
        this.fetchCart()

        let data = JSON.stringify(this.form)
        const res = await request.createOrder(data)

        if (res.status === 'success') {
          this.$router.push({
            name: 'order',
            params: { userId: this.form.UserId }
          })
        } else {
          this.$router.push({ name: 'cart' })
          this.dialog = false
        }
      } catch (error) {
        Toast.fire({
          icon: 'warning',
          title: 'Must finish order payment before create new order'
        })
        this.$router.push({
          name: 'order',
          params: { userId: this.form.UserId }
        })
      }
    },
    async createOrder() {
      try {
        // check cart length
        if (this.cart.length === 0) {
          Toast.fire({
            icon: 'info',
            title: 'Get your own decorations!'
          })
          this.dialog = false
        }
        // check isAuthenticated
        if (!this.isAuthenticated) {
          Toast.fire({
            icon: 'warning',
            title: 'Must sign in before create order'
          })
          this.$router.push({ name: 'SignIn' })
        }
        // check currentUser
        if (this.currentUser) {
          // if form has info
          if (
            this.currentUser.address.length > 0 &&
            this.currentUser.tel.length > 0 &&
            this.form.UserId &&
            this.form.CartId &&
            this.form.address.length > 0 &&
            this.form.tel.length > 0
          ) {
            // if item is in shortage stock
            if (this.shortageStock) {
              Toast.fire({
                icon: 'warning',
                title: 'Shortage of stock'
              })
            } else {
              // item has enough stock

              await this.createOrderAPI()
            }
          } else {
            if (
              this.tel &&
              this.initialAddress &&
              this.district &&
              this.zip &&
              this.county &&
              this.$refs.shippingForm.validate(true) &&
              !this.shortageStock
            ) {
              this.dialog = false
              await this.createOrderAPI()
            } else {
              Toast.fire({
                icon: 'warning',
                title: 'Validate failed'
              })
            }
          }
        }
      } catch (error) {
        this.$router.push({
          name: 'orders'
        })
      }
    },
    checkInventory(element) {
      return element.Inventories.quantity < element.quantity
    }
  },
  watch: {
    cart: function(updateData) {
      this.cart = updateData
    },
    totalPrice: function(updateData) {
      this.totalPrice = updateData
    },
    tel: function(updateData) {
      this.tel = updateData
    },
    initialAddress: function(updateData) {
      this.initialAddress = updateData
    },
    district: function(updateData) {
      this.district = updateData
    },
    zip: function(updateData) {
      this.zip = updateData
    },
    county: function(updateData) {
      this.county = updateData
    }
  }
}
</script>
<style scoped>
.cart-title {
  color: #42602d;
  background-color: white;
  padding: 0 0.5em;
}
a {
  text-decoration: none;
  color: #577c8a;
}

.bottom-divider {
  width: 100%;
  height: 20px;
  border-bottom: 1.5px solid #f19483;
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
  padding: 0;
}
* {
  font-family: sans-serif, 'Noto Sans TC', 'Roboto';
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
.coupon-field {
  color: #577c8a;
}
.coupon-discount {
  font: Thin 1em/1em 'Roboto';
  letter-spacing: 0;
}
</style> 

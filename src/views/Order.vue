<template>
  <v-app class="py-5 mx-5">
    <v-container>
      <v-row no-gutters>
        <v-col
          cols="12"
          lg="12"
          class="my-4"
        >
          <span class="cart-title display-1 text--darken-3 cyan--text">|Order|</span>
          <v-card-title
            class="text-muted mb-5 headline"
            v-if="totalPrice<1"
          >No Data</v-card-title>
        </v-col>
        <v-col
          lg="7"
          md="7"
          class="mr-5 mb-5"
        >
          <v-card
            outlined
            class="cart text--darken-3 cyan--text"
            v-for="item in order.items"
            :key="item.id"
          >
            <v-row
              justify="center"
              align="center"
              class="ml-1"
            >
              <v-col
                cols="12"
                lg="12"
              >
                <v-list flat>
                  <v-list-item-group>
                    <v-list-item>
                      <v-row
                        justify="space-around"
                        align="center"
                      >
                        <v-col
                          cols="12"
                          lg="2"
                        >
                          <v-img
                            :aspect-ratio="16/9"
                            :src="item.Images[0].url"
                            min-width="80"
                            min-height="60"
                            class="cart-content"
                          ></v-img>
                        </v-col>
                        <v-col
                          cols="12"
                          lg="4"
                          class="cart-content text-left"
                        >
                          <router-link :to="{name:'furnituresItem',params:{id:item.id}}">
                            <v-list-item-title class="mb-1">{{item.name}}</v-list-item-title>
                          </router-link>
                          <p
                            class="caption"
                          >Size: {{item.length}} x {{item.width}} x {{item.height}}(cm)</p>
                          <p class="caption">Weight: {{item.weight}}(kg)</p>
                          <p class="caption">Material: {{item.material}}</p>
                          <p class="caption float-left">Color:</p>
                          <div
                            class="product_color_item mb-1 float-left"
                            :class="item.color.name | convertClass"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          lg="1"
                          class="cart-content"
                        >
                          <input
                            id="quantity"
                            v-model.number="item.OrderItem.quantity"
                            type="text"
                            class="form-quantity-input text-center"
                            name="quantity"
                            size="2"
                            disabled
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          lg="3"
                          class="cart-content"
                        >
                          <v-card-text class="item-price headline">$ {{item.price}}</v-card-text>
                        </v-col>
                      </v-row>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col
          lg="4"
          md="4"
        >
          <v-card class="mb-5">
            <v-card-title class="headline">Shipping info</v-card-title>

            <v-list-item
              three-line
              class="text-left ml-2"
            >
              <v-list-item-content>
                <p class="title">
                  Name:
                  <span class="body-1">{{order.name}}</span>
                </p>
                <p class="title">
                  Address:
                  <span class="body-1">{{order.address}}</span>
                </p>
                <p class="title">
                  Phone:
                  <span class="body-1">{{order.phone}}</span>
                </p>
                <p class="title">
                  Email:
                  <span class="body-1">{{order.email}}</span>
                </p>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-row justify="end">
                <v-dialog
                  v-model="dialog"
                  persistent
                  max-width="600px"
                  v-if="order.shipping_status==='未出貨'"
                >
                  <template v-slot:activator="{ on }">
                    <v-btn
                      raised
                      small
                      class="mt-3 cyan darken-3 dialog-btn"
                      style=" margin-right: 3em;"
                      v-on="on"
                    >
                      <v-icon color="white">mdi-circle-edit-outline</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-form ref="form">
                      <v-card-title>
                        <span class="headline text--darken-3 cyan--text">Shipping Info</span>
                      </v-card-title>
                      <v-card-text>
                        <v-text-field
                          ref="name"
                          v-model="name"
                          :rules="nameRules"
                          label="Full Name"
                          placeholder="Jack Chang"
                          required
                        ></v-text-field>

                        <v-text-field
                          ref="email"
                          v-model="email"
                          :rules="emailRules"
                          required
                          label="Email"
                          placeholder="abc@email.com"
                        ></v-text-field>
                        <v-text-field
                          ref="tel"
                          v-model="tel"
                          :rules="telRules"
                          label="Phone Number"
                          placeholder="0912345678"
                          required
                        ></v-text-field>
                        <v-text-field
                          ref="address"
                          v-model="address"
                          :rules="addressRules"
                          label="Address Line"
                          placeholder="Snowy Rock Pl"
                          counter="40"
                          required
                        ></v-text-field>
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
                          @click.stop.prevent="putOrder(order.id,order.UserId)"
                        >Submit</v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-card-actions>
          </v-card>

          <v-card class="mb-5">
            <v-card-title class="headline">Status</v-card-title>
            <v-list-item
              three-line
              class="text-left ml-2"
            >
              <v-list-item-content>
                <p class="title">
                  Order Status:
                  <span class="body-1">{{order.order_status}}</span>
                </p>
                <p class="title">
                  Shipping method:
                  <span class="body-1">{{shippingMethod}}</span>
                </p>
                <p class="title">
                  Payment Status:
                  <span class="body-1">{{order.payment_status}}</span>
                </p>
              </v-list-item-content>
            </v-list-item>
          </v-card>

          <v-card class="py-5">
            <v-row justify="end">
              <div class="coupon-field">
                <v-autocomplete
                  ref="couponCodes"
                  :search-input.sync="coupon"
                  :items="couponCodes"
                  rounded
                  outlined
                  clearable
                  color="blue-grey darken-1"
                  label="Available Coupons"
                  placeholder="Select..."
                  style=" margin-right: 3em;"
                ></v-autocomplete>

                <div
                  class="coupon-discount"
                  style=" margin-left: 3em;"
                >
                  <v-col
                    cols="12"
                    lg="12"
                  >
                    <span>Original Price: {{order.total_amount}}</span>
                  </v-col>
                  <v-col
                    cols="12"
                    lg="12"
                  >
                    <span>Coupon discounts: -${{computeDiscount.discount}}</span>
                  </v-col>
                  <v-col
                    cols="12"
                    lg="12"
                    v-if="computeDiscount.discount>0"
                  >
                    <span
                      class="caption red--text text--accent-1"
                    >{{couponInfo.discountPercent}}% off!</span>
                  </v-col>
                  <v-col
                    cols="12"
                    lg="12"
                  >
                    <span>Shipping Fee: +${{this.shippingFree}}</span>
                  </v-col>
                  <v-col
                    cols="12"
                    lg="12"
                  >
                    <span
                      class="caption red--text text--accent-1"
                      v-if="totalPrice<3000"
                    >Get Shipping free when shopping $3000</span>
                    <span
                      class="caption red--text text--accent-1"
                      v-else
                    >Shipping Free!</span>
                  </v-col>
                </div>
              </div>

              <span
                class="display-1 mr-10 text--darken-3 cyan--text"
              >Total ${{computeTotalPrice.price}}</span>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-row
                  align="center"
                  justify="end"
                >
                  <v-dialog
                    v-model="confirmFormDialog"
                    persistent
                    max-width="600px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-btn
                        raised
                        color="white"
                        x-small
                        class="mt-3 dialog-btn"
                        style="padding: 0 1em ; margin-right: 2.5em;"
                        @click.stop.prevent="deleteOrder(order.id,order.UserId)"
                      >Cancel Order</v-btn>
                      <v-btn
                        raised
                        color="error"
                        x-large
                        class="mt-3 red lighten-3 dialog-btn"
                        style="padding: 0 1em ; margin-right: 2.5em;"
                        v-on="on"
                        @click.stop.prevent="createPayment(order.id,order.UserId)"
                      >Create Payment</v-btn>
                    </template>

                    <v-form>
                      <v-card>
                        <v-card-title>
                          <span class="headline text--darken-3 cyan--text">Confirm Shipping Info</span>
                        </v-card-title>

                        <v-card-text>
                          <v-text-field
                            ref="tel"
                            v-model="tel"
                            label="Phone Number"
                            placeholder="0912345678"
                            disabled
                          ></v-text-field>
                          <v-text-field
                            ref="address"
                            v-model="address"
                            disabled
                            label="Address Line"
                            placeholder="Snowy Rock Pl"
                          ></v-text-field>
                          <v-text-field
                            label="Order ID"
                            v-model="paymentInfo.OrderId"
                            disabled
                          ></v-text-field>
                          <v-text-field
                            label="Total Amount"
                            v-model="paymentInfo.total_amount"
                            disabled
                          ></v-text-field>
                          <form
                            name="Spgateway"
                            :action="tradeInfo.PayGateWay"
                            method="POST"
                          >
                            <input
                              type="text"
                              name="MerchantID"
                              :value="tradeInfo.MerchantID"
                              hidden
                            />

                            <input
                              type="text"
                              name="TradeInfo"
                              :value="tradeInfo.TradeInfo"
                              hidden
                            />

                            <input
                              type="text"
                              name="TradeSha"
                              :value="tradeInfo.TradeSha"
                              hidden
                            />

                            <input
                              type="text"
                              name="Version"
                              :value="tradeInfo.Version"
                              hidden
                            />
                            <v-divider class="mt-5"></v-divider>
                            <v-card-actions>
                              <v-btn
                                text
                                @click="confirmFormDialog=false"
                              >Cancel</v-btn>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="primary"
                                text
                                type="submit"
                                @click.once="submit"
                              >Payment</v-btn>
                            </v-card-actions>
                          </form>
                        </v-card-text>
                      </v-card>
                    </v-form>
                  </v-dialog>
                </v-row>
              </v-card-actions>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// TODO: address is empty but I filled it out
import Request from '../api/index'
import { Toast } from '../utils/helpers.js'
import { convertClassFilter, convertLanguageFilter } from '../utils/mixins'
const request = new Request()

export default {
  name: 'Order',
  mixins: [convertClassFilter, convertLanguageFilter],

  data() {
    return {
      order: [],
      totalPrice: 0,
      dialog: false,
      errorMessages: '',
      tel: '',
      telRules: [
        v => !!v || 'Phone Number is required',
        v => /\d/g.test(v) || 'Must fill in phone number',
        v => v.length <= 10 || 'Phone must be 10 digits'
      ],
      address: '',
      addressRules: [
        v => !!v || 'Address is required',
        v => v.length <= 40 || 'Address must be less than 40 characters'
      ],
      formHasErrors: false,
      CartId: null,
      coupon: null,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],

      UserId: null,
      shippingFee: 350,
      shippingFree: null,
      shippingMethod: '黑貓宅急便',
      color: 'black',
      isPutOrder: false,
      confirmFormDialog: false,
      tradeInfo: {},
      paymentInfo: [],
      coupons: [],
      couponCodes: [],
      fromCart: false
    }
  },
  computed: {
    form() {
      return {
        tel: this.tel,
        UserId: this.UserId,
        name: this.name,
        address: this.address,
        email: this.email
      }
    },
    couponInfo() {
      return {
        index:
          this.couponCodes.indexOf(this.coupon) > -1
            ? this.couponCodes.indexOf(this.coupon)
            : -1,
        discountPercent:
          this.couponCodes.indexOf(this.coupon) > -1
            ? this.coupons[this.couponCodes.indexOf(this.coupon)].percent
            : -1
      }
    },
    putOrderForm() {
      return {
        shippingMethod: this.shippingMethod,
        shippingStatus: this.order.shipping_status,
        shippingFee: this.shippingFee,
        address: this.form.address,
        name: this.form.name,
        email: this.form.email,
        phone: this.form.tel,
        couponId:
          this.couponInfo.index !== -1
            ? this.coupons[this.couponInfo.index].id
            : null
      }
    },
    computeDiscount() {
      return {
        discount:
          this.couponInfo.discountPercent > 0
            ? this.order.total_amount -
              this.order.total_amount * (this.couponInfo.discountPercent / 100)
            : 0
      }
    },
    computeTotalPrice() {
      return {
        price: this.totalPrice - this.computeDiscount.discount
      }
    }
  },
  async created() {
    const { userId } = this.$route.params
    await this.fetchOrder(userId)
    await this.getValidCoupons()
    if (this.order.total_amount > 3000) {
      this.shippingFree = 0
    } else {
      this.shippingFree = 350
    }
  },
  methods: {
    async fetchOrder(userId) {
      try {
        const res = await request.getOrder(userId)

        if (res.status === 'success') {
          this.order = res.order
          this.totalPrice = res.order.total_amount
          this.address = res.order.address
          this.name = res.order.name
          this.email = res.order.email
          this.tel = res.order.phone.replace(/[^0-9]/gi, '')
          this.UserId = res.order.UserId
        }
      } catch (error) {
        this.$router.push({ name: 'cart' })
        Toast.fire({
          icon: 'error',
          title: 'Order is not found'
        })
      }
    },
    async putOrderAPI(orderId, userId) {
      const data = JSON.stringify(this.putOrderForm)
      const res = await request.putOrder(orderId, userId, data)
      if (res.status === 'success') {
        this.dialog = false
        this.isPutOrder = true
        Toast.fire({
          icon: 'success',
          title: res.message
        })
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Shipping info validate failed'
        })
      }
    },
    async putOrder(orderId, userId) {
      try {
        if (this.$refs.form) {
          if (this.$refs.form.validate(true)) {
            await this.putOrderAPI(orderId, userId)
            if (this.putOrderForm.couponId) {
              await this.useValidCoupon(this.putOrderForm.couponId)
            }
          } else {
            Toast.fire({
              icon: 'warning',
              title: 'Validate failed'
            })
          }
        } else {
          await this.putOrderAPI(orderId, userId)
          if (this.putOrderForm.couponId) {
            await this.useValidCoupon(this.putOrderForm.couponId)
          }
        }
      } catch (error) {
        this.isPutOrder = false
        this.dialog = false
        Toast.fire({
          icon: 'error',
          title: 'Update order failed'
        })
      }
    },
    async createPayment(orderId, userId) {
      try {
        await this.putOrder(orderId, userId)
        const res = await request.createPayment(orderId, userId)

        if (res.status === 'success') {
          this.isPutOrder = true
          this.tradeInfo = res.tradeInfo
          this.paymentInfo = res.paymentInfo
          Toast.fire({
            icon: 'success',
            title: res.message
          })
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'create payment failed'
        })
      }
    },
    async deleteOrder(orderId, userId) {
      try {
        if (this.order.shipping_status === '未出貨') {
          const res = await request.deleteOrder(orderId, userId)

          if (res.status === 'success') {
            Toast.fire({
              icon: 'success',
              title: res.message
            })
            this.$router.push({ name: 'cart' })
          }
        } else {
          Toast.fire({
            icon: 'warning',
            title: 'Preparing package, not able to cancel order'
          })
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Not able to delete order'
        })
      }
    },
    async getValidCoupons() {
      try {
        const res = await request.getValidCoupons()
        if (res.status === 'success') {
          this.coupons = res.coupons
          this.couponCodes = [...new Set(res.coupons.map(i => i.coupon_code))]
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Not able to fetch coupons'
        })
      }
    },
    async useValidCoupon(couponId) {
      try {
        const res = await request.useValidCoupon(couponId)
        if (res.status === 'success') {
          Toast.fire({
            icon: 'success',
            title: res.message
          })
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Not able to use coupon'
        })
      }
    }
  },

  watch: {
    order: function(updateData) {
      this.order = updateData
    },
    totalPrice: function(updateData) {
      this.totalPrice = updateData
    },
    tel: function(updateData) {
      this.tel = updateData
    },
    address: function(updateData) {
      this.address = updateData
    },
    name: function(updateData) {
      this.name = updateData
    },
    email: function(updateData) {
      this.email = updateData
    }
  }
}
</script>

<style scoped>
* {
  font-family: sans-serif, 'Noto Sans TC', 'Roboto';
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
</style>


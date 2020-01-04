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
          <!--TODO: v-for in v-card -->
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
                            src="https://i.imgur.com/3PeyRI9.jpg"
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
                            :class="color | convertClass"
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
                    <v-card-title>
                      <span class="headline text--darken-3 cyan--text">Shipping Info</span>
                    </v-card-title>
                    <v-card-text>
                      <v-text-field
                        ref="tel"
                        v-model="tel"
                        :rules="[() => !!tel || 'This field is required',
              () => (/\d/g).test(tel) || 'Must fill in phone number',
              ()=> tel.length<10 || 'Phone must be 10 digits']"
                        :error-messages="errorMessages"
                        label="Phone Number"
                        placeholder="0912345678"
                        required
                      ></v-text-field>
                      <v-text-field
                        ref="initialAddress"
                        v-model="initialAddress"
                        :rules="[
              () => !!initialAddress || 'This field is required',
              () => initialAddress.length <= 40 || 'Address must be less than 40 characters'
            ]"
                        label="Address Line"
                        placeholder="Snowy Rock Pl"
                        counter="40"
                        required
                      ></v-text-field>
                      <v-text-field
                        ref="district"
                        v-model="district"
                        :rules="[() => !!district || 'This field is required']"
                        label="District / Township"
                        required
                        placeholder="士林區"
                      ></v-text-field>
                      <v-text-field
                        ref="zip"
                        v-model="zip"
                        :rules="[() => !!zip || 'This field is required',
              () => zip.length <= 3 || 'Zip must be less than 3 characters']"
                        label="ZIP / Postal Code"
                        required
                        placeholder="168"
                      ></v-text-field>
                      <v-autocomplete
                        ref="county"
                        :search-input.sync="county"
                        :rules="[() => !!county || 'This field is required']"
                        :items="counties"
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
                        @click.stop.prevent="createOrder"
                      >Submit</v-btn>
                    </v-card-actions>
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
                  Payment Status:
                  <span class="body-1">{{order.payment_status}}</span>
                </p>
              </v-list-item-content>
            </v-list-item>
          </v-card>

          <v-card class="py-5">
            <v-row justify="end">
              <div class="coupon-field">
                <v-text-field
                  ref="coupon"
                  v-model="coupon"
                  rounded
                  outlined
                  clearable
                  color="blue-grey darken-1"
                  label="Coupon"
                  placeholder="Coupon code"
                  style=" margin-right: 3em;"
                ></v-text-field>
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
                    <span>Coupon discounts: -${{discount}}</span>
                  </v-col>
                  <v-col
                    cols="12"
                    lg="12"
                  >
                    <span>Shipping Fee: +${{this.shippingFee}}</span>
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

              <span class="display-1 mr-10 text--darken-3 cyan--text">Total ${{order.total_amount}}</span>

              <v-btn
                raised
                color="error"
                x-large
                class="mt-3 red lighten-3 dialog-btn"
                style="padding: 0 1em ; margin-right: 2.5em;"
                :to="{name:'payment', params:{orderId: order.id,userId:UserId}}"
              >Create Payment</v-btn>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Request from '../api/index'
import { Toast } from '../utils/helpers.js'
import { convertClassFilter, convertLanguageFilter } from '../utils/mixins'
const request = new Request()
// TODO: color & image display in template, using fake data now
// TODO: depends on added shippingFee or not to show shipping fee or shippingFee
export default {
  mixins: [convertClassFilter, convertLanguageFilter],
  data() {
    return {
      order: [],
      totalPrice: 0,
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
      initialAddress: '',
      address: '',
      district: null,
      zip: null,
      county: null,
      formHasErrors: false,
      CartId: null,
      coupon: '',
      discount: 0,
      name: '',
      email: '',
      UserId: null,
      shippingFee: null,
      shippingMethod: null,
      color: 'black'
    }
  },
  computed: {
    beforeAttach() {
      return {
        initialAddress: this.initialAddress,
        district: this.district,
        zip: this.zip,
        county: this.county
      }
    },
    form() {
      return {
        tel: this.tel,
        UserId: this.UserId,
        name: this.name,
        address: this.zip + this.county + this.district + this.address,
        email: this.email
      }
    },
    putOrderForm() {
      return {
        shippingMethod: this.shippingMethod,
        shippingStatus: this.order.shipping_status,
        shippingFee: this.totalPrice > 3000 ? 0 : 350,
        address: this.form.address,
        name: this.form.name,
        email: this.form.email,
        phone: this.form.tel
      }
    }
  },
  async created() {
    const { userId } = this.$route.params
    await this.fetchOrder(userId)
  },
  methods: {
    async fetchOrder(userId) {
      try {
        const res = await request.getOrder(userId)
        if (res.status === 'success') {
          console.log('success')
          this.order = res.order
          this.totalPrice = res.order.total_amount
          this.initialAddress = res.order.address
          this.address = res.order.address
          this.name = res.order.name
          this.email = res.order.email
          this.tel = res.order.phone
          this.UserId = res.order.UserId
          this.shippingFee = res.order.total_amount > 3000 ? 0 : 350
        }
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: 'Fetch order failed'
        })
      }
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


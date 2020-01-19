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
              <span class="cart-title display-1">|Check Orders|</span>
              <v-card-title
                class="text-muted mb-5 headline"
                v-if="orders.length<1"
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
                <v-row
                  justify="center"
                  align="center"
                  class="ml-10"
                >
                  <v-col
                    cols="12"
                    lg="3"
                  >
                    <v-card-title class="text-muted mb-5 title">Order Serial</v-card-title>
                  </v-col>
                  <v-col
                    cols="12"
                    lg="3"
                  >
                    <v-card-title class="text-muted mb-5 title">Total Price</v-card-title>
                  </v-col>

                  <v-col
                    cols="12"
                    lg="3"
                  >
                    <v-card-title class="text-muted mb-5 title">Created Time</v-card-title>
                  </v-col>
                  <v-col
                    cols="12"
                    lg="3"
                  >
                    <v-card-title class="text-muted mb-5 title">Shipping Status</v-card-title>
                  </v-col>
                </v-row>

                <v-list flat>
                  <v-list-item-group>
                    <v-list-item
                      v-for="order in orders"
                      :key="order.id"
                    >
                      <v-row
                        justify="center"
                        align="center"
                      >
                        <v-col
                          cols="12"
                          lg="3"
                        >
                          <v-list-item-title class="mb-1">{{order.sn}}</v-list-item-title>
                        </v-col>
                        <v-col
                          cols="12"
                          lg="3"
                        >
                          <v-card-text
                            class="text--darken-3 cyan--text title"
                          >$ {{order.total_amount}}</v-card-text>
                        </v-col>

                        <v-col
                          cols="12"
                          lg="3"
                        >
                          <v-card-text class="body-1">{{order.createdAt |convertTime}}</v-card-text>
                        </v-col>
                        <v-col
                          cols="12"
                          lg="3"
                        >
                          <v-card-text class="body-1 mt-2">{{order.shipping_status}}</v-card-text>
                          <v-list-item-action>
                            <v-btn
                              raised
                              color="error"
                              small
                              v-if="order.shipping_status==='未出貨'"
                              class="red lighten-3"
                              :to="{name:'order',params:{orderId:order.id,userId:order.UserId}}"
                            >Checkout</v-btn>
                          </v-list-item-action>
                        </v-col>
                      </v-row>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>
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
import { convertTimeFilter } from '../utils/mixins'
import { mapState } from 'vuex'
const request = new Request()
export default {
  mixins: [convertTimeFilter],
  name: 'orders',
  components: {
    UserTabs
  },

  data() {
    return {
      orders: []
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  async created() {
    await this.fetchOrders(this.currentUser.id)
  },
  methods: {
    async fetchOrders(userId) {
      try {
        const res = await request.getOrders(userId)
        if (res.status === 'success') {
          this.orders = res.orders
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Fail to fetch orders'
        })
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(() => {
      if (from.name === 'cart') {
        Toast.fire({
          icon: 'warning',
          title: 'Must finish payment before create a new order'
        })
      }
    })
  },
  watch: {
    orders: function(updateData) {
      this.orders = updateData
    }
  }
}
</script>

<style scoped>
* {
  font-family: sans-serif, 'Noto Sans TC', 'Roboto';
}
</style>
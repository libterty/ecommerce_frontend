<template>
  <v-app class="py-5 mx-5">
    <v-container>
      <UserTabs />
      <v-row no-gutters>
        <v-col
          cols="12"
          lg="12"
        >
          <v-card class="pt-5">
            <v-col
              cols="12"
              lg="12"
            >
              <div class="my-4">
                <span class="order-title display-1 py-5">|Check Orders|</span>
                <v-card-title
                  class="text-muted mb-5 headline"
                  v-if="orders.length<1"
                >No Data</v-card-title>
                <v-simple-table
                  class="mt-5"
                  v-else
                >
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-center">Order Serial</th>
                        <th class="text-center">Total Price</th>
                        <th class="text-center">Created Time</th>
                        <th class="text-center">Shipping Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="order in orders"
                        :key="order.id"
                      >
                        <td>{{ order.sn }}</td>
                        <td>{{ order.total_amount }}</td>
                        <td>{{ order.createdAt |convertTime }}</td>
                        <td>{{ order.shipping_status }}</td>
                        <td>
                          <v-btn
                            raised
                            color="error"
                            small
                            v-if="order.shipping_status==='未出貨'"
                            class="red lighten-3"
                            :to="{name:'order',params:{orderId:order.id,userId:order.UserId}}"
                          >Checkout</v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </div>
            </v-col>
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
      orders: [],
      notCheckOutOrder: false
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  async created() {
    await this.fetchOrders(this.currentUser.id)
    this.notCheckOutOrder = this.orders.some(this.checkCheckout)
    if (this.notCheckOutOrder) {
      Toast.fire({
        icon: 'warning',
        title: 'Must finish payment before create a new order'
      })
    }
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
          icon: 'warning',
          title: 'No orders in the list'
        })
      }
    },
    checkCheckout(order) {
      return order.shipping_status === '未出貨'
    }
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
.order-title {
  color: #42602d;
  background-color: white;
  padding: 0 0.5em;
}
</style>
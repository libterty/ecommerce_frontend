<template>
  <v-card>
    <v-tabs
      fixed-tabs
      slider-color="red accent-1"
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab.id"
        :to="tab.path"
        class="text--darken-3 cyan--text"
      >
        <v-icon
          left
          class="text--darken-3 cyan--text"
        >{{tab.icon}}</v-icon>
        {{tab.title}}
      </v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
import uuid from 'uuid/v4'
const auth = JSON.parse(localStorage.getItem('credit')) || null
export default {
  data() {
    return {
      userId: '',
      tabs: []
    }
  },
  created() {
    if (auth) {
      console.log('usertabs has problem')
      this.tabs = [
        {
          id: uuid(),
          title: 'Profile',
          icon: 'mdi-account',
          path: `/users/${auth.user.id}`
        },
        {
          id: uuid(),
          title: 'Shopping Cart',
          icon: 'mdi-cart',
          path: '/cart'
        },
        {
          id: uuid(),
          title: 'Orders',
          icon: 'mdi-view-list',
          routerName: '/orders'
        }
      ]
    }
  }
}
</script>
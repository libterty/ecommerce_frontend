<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      class="blue-grey lighten-1"
      fixed
      sticky
    >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-navbar-brand
        href="/"
        class="bg-white p-2 rounded"
      >
        <b-img
          src="https://i.imgur.com/QnAQhiR.png?1"
          alt="MAYNOOTH"
        ></b-img>
      </b-navbar-brand>
      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <b-nav-item
              class="white--text"
              to="/furnitures"
            >Furniture</b-nav-item>
          </b-navbar-nav>
          <b-nav-form
            class="Navbar-search"
            @submit.stop.prevent="submitSearch"
          >
            <b-form-input
              v-model="searchItem"
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button
              size="sm"
              class="my-2 my-sm-0"
              type="submit"
            >Search</b-button>
          </b-nav-form>
          <b-navbar-nav>
            <b-nav-item
              v-if="currentUser.isAdmin"
              to="/admin/products"
            >
              <i class="fas fa-user-lock"></i>
            </b-nav-item>
            <b-nav-item
              :href="'/users/' + currentUser.id"
              :disabled="!isAuthenticated"
            >
              <i class="material-icons">
                <small>person</small>
              </i>
            </b-nav-item>
            <b-nav-item v-if="isAuthenticated">
              <b-button
                size="sm"
                class="my-2 my-sm-0"
                type="button"
                @click="logout"
              >Logout</b-button>
            </b-nav-item>
            <b-nav-item
              v-if="isAuthenticated === false"
              href="/signin"
            >
              <b-button
                size="sm"
                class="my-2 my-sm-0"
                type="button"
              >Login</b-button>
            </b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mdiEmailOutline, mdiAccount } from '@mdi/js'
import { Toast } from '../utils/helpers'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      emailSvg: mdiEmailOutline,
      userSvg: mdiAccount,
      userId: '',
      searchItem: ''
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
    submitSearch() {
      if (this.searchItem.length <= 0) {
        return Toast.fire({
          icon: 'warning',
          title: "Required Field didn't exist"
        })
      }
      if (
        this.searchItem !== decodeURI(document.location.search).split('=')[1]
      ) {
        this.$router
          .push({
            path: '/furnitures/search',
            query: { items: this.searchItem }
          })
          .catch(err => {
            return Toast.fire({ icon: 'error', title: err })
          })
      }
    },
    logout() {
      this.$store.commit('revokeAuthentication')
      this.$router.go({ name: 'SignIn' })
    }
  }
}
</script>
<style scoped>
@media screen and (max-width: 992px) {
  .Navbar-search {
    align-self: center;
  }

  .form-inline {
    flex-flow: row nowrap;
  }

  .bg-white {
    background: white;
  }
}
</style>
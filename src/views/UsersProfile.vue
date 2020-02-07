<template>
  <v-app class="py-5 mx-5">
    <v-container v-if="isLoading">
      <Spinner />
    </v-container>
    <v-container v-else>
      <UserTabs />
      <UsersProfile
        :initUser="initUser"
        @after-submit-profile="afterSubmitProfile"
      />
    </v-container>
  </v-app>
</template>

<script>
import UsersProfile from '../components/UsersProfile.vue'
import UserTabs from '../components/UserTabs'
import Spinner from '../components/Spinner'
import Request from '../api/index'
import { Toast } from '../utils/helpers'
const request = new Request()

export default {
  components: {
    UsersProfile,
    UserTabs,
    Spinner
  },
  data() {
    return {
      initUser: {},
      isLoading: true
    }
  },
  async created() {
    try {
      const user = document.location.pathname.replace(/\/users\//, '')
      if (!user || user < 1) {
        return this.$router.push('/nonexisting');
      }
      this.isLoading = true
      const path = document.location.pathname.replace(/\//, '')
      const res = await request.getUser(path)
      if (res.status === 'success') {
        this.initUser = res.user
        this.isLoading = false
      }
    } catch (error) {
      this.isLoading = false
      Toast.fire({
        icon: 'warning',
        title: error.message
      })
    }
  },
  methods: {
    async afterSubmitProfile(formData) {
      try {
        this.isLoading = true
        const path = document.location.pathname.replace(/\//, '')
        const res = await request.putUser(path, formData)
        if (res.status === 'success') {
          const res = await request.getUser(path)
          this.initUser = res.user
          this.isLoading = false
          return Toast.fire({
            icon: 'success',
            title: 'Upadte Profile success'
          })
        }
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'warning',
          title: error.message
        })
      }
    }
  }
}
</script>

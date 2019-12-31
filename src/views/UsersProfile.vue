<template>
  <v-app class="py-5 mx-5">
    <v-container v-if="isShow">
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
import Request from '../api/index'
const request = new Request()

export default {
  components: {
    UsersProfile,
    UserTabs
  },
  data() {
    return {
      initUser: {},
      isShow: false
    }
  },
  async created() {
    const path = document.location.pathname.replace(/\//, '')
    const res = await request.getUser(path)
    if (res.status === 'success') {
      this.initUser = res.user
      this.isShow = true
    }
  },
  methods: {
    async afterSubmitProfile(formData) {
      const path = document.location.pathname.replace(/\//, '')
      const res = await request.putUser(path, formData)
      if (res.status === 'success') {
        const res = await request.getUser(path)
        this.initUser = res.user
        this.isShow = true
      }
    }
  }
}
</script>

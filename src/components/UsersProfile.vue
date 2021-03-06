<template>
  <div>
    <b-card
      no-body
      class="overflow-hidden p-5"
    >
      <b-row no-gutters>
        <b-col
          md="3"
          class="mr-3 m-auto"
        >
          <b-card-img
            :src="defaultAvatar(initUser.avatar)"
            :alt="initUser.name"
            class="rounded-0"
          ></b-card-img>
        </b-col>
        <b-col
          md="6"
          class="m-auto"
        >
          <b-card-body :title="initUser.name">
            <b-list-group>
              <b-list-group-item class="text-left border-0">
                <strong class="mr-2">信箱 :</strong>
                <small>{{initUser.email}}</small>
              </b-list-group-item>
              <b-list-group-item class="text-left border-0">
                <strong class="mr-2">生日 :</strong>
                <small>{{avoidNull(initUser.birthday)}}</small>
              </b-list-group-item>
              <b-list-group-item class="text-left border-0">
                <strong class="mr-2">地址 :</strong>
                <small>{{avoidNull(initUser.address)}}</small>
              </b-list-group-item>
              <b-list-group-item class="text-left border-0">
                <strong class="mr-2">電話 :</strong>
                <small>{{avoidNull(initUser.tel)}}</small>
              </b-list-group-item>
            </b-list-group>
            <br />
          </b-card-body>
          <b-button
            type="button"
            size="sm"
            variant="info"
            v-b-modal.editProfile
          >
            <v-icon color="white">mdi-account-edit</v-icon>Edit Profile
          </b-button>
        </b-col>
      </b-row>
    </b-card>
    <b-modal
      id="editProfile"
      title="修改使用者資訊"
      hide-footer
    >
      <b-form
        class="edit-user-profile"
        @submit.stop.prevent="updateUserProfile"
      >
        <b-form-group
          label-cols-sm="3"
          label="名稱 :"
          label-align-sm="right"
          label-for="name"
          description="修改姓名"
        >
          <b-form-input
            id="name"
            v-model="form.name"
            type="text"
            name="name"
            :placeholder="initUser.name"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="信箱 :"
          label-align-sm="right"
          label-for="email"
          description="修改信箱"
        >
          <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            name="email"
            :placeholder="initUser.email"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          id="password"
          label="密碼 :"
          label-align-sm="right"
          label-for="password"
          description="修改密碼"
          aria-autocomplete="current-password"
        >
          <b-form-input
            id="password"
            v-model="form.password"
            type="password"
            name="password"
            placeholder="*********"
            aria-autocomplete="current-password"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="生日 :"
          label-align-sm="right"
          label-for="birthday"
          description="修改生日"
        >
          <b-form-input
            id="birthday"
            v-model="form.birthday"
            @change="checkDate(form.birthday)"
            type="date"
            name="birthday"
            :placeholder="avoidNull(initUser.birthday)"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="上傳照片 :"
          label-align-sm="right"
          label-for="avatar"
          description="修改你的照片吧"
        >
          <b-img-lazy
            v-if="form.avatar"
            :src="form.avatar"
            class="d-block img-thumbnail mb-3"
            width="200"
            height="200"
          ></b-img-lazy>
          <input
            id="avatar"
            type="file"
            name="avatar"
            accept="image/*"
            class="form-control-file"
            @change="handleFileChange"
          />
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="地址 :"
          label-align-sm="right"
          label-for="address"
          description="修改地址"
        >
          <b-form-input
            id="address"
            v-model="form.address"
            type="text"
            name="address"
            :placeholder="avoidNull(initUser.address)"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="電話 :"
          label-align-sm="right"
          label-for="tel"
          description="修改電話"
        >
          <b-form-input
            id="tel"
            v-model="form.tel"
            type="tel"
            name="tel"
            :placeholder="avoidNull(initUser.tel)"
          ></b-form-input>
        </b-form-group>
        <b-button
          type="submit"
          variant="primary"
        >Submit</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { Toast } from '../utils/helpers'

export default {
  props: {
    initUser: {
      type: Object
    }
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        birthday: '',
        avatar: '',
        address: '',
        tel: ''
      }
    }
  },
  methods: {
    checkDate(chooseTime) {
      const currentYear = new Date().getFullYear()
      const currentMonth = new Date().getMonth() + 1
      const currentDate = new Date().getDate()
      const unixTime = new Date(
        currentYear + '-' + currentMonth + '-' + currentDate
      ).getTime()
      const userChoose = new Date(chooseTime).getTime()
      if (userChoose < unixTime) {
        return true
      }
      return false
    },
    avoidNull(input) {
      if (!input) return '尚無資料'
      return input
    },
    defaultAvatar(src) {
      if (!src) return 'https://i.imgur.com/ZJIb6zp.png'
      return src
    },
    handleFileChange(e) {
      const files = e.target.files
      if (!files.length) return
      const imageURL = window.URL.createObjectURL(files[0])
      this.form.avatar = imageURL
    },
    updateUserProfile(e) {
      if (!this.checkDate(this.form.birthday)) {
        return Toast.fire({
          icon: 'warning',
          title: 'Wrong Date Input Detected'
        })
      }

      const form = e.target
      const formData = new FormData(form)
      this.$emit('after-submit-profile', formData)
    }
  },
  watch: {
    initUser: function(updateData) {
      this.initUser = updateData
    }
  }
}
</script>
<style scoped>
.btn-info,
.btn-info:hover,
.btn-info:active,
.btn-info:focus,
.btn-info:visited {
  background-color: #f19483 !important;
  border: none;
  letter-spacing: 0.2em;
}
</style>
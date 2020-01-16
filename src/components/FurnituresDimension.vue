<template>
  <div>
    <b-card
      no-body
      class="overflow-hidden"
      v-if="isShow"
    >
      <b-row no-gutters>
        <b-col md="6">
          <div class="wrap">
            <div class="cube">
              <b-card-img
                id="profileId"
                ref="profileId"
                :src="initImages[0].url"
                class="rounded-0"
                crossorigin
              ></b-card-img>
            </div>
          </div>
        </b-col>
        <b-col md="6">
          <b-card-text>
            <b-list-group flush>
              <b-list-group-item class="text-left">
                <strong>原料 :</strong>
                <small>{{initProduct.material}}</small>
              </b-list-group-item>
              <b-list-group-item class="text-left">
                <strong>長 :</strong>
                <small>{{initProduct.length}} (公分)</small>
              </b-list-group-item>
              <b-list-group-item class="text-left">
                <strong>寬 :</strong>
                <small>{{initProduct.width}} (公分)</small>
              </b-list-group-item>
              <b-list-group-item class="text-left">
                <strong>高 :</strong>
                <small>{{initProduct.height}} (公分)</small>
              </b-list-group-item>
              <b-list-group-item class="text-left">
                <strong>重量 :</strong>
                <small>{{initProduct.weight}} (公斤)</small>
              </b-list-group-item>
            </b-list-group>
          </b-card-text>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    initProduct: {
      required: true
    },
    initImages: {
      required: true
    }
  },
  data() {
    return {
      base64: '',
      isShow: false
    }
  },
  created() {
    setTimeout(() => {
      this.Images = this.initImages
      this.isShow = true
    }, 500)
  },

  watch: {
    initProduct: function(updateData) {
      this.initProduct = updateData
    },
    initImages: function(updateData) {
      this.initImages = updateData
    }
  }
}
</script>
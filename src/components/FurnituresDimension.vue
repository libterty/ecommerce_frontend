<template>
  <div>
    <b-card
      no-body
      class="overflow-hidden"
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
      base64: ''
    }
  },
  mounted() {
    setTimeout(() => {
      this.base64 = this.getBase64Image(this.$refs.profileId)
    }, 1000)
  },
  methods: {
    getBase64Image(img) {
      let canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)

      let dataURL = canvas.toDataURL('image/png')
      return dataURL
    }
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
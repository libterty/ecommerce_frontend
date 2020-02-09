<template>
  <b-card
    class="border-0 overflow-hidden p-3"
    v-if="isShow"
  >
    <b-row
      no-gutters
      class="border-0"
    >
      <b-col md="6">
        <div class="wrap">
          <div class="dimension p-3 caption font-weight-bold">
            <b-card-img
              id="profileId"
              ref="profileId"
              src="https://i.imgur.com/SJmpEIN.png"
              class="p-3"
              crossorigin
            ></b-card-img>

            <span class="length">Length:</span>
            <span class="length p-3">{{initProduct.length}}</span>
            <span class="width">Width:</span>
            <span class="width p-3">{{initProduct.width}}</span>
            <span class="height">Height: {{initProduct.height}}</span>
          </div>
        </div>
      </b-col>
      <b-col md="6">
        <b-card-text>
          <b-card-title class="text-left mt-2">Introduction</b-card-title>
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
<style scoped>
.dimension {
  position: relative;
  width: 100%;
  height: 100%;
  color: #da9ea4;
}
.length {
  position: absolute;
  top: 81%;
  left: 15%;
  width: 100%;
  transform: rotate(-8deg);
}
.width {
  position: absolute;
  top: 80%;
  left: -30%;
  width: 100%;
  transform: rotate(30deg);
}

.height {
  position: absolute;
  top: 35%;
  left: -45%;
  width: 100%;
  transform: rotate(90deg);
}
</style>
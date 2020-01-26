<template>
  <div>
    <b-card
      no-body
      class="overflow-hidden"
      v-if="isShow"
    >
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img
            :src="Images[0].url | avoidNull"
            :alt="Images.name"
            class="rounded-0"
          ></b-card-img>
          <div
            class="image-information images"
            v-viewer="{inline: false,movable: false,navbar: true,rotatable: false,scalable: false, fullscreen: false, keyboard: false, title:false }"
          >
            <b-img-lazy
              center
              thumbnail
              fluid
              v-for="image in Images"
              :key="image.id"
              :src="image.url  | avoidNull"
              class="image-information-item"
            ></b-img-lazy>
          </div>
        </b-col>
        <b-col md="6">
          <b-card-body :title="initProduct.name">
            <b-list-group flush>
              <b-list-group-item class="text-left">
                Rating :
                <div>
                  <i
                    class="material-icons"
                    v-for="star in stars"
                    :key="star.id"
                  >star</i>
                  <i
                    v-if="isHalf"
                    class="material-icons"
                  >star_half</i>
                </div>
              </b-list-group-item>
            </b-list-group>
            <br />
            <b-card-text>{{initProduct.description}}</b-card-text>
            <b-list-group flush>
              <b-list-group-item class="text-left">
                <strong>顏色風格 :</strong>

                <div class="product_color">
                  <b-button
                    v-for="color in initColors"
                    :key="color.id"
                    @click="selectedColor(color.id, color.Inventory.quantity); selectedClass($event);"
                    class="product_color_item"
                    :class="color.name | convertClass"
                    title="庫存量"
                    :disabled="color.Inventory.quantity<1"
                    v-b-popover.hover.top="color.Inventory.quantity"
                  ></b-button>
                </div>
              </b-list-group-item>
              <b-list-group-item class="text-left">
                <strong>庫存 :</strong>
                <div
                  v-for="color in Colors"
                  :key="color.id"
                  class="inventory-status"
                >
                  <i class="material-icons">{{color.Inventory.quantity | showInventory}}</i>
                  <p>
                    {{color.name | convertLanguage}}
                    {{color.Inventory.quantity | showResponse}}
                  </p>
                </div>
              </b-list-group-item>
              <b-list-group-item class="text-left">
                <strong>{{initProduct.price}} &#36;</strong>
              </b-list-group-item>
            </b-list-group>
            <b-form>
              <b-form-group
                class="mb-0 cartCreate"
                label-for="cartCreate"
              >
                <b-col sm="12">
                  <div class="row">
                    <b-form-input
                      id="cart_input_number"
                      type="number"
                      class="col-sm-3"
                      min="1"
                      v-model="form.quantity"
                      :value="form.quantity"
                    ></b-form-input>
                    <b-button
                      variant="primary"
                      type="submit"
                      class="col-sm-5 cart_input_button"
                      size="lg"
                      @click.stop.prevent="addToCart"
                    >Add to Cart</b-button>
                  </div>
                </b-col>
              </b-form-group>
            </b-form>
            <br />
            <b-list-group flush>
              <b-list-group-item class="text-left">
                <i class="material-icons">local_shipping</i>
                <p class="text-muted">黑貓宅急便</p>
              </b-list-group-item>
            </b-list-group>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import nanoid from 'nanoid'
import { convertClassFilter, convertLanguageFilter } from '../utils/mixins'
import { Toast } from '../utils/helpers'

export default {
  mixins: [convertClassFilter, convertLanguageFilter],
  props: {
    initProduct: {
      type: Object,
      required: true
    },
    initImages: {
      type: Array,
      required: true
    },
    initColors: {
      type: Array,
      required: true
    }
  },
  filters: {
    showInventory(number) {
      return number === 0 ? 'close' : 'done'
    },
    showResponse(number) {
      return number === 0 ? '補貨中' : '有現貨'
    },
    avoidNull(url) {
      if (!url) return ''
      return url
    }
  },
  data() {
    return {
      nanoid: nanoid(5),
      product: {},
      Images: [],
      Colors: [],
      stars: [],
      isHalf: false,
      form: {
        quantity: 1,
        productId: -1,
        colorId: -1,
        price: -1
      },
      isShow: false,
      isSelected: false
    }
  },
  mounted() {
    this.generateStar()
    setTimeout(() => {
      this.Images = this.initImages
      this.Colors = this.initColors
      this.product = this.initProduct
      this.isShow = true
    }, 500)
  },
  methods: {
    generateStar() {
      setTimeout(() => {
        let n = this.initProduct.rating
        while (n > 1) {
          this.stars.push({ id: nanoid(5), stars: 'stars' })
          n = n - 2
        }

        if (n === 1) {
          this.isHalf = true
        }
      }, 500)
    },
    addToCart() {
      if (this.form.colorId === -1) {
        return Toast.fire({
          icon: 'warning',
          title: "Please select product's color"
        })
      }
      this.form.productId = this.initProduct.id
      this.form.price = this.initProduct.price
      const data = JSON.stringify(this.form)
      this.form.colorId = -1
      this.$emit('after-add-to-cart', data)
    },
    selectedColor(colorId, inventory) {
      if (inventory < 1) {
        this.form.colorId = -1
        Toast.fire({
          icon: 'warning',
          title: 'No storage for this color'
        })
      } else {
        this.isSelected = !this.isSelected
        this.form.colorId = colorId
      }
    },
    selectedClass(event) {
      const isSelect = event.target.previousElementSibling
        ? event.target.previousElementSibling.classList.contains('selected')
        : event.target.nextElementSibling.classList.contains('selected')

      if (isSelect) {
        const selectSibling = event.target.previousElementSibling
          ? event.target.previousElementSibling
          : event.target.nextElementSibling
        selectSibling.classList.toggle('selected')
        event.target.classList.toggle('selected')
      } else {
        event.target.classList.toggle('selected')
      }
    }
  },

  watch: {
    initProduct: function(updateData) {
      this.initProduct = updateData
    },
    initImages: function(updateData) {
      this.initImages = updateData
    },
    initColors: function(updateData) {
      this.initColors = updateData
    }
  }
}
</script>

<style scoped>
.image-information {
  display: flex;
  flex-flow: row nowrap;
  overflow-x: scroll;
}

.image-information-item {
  width: 25%;
  height: auto;
  margin-left: 0.25rem;
  border: 1px solid #000;
  max-height: 80px;
}

.list-group-item {
  border: none;
}

.product_color {
  display: flex;
  flex-flow: row nowrap;
}

.product_color_item {
  height: 25px;
  width: 25px;
  border-radius: 99em;
  border: 1px solid rgba(0, 0, 0, 0.375);
  margin-left: 0.25rem;
}
.product_color_item:hover {
  box-shadow: 0 0 3pt 2pt #f19483;
  padding: 1em;
}

.product_color_item:active {
  box-shadow: 0 0 3pt 2pt #f19483;
}
.product_color_item:focus {
  box-shadow: 0 0 3pt 2pt #f19483;
}
.selected {
  box-shadow: 0 0 3pt 2pt #f19483;
}

.product_color_blue {
  background-color: blue;
}
.product_color_black {
  background-color: black;
}
.product_color_white {
  background-color: white;
}
.product_color_yellow {
  background-color: yellow;
}

.cartCreate {
  margin-left: 1rem;
}

.cart_input_button {
  font-size: small;
  margin-left: 0.25rem;
}

.inventory-status {
  display: flex;
  flex-flow: row nowrap;
}
</style>
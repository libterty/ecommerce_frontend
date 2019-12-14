<template>
    <div>
        <b-card no-body class="overflow-hidden">
            <b-row no-gutters>
                <b-col md="6">
                    <b-card-img :src="initImages[0].url" :alt="initProduct.name" class="rounded-0"></b-card-img>
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
                        <b-card-text>
                            {{initProduct.description}}
                        </b-card-text>
                        <b-list-group flush>
                            <b-list-group-item class="text-left">
                                <strong>顏色風格 :</strong>
                                <div class="product_color">
                                    <div
                                        v-for="color in initColors"
                                        :key="color.id"
                                        class="product_color_item"
                                        :class="color.name | convertClass"
                                        title="庫存量"
                                        v-b-popover.hover.top="color.Inventory.quantity"
                                    ></div>
                                </div>
                            </b-list-group-item>
                            <b-list-group-item>
                                <strong>庫存 :</strong>
                                <small
                                    v-for="color in Colors"
                                    :key="color.id"
                                >
                                    <i class="material-icons">{{color.Inventory.quantity | showInventory}}</i>
                                    {{color.Inventory.quantity | showResponse}}
                                </small>
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
                                        >Add to Cart</b-button>
                                    </div>
                                </b-col>
                            </b-form-group>
                        </b-form>
                        <br />
                        <b-list-group flush>
                            <b-list-group-item class="text-left">
                                <i class="material-icons">local_shipping</i>
                            </b-list-group-item>
                        </b-list-group>
                    </b-card-body>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>
import nanoid from 'nanoid';

export default {
    props: {
        initProduct: {
            type: Object
        },
        initImages: {
            type: Array
        },
        initColors: {
            type: Array
        }
    },
    filters: {
        convertClass(string) {
            if (string === 'blue') {
                return 'product_color_blue';
            } else if (string === 'black') {
                return 'product_color_black';
            } else if (string === 'white') {
                return 'product_color_white';
            } else if (string === 'yellow') {
                return 'product_color_yellow';
            } else {
                return '';
            }
        },
        showInventory(number) {
            return number === 0 ? 'close' : 'done';
        },
        showResponse(number) {
            return number === 0 ? '補貨中' : '有現貨';
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
                quantity: 1
            },
            isShow: false
        }
    },
    mounted() {
        this.generateStar();
        setTimeout(() => {
            this.Images = this.initImages;
            this.Colors = this.initColors;
            this.product = this.initProduct;
        }, 500);
    },
    methods: {
        generateStar() {
            setTimeout(() => {
                let n = this.initProduct.rating;
                while (n > 1) {
                    this.stars.push({ id: nanoid(5), stars: 'stars' })
                    n = n - 2;
                }

                if (n === 1) {
                    this.isHalf = true;
                }
            }, 500)
        }
    }
}
</script>

<style scoped>
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
</style>
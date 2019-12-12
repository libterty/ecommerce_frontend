<template>
    <b-container fluid>
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
                                    <strong>Color :</strong>
                                    <div class="product_color">
                                        <div
                                            v-for="color in initColors"
                                            :key="color.id"
                                            class="product_color_item"
                                            :class="color.name | convertClass"
                                        ></div>
                                    </div>
                                </b-list-group-item>
                                <br />
                                <b-list-group-item class="text-left">
                                    <strong>{{initProduct.price}} &#36;</strong>
                                </b-list-group-item>
                            </b-list-group>
                        </b-card-body>
                    </b-col>
                </b-row>
            </b-card>
        </div>
    </b-container>
</template>

<script>
import nanoid from 'nanoid';

export default {
    props: {
        initProduct: {
            required: true
        },
        initImages: {
            required: true
        },
        initColors: {
            required: true
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
        }
    },
    data() {
        return {
            nanoid: nanoid(5),
            Images: [],
            Colors: [],
            stars: [],
            isHalf: false
        }
    },
    created() {
        this.Images = this.initImages;
        this.Colors = this.initColors
    },
    mounted() {
        let n = this.initProduct.rating;

        while (n > 1) {
            this.stars.push({ id: nanoid(5), stars: 'stars' })
            n = n - 2;
        }

        if (n === 1) {
            this.isHalf = true;
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
</style>
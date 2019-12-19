<template>
    <b-card no-body class="overflow-hidden">
        <b-row>
            <b-col md="6">
                <b-carousel
                    id="carousel-no-animation"
                    style="text-shadow: 0px 0px 2px #000"
                    no-animation
                    indicators
                >
                    <b-carousel-slide
                        v-for="image in initProduct.Images"
                        :key="image.id"
                    >
                        <template v-slot:img>
                            <b-img-lazy
                                class="d-block img-fluid w-100"
                                width="auto"
                                height="auto"
                                fluid-grow
                                :src="image.url"
                                alt="image slot"
                            ></b-img-lazy>
                        </template>
                    </b-carousel-slide>
                </b-carousel>
            </b-col>
            <b-col md="6">
                <b-card-body 
                    :title="initProduct.name" 
                    :sub-title="initProduct.Category.name"
                >
                    <b-card-test>
                        <b-list-group flush>
                            <b-list-group-item class="text-left">
                                <strong>成本 : </strong>
                                <small>{{initProduct.cost}}</small>
                            </b-list-group-item>
                            <b-list-group-item class="text-left">
                                <strong>售價 : </strong>
                                <small>{{initProduct.price}}</small>
                            </b-list-group-item>
                            <b-list-group-item class="text-left">
                                <strong>尺寸 : </strong>
                                <small>{{initProduct.length}} * {{initProduct.width}} * {{initProduct.height}}</small>
                            </b-list-group-item>
                            <b-list-group-item class="text-left">
                                <strong>重量 : </strong>
                                <small>{{initProduct.weight}} (公斤)</small>
                            </b-list-group-item>
                            <b-list-group-item class="text-left">
                                <strong>關注度 : </strong>
                                <small>{{initProduct.viewCounts}}</small>
                            </b-list-group-item>
                            <b-list-group-item class="text-left">
                                <strong>種類 : </strong>
                                <small>{{initProduct.Category.name}}</small>
                            </b-list-group-item>
                            <b-list-group-item 
                                class="text-left"
                                v-for="item in initProduct.inventories"
                                :key="item.id"
                            >
                                <strong>{{item.name | convertLanguage}} : </strong>
                                <small
                                    :class="checkQuantity(item.Inventory.quantity)"
                                >{{item.Inventory.quantity}}</small>
                            </b-list-group-item>
                        </b-list-group>
                    </b-card-test>
                </b-card-body>
            </b-col>
        </b-row>
    </b-card>
</template>

<script>
export default {
    props: {
        initProduct: {
            type: Object
        }
    },
    filters: {
        convertLanguage(string) {
            if (string === 'blue') {
                return '藍色';
            } else if (string === 'black') {
                return '黑色';
            } else if (string === 'white') {
                return '白色';
            } else if (string === 'yellow') {
                return '黃色';
            } else {
                return '';
            }
        }
    },
    methods: {
        checkQuantity(number) {
            if (number <= 5) return 'product-Quantity-danger';
            return 'product-Quantity-success'
        }
    }
}
</script>

<style scoped>
.product-Quantity-danger {
    color: #f90909;
}
.product-Quantity-success {
    color: #094af9;
}
</style>
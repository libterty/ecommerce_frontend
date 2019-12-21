<template>
    <b-container fluid style="max-width: 75%;">
        <FurnituresDashboard
            :initProduct="initProduct"
            :initImages="initImages"
            :initColors="initColors"
            @after-add-to-cart="afterAddToCart"
        />
        <hr/>
        <FurnituresDimension
            :initProduct="initProduct"
            :initImages="initImages"
        />
    </b-container>
</template>

<script>
import Request from '../api';
import FurnituresDashboard from '../components/FurnituresDashborad.vue';
import FurnituresDimension from '../components/FurnituresDimension.vue';
const request = new Request();
import {Toast} from '../utils/helpers.js'

export default {
    components: {
        FurnituresDashboard,
        FurnituresDimension
    },
    data() {
        return {
            initProduct: {},
            initImages: [],
            initColors: [],
            error: ''
        }
    },
    async created() {
        try {
            const res = await request.getSpecificProduct(document.location.pathname);
            if (res.status === 'success') {
                this.initProduct = res.product;
                this.initImages = res.Images;
                this.initColors = res.Colors;
            }
        } catch (error) {
            this.error = error.message;
        }
    },
    methods: {
      async afterAddToCart(data) {
        try {
          const res = await request.postCart(data)
        if(res.status ==='success') {
          console.log('success')
          Toast.fire({
            icon: 'success',
            title: 'Added to cart'
          })
        }
        } catch(error) {
          console.log('error',error)
          Toast.fire({
            icon: 'error',
            title: 'Fail to add to cart'
          })
        }
       
      }
    }
}
</script>
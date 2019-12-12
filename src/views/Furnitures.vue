<template>
    <FurnituresDashboard 
        :initProduct="initProduct"
        :initImages="initImages"
        :initColors="initColors"
    />
</template>

<script>
import Request from '../api';
import FurnituresDashboard from '../components/FurnituresDashborad.vue';
const request = new Request();

export default {
    components: {
        FurnituresDashboard
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
    }
}
</script>
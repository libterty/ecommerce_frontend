<template>
    <b-container class="py-5">
        <div v-if="isShow">
            <AdminProduct
                :initProduct="initProduct"
            />
        </div>
    </b-container>
</template>

<script>
import AdminProduct from '../components/AdminProduct.vue';
import Request from '../api/index';
const request = new Request();

export default {
    components: {
        AdminProduct
    },
    data() {
        return {
            initProduct: {},
            isShow: false
        }
    },
    async created() {
        const res = await request.getAdminSpecificProduct(document.location.pathname);
        if (res.status === 'success') {
            this.initProduct = res.product;
            this.isShow = true;
        }
    }
}
</script>
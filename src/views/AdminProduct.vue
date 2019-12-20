<template>
    <b-container class="py-5">
        <div v-if="isShow">
            <AdminProductBtnGroup
                :initProduct="initProduct"
                @after-product-revise="afterProductRevise"
            />
        </div>
        <div v-if="isShow">
            <AdminProduct
                :initProduct="initProduct"
            />
        </div>
    </b-container>
</template>

<script>
import AdminProduct from '../components/AdminProduct.vue';
import AdminProductBtnGroup from '../components/AdminProductBtnGroup.vue';
import Request from '../api/index';
const request = new Request();

export default {
    name: 'admin-product',
    components: {
        AdminProduct,
        AdminProductBtnGroup
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
    },
    methods: {
        async afterProductRevise(data) {
            const url = document.location.pathname;
            const res = await request.putAdminProduct(url, data);
            console.log('res.status', res.status);
            if (res.status === 200) {
                const res = await request.getAdminSpecificProduct(url)
                this.initProduct = res.product;
            }
        }
    }
}
</script>
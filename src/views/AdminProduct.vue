<template>
    <b-container class="py-5">
        <div v-if="isShow">
            <AdminProductBtnGroup
                :initProduct="initProduct"
                :initColors="initColors"
                @after-product-revise="afterProductRevise"
                @after-color-create="afterColorCreate"
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
            initColors: [],
            isShow: false
        }
    },
    async created() {
        const res = await request.getAdminSpecificProduct(document.location.pathname);
        if (res.status === 'success') {
            this.initProduct = res.product;
            const temp = this.initProduct.inventories;
            let result = [];
            for (let i=0; i<temp.length; i++) {
                result.push(temp[i].name);
            }
            this.initColors = result;
            this.isShow = true;
        }
    },
    methods: {
        async afterProductRevise(data) {
            const url = document.location.pathname;
            const res = await request.putAdminProduct(url, data);
            if (res.status === 200) {
                const res = await request.getAdminSpecificProduct(url)
                this.initProduct = res.product;
            }
        },

        async afterColorCreate(data) {
            const res = await request.postNewColor(data);
            console.log('res.status', res.status);
            if (res.status === 200) {
                const res = await request.getAdminSpecificProduct(document.location.pathname);
                this.initProduct = res.product;
                const temp = this.initProduct.inventories;
                let result = [];
                for (let i=0; i<temp.length; i++) {
                    result.push(temp[i].name);
                }
                this.initColors = result;
            }
        }
    }
}
</script>
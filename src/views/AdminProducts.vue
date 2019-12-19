<template>
    <b-container class="py-5">
        <h1>管理員頁面</h1>
        <b-container class="py-5" v-if="isShow">
            <AdminProductsTable
                :initProducts="initProducts"
            />
        </b-container>
    </b-container>
</template>

<script>
import AdminProductsTable from '../components/AdminProductsTable.vue';
import Request from '../api/index';
const request = new Request();

export default {
    components: {
        AdminProductsTable
    },
    data() {
        return {
            initProducts: [],
            isShow: true
        }
    },
    async created() {
        const res = await request.getAdminHomePage();
        if (res.status === 'success') {
            this.initProducts = res.products.sort((a, b) => b.id - a.id);
            this.isShow = true;
        }
    }
}
</script>
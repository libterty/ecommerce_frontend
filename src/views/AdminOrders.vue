<template>
    <b-container class="py-5">
        <h3>呆帳管理</h3>
        <AdminNav />
        <b-container class="py-5" v-if="isShow">
            <AdminOrdersDetail
                :initOrders="initOrders"
                @after-submit-notify="afterSubmitNotify"
            />
        </b-container>
    </b-container>
</template>

<script>
import AdminNav from '../components/AdminNav.vue';
import AdminOrdersDetail from '../components/AdminOrdersDetail.vue';
import { Toast } from '../utils/helpers';
import Request from '../api/index';
const request = new Request();

export default {
    components: {
        AdminNav,
        AdminOrdersDetail
    },
    data() {
        return {
            initOrders: [],
            isShow: false
        }
    },
    async created() {
        try {
            const res = await request.getAdminOrders();
            if (res.status === 'success') {
                this.initOrders = res.orders;
                this.isShow = true;
            }
        } catch (error) {
            Toast.fire({
                icon: 'warning',
                title: "Something went wrong"
            })
        }
    },
    methods: {
        async afterSubmitNotify(id) {
            try {
                const res = await request.getNotifyOrders(id);
                Toast.fire({
                    icon: `${res.status}`,
                    title: `${res.message}`
                });
            } catch (error) {
                Toast.fire({
                    icon: 'warning',
                    title: "Something went wrong"
                });
            }
        }
    }
}
</script>
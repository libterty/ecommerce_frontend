<template>
    <b-container class="py-5">
        <h1>折價卷資訊</h1>
        <AdminNav />
        <b-container v-if="isShow">
            <AdminCoupons
                :initCoupons="initCoupons"
                @after-submit-create="afterSubmitCreate"
            />
        </b-container>
    </b-container>
</template>

<script>
import AdminNav from '../components/AdminNav.vue';
import AdminCoupons from '../components/AdminCoupons.vue';
import Request from '../api/index';
import { Toast } from '../utils/helpers';
const request = new Request();

export default {
    name: 'admin-coupons',
    components: {
        AdminNav,
        AdminCoupons
    },
    data() {
        return {
            isShow: false,
            initCoupons: []
        }
    },
    async created() {
        try {
            const res = await request.getAdminCoupons();
            if (res.status === 'success') {
                this.initCoupons = res.coupons;
                this.isShow = true;
            }
        } catch (error) {
            Toast.fire({
                icon: 'warning',
                title: 'Something went wrong'
            })
        }
    },
    methods: {
        async afterSubmitCreate(data) {
            try {
                const res = await request.postAdminCoupon(data);
                if (res.status === 'success') {
                    const res = await request.getAdminCoupons();
                    this.initCoupons = res.coupons;
                    this.isShow = true;
                }
            } catch (error) {
                Toast.fire({
                icon: 'warning',
                title: 'Something went wrong'
            })
            }
            
        }
    }
}
</script>
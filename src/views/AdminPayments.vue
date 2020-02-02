<template>
    <b-container class="py-5">
        <AdminNav />
        <b-container class="py-5" v-if="isShow">
            <AdminPayments
                :initPaid="initPaid"
                :initUnpaid="initUnpaid"
                :initPaymentRow="initPaymentRow"
            />
        </b-container>
    </b-container>
</template>

<script>
import AdminNav from '../components/AdminNav.vue';
import AdminPayments from '../components/AdminPayments.vue';
import Request from '../api/index';
import { Toast } from '../utils/helpers';
import moment from 'moment/src/moment';
const request = new Request();

export default {
    components: {
        AdminNav,
        AdminPayments
    },
    data() {
        return {
            isShow: false,
            initPayments: [],
            initPaid: 0,
            initUnpaid: 0,
            initPaymentRow: []
        }
    },
    async created() {
        try {
            const res = await request.getAdminPayments();
            if (res.status === 'success') {
                this.initPayments = res.payments;
                let payments = this.initPayments;
                payments.filter(item => item.payment_status === '未付款').forEach(el => this.initUnpaid += Number(el.total_amount));
                payments.filter(item => item.payment_status === '已付款').forEach(el => this.initPaid += Number(el.total_amount));
                let paid = payments.filter(item => item.payment_status === '已付款');
                let result = [];
                for (let i=0; i<paid.length; i++) {
                    let obj = {};
                    const temp = moment(paid[i].updatedAt.split('T')[0]).month() + 1;
                    obj['月份'] = `${temp}月份`;
                    obj['金額'] = Number(paid[i].total_amount);
                    result.push(obj);
                }
                this.initPaymentRow = result;
                this.isShow = true;
            }
        } catch (error) {
            Toast.fire({
                icon: 'warning',
                title: 'Fetch Payment Fail'
            });
        }
    }
}
</script>
<template>
    <b-container class="py-5">
        <AdminNav />
        <b-container class="py-5" v-if="isShow">
            <AdminPayments />
        </b-container>
    </b-container>
</template>

<script>
import AdminNav from '../components/AdminNav.vue';
import AdminPayments from '../components/AdminPayments.vue';
import Request from '../api/index';
import { Toast } from '../utils/helpers';
import moment from 'moment';
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
            initPaymentObject: {}
        }
    },
    async created() {
        try {
            const res = await request.getAdminPayments();
            if (res.status === 'success') {
                this.initPayments = res.payments;
                let payments = this.initPayments;
                payments.filter(item => item.payment_status === '尚未付款').forEach(el => this.initUnpaid += Number(el.total_amount));
                payments.filter(item => item.payment_status === '已付款').forEach(el => this.initPaid += Number(el.total_amount));
                
                let paid = payments.filter(item => item.payment_status === '已付款');

                for (let i=0; i<paid.length; i++) {
                    const temp = moment(paid[i].paid_at.split('T')[0]).month() + 1;
                    if (!this.initPaymentObject[`${temp}月份`]) {
                        this.initPaymentObject[`${temp}月份`] = Number(paid[i].total_amount);
                    } else {
                        this.initPaymentObject[`${temp}月份`] = this.initPaymentObject[`${temp}月份`] + Number(paid[i].total_amount);
                    }
                }

                this.isShow = true;
            }
        } catch (error) {
            Toast.fire({
                icon: 'warning',
                title: 'Something went wrong'
            });
        }
    }
}
</script>
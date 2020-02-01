<template>
    <b-container class="py-5">
        <ve-pie :data="pieData" :settings="pieSettings">交易收款比率</ve-pie>
        <br/>
        <hr>
        <ve-line :data="lineData" :extend="extend">年交易紀錄</ve-line>
    </b-container>
</template>

<script>
import VeLine from 'v-charts/lib/line.common';
import VePie from 'v-charts/lib/pie.common';


export default {
    name: 'AdminPayments',
    components: { VeLine, VePie },
    props: {
        initPaid: {
            type: Number
        },
        initUnpaid: {
            type: Number
        },
        initPaymentRow: {
            type: Array
        }
    },
    data() {
        this.extend = {
            series: {
                label: {
                    normal: {
                        show: true
                    }
                }
            }
        },
        this.pieSettings = {
            dimension: '狀態',
            metrics: '總金額'
        }
        return {
            lineData: {
                columns: ['月份', '金額'],
                rows: []
            },
            pieData: {
                columns: ['狀態', '總金額'],
                rows: [
                    { '狀態': '未收取金額', '總金額': this.initUnpaid },
                    { '狀態': '已收取金額', '總金額': this.initPaid }
                ]
            }
        }
    },
    created() {
        this.lineData.rows = this.initPaymentRow;
    }
}
</script>
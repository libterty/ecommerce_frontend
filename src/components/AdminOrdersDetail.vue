<template>
    <div>
        <b-table-simple hover small caption-top responsive>
            <b-thead head-variant="dark">
                <b-tr>
                    <b-th colspan="6">基本資訊</b-th>
                    <b-th colspan="5">使用者資訊</b-th>
                </b-tr>
                <b-tr>
                    <b-th colspan="1">#</b-th>
                    <b-th colspan="1">sn單號</b-th>
                    <b-th colspan="1">訂單狀態</b-th>
                    <b-th colspan="1">物流狀態</b-th>
                    <b-th colspan="1">交易狀態</b-th>
                    <b-th colspan="1">交易金額</b-th>
                    <b-th colspan="1">使用者名稱</b-th>
                    <b-th colspan="1">聯絡信箱</b-th>
                    <b-th colspan="1">聯絡地址</b-th>
                    <b-th colspan="1">聯絡電話</b-th>
                    <b-th colspan="1">寄信通知</b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr v-for="order in initOrders" :key="order.id">
                    <b-td class="text-center">{{order.id}}</b-td>
                    <b-td class="text-center">{{order.sn}}</b-td>
                    <b-td class="text-center">{{order.order_status}}</b-td>
                    <b-td class="text-center">{{order.shipping_status}}</b-td>
                    <b-td class="text-center">{{order.payment_status}}</b-td>
                    <b-td class="text-center">{{order.total_amount}}</b-td>
                    <b-td class="text-center">{{order.name}}</b-td>
                    <b-td class="text-center">{{order.email}}</b-td>
                    <b-td class="text-center">{{order.address}}</b-td>
                    <b-td class="text-center">{{order.phone}}</b-td>
                    <b-td class="text-center">
                        <b-button
                            type="button"
                            variant="info"
                            size="sm"
                            @click.stop.prevent="notifyUser(order.id)"
                        >通知使用者</b-button>
                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
    </div>
</template>

<script>
export default {
    name: 'AdminOrdersDetail',
    props: {
        initOrders: {
            type: Array
        }
    },
    methods: {
        notifyUser(id) {
            this.$emit('after-submit-notify', id);
        }
    }
}
</script>
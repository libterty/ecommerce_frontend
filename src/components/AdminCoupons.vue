<template>
    <div>
        <div class="coupon-form">
            <b-form v-if="isShowCreate" @submit.stop.prevent="submitNewCoupon">
                <b-form-group label-cols-sm="3" label="折價卷名稱:" label-align-sm="center" label-for="newCoupon-couponCode-input">
                    <b-form-input
                        id="newCoupon-couponCode-input"
                        v-model="newCoupon.couponCode"
                        :state="newCoupon.couponCode.length > 0"
                        type="text"
                        name="newCoupon-couponCode-input"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-form-group label-cols-sm="3" label="有效次數:" label-align-sm="center" label-for="newCoupon-limitedUsage-input">
                    <b-form-input
                        id="newCoupon-limitedUsage-input"
                        v-model="newCoupon.limitedUsage"
                        :state="newCoupon.limitedUsage > 0"
                        type="number"
                        name="newCoupon-limitedUsage-input"
                        min="1"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-form-group label-cols-sm="3" label="有效期限:" label-align-sm="center" label-for="newCoupon-expireDate-input">
                    <b-form-input
                        id="newCoupon-expireDate-input"
                        v-model="newCoupon.expireDate"
                        type="date"
                        name="newCoupon-expireDate-input"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-form-group label-cols-sm="3" label="折扣率:" label-align-sm="center" label-for="newCoupon-percent-input">
                    <b-form-input
                        id="newCoupon-percent-input"
                        v-model="newCoupon.percent"
                        :state="newCoupon.percent > 0"
                        type="number"
                        name="newCoupon-percent-input"
                        min="5"
                        max="95"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-button-group>
                    <b-button type="submit" variant="success" size="lg">Submit</b-button>
                    <b-button type="button" @click="isShowCreate=false" variant="info" size="lg" style="margin-left: 0.25rem;">Close</b-button>
                </b-button-group>
            </b-form>
        </div>

        <b-table-simple hover small caption-top responsive>
            <b-thead head-variant="dark">
                <b-tr>
                    <b-th colspan="5">基本資訊</b-th>
                    <b-th colspan="2">操作</b-th>
                </b-tr>
                <b-tr>
                    <b-th colspan="1">#</b-th>
                    <b-th colspan="1">折價卷名稱</b-th>
                    <b-th colspan="1">有效日期</b-th>
                    <b-th colspan="1">剩餘有效次數</b-th>
                    <b-th colspan="1">折扣率 (％)</b-th>
                    <b-th colspan="1">修改</b-th>
                    <b-th colspan="1">刪除</b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr
                    v-for="coupon in initCoupons"
                    :key="coupon.id"
                >
                    <b-td class="text-center">{{coupon.id}}</b-td>
                    <b-td class="text-center">{{coupon.coupon_code}}</b-td>
                    <b-td class="text-center">{{coupon.expire_date | convetTime}}</b-td>
                    <b-td class="text-center">{{coupon.limited_usage | isUsage}}</b-td>
                    <b-td class="text-center">{{coupon.percent | isPercentage}}</b-td>
                    <b-td class="text-center">
                        <b-button type="button" variant="warning" size="sm">修改</b-button>
                    </b-td>
                    <b-td class="text-center">
                        <b-button type="button" variant="danger" size="sm">刪除</b-button>
                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>

        <b-button @click="isShowCreate=true">Create New Coupon</b-button>
    </div>
</template>

<script>
import { Toast } from '../utils/helpers';

export default {
    props: {
        initCoupons: {
            type: Array
        }
    },
    filters: {
        isUsage(number) {
            if (!number) return '無限制';
            return number;
        },
        isPercentage(number) {
            if (!number) return '350元';
            return number + '%';
        },
        convetTime(time) {
            if (!time) return;
            return time.split('T')[0];
        }
    },
    data() {
        return {
            isShowCreate: false,
            newCoupon: {
                couponCode: '',
                limitedUsage: 0,
                expireDate: '',
                percent: 0
            }
        }
    },
    methods: {
        checkDate(chooseTime) {
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth() + 1;
            const currentDate = new Date().getDate();
            const unixTime = new Date(currentYear + '-' + currentMonth + '-' + currentDate).getTime();
            const userChoose = new Date(chooseTime).getTime();
            if (userChoose < unixTime) {
                return false;
            }
            return true;
        },
        submitNewCoupon(){
            if (this.newCoupon.couponCode.length < 1) {
                return Toast.fire({ icon: 'error', title: 'Wrong Input Detected' });
            }
            if (this.newCoupon.limitedUsage < 1) {
                return Toast.fire({ icon: 'error', title: 'Wrong Input Detected' });
            }
            if (this.newCoupon.percent < 5 || this.newCoupon.percent > 95) {
                return Toast.fire({ icon: 'error', title: 'Wrong Input Detected' });
            }
            if (!this.checkDate(this.newCoupon.expireDate)) {
                return Toast.fire({ icon: 'error', title: 'Wrong Limited Time selected' });
            }
            const data = JSON.stringify(this.newCoupon);
            this.$emit('after-submit-create', data);
        }
    },
    watch: {
        initCoupons: function(updateData) {
            this.initCoupons = updateData;
        }
    }
}
</script>

<style scoped>
.coupon-form {
    margin-bottom: 2rem;
}
</style>
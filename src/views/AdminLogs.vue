<template>
    <b-container class="py-5">
        <h1>系統日誌</h1>
        <AdminNav />
        <b-container v-if="isShow">
            <AdminLogs
                :initLogs="initLogs"
            />
        </b-container>
    </b-container>
</template>

<script>
import AdminNav from '../components/AdminNav.vue';
import AdminLogs from '../components/AdminLogs.vue';
import Request from '../api/index';
import { Toast } from '../utils/helpers';
const request = new Request();

export default {
    components: {
        AdminNav,
        AdminLogs
    },
    data() {
        return {
            isShow: false,
            initLogs: []
        }
    },
    async created() {
        try {
            const res = await request.getLogs();
            if (res.status === 'success') {
                this.initLogs = res.logs;
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
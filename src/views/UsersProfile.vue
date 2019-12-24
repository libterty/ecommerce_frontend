<template>
    <b-container class="py-5">
        <div v-if="isShow">
            <UsersProfile
                :initUser="initUser"
                @after-submit-profile="afterSubmitProfile"
            />
        </div>
    </b-container>
</template>

<script>
import UsersProfile from '../components/UsersProfile.vue';
import Request from '../api/index';
const request = new Request();

export default {
    components: {
        UsersProfile
    },
    data() {
        return {
            initUser: {},
            isShow: false
        }
    },
    async created() {
        const path = document.location.pathname.replace(/\//, '');
        const res = await request.getUser(path);
        if (res.status === 'success') {
            this.initUser = res.user;
            this.isShow = true;
        }
    },
    methods: {
        async afterSubmitProfile(formData) {
            const path = document.location.pathname.replace(/\//, '');
            const res = await request.putUser(path, formData);
            if (res.status === 'success') {
                const res = await request.getUser(path);
                this.initUser = res.user;
                this.isShow = true;
            }
        } 
    }
}
</script>
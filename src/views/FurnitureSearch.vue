<template>
    <b-container class="py-5" v-if="isShow">
        <h2>您的收尋結果{{searchResult}}如下</h2>
        <br/>
        <hr/>
        <div class="row">
            <FurnitureSearch
                v-for="initSearchProuct in initSearchProucts"
                :key="initSearchProuct.id"
                :initSearchProuct="initSearchProuct"
            />
        </div>
        <br/>
        <br/>
        <a href="javascript:history.back()">回上一頁</a>
    </b-container>
</template>

<script>
import FurnitureSearch from '../components/FurnitureSearch.vue';
import Request from '../api/index';
import { Toast } from '../utils/helpers';
const request = new Request();

export default {
    name: 'furnitures-Search',
    components: {
        FurnitureSearch
    },
    data() {
        return {
            isShow: false,
            initSearchProucts: [],
            searchResult: decodeURI(document.location.search).split('=')[1]
        }
    },
    async created() {
        try {
            const res = await request.getSearchNav(document.location.search);
            if (res.status === 'success') {
                this.initSearchProucts = res.products;
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
</script>
<template>
    <b-container class="py-5">
        <FurnituresPaginationNavPills 
            v-if="isShow" 
            :initCategories="initCategories"
            :isPageChange="isPageChange"
            @after-submit-category="afterSubmitCategory"
        />
        <div class="row" v-if="isShow">
            <FurnituresPaginationItem
                v-for="initProduct in initProducts"
                :key="initProduct.id"
                :initProduct="initProduct"
            />
        </div>
        <FurnituresPagination
            v-if="isShow"
            :initTotalPage="initTotalPage"
            :isCategoryChange="isCategoryChange"
            @after-submit-page="afterSubmitPage"
        />
    </b-container>
</template>

<script>
import FurnituresPaginationNavPills from '../components/FurnituresPaginationNavPills.vue';
import FurnituresPaginationItem from '../components/FurnituresPaginationItem.vue';
import FurnituresPagination from '../components/FurnituresPagination.vue';
import Request from '../api/index';
import { Toast } from '../utils/helpers';
const request = new Request();

export default {
    name: 'FurniturePagination',
    components: {
        FurnituresPaginationNavPills,
        FurnituresPaginationItem,
        FurnituresPagination
    },
    data() {
        return {
            initProducts: [],
            initCategories: [],
            initTotalPage: [],
            isPageChange: false,
            isCategoryChange: false,
            isShow: false
        }
    },
    async created() {
        try {
            const res = await request.getProducts();
            if (res.status === 'success') {
                this.initProducts = res.products;
                this.initCategories = res.categories;
                this.initTotalPage = res.totalPage;
                this.isShow = true;
            }
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: error.message
            })
        }
    },
    methods: {
        async afterSubmitCategory(search) {
            try {
                const res = await request.getSearchProducts(search);
                if (res.status === 'success') {
                    this.initProducts = res.products;
                    this.isCategoryChange = !this.isCategoryChange;
                    this.isShow = true;
                }
            } catch (error) {
                Toast.fire({
                    icon: 'error',
                    title: error.message
                })
            }
        },
        async afterSubmitPage(pageId) {
            let page;
            try {
                pageId === 1 ? page = '' : page = `?page=${pageId}`;
                const res = await request.getSearchProducts(page);
                if (res.status === 'success') {
                    this.initProducts = res.products;
                    this.isPageChange = !this.isPageChange;
                    this.isShow = true;
                }
            } catch (error) {
                Toast.fire({
                    icon: 'error',
                    title: error.message
                })
            }
        }
    }
}
</script>
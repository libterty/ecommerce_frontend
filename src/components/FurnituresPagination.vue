<template>
    <div class="overflow-auto">
        <b-pagination-nav 
            :link-gen="linkGen"
            :number-of-pages="length"
            :base-url="BASE_URL"
            v-model="currnetPage"
            align="center"
            @input="onInput"
            use-router
        ></b-pagination-nav>
    </div>
</template>

<script>
import config from '../config';

export default {
    name: 'RestaurantsPagination',
    props: {
        initTotalPage: {
            type: Array
        },
        isCategoryChange: {
            type: Boolean
        }
    },
    data() {
        return {
            length: 1,
            BASE_URL: config.ROOT_URL,
            currnetPage: 1
        }
    },
    async created() {
        this.length = this.initTotalPage.length;
    },
    methods: {
        linkGen(pageNum) {
            return pageNum === 1 ? '?' : `?page=${pageNum}`;
        },
        onInput() {
            this.$emit('after-submit-page', this.currnetPage);
        }
    },
    watch: {
        isCategoryChange: function(updateData) {
            this.isCategoryChange = updateData;
            return this.currnetPage = 1;
        }
    }
}
</script>
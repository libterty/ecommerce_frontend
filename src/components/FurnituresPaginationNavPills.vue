<template>
    <div>
        <b-card title="nav-pill" no-body>
            <b-card-header header-tag="nav">
                <b-nav card-header tabs align="center">
                    <b-nav-item href="/furnitures" :active="id === 0">
                        全部
                    </b-nav-item>
                    <b-nav-item
                        v-for="category in initCategories"
                        :key="category.id"
                        @click.stop.prevent="onClickCategory(category.id)"
                        :active="category.id | isActive(id)"
                    >
                        {{category.name}}
                    </b-nav-item>
                </b-nav>
            </b-card-header>
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'FurnituresPaginationNavPills',
    props: {
        initCategories: {
            type: Array
        },
        isPageChange: {
            type: Boolean
        }
    },
    filters: {
        isActive(categoryId, id) {
            if (categoryId === id) return true;
            return false;
        }
    },
    data() {
        return {
            path: document.location.search,
            id: 0
        }
    },
    methods: {
        onClickCategory(id) {
            const path = '?categoryId='+ id;
            this.id = id;
            this.$emit('after-submit-category', path);
        }
    },
    watch: {
        isPageChange: function(updateData) {
            this.isPageChange = updateData;
            return this.id = 0;
        }
    }
}
</script>
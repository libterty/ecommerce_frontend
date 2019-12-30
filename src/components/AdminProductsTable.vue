<template>
    <div>
        <b-table-simple hover small caption-top responsive>
            <b-thead head-variant="dark">
                <b-tr>
                    <b-th colspan="6">基本資訊</b-th>
                    <b-th colspan="3">尺寸</b-th>
                    <b-th colspan="2">更多資訊</b-th>
                </b-tr>
                <b-tr>
                    <b-th colspan="1">#</b-th>
                    <b-th colspan="1">名稱</b-th>
                    <b-th colspan="1">成本</b-th>
                    <b-th colspan="1">售價</b-th>
                    <b-th colspan="1">關注度</b-th>
                    <b-th colspan="1">庫存</b-th>
                    <b-th colspan="1">長</b-th>
                    <b-th colspan="1">寬</b-th>
                    <b-th colspan="1">高</b-th>
                    <b-th colspan="1">前往商品頁面</b-th>
                    <b-th colspan="1">刪除商品</b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr
                    v-for="product in initProducts"
                    :key="product.id"
                >
                    <b-td class="text-center">{{product.id}}</b-td>
                    <b-td class="text-center">{{product.name}}</b-td>
                    <b-td class="text-center">{{product.cost}}</b-td>
                    <b-td class="text-center">{{product.price}}</b-td>
                    <b-td class="text-center">{{product.viewCounts}}</b-td>
                    <b-td class="test-center">
                        <b-list-group v-for="inventory in product.inventories" :key="inventory.id">
                            <b-list-group-item class="text-center" style="border: none;">
                                <strong>{{inventory.name | convertLanguage}} : </strong>
                                <small>{{inventory.Inventory.quantity}} (個)</small>
                            </b-list-group-item>
                        </b-list-group>
                    </b-td>
                    <b-td class="text-center">{{product.length}}</b-td>
                    <b-td class="text-center">{{product.width}}</b-td>
                    <b-td class="text-center">{{product.height}}</b-td>
                    <b-td class="text-center">
                        <a :href="'/admin/products/'+product.id">More Info</a>
                    </b-td>
                    <b-td class="text-center">
                        <b-button
                            type="button"
                            size="sm"
                            variant="danger"
                            @click.stop.prevent="deleteProduct(product.id)"
                        >刪除</b-button>
                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
    </div>
</template>

<script>
export default {
    props: {
        initProducts: {
            type: Array
        }
    },
    filters: {
        convertLanguage(string) {
            if (string === 'blue') {
                return '藍色';
            } else if (string === 'black') {
                return '黑色';
            } else if (string === 'white') {
                return '白色';
            } else if (string === 'yellow') {
                return '黃色';
            } else {
                return '';
            }
        }
    },
    data() {
        return {
            inventories: 0,
            isRow: false
        }
    },
    methods: {
        deleteProduct(id) {
            this.$emit('after-delete-product', id);
        }
    },
    watch: {
        initProducts: function(updateData) {
            this.initProducts = updateData;
        }
    }
}
</script>
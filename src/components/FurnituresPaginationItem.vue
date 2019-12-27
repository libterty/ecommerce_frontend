<template>
    <div class="col-md-6 col-lg-4">
        <b-card-group deck>
            <b-card
                :title="initProduct.name"
                :sub-title="initProduct.Category.name"
                tag="article"
                class="mb-2"
            >
                <b-card-img-lazy :src="initProduct.Images[0].url" :alt="initProduct.name" top></b-card-img-lazy>
                <b-card-text>{{ initProduct.description | shortenDesc }}</b-card-text>
                <template v-slot:footer>
                    <b-button-group>
                        <b-button :href="'/furnitures/'+ initProduct.id" variant="primary">Visit {{initProduct.name}}</b-button>
                        <b-button variant="primary" disabled>
                            關注度
                            <b-badge variant="light">{{initProduct.viewCounts + 1}}</b-badge>
                        </b-button>
                    </b-button-group>
                </template>
            </b-card>
        </b-card-group>
    </div>
</template>

<script>
export default {
    name: 'FurnituresPaginationItem',
    props: {
        initProduct: {
            type: Object
        }
    },
    filters: {
        shortenDesc(d) {
            if (!d) return 'No description yet';
            return d.substring(0, 50);
        }
    },
    watch: {
        initProduct: function(updateData) {
            this.initProduct = updateData;
        }
    }
}
</script>
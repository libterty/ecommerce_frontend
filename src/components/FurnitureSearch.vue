<template>
    <div class="col-md-6 col-lg-4">
        <b-card-group deck>
            <b-card
                :title="initSearchProuct.name"
                :sub-title="initSearchProuct.Category.name"
                tag="article"
                class="mb-2"
            >
                <b-card-img-lazy :src="initSearchProuct.Images[0].url" :alt="initSearchProuct.name" top></b-card-img-lazy>
                <b-card-text>{{ initSearchProuct.description | shortenDesc }}</b-card-text>
                <template v-slot:footer>
                    <b-button-group>
                        <b-button :href="'/furnitures/'+ initSearchProuct.id" variant="primary">Visit {{initSearchProuct.name}}</b-button>
                        <b-button variant="primary" disabled>
                            關注度
                            <b-badge variant="light">{{initSearchProuct.viewCounts + 1}}</b-badge>
                        </b-button>
                    </b-button-group>
                </template>
            </b-card>
        </b-card-group>
    </div>
</template>

<script>
export default {
    props: {
        initSearchProuct: {
            type: Object
        }
    },
    filters: {
        shortenDesc(d) {
            if (!d) return 'No description yet';
            return d.substring(0, 50);
        }
    }
}
</script>
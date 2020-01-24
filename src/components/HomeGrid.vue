<template>
    <b-container fluid>
        <b-row class="mb-3 Home_Grid">
            <b-img-lazy
                v-for="product in initProducts"
                :key="product.id"
                class="Home_Grid_Image item"
                :src="product.Image"
                :alt="product.name"
            />
        </b-row>
    </b-container>
</template>

<script>
export default {
    props: {
        initProducts: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
*,
*:before,
*:after {
  box-sizing: inherit;
}
.Home_Grid {
  column-count: 4;
  margin: 0.5em auto;
  column-gap: 0.5em;
}
.item {
    margin: 0 0 0.5rem;
    padding: 0.5em;
    width: 33.333%;
}
</style>
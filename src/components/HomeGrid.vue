<template>
    <b-container fluid>
        <b-row class="mb-3 Home_Grid">
                <img
                    class="Home_Grid_Image_1"
                    :src="initProducts[0].Image"
                />
                <img
                    class="Home_Grid_Image_2"
                    :src="initProducts[1].Image"
                />
                <img
                    class="Home_Grid_Image_3"
                    :src="initProducts[2].Image"
                />
                <img
                    class="Home_Grid_Image_4"
                    :src="initProducts[3].Image"
                />
                <img
                    class="Home_Grid_Image_5"
                    :src="initProducts[4].Image"
                />
                <img
                    class="Home_Grid_Image_6"
                    :src="initProducts[5].Image"
                />
        </b-row>
    </b-container>
</template>

<script>
export default {
    props: {
        initProducts: {
            required: true
        }
    }
}
</script>

<style scoped>
.Home_Grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(33.3333%,1fr));
    grid-template-rows: repeat(auto-fill, minmax(25%,1fr));
}
.Home_Grid_Image_1 {
    grid-column: 1/2;
    grid-row: 1/4
}
.Home_Grid_Image_2 {
    grid-column: 2/3;
    grid-row: 1/2
}
.Home_Grid_Image_3 {
    grid-column: 3/4;
    grid-row: 1/4
}
.Home_Grid_Image_4 {
    grid-column: 1/2;
    grid-row: 4/5
}
.Home_Grid_Image_5 {
    grid-column: 2/3;
    grid-row: 2/5
}
.Home_Grid_Image_6 {
    grid-column: 3/4;
    grid-row: 4/5
}
</style>
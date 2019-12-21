<template>
    <div class="home-recommend images" v-viewer="{movable: false}">
        <b-img-lazy
            v-for="image in initCarousels" 
            :key="image.id" 
            :src="image.Image" 
            class="home-recommend-item"
            v-b-popover.hover.top="image.name"
            fluid-grow
            thumbnail
        ></b-img-lazy>
    </div>
</template>

<script>
export default {
    props: {
        initCarousels: {
            required: true
        }
    },
    data() {
        return {
            sliding: null
        }
    },
    methods: {
        onSlideStart() {
            this.sliding = true
        },
        onSlideEnd() {
            this.sliding = false
        }
    }
}
</script>

<style scoped>
.w-100 {
    max-height: 450px;
}
.image-overlay {
    width: 1024px;
    height: 480px;
    position: absolute;
    background-color: #cccccc;
    opacity: 0.5;
}
.home-recommend {
    display: flex; 
    flex-flow: row nowrap;
    overflow-x: scroll;
}

.home-recommend-item {
    width: 50%;
    height: auto;
    margin-left: 0.25rem;
    border: 1px solid #000;
    max-height: 160px;
}
</style>
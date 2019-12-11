<template>
    <div>
        <b-carousel
            id="carousel-1"
            :interval="5000"
            controls
            indicators
            background="#ccc"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
        >
            <b-carousel-slide
                v-for="carousel in initCarousels"
                :key="carousel.id"
                img-blank-color='transparent'
            >
                <template v-slot:img>
                    <div class="image-overlay"></div>
                    <img
                        class="d-block img-fluid w-100"
                        width="1024"
                        height="480"
                        :src="carousel.Image"
                        :alt="carousel.name"
                    >
                </template>
            </b-carousel-slide>
        </b-carousel>
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
</style>
<template>
    <v-footer color="primary lighten-1" padless fixed>
        <v-row justify="center" no-gutters>
            <v-btn
                v-for="icon in icons"
                :key="icon"
                class="mx-4 white--text"
                icon
            >
                <v-icon size="24px">{{ icon }}</v-icon>
            </v-btn>
            <v-col
                class="primary lighten-2 py-4 text-center white--text"
                cols="12"
            >
                © {{ new Date().getFullYear() }} — <strong>MAYNOOTH | All Rights Reserved.</strong>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script>
export default {
    data() {
        return {
            icons: [
                'fab fa-facebook',
                'fab fa-twitter',
                'fab fa-google-plus',
                'fab fa-linkedin',
                'fab fa-instagram',
            ]
        }
    }
}
</script>

<style scoped>
.footer-flex {
    display: flex;
    flex-direction: column;
    background-color: #1fc8e3;
}
#wrapper-footer {
    min-height: 108px;
    max-height: 108px;
}
</style>
<template>
    <div>
        <b-navbar toggleable="lg" type="light" fixed="bottom" sticky class="footer-flex">
            <b-container fluid>
                <b-row>
                    <b-col md="12">
                        <div class="mb-5 flex-center">
                            <a class="fb-ic"><i class="fab fa-facebook fa-lg white-text mr-md-5 mr-3 fa-2x"> </i></a>
                            <a class="tw-ic"><i class="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"> </i></a>
                            <a class="gplus-ic"><i class="fab fa-google-plus fa-lg white-text mr-md-5 mr-3 fa-2x"> </i></a>
                            <a class="li-ic"><i class="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"> </i></a>
                            <a class="ins-ic"><i class="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i></a>
                            <a class="pin-ic"><i class="fab fa-pinterest fa-lg white-text fa-2x"> </i></a>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
            <div class="footer-copyright text-center py-3">
                <b-container>
                    &copy; 2019 Copyright: <a href="#"> e-commerce.com </a>
                </b-container>
            </div>
        </b-navbar>
    </div>
</template>

<style scoped>
.footer-flex {
    display: flex;
    flex-direction: column;
    background-color: #1fc8e3;
}
</style>
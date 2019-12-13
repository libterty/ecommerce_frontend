<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" fixed sticky>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">NavBar</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav left>
          <b-nav-item href="#">Promotion</b-nav-item>
          <b-nav-item href="#">Space</b-nav-item>
          <b-nav-item href="#">Furniture</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <b-nav-item href="#">Inspiration</b-nav-item>
            <b-nav-item href="#">About</b-nav-item>
          </b-navbar-nav>
          <b-nav-form class="Navbar-search">
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
          <b-navbar-nav>
            <b-nav-item href="#">
              <i class="material-icons">
                <small>email</small>
              </i>
            </b-nav-item>
            <b-nav-item href="#">
              <i class="material-icons">
                <small>person</small>
              </i>
            </b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mdiEmailOutline, mdiAccount } from '@mdi/js';

export default {
    data() {
        return {
            emailSvg: mdiEmailOutline,
            userSvg: mdiAccount
        }
    }
}
</script>
<style scoped>
@media screen and (max-width: 992px) {
    .Navbar-search {
        align-self: center;
    }

    .form-inline {
        flex-flow: row nowrap;
    }
}
</style>
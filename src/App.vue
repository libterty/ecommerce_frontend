<template>
  <div id="app">
    <v-app>
      <Navbar />
      <router-view />
      <Footer />
    </v-app>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  data() {
    return {}
  },
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
#app {
  font-family: 'Noto Sans TC', 'Avenir';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

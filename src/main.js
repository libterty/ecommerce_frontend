import Vue from 'vue';
import App from './App.vue';
import router from './router';
import BootstrapVue from 'bootstrap-vue/src';
import Viewer from 'v-viewer';
import vuetify from '@/plugins/vuetify';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'viewerjs/dist/viewer.css';
import store from './store'

Vue.use(BootstrapVue);
Vue.use(Viewer);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app');
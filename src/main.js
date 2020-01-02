import Vue from 'vue';
import App from './App.vue';
import router from './router';
import BootstrapVue from 'bootstrap-vue';
import Viewer from 'v-viewer';
import vuetify from '@/plugins/vuetify';
import VCharts from 'v-charts';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'viewerjs/dist/viewer.css';
import store from './store'

Vue.use(BootstrapVue);
Vue.use(Viewer);
Vue.use(VCharts);
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app');
import Vue from 'vue';
import App from './App.vue';

import axois from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import isoTimeConvert from './filters/isoTimeConvert.js';

Vue.config.productionTip = false;

// Axios
Vue.use(VueAxios, axois);

// Global Loading component
Vue.component('Loading', Loading);

// Filter
Vue.filter('isoTimeConvert', isoTimeConvert);

new Vue({
  render: (h) => h(App)
}).$mount('#app');

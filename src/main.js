import Vue from 'vue';
import App from './App.vue';

import 'bootstrap/dist/js/bootstrap.bundle.js';
import axois from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import animated from 'animate.css';
import WOW from 'wow.js';
import isoTimeConvert from './filters/isoTimeConvert.js';

Vue.config.productionTip = false;

// Axios
Vue.use(VueAxios, axois);

// Global Loading component
Vue.component('Loading', Loading);

// animated.css & wow.js
Vue.use(animated);
new WOW({
  boxClass: 'wow',
  animateClass: 'animated',
  offset: 75,
  mobile: true,
  live: true,
  resetAnimation: true
}).init();

// Filter
Vue.filter('isoTimeConvert', isoTimeConvert);

new Vue({
  render: (h) => h(App)
}).$mount('#app');

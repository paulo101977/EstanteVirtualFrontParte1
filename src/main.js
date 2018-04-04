// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

/* eslint-disable */

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import BootstrapVue from 'bootstrap-vue';
import VueTheMask from 'vue-the-mask';
import axios from 'axios'


import Vue from 'vue';
import App from './App';
import router from './router';

Vue.prototype.$http = axios;


Vue.use(VueTheMask);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
     App
   },
  template: '<App/>',
});

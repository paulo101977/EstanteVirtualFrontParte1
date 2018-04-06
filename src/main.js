// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

/* eslint-disable */

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import BootstrapVue from 'bootstrap-vue';
import VueTheMask from 'vue-the-mask';
//import fetch from 'fetch'
import axios from 'axios'

import Vue from 'vue';
import App from './App';
import router from './router';

import VueSkycons from 'vue-skycons'
import ModalMaps from '@/components/ModalMaps'
import WeatherLoader from '@/components/WeatherLoader'


console.log(Vue.$http)

//attach the axios/fetch to scope of the application
Vue.prototype.$http = axios;

//axios.headers.common['Access-Control-Allow-Origin'] = '*'

//use external libs
Vue.use(VueSkycons, { color: 'orangered' })
Vue.use(VueTheMask);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

/* my custom components */
Vue.component('modal-maps', ModalMaps)
Vue.component('weather-loader', WeatherLoader)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
     App
   },
  template: '<App/>',
});

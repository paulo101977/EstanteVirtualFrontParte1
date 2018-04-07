// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

/* eslint-disable */

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-awesome/icons'
import BootstrapVue from 'bootstrap-vue';
import VueTheMask from 'vue-the-mask';
import Icon from 'vue-awesome/components/Icon'
import axios from 'axios'
import VueCookie from 'vue-cookie';

import Vue from 'vue';
import App from './App';
import router from './router';

import VueSkycons from 'vue-skycons';

//import custom components
import ModalMaps from '@/components/ModalMaps';
import WeatherLoader from '@/components/WeatherLoader';
import DistanceCep from '@/components/DistanceCep';



//import the db
import db from './db/'

//import the vuex store
import store from './store/'


//attach the axios/fetch to scope of the application
Vue.prototype.$http = axios;

//the database
Vue.prototype.$db_obj = db;

//use external libs
Vue.use(VueSkycons, { color: 'orangered' })
Vue.use(VueTheMask);
Vue.use(BootstrapVue);
Vue.use(VueCookie);
Vue.component('icon', Icon)

Vue.config.productionTip = false;

/* my custom components */
Vue.component('modal-maps', ModalMaps)
Vue.component('weather-loader', WeatherLoader)
Vue.component('distance-cep', DistanceCep)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store, //append the store to application
  router,
  components: {
     App
   },
  template: '<App/>',
});

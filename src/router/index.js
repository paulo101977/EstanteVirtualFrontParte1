import Vue from 'vue';
import Router from 'vue-router';
import Cep from '@/components/Cep';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Cep',
      component: Cep,
    },
  ],
});

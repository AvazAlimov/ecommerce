import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      meta: { requiresAuth: true },
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
    },
  ],
});

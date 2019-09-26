import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: () => import('./views/auth/SignIn.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/auth/SignUp.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
  ],
});

import Vue from 'vue';
import Router from 'vue-router';

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
      component: () => import('./views/Categories.vue'),
    },
    {
      path: '/brands',
      name: 'brands',
      component: () => import('./views/Brands.vue'),
    },
    {
      path: '/basket',
      name: 'basket',
      component: () => import('./views/Basket.vue'),
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('./views/Product.vue'),
    },
  ],
});

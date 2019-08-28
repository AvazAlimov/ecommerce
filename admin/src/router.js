import Vue from 'vue';
import Router from 'vue-router';
import statistics from './views/statistics/router';
import categories from './views/categories/router';
import brands from './views/brands/router';
import products from './views/products/router';
import customers from './views/customers/router';
import orders from './views/orders/router';
import feedbacks from './views/feedbacks/router';
import prices from './views/prices/router';
import settings from './views/settings/router';

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
      redirect: { name: 'statistics' },
      component: () => import('./views/Home.vue'),
      children: [
        statistics,
        categories,
        brands,
        products,
        customers,
        orders,
        feedbacks,
        prices,
        settings,
      ],
    },
  ],
});

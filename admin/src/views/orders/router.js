const name = 'orders';
export default {
  path: name,
  component: () => import('@/layout/Container.vue'),
  children: [
    {
      path: '',
      name,
      component: () => import('./Orders.vue'),
    },
  ],
};

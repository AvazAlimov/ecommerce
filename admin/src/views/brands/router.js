const name = 'brands';
export default {
  path: name,
  component: () => import('@/layout/Container.vue'),
  children: [
    {
      path: '',
      name,
      component: () => import('./Brands.vue'),
    },
  ],
};

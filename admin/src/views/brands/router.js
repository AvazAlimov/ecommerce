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
    {
      path: 'add',
      name: `${name}.add`,
      component: () => import('./Brand.vue'),
    },
    {
      path: ':id',
      name: `${name}.edit`,
      component: () => import('./Brand.vue'),
    },
  ],
};

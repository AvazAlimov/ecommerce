const name = 'products';
export default {
  path: name,
  component: () => import('@/layout/Container.vue'),
  children: [
    {
      path: '',
      name,
      component: () => import('./Products.vue'),
    },
    {
      path: 'add',
      name: `${name}.add`,
      component: () => import('./Product.vue'),
    },
    {
      path: ':id',
      name: `${name}.edit`,
      component: () => import('./Product.vue'),
    },
  ],
};

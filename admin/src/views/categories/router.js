const name = 'categories';
export default {
  path: name,
  component: () => import('@/layout/Container.vue'),
  children: [
    {
      path: '',
      name,
      component: () => import('./Categories.vue'),
      children: [
        {
          path: 'add',
          name: `${name}.add`,
          component: () => import('./Category.vue'),
        },
        {
          path: ':id',
          name: `${name}.edit`,
          component: () => import('./Category.vue'),
        },
      ],
    },
  ],
};

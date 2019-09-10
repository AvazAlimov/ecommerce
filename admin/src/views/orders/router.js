const name = 'orders';
export default {
  path: name,
  component: () => import('@/layout/Container.vue'),
  children: [
    {
      path: '',
      name,
      redirect: { name: `${name}.pending` },
      component: () => import('./Orders.vue'),
      children: [
        {
          path: 'pending',
          name: `${name}.pending`,
          component: () => import('./Pending.vue'),
        },
        {
          path: 'finished',
          name: `${name}.finished`,
          component: () => import('./Finished.vue'),
        },
        {
          path: 'new',
          name: `${name}.new`,
          component: () => import('./New.vue'),
        },
      ],
    },
  ],
};

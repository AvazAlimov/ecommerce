const name = 'customers';
export default {
  path: name,
  component: () => import('@/layout/Container.vue'),
  children: [
    {
      path: '',
      name,
      component: () => import('./Customers.vue'),
    },
    {
      path: 'add',
      name: `${name}.add`,
      component: () => import('./Customer.vue'),
    },
    {
      path: ':id',
      name: `${name}.edit`,
      component: () => import('./Customer.vue'),
    },
  ],
};

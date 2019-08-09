const name = 'feedbacks';
export default {
  path: name,
  component: () => import('@/layout/Container.vue'),
  children: [
    {
      path: '',
      name,
      component: () => import('./Feedbacks.vue'),
    },
  ],
};

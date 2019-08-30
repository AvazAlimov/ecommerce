import Vue from 'vue';

Vue.prototype.$getPageCount = pagination => (
  pagination
    ? parseInt(pagination.total / pagination.limit, 10) + (pagination.total % pagination.limit > 0)
    : 0
);

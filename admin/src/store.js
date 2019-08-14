import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from './plugins/feathers';

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: 'id', enableEvents: true });

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default new Vuex.Store({
  plugins: [
    service('users', { paginate: true }),
    service('categories', { paginate: false }),
    service('languages', { paginate: false }),
    service('brands', { paginate: false }),
    service('products', { paginate: true }),
    auth({ userService: 'users' }),
  ],
});

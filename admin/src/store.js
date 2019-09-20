import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from './plugins/feathers';

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: 'id', enableEvents: true });

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default new Vuex.Store({
  plugins: [
    service('users'),
    service('categories'),
    service('languages'),
    service('brands'),
    service('products', { pagination: false }),
    service('uploads'),
    service('prices'),
    service('orders'),
    auth({ userService: 'users' }),
  ],
});

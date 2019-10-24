import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from './plugins/feathers';
import basket from './store/basket';
import saved from './store/saved';

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: 'id', enableEvents: true });

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default new Vuex.Store({
  modules: {
    basket,
    saved,
  },
  plugins: [
    service('users'),
    service('categories'),
    service('brands'),
    service('products'),
    service('orders'),
    auth({ userService: 'users' }),
  ],
});

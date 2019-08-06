import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './registerServiceWorker';
import './plugins/veevalidate';
import './styles/app.css';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('auth/authenticate')
      .then(() => next())
      .catch(() => next({ name: 'login' }));
  } else {
    next();
  }
});

// eslint-disable-next-line no-new
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');

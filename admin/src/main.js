import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import i18n from './i18n';
import './registerServiceWorker';
import './plugins/veevalidate';
import './plugins/moment';
import './plugins/editor';
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
  i18n,
  render: h => h(App),
}).$mount('#app');

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import './registerServiceWorker';
import './plugins/numerals';
import './plugins/veevalidate';
import './styles/app.scss';

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

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');

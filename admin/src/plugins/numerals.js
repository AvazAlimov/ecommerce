import Vue from 'vue';
import VueNumerals from 'vue-numerals';

Vue.use(VueNumerals); // default locale is 'en'

// with options
Vue.use(VueNumerals, {
  locale: 'ru',
});

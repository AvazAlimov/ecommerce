/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import Vue from 'vue';

const state = {
  items: JSON.parse(localStorage.getItem('items')) || [],
};

const getters = {

};

const mutations = {
  add(state, item) {
    item.quantity = 1;
    state.items.push(item);
    this.commit('basket/save');
  },
  remove(state, index) {
    state.items.splice(index, 1);
    this.commit('basket/save');
  },
  increment(state, index) {
    state.items[index].quantity += 1;
    this.commit('basket/save');
  },
  decrement(state, index) {
    state.items[index].quantity -= 1;
    if (state.items[index].quantity === 0) { this.commit('basket/remove', index); }
    this.commit('basket/save');
  },
  save(state) {
    localStorage.setItem('items', JSON.stringify(state.items));
    Vue.set(state, 'items', [...JSON.parse(localStorage.getItem('items'))]);
  },
};

const actions = {

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

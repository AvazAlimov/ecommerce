/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import Vue from 'vue';

const state = {
  savedItems: JSON.parse(localStorage.getItem('savedItems')) || [],
};

const getters = {

};

const mutations = {
  addToSaved(state, id) {
    state.savedItems.push(id);
    this.commit('saved/save');
  },
  removeFromSaved(state, index) {
    state.savedItems.splice(index, 1);
    this.commit('saved/save');
  },
  save(state) {
    localStorage.setItem('savedItems', JSON.stringify(state.savedItems));
    Vue.set(state, 'savedItems', [...JSON.parse(localStorage.getItem('savedItems'))]);
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

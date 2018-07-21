import Vue from 'vue';
import Vuex from 'vuex';

import userAuth from './modules/userAuth';
import todoItems from './modules/todoItems';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userAuth: userAuth,
    todoItems: todoItems
  }
});
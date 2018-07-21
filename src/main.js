import Vue from 'vue';
import App from './App.vue';

import store from './store/store';
import router from './router';

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})

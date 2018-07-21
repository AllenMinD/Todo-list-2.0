import Vue from 'vue';
import VueRouter from 'vue-router';

import storeUserAuth from './store/modules/userAuth'

import Home from './components/Home.vue';
import Signin from './components/auth/Signin.vue';
import Signup from './components/auth/Signup.vue';
import Dashboard from './components/Dashboard.vue';
import ImpNotUrg from './components/todo/Imp-not-urg/Imp-not-urg.vue';
import ImpUrg from './components/todo/Imp-urg/Imp-urg.vue';
import NotImpUrg from './components/todo/Not-imp-urg/Not-imp-urg.vue';
import NotImpNotUrg from './components/todo/Not-imp-not-urg/Not-imp-not-urg.vue';
import Todo from './components/todo/Todo.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/signin', component: Signin },
  { path: '/signup', component: Signup },
  { path: '/dashboard', 
    component: Dashboard,
    beforeEnter: function(to, from, next) {
      console.log('进入dashboard前：', storeUserAuth.state.token)
      if (storeUserAuth.state.token) {
        next();
      } else {
        next('/signin');
      }
    }
  },
  { path: '/todo', component: Todo, children: [
      { path: 'impnoturg', component: ImpNotUrg },
      { path: 'impurg', component: ImpUrg },
      { path: 'notimpurg', component: NotImpUrg },
      { path: 'notimpnoturg', component: NotImpNotUrg }
    ],
    beforeEnter: function(to, from, next) {
      console.log('进入/todo前：', storeUserAuth.state.token)
      if (storeUserAuth.state.token) {
        next();
      } else {
        next('/signin')
      }
    } 
  }
];

export default new VueRouter({
  mode: 'history',
  routes: routes
});
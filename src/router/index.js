import Vue from 'vue';
import Router from 'vue-router';
import Main from '../pages/home/index';
import About from '../pages/about/index';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Main },
    { path: '/about', name: 'About', component: About },
  ],
});

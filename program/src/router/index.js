import Vue from 'vue';
import Router from 'vue-router';

import Menu from '@/components/Menu';
import Home from '@/components/Home';
import Login from '@/components/user_component/Login';
import PublishingTasks from '@/components/user_component/PublishingTasks';
import Works from '@/components/Works';


import StatisticsRegional from '@/components/statisticsRegional';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/menu',
      name: 'Menu',
      component: Menu,
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/PublishingTasks',
      name: 'PublishingTasks',
      component: PublishingTasks,
    },
    {
      path: '/works',
      name: 'Works',
      component: Works,
    },
    {
      path: '/statisticsRegional',
      name: 'StatisticsRegional',
      component: StatisticsRegional,
    },
  ],
});

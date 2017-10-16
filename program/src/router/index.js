import Vue from 'vue';
import Router from 'vue-router';

import Menu from '@/components/Menu';
import Home from '@/components/Home';
import Login from '@/components/login_component/Login';
import Works from '@/components/Works';

import FinanceEmployee from '@/components/financeEmployee';
import FinanceCustomer from '@/components/financeCustomer';

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
      path: '/works',
      name: 'Works',
      component: Works,
    },
    {
      path: '/financeEmployee',
      name: 'FinanceEmployee',
      component: FinanceEmployee,
    },
    {
      path: '/financeCustomer',
      name: 'FinanceCustomer',
      component: FinanceCustomer,
    },
    {
      path: '/statisticsRegional',
      name: 'StatisticsRegional',
      component: StatisticsRegional,
    },
  ],
});

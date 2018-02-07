import Vue from 'vue';
// const Vue = () => import('vue')
import Router from 'vue-router';
// const Router = () => import('vue-router')

// import Home from '@/components/Home';
// import Login from '@/components/user_component/Login';
// import Publish from '@/components/publish';
// import Works from '@/components/publish/Works';
// import Work from '@/components/publish/Work';
// import Projects from '@/components/publish/Projects';
// import Project from '@/components/publish/Project';

const Home = () => import('@/components/Home');
// const Login = () => import('@/components/user_component/Login');
const Publish = () => import('@/components/publish');
const Works = () => import('@/components/publish/Works');
const Work = () => import('@/components/publish/Work');
const Projects = () => import('@/components/publish/Projects');
const Project = () => import('@/components/publish/Project');

//管理员界面
const Admin = ()=> import('@/components/admin');
const Aam = ()=> import('@/components/admin/Aam');
const Sd = ()=> import('@/components/admin/Sd');
const Cr = ()=> import('@/components/admin/Cr');

//boss界面
const Boss = ()=> import('@/components/boss');
const Statistics = ()=> import('@/components/boss/Statistics');
const Authority = ()=> import('@/components/boss/Authority');
const Authenticate = ()=> import('@/components/boss/Authenticate');
const Setting = ()=> import('@/components/boss/Setting')

//账号管理界面
const Account = ()=> import('@/components/account');
const PersonalData = ()=> import('@/components/account/PersonalData');
const AccountSecurity = ()=> import('@/components/account/AccountSecurity');

//通知界面
const Notify = ()=> import('@/components/notify');

//客户管理
const Customer = ()=> import('@/components/customer');

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { name: '/', path: '/', component: Home, meta: {keepAlive: true} },
    { name: 'publish', path: '/publish',component: Publish, meta: {keepAlive: true} },
    { name: 'works', path: '/works', component: Works },
    { name: 'work', path: '/works/:wid', component: Work },
    { name: 'projects', path: '/projects', component: Projects, meta: {keepAlive: false} },
    { name: 'project', path: '/projects/:pid', component: Project, meta: {keepAlive: false} },

    { name: 'admin', path: '/admin', component: Admin, meta: {keepAlive: false},
      children:[
        {
          path: 'aam',
          component: Aam
        },
        {
          path: 'sd',
          component: Sd
        },
        {
          path: 'cr',
          component: Cr
        }
      ]
    },
    { name: 'boss', path: '/boss', component: Boss, meta: {keepAlive: false},
      children:[
        {
          path:'authority',
          component: Authority
        },
        {
          path:'authenticate',
          component: Authenticate
        },
        {
          path: 'statistics',
          component: Statistics
        },
        {
          path: 'setting',
          component: Setting
        }
      ]
    },
    { name: 'account', path: '/account', component: Account, meta: {keepAlive: false},
      children:[
        {
          path:'personalData',
          component: PersonalData
        },
        {
          path:'accountSecurity',
          component: AccountSecurity
        }
      ]
    },
    { name: 'notify', path: '/notify', component: Notify, meta: {keepAlive: true} },
    { name: 'customer', path: '/customer', component: Customer, meta: {keepAlive: false} },

  ],
});

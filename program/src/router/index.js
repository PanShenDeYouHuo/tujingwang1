import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import Login from '@/components/user_component/Login';
import Publish from '@/components/Publish';
import Works from '@/components/Publish/Works';
import Work from '@/components/Publish/Work';
import Projects from '@/components/Publish/Projects';
import Project from '@/components/Publish/Project';
// import Tasks from '@/components/Publish/Tasks';
// import Task from '@/components/Publish/Task';


import StatisticsRegional from '@/components/statisticsRegional';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { name: '', path: '/', component: Home },
    { name: 'publish', path: '/publish',component: Publish,
      // children:[
      //   {        
      //     path: 'works',
      //     component: Works
      //   },
      //   {
      //     path: 'tasks',
      //     component: Tasks
      //   }
      // ],
    },
    { name: 'works', path: '/works', component: Works },
    { name: 'work', path: '/works/:wid', component: Work },
    { name: 'projects', path: '/projects', component: Projects },
    { name: 'project', path: '/projects/:pid', component: Project },
    // { name: 'tasks', path: '/task', component: Tasks },
    // { name: 'task', path: '/task/:tid', component: Task },
    { name: 'hello',path: '/statisticsRegional', component: StatisticsRegional }
  ],
});

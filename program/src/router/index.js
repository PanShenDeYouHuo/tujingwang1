import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import Login from '@/components/user_component/Login';
import Publish from '@/components/publish';
import Works from '@/components/publish/Works';
import Work from '@/components/publish/Work';
import Projects from '@/components/publish/Projects';
import Project from '@/components/publish/Project';




Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { name: '/', path: '/', component: Home },
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

  ],
});

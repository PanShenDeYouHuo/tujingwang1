import Vue from 'vue';
import Router from 'vue-router';

// import Home from '@/components/Home';
// import Login from '@/components/user_component/Login';
// import Publish from '@/components/publish';
// import Works from '@/components/publish/Works';
// import Work from '@/components/publish/Work';
// import Projects from '@/components/publish/Projects';
// import Project from '@/components/publish/Project';

const Home = () => import('@/components/Home')
const Login = () => import('@/components/user_component/Login');
const Publish = () => import('@/components/publish')
const Works = () => import('@/components/publish/Works')
const Work = () => import('@/components/publish/Work')
const Projects = () => import('@/components/publish/Projects')
const Project = () => import('@/components/publish/Project')




Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    // { name: '/', path: '/', component: Home, meta: {keepAlive: true} },
    // { name: 'publish', path: '/publish',component: Publish, meta: {keepAlive: true}
    //   // children:[
    //   //   {        
    //   //     path: 'works',
    //   //     component: Works
    //   //   },
    //   //   {
    //   //     path: 'tasks',
    //   //     component: Tasks
    //   //   }
    //   // ],
    // },
    // { name: 'works', path: '/works', component: Works },
    // { name: 'work', path: '/works/:wid', component: Work },
    // { name: 'projects', path: '/projects', component: Projects, meta: {keepAlive: false} },
    // { name: 'project', path: '/projects/:pid', component: Project, meta: {keepAlive: false} },

    { name: '/', path: '/', component: Home, meta: {keepAlive: true} },
    { name: 'publish', path: '/publish',component: Publish, meta: {keepAlive: true} },
    { name: 'works', path: '/works', component: Works },
    { name: 'work', path: '/works/:wid', component: Work },
    { name: 'projects', path: '/projects', component: Projects, meta: {keepAlive: false} },
    { name: 'project', path: '/projects/:pid', component: Project, meta: {keepAlive: false} },

  ],
});

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';

//VueMaterial部分 开始-------------------------------
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
Vue.use(VueMaterial)

//iview部分
import 'iview/dist/styles/iview.css';
import IView from 'iview';
Vue.use(IView);

//vue-agile轮播图组件
import VueAgile from 'vue-agile';
Vue.use(VueAgile);

import App from './App';            //载入app.vue
import router from './router';      //路由
import store from './store/index'; //状态管理

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});

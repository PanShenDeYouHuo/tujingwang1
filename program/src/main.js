// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';

//VueMaterial部分 开始-------------------------------
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
Vue.use(VueMaterial)

// import 'iview/dist/styles/iview.css';
// import iView from 'iview';
// Vue.use(iView);

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

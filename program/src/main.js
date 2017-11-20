// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';


//vuetify
import Vuetify from 'vuetify'
Vue.use(Vuetify)



import 'vuetify/dist/vuetify.css'


import App from './App';            //载入app.vue
import router from './router';      //路由
import store from './store/index';  //状态管理

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});

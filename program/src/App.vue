<template>
  <v-app id="app">

    <!-- <div style="background-color: #fff;  position: absolute; width: 100%; z-index:2;border-style:solid; border-width: 0px 0px 1px 0px; border-color: #E0E0E0"> -->
    <div class="elevation-4" style="background-color: #fff;  position: absolute; width: 100%;min-width: 1280px; z-index:2; ">
      
      <pmenu @toLogin="to_login()"></pmenu>

    </div>


    <!-- 登入右侧边导航 -->
    <!-- <md-sidenav class="md-right" ref="loginSidenav" @open="open('loginSidenav')" @close="close('loginSidenav')">
      <login @closeLoginSidenav="closeLoginSidenav()" v-show="loginType == 0"></login>
    </md-sidenav> -->
  
    <!-- 登入界面 -->
    <v-dialog v-model="loginDialog" persistent max-width="340">
      <login @close="to_close()"></login>
    </v-dialog>

    <!-- 错误信息提示窗口 -->
    <v-snackbar
      :timeout="6000"
      top
      color="error"
      v-model="errorSnackbar.state"
    >
      {{ errorSnackbar.text }}
    </v-snackbar>

    <!-- 成功信息提示窗口 -->
    <v-snackbar
      :timeout="6000"
      top
      color="green"
      v-model="successSnackbar.state"
    >
      {{ successSnackbar.text }}
    </v-snackbar>




    <!-- 路由页面 -->

  <keep-alive>
    <router-view class="content" v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如 Home！ -->
    </router-view>
  </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
        <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
    </router-view>





  </v-app>
</template>



<script>
import pmenu from './components/Menu'
import login from './components/user_component/Login'

export default {
  name: 'app',
  
  components:{pmenu, login},

  data() {
    return {
      source: 'source',
      mini: true,
    }
  },

  computed:{
    user() {
      return this.$store.state.user;
    },
    loginType() {
      
      return this.$store.state.login.loginType;
    },
    loginDialog() {
      return this.$store.state.loginDialog;
    },
    errorSnackbar() {
      return this.$store.state.errorSnackbar;
    },
    successSnackbar() {
      return this.$store.state.successSnackbar;
    }
  },

  methods:{
    //导航路由初始化
    // on_router(name) {
    //   this.$router.push(name);
    // },

    //登入窗口关闭
    to_close() {
      this.$store.state.loginDialog = false;
    },
    //登入窗口开
    to_login() {
      this.$store.state.loginDialog = true;
    },

    // //用户信息管理右侧边导航
    // toggleRightSidenav() {
    //   this.$refs.rightSidenav.toggle();
    // },
    // closeRightSidenav() {
    //   this.$refs.rightSidenav.close();
    // },

    // //登入右侧导航
    // closeLoginSidenav() {
    //   this.$refs.loginSidenav.close();
    // },

    // open(ref) {
    //   console.log('Opened: ' + ref);
    // },
    // close(ref) {
    //   console.log('Closed: ' + ref);
    // },
    
  },
  mounted(){

    setTimeout(()=> {
      this.loading = false;
    }, 3000);
  },
  beforeCreate() {
    //app初始化
    this.$store.dispatch('getRouter', this.$router);    //将router映射到store内
    this.$store.dispatch('appError');                   //开启错误接口
    this.$store.dispatch('loginSuccess');               //开启登入成功接口
    this.$store.dispatch('authenticationSuccess');      //开启登入成功接口

    this.$store.dispatch('initialize');
    // this.$store.dispatch('loadUserData');               //开始启动app是载入用户数据信息

  },
  created() {
    console.log('created');
  },
  beforeMount() {
    console.log('beforeMount');
  },
  // beforeUpdate() {
  //   console.log('beforeUpdate');
  // },
  // updated() {
  //   console.log('updated');
  // },
  beforeDestroy() {
    console.log('beforeDestroy');
  },
  destroyed() {
    console.log('destroyed');
  }
  
};
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  box-sizing:border-box;
  background-color: #fff;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  background-color:rgb(244, 244, 244); */

}

/* html,body{overflow:visible;} */

html,body{overflow:visible;}


.content {
  width:100%;height:100%;
  background-color: #fff;
  /* box-sizing:border-box;
  padding-top: 50px; */
}
  /* main .container {
      height: 100px;
    } */

    /* .navigation-drawer__border {
    display: none;
  }

    .text {
    font-weight: 400;
  } */

  .snack__content {
    min-width: 100px;
  }


.list__tile__title {
    line-height: 28px;
}


.card {
    -webkit-box-shadow: 0 0px 2px rgba(0,0,0,0.15), 0 0px 1px rgba(0,0,0,0.7);
    box-shadow: 0 0px 2px rgba(0,0,0,0.15), 0 0px 1px rgba(0,0,0,0.3);
}

.btn--raised {
      -webkit-box-shadow: 0 0px 2px rgba(0,0,0,0.15), 0 0px 1px rgba(0,0,0,0.7);
    box-shadow: 0 0px 1px rgba(0,0,0,0.05), 0 0px 1px rgba(0,0,0,0.1);      
}

  .pagination__item{
     -webkit-box-shadow: 0 0px 2px rgba(0,0,0,0.15), 0 0px 1px rgba(0,0,0,0.7);
    box-shadow: 0 0px 1px rgba(0,0,0,0.05), 0 0px 1px rgba(0,0,0,0.1);  
  }

  .pagination__item--active{
      color: #FDD835;
      background: #FFEB3B !important;
  }

  .pagination__navigation{
      -webkit-box-shadow: 0 0px 2px rgba(0,0,0,0.15), 0 0px 1px rgba(0,0,0,0.7);
      box-shadow: 0 0px 1px rgba(0,0,0,0.05), 0 0px 1px rgba(0,0,0,0.1);  
  }

  .my-btn .btn__content {

    padding:0px 6px 0px 6px !important;
  }


</style>

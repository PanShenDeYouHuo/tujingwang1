<template>
  <v-app id="app" >
    
    <!-- 载入进度条 -->
    <div class="elevation-1" v-show="this.$store.state.appLoading"  style="background-color: #fff; top: 51px;  position: absolute; width: 100%;min-width: 1280px; z-index:10; ">

      <v-progress-linear :indeterminate="this.$store.state.appLoading" style="margin: 0px;" height="3" color="yellow " background-color="black"></v-progress-linear>

    </div>

    <!-- <div style="background-color: #fff;  position: absolute; width: 100%; z-index:2;border-style:solid; border-width: 0px 0px 1px 0px; border-color: #E0E0E0"> -->

    <div class="elevation-1" style="background-color: #fff;  position: absolute; width: 100%;min-width: 1280px; z-index:2; ">

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
      color="success"
      v-model="successSnackbar.state"
    >
      {{ successSnackbar.text }}
    </v-snackbar>

    <!-- 通知信息提示窗口 -->
    <v-snackbar
      :timeout="0"
      top
      color="info"
      v-model="infoSnackbar.state"
    >
      {{ infoSnackbar.text }}
      <v-btn dark flat fab small @click="infoSnackbar.state = false" style="min-wight:0px;">
        <!-- <i class="material-icons">close</i> -->
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>




    <!-- 路由页面 -->

  <keep-alive>
    <router-view class="routerView" v-if="$route.meta.keepAlive" >
        <!-- 这里是会被缓存的视图组件，比如 Home！ -->
    </router-view>
  </keep-alive>

  <router-view class="routerView" v-if="!$route.meta.keepAlive" >
      <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
  </router-view>





  </v-app>
</template>



<script>
import pmenu from './components/Menu'
import login from './components/user/Login'

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
    },
    infoSnackbar() {
      return this.$store.state.infoSnackbar;
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

    
  },
  async mounted(){
      if( !this.$store.state.url[0]) {
          console.log(this.$route.path)
          this.$store.dispatch('initRouter', this.$route.path);
          
      }
    // setTimeout(()=> {
    //         this.$store.dispatch('getAllWriteAndReadProjectStsToken', {});

    // }, 100);
    // setTimeout(()=> {
    //   if( !this.$store.state.url[0]) {
    //     console.log(this.$route.path)
    //       this.$store.dispatch('initRouter', this.$route.path);
    //   }

    // }, 100);
  },
  beforeCreate() {
    //app初始化
    this.$store.dispatch('getRouter', this.$router);    //将router映射到store内
    this.$store.dispatch('appError');                   //开启错误接口
    this.$store.dispatch('loginSuccess');               //开启登入成功接口
    this.$store.dispatch('authenticationSuccess');      //开启验证成功接口
    this.$store.dispatch('notify');                     //开启通知接口

    this.$store.dispatch('initialize');                 //程序初始化

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
  background-color: rgb(244, 244, 244);
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  background-color:rgb(244, 244, 244); */

}

/* html,body{overflow:visible;} */

html,body{overflow:visible; height: 100%;}


.routerView {
  width:100%;height:100%;
  overflow:visible;
  background-color: #fff;
  min-width: 1480px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: auto;
  position: absolute;
  /* z-index: 2; */
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }


/* .card {
    -webkit-box-shadow: 0 0px 2px rgba(0,0,0,0.15), 0 0px 1px rgba(0,0,0,0.7);
    box-shadow: 0 0px 2px rgba(0,0,0,0.15), 0 0px 1px rgba(0,0,0,0.3);
} */

/* .card {
    -webkit-box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12);
    box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.09), 0 3px 1px -2px rgba(0,0,0,0.02);
} */



/* .btn--raised {
    -webkit-box-shadow: 0 0px 2px rgba(0,0,0,0.15), 0 0px 1px rgba(0,0,0,0.7);
    box-shadow: 0 0px 1px rgba(0,0,0,0.05), 0 0px 1px rgba(0,0,0,0.1);
} */

  /* .pagination__item{
     -webkit-box-shadow: 0 0px 2px rgba(0,0,0,0.15), 0 0px 1px rgba(0,0,0,0.7);
    box-shadow: 0 0px 1px rgba(0,0,0,0.05), 0 0px 1px rgba(0,0,0,0.1);  
  }

  .pagination__item--active{
      color: #333;
      background: #333 !important;
  } */

  /* .pagination__navigation{
      -webkit-box-shadow: 0 0px 2px rgba(0,0,0,0.15), 0 0px 1px rgba(0,0,0,0.7);
      box-shadow: 0 0px 1px rgba(0,0,0,0.05), 0 0px 1px rgba(0,0,0,0.1);  
  } */

  .my-btn .btn__content {

    padding:0px 6px 0px 6px !important;

  }

  .menu__content {

    box-shadow: 0px 1px 1px -1px rgba(0,0,0,0.2), 0px 1px 8px 1px rgba(0,0,0,0.14), 0px 1px 14px 2px rgba(0,0,0,0.12);
  }

  mytextcolor {
    color:#E0E0E0;
  }


</style>

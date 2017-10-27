<template>
  <div id="app">
    <!-- <div style="background-color: #fff;  position: absolute; width: 100%; z-index:2;"> -->
    <div style="background-color: #fff;  position: absolute; width: 100%; z-index:2; border-style:solid; border-width: 0px 0px 1px 0px; border-color: #E0E0E0">
      <md-whiteframe md-elevation="4">
      <pmenu @toggleRightSidenav="toggleRightSidenav" 
      @toLogin="to_login()"></pmenu>
      </md-whiteframe>
    </div>

    <!-- 用户信息管理右侧边导航 -->
    <md-sidenav class="md-right" ref="rightSidenav" @open="open('Right')" @close="close('Right')">
      
    <md-list style="height: 100%;">


          <md-list-item >
            <md-avatar class="md-large">
              <img :src="user.headimgurl" alt="People">
            </md-avatar>

            <span>{{user.nickname}}</span>

            <md-button class="md-icon-button md-list-action">
              <md-icon class="md-primary">settings</md-icon>
            </md-button>

          </md-list-item>

          <md-list-item>
            <!-- <div class="md-list-text-container"> -->
              <span class="md-caption" style="color: #999"> {{user.province}}/{{user.city}}</span>
              <!-- <span>{{user._id}}</span> -->
            <!-- </div> -->

            <md-divider class="md-inset"></md-divider>
          </md-list-item>
      
      <span style="flex: 0 1 8px"></span>
      <md-list-item @click="$refs.sidenav.toggle()" class="md-primary">
        <md-icon>insert_drive_file</md-icon> <span>我的创造</span>
      </md-list-item>
      <md-list-item @click="$refs.sidenav.toggle()" class="md-primary">
        <md-icon>insert_drive_file</md-icon> <span>我的任务</span>
      </md-list-item>

      <md-list-item @click="$refs.sidenav.toggle()" class="md-primary">
        <md-icon>people</md-icon> <span>我的团队</span>
      </md-list-item>

      <md-list-item @click="$refs.sidenav.toggle()" class="md-primary">
        <md-icon>access_time</md-icon> <span>我的统计</span>
      </md-list-item>

      <md-list-item @click="$refs.sidenav.toggle()" class="md-primary">
        <md-icon>start</md-icon> <span>账号管理</span>
      </md-list-item>

      <span style="flex: 1 1 auto"></span>
      <md-divider class="md-inset"></md-divider>

      <md-list-item @click="$refs.sidenav.toggle()" class="md-primary">
        <md-icon>power_settings_new</md-icon><span>退出登入</span>
      </md-list-item>
    </md-list>

    </md-sidenav>

    <!-- 登入右侧边导航 -->
    <md-sidenav class="md-right" ref="loginSidenav" @open="open('loginSidenav')" @close="close('loginSidenav')">
      <login @closeLoginSidenav="closeLoginSidenav()" v-show="loginType == 0"></login>
    </md-sidenav>

    <!-- 路由页面 -->
    <keep-alive>
      <router-view class="content"></router-view>
    </keep-alive>

    <!-- 载入等待页面 -->
    <!-- <div v-if="loading">
      <Spin fix size="large"></Spin>
    </div> -->

  </div>
</template>

<script>
import pmenu from './components/Menu'
import login from './components/user_component/Login'
export default {
  name: 'app',
  data() {
    return {
      loading: true,
    }
  },
  computed:{
    user() {
      return this.$store.state.user;
    },
    loginType() {
      
      return this.$store.state.login.loginType;
    }
  },
  components:{pmenu, login},

  methods:{
    //导航路由初始化
    on_router(name) {
      this.$router.push(name);
    },

    //用户信息管理右侧边导航
    toggleRightSidenav() {
      this.$refs.rightSidenav.toggle();
    },
    closeRightSidenav() {
      this.$refs.rightSidenav.close();
    },

    //登入右侧导航
    to_login() {
      this.$refs.loginSidenav.toggle();
    },
    closeLoginSidenav() {
      this.$refs.loginSidenav.close();
    },

    open(ref) {
      console.log('Opened: ' + ref);
    },
    close(ref) {
      console.log('Closed: ' + ref);
    },
    //
  },
  mounted(){

    setTimeout(()=> {
      this.loading = false;
    }, 3000);
  },
  beforeCreate() {
    //app初始化
    this.$store.dispatch('getRouter', this.$router);    //将router映射到store内
    this.$store.dispatch('getMessage', this.$Message);  //将message映射到store内
    this.$store.dispatch('getLoading', this.$Loading);  //将loading映射到store内
    this.$store.dispatch('error');                      //开启错误接口
    this.$store.dispatch('loginSuccess');               //开启登入成功接口

    this.$store.dispatch('initialize'); 
    this.$store.dispatch('loadUserData');               //开始启动app是载入用户数据信息
    // this.$router.push('home');                          //切换到home页面
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
/*  text-align: center;*/
  color: #2c3e50;
  height: 100%;

/*  background-color:rgb(244, 244, 244);*/
}

html,body{margin: 0px; height: 100%; padding: 0px;}
body{background-color:rgb(245, 245, 245); overflow:hidden;}


.content {
  width:100%;height:100%;
  box-sizing:border-box;
  padding-top: 50px;
}

/* .md-sidenav .md-sidenav-content {
    width: 354px;
     background-color: rgba(0, 0, 0, 0);
} */

/* .md-theme-default.md-sidenav .md-sidenav-content {
    background-color: rgba(0, 0, 0, 0);
} */


/* 过度动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}

.md-whiteframe-4dp {
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.0), 0 4px 5px rgba(0, 0, 0, 0.0), 0 1px 10px rgba(0, 0, 0, 0.0);
}
</style>

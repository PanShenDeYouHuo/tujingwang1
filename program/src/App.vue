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
    <!-- <md-sidenav class="md-right" ref="rightSidenav" @open="open('Right')" @close="close('Right')">
      
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
                <span class="md-caption" style="color: #999"> {{user.province}}/{{user.city}}</span>


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

    </md-sidenav> -->

    <!-- 登入右侧边导航 -->
    <!-- <md-sidenav class="md-right" ref="loginSidenav" @open="open('loginSidenav')" @close="close('loginSidenav')">
      <login @closeLoginSidenav="closeLoginSidenav()" v-show="loginType == 0"></login>
    </md-sidenav> -->

    <!-- 路由页面 -->
    <keep-alive>
      <router-view class="content"></router-view>
    </keep-alive>

<!-- <v-app >
    <v-navigation-drawer permanent clipped light :mini-variant="mini" width="240" class="grey lighten-4" app >

      <v-list class="pa-0" v-show="mini">

        <v-list-tile @click="mini = !mini" >
          <v-list-tile-action>
              <v-icon>menu</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-tile>

      </v-list>


      <v-list class="pa-0">
        
        <v-list-tile avatar v-if="user._id">
          <v-list-tile-avatar>
            <img :src="user.headimgurl" alt="avatar">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{user.nickname}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action v-show="!mini">
            <v-btn icon @click.native.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile avatar v-if="!user._id">
          <v-list-tile-avatar>
            <v-icon dark x-large>account_circle</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>未登入</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action v-show="!mini">
            <v-btn icon @click.native.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>

      </v-list>

      <v-list class="grey lighten-4 pt-0">
        <v-divider class="my-2"></v-divider>

        <template v-for="(item, i) in items">

          <v-layout row v-if="item.heading" align-center :key="i">
            <v-flex xs6>
              <v-subheader v-if="item.heading" class="caption">
                {{ item.heading }}
              </v-subheader>
            </v-flex>

          </v-layout>

          <v-divider dark v-else-if="item.divider" class="my-2" :key="i"></v-divider>

          <v-list-tile :key="i" v-else @click="" >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
     
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="cyan lighten-2" app absolute clipped-left dense>
      <span class="title">TJ&nbsp;<span class="text">Cloud</span></span>
      <v-spacer></v-spacer>

      <v-avatar class="grey lighten-4" size="42px">
        <img :src="user.headimgurl" alt="avatar">
      </v-avatar>

    </v-toolbar>


    <main>
      <v-content>
        <v-container fluid fill-height class="grey lighten-4">
          <v-layout justify-center align-center>
            <v-tooltip right>
              <v-btn icon large :href="source" target="_blank" slot="activator">
                <v-icon large>code</v-icon>
              </v-btn>
              <span>Source</span>
            </v-tooltip>
          </v-layout>
        </v-container>
      </v-content>
    </main>

  </v-app> -->

  </div>
</template>



<script>
import pmenu from './components/Menu'
import login from './components/user_component/Login'
export default {
  name: 'app',
  components:{pmenu, login},

  data() {
    return {
      items: [
        { icon: 'dashboard', text: '发现设计', routerName: '/home' },
        { icon: 'chat_bubble', text: '素材' },
        { icon: 'touch_app', text: '搜索' },
        { divider: true },
        // { heading: '' },
        { icon: 'add', text: '发布任务' },
        { icon: 'keyboard', text: '我的创作' },
        { icon: 'archive', text: '我的任务' },
        { icon: 'delete', text: '我的团队' },
        { icon: 'settings', text: '我的统计' },
      ],
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
    }
  },

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
    this.$store.dispatch('error');                      //开启错误接口
    this.$store.dispatch('loginSuccess');               //开启登入成功接口

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
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  background-color:rgb(244, 244, 244); */

}

html,body{overflow-y: hidden;}


/* .content {
  width:100%;height:100%;
  box-sizing:border-box;
  padding-top: 50px;
} */
  /* main .container {
      height: 100px;
    } */

    /* .navigation-drawer__border {
    display: none;
  }

    .text {
    font-weight: 400;
  } */




.list__tile__title {
    line-height: 28px;
}

</style>

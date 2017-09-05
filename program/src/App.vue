<template>
  <div id="app">
    <div style="  position: absolute; width:100%; z-index:2;">
      <Menu mode="horizontal" theme="light" active-name="home" @on-select="on_router">
        <Menu-item name="home">
            <Icon type="ios-home"></Icon>
            首页
        </Menu-item>
        <Submenu name="project">
            <template slot="title">
                <Icon type="stats-bars"></Icon>
                项目管理
            </template>
            <Menu-group title="使用">
                <Menu-item name="31">jia</Menu-item>
                <Menu-item name="32">活跃分析</Menu-item>
                <Menu-item name="33">时段分析</Menu-item>
            </Menu-group>
        </Submenu>
        <Submenu name="statistics">
            <template slot="title">
                <Icon type="stats-bars"></Icon>
                统计分析
            </template>
            <Menu-group title="使用">
                <Menu-item name="3-1">新增和启动</Menu-item>
                <Menu-item name="3-2">活跃分析</Menu-item>
                <Menu-item name="statisticsRegional">地域分析</Menu-item>
                <Menu-item name="3-3">时段分析</Menu-item>
            </Menu-group>
            <Menu-group title="留存">
                <Menu-item name="3-4">用户留存</Menu-item>
                <Menu-item name="3-5">流失用户</Menu-item>
            </Menu-group>
        </Submenu>
        <Submenu name="finance">
            <template slot="title">
              <Icon type="settings"></Icon>
              财务管理
            </template>
            <Menu-group title="客户">
                <Menu-item name="financeCustomer">账单结算</Menu-item>
            </Menu-group>
            <Menu-group title="员工">
                <Menu-item name="financeEmployee">提成结算</Menu-item>
            </Menu-group>
        </Submenu>
        <Submenu name="employee">
            <template slot="title">
              <Icon type="ios-paper"></Icon>
              人员管理
            </template>
            <Menu-group title="客户">
                <Menu-item name="sCustomer">客户注册</Menu-item>
            </Menu-group>
            <Menu-group title="员工">
                <Menu-item name="sEmployee">员工注册</Menu-item>
            </Menu-group>
        </Submenu>
      </Menu>
    </div>

    <keep-alive>
      <router-view class="content"></router-view>
    </keep-alive>
    
    <div v-if="loading">
      <Spin fix size="large"></Spin>
    </div><!-- 载入等待页面 -->

  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      loading: true,
    }
  },

  methods:{
    //路由
    on_router(name) {
      this.$router.push(name);
    },
  },
  mounted(){

    setTimeout(()=> {
      this.loading = false;
    }, 3000);
  },
  beforeCreate() {
    this.$store.dispatch('getRouter', this.$router);
    this.$store.dispatch('getMessage', this.$Message);
    this.$store.dispatch('getLoading', this.$Loading);
    this.$store.dispatch('loginSuccess');
    this.$store.dispatch('loginFail');
    this.$store.dispatch('loadUserData');
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
/*  text-align: center;*/
  color: #2c3e50;
  
  height: 100%;

/*  background-color:rgb(244, 244, 244);*/
}

html,body{margin: 0px; height: 100%; padding: 0px;}
body{background-color:rgb(239, 239, 239); overflow:hidden;}

.ivu-menu-horizontal {
    height: 50px;
    line-height: 50px;
}

.content {
  width:100%;height:100%;
  box-sizing:border-box;
  padding: 20px;
  padding-top: 70px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
</style>

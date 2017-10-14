<template>
  <div id="app">
    <div style="box-sizing:border-box;  position: absolute; width:100%; z-index:2; border-style:solid; border-width: 0px 0px 1px 0px; border-color: #dddee1">
      <Row type="flex" justify="center" align="middle"  style="min-width: 1080px; max-width: 1280px;margin:0 auto;" >
        <Col span="4">
          <img src="./assets/home.png" alt="标志" style="height: 40px; padding-top: 0px;">
        </Col>
        <Col span="16">
        <Menu mode="horizontal" theme="light" active-name="home" @on-select="on_router">
          <Menu-item name="home">
              首页
          </Menu-item>

          <Menu-item name="works">
              项目
          </Menu-item>

          <!-- <Submenu name="statistics">
              <template slot="title">
                  分析
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
          </Submenu> -->
          <!-- <Submenu name="finance">
              <template slot="title">
                财务
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
                管理
              </template>
              <Menu-group title="客户">
                  <Menu-item name="sCustomer">客户注册</Menu-item>
              </Menu-group>
              <Menu-group title="员工">
                  <Menu-item name="sEmployee">员工注册</Menu-item>
              </Menu-group>
          </Submenu> -->

        </Menu>
        </Col>

        <Col span="4">
        <!-- 未登入显示 -->
          <Button type="dashed" style="height: 40px; float: right;" v-if="!user.statr" @click="to_login()">登入</Button>
          <Button type="text" style="height: 40px; float: right;" v-if="!user.statr">注册</Button>
        <!-- 登入显示 -->
          <Dropdown style="float: right; height: 40px;" v-if="user.statr">
            <!-- <Avatar src="http://img.zcool.cn/community/0015ad59b50892a801211d2566598e.jpg@160w_160h_1c_1e_1o_100sh.jpg" size="large" style="height: 40px;" /> -->
            <Avatar :src="user.headUrl" size="large" style="height: 40px;" />
            <DropdownMenu slot="list">
              <DropdownItem>个人主页</DropdownItem>
              <DropdownItem>项目管理</DropdownItem>
              <DropdownItem>账号管理</DropdownItem>
            <DropdownItem divided>退出登入</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <!-- <Avatar style="color: #fff; background-color: #5cadff; float: right;" size="large" shape="square">{{user.name}}</Avatar> -->
        </Col>

      </Row>
    </div>

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
    }
  },

  methods:{
    //导航路由初始化
    on_router(name) {
      this.$router.push(name);
    },
    //去登入页面
    to_login() {
      this.$router.push('login');
    }
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
    this.$store.dispatch('loginSuccess');               //开启登入成功接口
    this.$store.dispatch('loginFail');                  //开启登入失败接口
    this.$store.dispatch('loadUserData');               //开始启动app是载入用户数据信息
    this.$router.push('home');                          //切换到home页面
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
body{background-color:rgb(245, 245, 245); overflow:hidden;}

.ivu-menu-horizontal {
    height: 50px;
    line-height: 50px;
}

.content {
  width:100%;height:100%;
  box-sizing:border-box;
  padding-top: 50px;
}

/* 导航栏 */
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu {
    height: inherit;
    line-height: inherit;
    border-bottom: 2px solid transparent;
    color: #6d6d6d;
}

.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
    color: #000000;
    border-bottom: 2px solid #5d5d5d;
}

.ivu-menu-horizontal.ivu-menu-light:after {
    height: 0px;
}

/* 过度动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
</style>

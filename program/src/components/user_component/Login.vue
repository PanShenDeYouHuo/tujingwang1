
<template >
  <div class="login">

      <div style="text-align: center; padding: 24px; padding-top: 80px; ">
          <h3 class="md-title">图境云</h3>
      </div>
      <form novalidate @submit.stop.prevent="submit">

        <md-input-container>
          <label>手机号/邮箱</label>
          <md-input ></md-input>
        </md-input-container>

        <md-input-container md-has-password>
          <label>密码</label>
          <md-input  type="password"></md-input>
        </md-input-container>

      </form>

      <div style="  text-align: center;">
        <md-button class="md-raised md-primary " style="width: 100%; margin: auto; margin-top: 16px; margin-bottom: 20px;">
          <span class="">登入</span>
        </md-button>
      </div>

      <md-layout md-gutter="16">
        <md-layout md-flex="50">
          <md-checkbox id="my-test2" name="my-test2" v-model="checkbox" class="md-primary">记住我</md-checkbox>
        </md-layout>
        <md-layout md-align="end">
          <md-button class="md-dense" style=" padding: 0px; min-width: 20px; color: #aaa">
            <span class="">忘记密码</span>
          </md-button>
          <div style="border-style:solid; border-width: 0px 0px 0px 2px; border-color: #dddee1; margin: 16px 0px;"></div>
          <md-button class="md-dense" style=" padding: 0px; margin-right: 3px;   min-width: 20px; color: #aaa">
            <span>注册</span>
          </md-button>
        </md-layout>
      </md-layout>

      <!-- 第三方登入 -->
      <div style="margin-top: 364px; margin-bottom: 24px;">
        <md-layout md-gutter>
          <md-layout md-flex="39" md-align="center">
            <div style="width: 100%; margin-top: 9px; border-style:solid; border-width: 1px 0px 0px 0px; border-color: #ccc"></div>
          </md-layout>

          <md-layout md-flex="22" md-align="center">
            <span>第三方登入</span>
          </md-layout>

          <md-layout md-flex="39" md-align="center">
            <div style="width: 100%; margin-top: 9px; border-style:solid; border-width: 1px 0px 0px 0px; border-color: #ccc"></div>
          </md-layout>
        </md-layout>
      </div>

      <!-- 微信 -->
      <md-layout md-align="center">
        <md-button class="md-fab" style="background-color: #3cb034;">
          <img src="../../assets/wechat.png" style="width: 36px;" alt="wechat" @click="wechatLogin()">
        </md-button>
      </md-layout>


      <div style="padding-bottom: 24px;"></div>


  </div>
</template>


<script>
  export default {
    name:'login',
    data () {
      return {
        checkbox: '',
        ruleInline: {
          account: [
              { required: true, message: '请填写用户名', trigger: 'blur' }
          ],
          password: [
              { required: true, message: '请填写密码', trigger: 'blur' },
              { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
          ]
        },
        loading: false,
      }
    },
    computed:{
      form() {
        return this.$store.state.user;
      }
    },
    methods: {
      handleSubmit(name) {
        let state = this.$store.state;
        this.$refs[name].validate((valid) => {
          if (valid) {

            setTimeout(()=> {
              let state = sessionStorage.getItem('state');
              if (state !== '1') {
                this.$Message.error('登入超时');
                this.$store.state.user.loading = true;
              }
            }, 20000);

            this.$store.dispatch('loginIn', this.$router);
          }
        });
      },

      wechatLogin() {
        let appid = 'wx578ee588948c8fcc';
        let redirect_uri = 'http://cloud.tujingwang.cn/user/wechat';
        let sid = this.$store.state.socketClass.socket.id;

        window.open(`https://open.weixin.qq.com/connect/qrconnect?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_login&state=${sid
        }#wechat_redirect`);
        this.$emit('closeLoginSidenav');
        // this.$store.dispatch('wechatLogin');
      }
    },
    mounted(){
      setTimeout(()=> {
        this.loading = true;
      }, 3000);
    }
  }
</script>

<style >
  .login{
    /* background: url('../assets/bg.jpg');  */
    background-color: #fff;
    height: 100%; width: 100%; 
    /* position:absolute; 
    z-index:3; 
    left: 0px; top: 0px; */
    padding: 24px;
    background-position:center; 
  }

  .md-theme-default.md-sidenav .md-sidenav-content {
    color: rgba(0, 0, 0, .57);
  }

  /* .white{
    padding-left: 5px;
    padding-right: 10px;
    min-height: 80px;
    min-width: 65px;
    padding-top: 23px;
    background-color: rgba(255, 255, 255,1);
  } */

  /* .swhite{
    padding-left: 5px;
    padding-right: 10px;
    min-height: 80px;
    min-width: 25px;
    max-width: 25px;
    padding-top: 23px;
    background-color: rgba(150, 150, 150,0.5);
  } */

  /* .black{
    padding-left: 5px;
    padding-right: 5px;
    min-height: 80px;
    min-width: 65px;
    padding-top: 23px;
    background-color: rgba(10, 10, 10,0.5);
  } */

  /* .login .ivu-input { */
/*    display: inline-block;*/
/*    width: 90%;*/
/*    height: 32px;*/
/*    line-height: 1.5;*/
/*    padding: 4px 7px;
    font-size: 12px;*/
    /* border: 0px solid #dddee1;
    border-radius: 0px;

    border-style: solid;
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 0px;
    border-left-width: 2px;

  } */

  /* .login .ivu-btn {
    width: 100%; */
/*    padding: 7px 15px;*/
    /* border: 0px solid #dddee1;
    border-radius: 0px; 
    color: #ddd;
  } */

  /* .login .ivu-btn:hover{
    color: #08f;
  } */

  /* .box_relative {
    width:40%;
    margin-left: 60%; */
    /* position: relative; 脱离文档流 */
    /* top: 45%; 偏移 */
  /* } */
	
</style>
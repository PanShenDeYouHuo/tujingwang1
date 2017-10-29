
<template >
  <div class="login">

    <v-layout row>
     
      <v-flex lg12>

        <v-flex lg12>
          <v-layout justify-end>
            <v-btn flat icon small style="margin: 0px;" @click="toclose()">
              <v-icon>close</v-icon>
            </v-btn>
          </v-layout>
        </v-flex>

        <div style="text-align: center; padding-top: 32px; padding-bottom: 16px;">
            <span class="headline">图境云</span>
        </div>
        <!-- <form novalidate @submit.stop.prevent="submit"> -->
        
        <v-form v-model="valid" light>

          <v-text-field color="grey darken-4" label="手机号/邮箱" v-model="account" :rules="accountRuler" >
          </v-text-field>
          
          <v-text-field
                color="grey darken-4"
                label="密码"
                v-model="password"
                min="8"
                type="password"
                :rules="passwordRuler"
                counter
          ></v-text-field>

        </v-form>


        <v-btn outline color="secondary" style="width: 100%; margin: auto; margin-top: 16px; margin-bottom: 20px;">
          登入
        </v-btn>


        <v-layout row align-statr>

          <v-flex lg6 >
            <v-checkbox
              label="记住我"
              v-model="checkbox"
              color="grey"
            ></v-checkbox>
          </v-flex>

          <v-flex lg6 >
            <v-layout justify-end>

              <v-btn small flat style=" margin-top: 8px; margin-right: 0px; margin-left: 0px; min-width: 10px; color: #aaa">
                <span class="">忘记密码</span>
              </v-btn>
              <!-- <div style="border-style:solid; border-width: 0px 0px 0px 2px; border-color: #dddee1; margin: 16px 0px;"></div> -->
              <v-btn small flat style=" margin-top: 8px; margin-right: 0px; margin-left: 0px; min-width: 10px; color: #aaa">
                <span>注册</span>
              </v-btn>

            </v-layout>
          </v-flex>

        </v-layout>

        <!-- 第三方登入 -->
        <div style="margin-top: 48px; margin-bottom: 16px;">
          <v-layout md-gutter>
            <v-flex lg5>
              <div style="width: 100%; margin-top: 9px; border-style:solid; border-width: 1px 0px 0px 0px; border-color: #ccc"></div>
            </v-flex>

            <v-layout justify-center>
              <span class="caption" style="color: #999">其他登入</span>
            </v-layout>

            <v-flex lg5>
              <div style="width: 100%; margin-top: 9px; border-style:solid; border-width: 1px 0px 0px 0px; border-color: #ccc"></div>
            </v-flex>
          </v-layout>
        </div>

        <!-- 微信 -->
        <v-layout align-center justify-center>
          <v-btn fab small style="background-color: #3cb034;" @click="wechatLogin()">
            <img src="../../assets/wechat.png" style="width: 28px;" alt="wechat" >
          </v-btn>
        </v-layout>

      </v-flex>
    </v-layout>
  </div>
</template>


<script>
  export default {
    name:'login',
    data () {
      return {
        checkbox: '',
        valid: false,
        account: '', 
        password: '',
        accountRuler: [
          (v) => !!v || '请输入账号',
          (v) => v.length <= 10 || 'Name must be less than 10 characters'
        ],
        passwordRuler: [
          (v) => !!v || '请输入密码'
        ],
        loading: false,
      }
    },
    computed:{
      form() {
        return this.$store.state.user;
      }
    },
    methods: {
      // handleSubmit(name) {
      //   let state = this.$store.state;
      //   this.$refs[name].validate((valid) => {
      //     if (valid) {

      //       setTimeout(()=> {
      //         let state = sessionStorage.getItem('state');
      //         if (state !== '1') {
      //           this.$Message.error('登入超时');
      //           this.$store.state.user.loading = true;
      //         }
      //       }, 20000);

      //       this.$store.dispatch('loginIn', this.$router);
      //     }
      //   });
      // },

      toclose() {
        this.$emit('close');
      },

      wechatLogin() {
        console.log('hello')
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
      // setTimeout(()=> {
      //   this.loading = true;
      // }, 3000);
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
    /* z-index: 0; */
    padding: 12px;
    background-position:center; 
  }

  .md-theme-default.md-sidenav .md-sidenav-content {
    color: rgba(0, 0, 0, .57);
  }
	
</style>
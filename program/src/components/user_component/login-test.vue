
<template >
    <div class="login">
   <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm12 md6>
        <v-card>
          <v-toolbar color="white">
            <v-toolbar-side-icon></v-toolbar-side-icon>
          </v-toolbar>
          <v-card-text style="height: 300px;" class="grey lighten-5"></v-card-text>
          <v-card-text style="height: 100px; position: relative">
            <v-btn
              absolute
              dark
              fab
              top
              right
              color="pink"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md6>
        <v-card>
          <v-toolbar color="white" extended>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-btn
              color="pink"
              dark
              small
              absolute
              bottom
              left
              fab
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text style="height: 228px;" class="grey lighten-5"></v-card-text>
          <v-card-text style="height: 100px; position: relative">
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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

      wechatLogin() {
        console.log('hello')
        let appid = 'wx578ee588948c8fcc';
        let redirect_uri = 'http://cloud.tujingwang.cn/user/wechat';
        let sid = this.$store.state.socketClass.socket.id;

        window.open(`https://open.weixin.qq.com/connect/qrconnect?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_login&state=${sid
        }#wechat_redirect`);
        this.$emit('closeLoginSidenav');

      }
    },
    mounted(){

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
    padding: 0px;
    background-position:center; 
  }

  .md-theme-default.md-sidenav .md-sidenav-content {
    color: rgba(0, 0, 0, .57);
  }
	
</style>
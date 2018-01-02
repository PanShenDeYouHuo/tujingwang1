<template>
  <div class="aam">

    <v-container grid-list-xl fluid >
      <v-layout row wrap>
        <v-flex xs4>
          <v-card class="text-xs-center" style="padding:20px">
              <div class="display-2" color="orange">{{admin.totalAccount}}</div>
              <span class="caption grey--text">全  部</span>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card class="text-xs-center" style="padding:20px">
            <div class="display-2" >{{admin.totalAccount - admin.disableAccount}}</div>
            <span class="caption grey--text">使  用</span>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card class="text-xs-center" style="padding:20px">
            <div class="display-2 red--text">{{admin.disableAccount}}</div>
            <span class="caption grey--text">禁 用</span>
          </v-card>
        </v-flex>

        <v-flex xs12 class="py-2">

          <v-card>

            <v-card-title style="padding: 0px 16px;">
              <buttongroup title="状态" :items="items" active="使用" @change="getBossAccounts"></buttongroup>
              <v-spacer></v-spacer>
              <v-btn outline color="black" @click="bossWechatReg()">
                    注册
              </v-btn>

            </v-card-title>

          </v-card>

          
        </v-flex>
          
        <v-flex xs2 v-for="(bossAccount, index) in admin.bossAccounts" :key="bossAccount._id">
            <!-- <v-layout row wrap justify-start style=""> -->
              <v-card class="text-xs-center" style="height:220px; padding-top: 40px;">
                
                <v-btn flat fab class="hand" style="height: 80px; width: 80px; min-width: 20px; margin: 0px; padding: 0px;" @click="openAuth(index)">
                  <v-avatar size="80px">
                    <img :src=" bossAccount.headimgurl.substr(0, bossAccount.headimgurl.length-1) + '0' " alt="Avatar" >
                  </v-avatar>
                </v-btn>
                <div class="body-1" style="padding-top:10px;font-weight:bold; ">{{bossAccount.nickname}}</div>
                <span class="caption grey--text">{{!!bossAccount.city ? bossAccount.city : '无'}} / {{!!bossAccount.province ? bossAccount.province : '无'}} / {{!!bossAccount.country ? bossAccount.country : '无'}}</span>

              </v-card>


            <!-- </v-layout> -->
        </v-flex>

      </v-layout>
    </v-container>

    <v-dialog v-model="nproject.dialog" persistent max-width="500px">
      <v-card>
          <v-card-text>
              <v-container grid-list-md>
                  <v-layout wrap>
                      <v-flex xs12>
                        <v-subheader>权限管理</v-subheader>

                          <v-card flat>
                            <v-card-text>
                              <v-switch v-bind:label="`基础系统: ${ex11 ? '允许' : '禁止'}`" v-model="ex11"></v-switch>
                            </v-card-text>
                          </v-card>
                          <!-- <v-form v-model="nproject.valid" ref="br" lazy-validation>
                              <v-text-field label="手机号码" v-model="nproject.name" :rules="nproject.rules" 
                              @keyup.enter=""></v-text-field> -->
                              <!-- 用来消除空格提交 -->
                              <!-- <v-text-field  label="登入密码"></v-text-field>
                          </v-form> -->
                      </v-flex>
                  </v-layout>
              </v-container>
          </v-card-text>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small flat @click="nproject.dialog = false">取消</v-btn>
              <v-btn small flat :loading="admin.putBossAccountLoading" @click="putBossAccount()">保存</v-btn>
          </v-card-actions>
      </v-card>
    
    </v-dialog>

  </div>
</template>

<script>
import buttongroup from "../Buttongroup";
export default {
  name: 'aam',
  components:{buttongroup},
  data() {
    return {
      ex11: true,
      value: 0,
      currentPage: 1,
      active: '',
      items: [
        {name: '使用'},
        {name: '禁用'},
      ],
      nproject: {
        dialog: false,
        name: '',
        valid: false,
        rules: [
            (v) => !!v || '请填写任务名称',
        ]
      },
    };
  },
  computed: {
    admin() {
      return this.$store.state.admin;
    }
  },
  methods: {
    //退回到首页
    quit() {
        this.$router.replace({name:'/'});
    },
    //路由跳转
    change(item) {

      this.$router.replace({path:`/admin/${item}`});
    },

    //boss级账号注册
    bossWechatReg() {
      let appid = 'wx578ee588948c8fcc';
      let redirect_uri = 'http://cloud.tujingwang.cn/user/bossWechatReg';
      let sid = this.$store.state.socketClass.socket.id;

      window.open(`https://open.weixin.qq.com/connect/qrconnect?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_login&state=${sid
      }#wechat_redirect`);
    },

    //获取boss级账号列表
    getBossAccounts(name) {
      this.active = name;
      let state = 1;
      if(name === "禁用") state = 2;

      this.$store.dispatch('getBossAccounts', {pageSize: 18, currentPage: this.currentPage, state})
    },

    //打开权限设置
    openAuth(index) {
      // console.log(this.admin.bossAccounts[index].state);
      this.admin.bossAccount = this.admin.bossAccounts[index];
      this.ex11 = true;
      if( this.admin.bossAccounts[index].state == 2 ) this.ex11 = false;
      this.nproject.dialog = true;

    },

    //修改权限
    putBossAccount() {
      let state = 0;
      if(this.ex11 === false) state = 2;
      let _id = this.admin.bossAccount._id;
      this.$store.dispatch('putBossAccount', {_id,state})
      .then((res)=> {
        this.getBossAccounts(this.active);
        this.$store.dispatch('getBossAccountStatistics');
        this.nproject.dialog = false;
      })
      .catch((err)=> {
        console.log(err);
      })
    }

  },
  mounted(){
      // this.change(this.items[0]);
  },
  beforeCreate() {
    this.$store.dispatch('getBossAccounts',{pageSize: 18, currentPage: this.currentPage, state: 1});
    this.$store.dispatch('getBossAccountStatistics');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .aam {
    width:100%;
  }

  .hand {
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
  }

  
</style>
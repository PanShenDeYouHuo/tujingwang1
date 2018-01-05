<template>
    <div class="staff">




            <v-container grid-list-xl fluid  class="" style="padding: 12px; padding-top: 16px;">
                <v-layout row wrap>

                    <v-flex xs12 >
                        <v-card >
                            <v-card-title style="padding: 0px 16px;">
                                <buttongroup title="" :items="items" active="全部" @change="change"></buttongroup>
                                <v-spacer></v-spacer>
                                <v-btn outline  color="black" @click="staffWechatReg()">
                                    注册
                                </v-btn>
                            </v-card-title>
                        </v-card>
                    </v-flex>

    
                    <v-flex xs12 v-for="staff in boss.staffAccounts" :key="staff._id">
                        <p>{{staff.nickname}},{{staff.authority}}</p>

                    </v-flex>

                </v-layout>
            </v-container>


    </div>
</template>

<script>
import buttongroup from "../Buttongroup";
export default {
    name: 'staff',
    components:{buttongroup},
    props: [],
    data() {
        return {
            currentPage: 1,

            items: [
                {name: '全部', router: 'all'},
                {name: '财务', router: 'financial'},
                {name: '客服', router: 'service'},
                {name: '组长', router: 'leder'},
                {name: '组员', router: 'member'},
            ],

            active: '全部',
        }
    },
    computed: {
        boss() {
            return this.$store.state.boss;
        }
    },
    methods: {
        quit() {
            this.$router.replace({name:'/'});
        },
        change(item) {
            this.active = item;
            this.$store.dispatch('getStaffAccounts', {pageSize: 18, currentPage: this.currentPage, authority: item.router, });
            // this.$router.replace({path:`/boss`});
        },

        //staff级账号注册
        staffWechatReg() {
            let appid = 'wx578ee588948c8fcc';
            let redirect_uri = 'http://cloud.tujingwang.cn/user/staffWechatReg';
            let sid = this.$store.state.socketClass.socket.id;

            window.open(`https://open.weixin.qq.com/connect/qrconnect?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_login&state=${sid
            }#wechat_redirect`);
        },
    },
    mounted(){
        //获取账号列表
        console.log('hello')
        this.$store.dispatch('getStaffAccounts', {pageSize: 18, currentPage: this.currentPage, authority: 'all'});
    },
    beforeCreate() {
        // //获取账号列表
        // this.$store.dispatch('getStaffAccounts', {pageSize: 18, currentPage: this.currentPage, authority: 'all'});
        // this.change(this.items[0]);
    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 

  .staff {
      width: 100%;
  }

  .menu-active {
      /* color: red; */
      background-color: #bbb;
  }

</style>
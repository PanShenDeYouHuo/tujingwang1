<template>
    <div class="statistics">



            <v-container grid-list-xl fluid  class="" style="padding: 12px; padding-top: 16px;">
                <v-layout row wrap>
                    <v-flex xs12 >
                        <p>statistics</p>
                    </v-flex>

                </v-layout>
            </v-container>


    </div>
</template>

<script>
import buttongroup from "../Buttongroup";
export default {
    name: 'statistics',
    components:{buttongroup},
    props: [],
    data() {
        return {

            items: [
                {name: '统计'},
                {name: '员工'},
            ],

            active: '系统详情',
        }
    },
    computed: {

    },
    methods: {
        quit() {
            this.$router.replace({name:'/'});
        },
        change(item) {
            this.active = item.title;
            this.$router.replace({path:`/boss`});
        },

        //boss级账号注册
        staffWechatReg() {
            let appid = 'wx578ee588948c8fcc';
            let redirect_uri = 'http://cloud.tujingwang.cn/user/staffWechatReg';
            let sid = this.$store.state.socketClass.socket.id;

            window.open(`https://open.weixin.qq.com/connect/qrconnect?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_login&state=${sid
            }#wechat_redirect`);
        },
    },
    mounted(){

    },
    beforeCreate() {
        
        // this.change(this.items[0]);
    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 

  .statistics {
      width: 100%;
  }

  .menu-active {
      /* color: red; */
      background-color: #bbb;
  }

</style>
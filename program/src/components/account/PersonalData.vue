<template>
    <div class="personalData">



            <v-container grid-list-xl fluid  class="" style="padding: 12px; padding-top: 16px;">
                <v-layout row wrap>
                    <v-flex xs12 >
                        <v-card >
 
                            <v-flex xs12 class="text-xs-center" >

                                <v-btn flat fab class="hand" style="height: 100px; width: 100px; min-width: 20px; margin: 0px; padding: 0px;" @click="">
                                    <v-avatar size="100px">
                                        <img :src=" user.headimgurl" alt="Avatar" >
                                    </v-avatar>
                                </v-btn>

                                <div class="body-1" style="padding-top:10px;">

                                    <span style="font-weight:bold;">
                                        {{user.nickname}}
                                    </span>
                                    <v-chip small v-if="user.realInformation.state === 2" color="green" text-color="white">已认证</v-chip>
                                    <v-chip small v-else-if="user.realInformation.state === 1" color="red" text-color="white">审核中</v-chip>
                                    <v-chip v-else small color="red" text-color="white">未认证</v-chip>
                                </div>


                                <!-- <span class="caption grey--text">{{!!bossAccount.city ? bossAccount.city : '无'}} / {{!!bossAccount.province ? bossAccount.province : '无'}} / {{!!bossAccount.country ? bossAccount.country : '无'}}</span> -->

                            </v-flex>
     

                            <v-divider></v-divider>


                            <v-subheader style="font-weight:bold; ">基本信息</v-subheader>

                            <v-flex style=" padding-top: 0px;">

                                <v-flex>
                                    <span class="grey--text">
                                        名字：
                                    </span>
                                    <span v-if="user.realInformation.state === 2" style="font-weight:bold;">{{user.realInformation.name}}</span>
                                    <span v-else style="font-weight:bold;" class="red--text">未认证</span>
                                </v-flex>
                                <v-flex>
                                    <span class="grey--text">
                                        手机：
                                    </span>
                                    <span>
                                        未绑定
                                    </span>
                                </v-flex>

                                <v-flex>
                                    <span class="grey--text">性别：</span>
                                    <span>{{user.sex === 1 ? '男' : user.sex === 2 ? '女' :'保密'}}</span>
                                </v-flex>

                                <v-flex>
                                    <span class="grey--text">
                                        职位：
                                    </span>

                                    <v-chip v-for="job in user.authority" :key="job" color="red" text-color="white" small>{{job}}</v-chip>

                                </v-flex>

                                <v-flex>
                                    <span class="grey--text">
                                        地区：
                                    </span>
                                    <span>
                                        {{!!user.province ? user.province : '未知'}} / {{!!user.city ? user.city : '未知'}}
                                    </span>
                                </v-flex>

                            </v-flex>

                            <v-divider></v-divider>
                                <v-layout>

                                    <v-flex xs8>
                                        <v-subheader style="font-weight:bold; ">联系方式</v-subheader>
                                    </v-flex>

                                    <v-flex xs4 class="text-xs-right">
                                        <v-btn small color="yellow darken-1" style="min-width: 0px; margin-top: 10px;" @click="putContactInformation()">保存</v-btn>
                                    </v-flex>
                                </v-layout>

                                <v-flex style=" padding-top: 0px;">

                                     <v-flex style="padding-top: 0px; padding-bottom: 0px;">
                                        <v-text-field
                                        name="input-1"
                                        label="QQ"
                                        v-model="user.contactInformation.QQ"
                                        ></v-text-field>
                                     </v-flex>

                                    <v-flex style="padding-top: 0px; padding-bottom: 0px;">
                                        <v-text-field
                                          name="input-2"
                                        label="微信"
                                        v-model="user.contactInformation.wechat"
                                        ></v-text-field>
                                     </v-flex>

                                </v-flex>

                        </v-card>
                    </v-flex>

                </v-layout>
            </v-container>


    </div>
</template>

<script>
import buttongroup from "../Buttongroup";
export default {
    name: 'personalData',
    components:{buttongroup},
    props: [],
    data() {
        return {

            // items: [
            //     {name: '统计'},
            //     {name: '员工'},
            // ],

            active: '系统详情',

            row: 1
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    methods: {
        quit() {
            this.$router.replace({name:'/'});
        },
        change(item) {
            this.active = item.title;
            this.$router.replace({path:`/boss`});
        },

        //跟新联系方式
        putContactInformation() {
            this.$store.dispatch('putContactInformation');
        }
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

  .personalData {
      width: 100%;
  }

  .menu-active {
      /* color: red; */
      background-color: #bbb;
  }

</style>
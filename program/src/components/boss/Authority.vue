<template>
    <div class="staff">




            <v-container grid-list-xl fluid  class="" style="padding: 12px; padding-top: 16px; ">
                <v-layout row wrap>

                    <v-flex xs12 >
                        <v-card >
                            <v-card-title style="padding: 0px 16px;">
                                <buttongroup title="" :items="items" active="全部" @change="getStaffAccounts"></buttongroup>
                                <v-spacer></v-spacer>
                                <v-btn outline  color="black" @click="staffWechatReg()">
                                    注册
                                </v-btn>
                            </v-card-title>
                        </v-card>
                    </v-flex>


                    <v-flex xs2 v-for="staff in boss.staffAccounts" :key="staff._id">

                        <v-card style="">
                                    
                            <v-card-media :src=" staff.headimgurl.substr(0, staff.headimgurl.length-3) + '0' " height="132px" @click="">
                                <v-chip v-for="job in staff.authority" :key="job" color="red" text-color="white" small>{{job}}</v-chip>
                            </v-card-media>

                            <!-- <v-btn flat fab class="hand" style="height: 80px; width: 80px; min-width: 20px; margin: 0px; padding: 0px;" @click="openAuth(index)">
                                <v-avatar size="80px">
                                    <img :src=" staff.headimgurl " alt="Avatar" >
                                </v-avatar>
                            </v-btn> -->
                            <div class="caption" style="padding-top:10px; padding-left:10px; ">
                                <span class="grey--text caption">姓名：</span>
                                <span v-if="staff.realInformation.state === 2" style="font-weight:bold;">{{staff.realInformation.name}}</span>
                                <span v-else style="font-weight:bold;">未知</span>
                            </div>
                            <div style="padding-top:10px; padding-left:10px; ">
                                <span class="caption" style="font-weight:bold; white-space: nowrap; display: inline-block; overflow: hidden; width: 132px; text-overflow: ellipsis;">
                                    <span class="grey--text caption">昵称：</span>
                                    {{staff.nickname}}
                                </span>
                            </div>
                           <v-divider></v-divider>
                            <v-card-actions>

                                <v-btn class="my-btn text-xs-center" flat small >
                                    <span class="grey--text caption">权限设置</span>
                                </v-btn>

                            </v-card-actions>
                        </v-card>

                    </v-flex>

                    <v-flex xs12>
                        <v-card>
                            <v-card-title style="padding: 0px 16px;" >
                                 <div class="text-xs-center" style="width: 100%;">
                                    <v-pagination  
                                    v-bind="{'disabled': boss.getStaffAccountsLoading}"
                                    :length="boss.staffAccountsCount" v-model="currentPage" :total-visible="7" @input="getStaffAccounts(active)"></v-pagination>
                                </div>
                            </v-card-title>
                        </v-card>
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
                {name: '普通', router: 'member'},
            ],

            active: {},
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
        getStaffAccounts(item) {
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
        //初始化，获取账号列表
        this.getStaffAccounts(this.items[0]);

        //注册成功的回调
        this.$store.state.socketClass.socket.on('staffWechatRegSuccess', (data)=> {
            setTimeout(() => {
                this.$store.state.successSnackbar = {state: true, text: data};
            }, 800);
            this.getStaffAccounts(this.active);
        });

    },
    beforeCreate() {
        //获取账号列表
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

    .hand {
        border-top-left-radius: 40px;
        border-top-right-radius: 40px;
    }

    .my-btn {
        margin-left: 0px;
        margin-right: 0px;
        min-width: 0px;
        
    }

    .card__actions {
        padding: 4px 8px 4px 6px;
    }

</style>
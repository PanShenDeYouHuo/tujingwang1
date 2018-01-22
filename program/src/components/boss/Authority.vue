<template>
    <div class="authority">




            <v-container grid-list-xl fluid  class="" style="padding: 12px; padding-top: 16px; ">
                <v-layout row wrap>

                    <v-flex xs12 >
                        <v-card>
                            <v-card-title style="padding: 0px 16px;">
                                <buttongroup title="" :items="items" :active="active" :disabled="this.$store.state.appLoading" @change="getStaffAccounts"></buttongroup>
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
                                <span v-else style="font-weight:bold;" class="red--text">未认证</span>
                            </div>
                            <div style="padding-top:10px; padding-left:10px; ">
                                <span class="caption" style="font-weight:bold; white-space: nowrap; display: inline-block; overflow: hidden; width: 132px; text-overflow: ellipsis;">
                                    <span class="grey--text caption">昵称：</span>
                                    {{staff.nickname}}
                                </span>
                            </div>
                           <v-divider></v-divider>
                            <v-card-actions>

                                <!-- <v-btn class="my-btn text-xs-center" flat small @click="authority.dialog = true">
                                    <span class="grey--text caption">权限设置</span>
                                </v-btn> -->

                                <v-menu
                                    offset-x
                                    :close-on-content-click="false"
                                    :nudge-width="200"
                                    v-model="staff.menu"
                                    max-width='350'
                                >
                                    <v-btn class="my-btn text-xs-center" flat small slot="activator" @click="open()">
                                        <span class="grey--text caption">设置</span>
                                    </v-btn>
                                    <!-- <v-btn color="indigo" dark slot="activator">Menu as Popover</v-btn> -->
                                    <v-card>
                                        <v-list>
                                            <v-list-tile avatar>
                                                <v-list-tile-avatar>
                                                    <img :src="staff.headimgurl" alt="John">
                                                </v-list-tile-avatar>
                                                <v-list-tile-content>
                                                    <v-list-tile-title>{{staff.nickname}}</v-list-tile-title>
                                                </v-list-tile-content>
                                                <v-list-tile-action>
                                                <!-- <v-btn
                                                    icon
                                                    :class="fav ? 'red--text' : ''"
                                                    @click="fav = !fav"
                                                >
                                                    <v-icon>favorite</v-icon>
                                                </v-btn> -->
                                                </v-list-tile-action>
                                            </v-list-tile>
                                        </v-list>
                                        <v-divider></v-divider>

                                        <v-layout wrap>
                                            <v-flex xs12 style="padding: 12px;">

                                                <v-select
                                                    label="权限"
                                                    v-bind:items="people"
                                                    v-model="staff.authority"
                                                    item-text="router"
                                                    item-value="router"
                                                    multiple
                                                    chips
                                                    max-height="auto"
                                                    autocomplete
                
                                                >
                                                    <template slot="selection" slot-scope="data">
                                                        <v-chip
                                                            close
                                                            @input="data.parent.selectItem(data.item)"
                                                            :selected="data.selected"
                                                            class="chip--select-multi white--text"
                                                            :key="JSON.stringify(data.item)"
                                                            color="red"
                                                        >
                                                        <!-- <v-avatar>
                                                            <img :src="data.item.avatar">
                                                        </v-avatar> -->
                                                            {{ data.item.router }}
                                                        </v-chip>
                                                    </template>
                                                    <template slot="item" slot-scope="data">

                                                        <template v-if="typeof data.item !== 'object'">
                                                            <v-list-tile-content v-text="data.item"></v-list-tile-content>
                                                        </template>

                                                        <template v-else>

                                                            <v-list-tile-content>
                                                                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                                                <v-list-tile-sub-title v-html="data.item.description"></v-list-tile-sub-title>
                                                            </v-list-tile-content>
                                                        </template>
                                                        
                                                    </template>
                                                </v-select>
                                            </v-flex>
                                        </v-layout>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn flat small @click="cancel(staff)" :disabled="appLoading">取消</v-btn>
                                            <v-btn color="primary" flat small @click="putAuthority(staff)" :disabled="appLoading" :loading="appLoading">保存</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-menu>

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
    name: 'authority',
    components:{buttongroup},
    props: [],
    data() {
        return {
            authority: {
                menu: false,
            },
            currentPage: 1,

            items: [
                {name: '全部', router: 'all', url: '/all'},
                {name: '财务', router: 'financial', url: '/financial'},
                {name: '客服', router: 'service', url: '/service'},
                {name: '组长', router: 'leder', url: '/leder'},
                {name: '渲染', router: 'member', url: '/render'},
            ],

            active: '',

            e11: [],
            people: [
                // { header: 'Group 1'},
                // { name: 'Sandra Adams', group: 'Group 1',  },
                // { name: 'Ali Connors', group: 'Group 1', },
                // { name: 'Trevor Hansen', group: 'Group 1', },
                // { name: 'Tucker Smith', group: 'Group 1',},
                // { divider: true },
                // { header: 'Group 2'},
                // { name: 'Britta Holt', group: 'Group 2'},
                // { name: 'Jane Smith ', group: 'Group 2', },
                // { name: 'John Smith', group: 'Group 2', },
                // { name: 'Sandra Williams', group: 'Group 2', }
                { name: '财务', description: '授权财务的权限', router: 'financial' },
                { name: '客服', description: '授权客服的基本权限', router: 'service'},
                { name: '客服主管', description: '授权客服处理客户账号的权限', router: 'serviceMaster' },
                { name: '组长', description: '授权组长的权限', router: 'leder'},
                { name: '渲染师', description: '授权渲染师的权限', router: 'render'}
                
            ],
        }
    },
    computed: {
        boss() {
            return this.$store.state.boss;
        },
        appLoading() {
            return this.$store.state.appLoading;
        }
    },
    methods: {
        quit() {
            this.$router.replace({name:'/'});
        },
        getStaffAccounts(url) {
            this.active = url;
            console.log(url.slice(1));
            this.$store.dispatch('getStaffAccounts', {pageSize: 18, currentPage: this.currentPage, authority: url.slice(1), });
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

        cancel(staff) {
            if( !this.e11) {
                staff.authority = [];
            } else {
                for (let i in this.e11) {
                    staff.authority[i] = this.e11[i];
                }
            }
            staff.menu = false;
        },

        open(authority) {
            this.e11 = authority;
        },

        //修改员工权限
        async putAuthority(staff) {
            try {
                await this.$store.dispatch('putAuthority', {_id: staff._id, authority: staff.authority});
                staff.menu = false;
            } catch (err) {
                cancel(staff);
                console.log(err);
            }
        }
    },
    mounted(){
        //初始化，获取账号列表
        this.getStaffAccounts(this.items[0].url);

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

    .authority {
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
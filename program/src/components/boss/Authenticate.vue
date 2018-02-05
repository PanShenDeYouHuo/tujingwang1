<template>
    <div class="authenticate">




            <v-container grid-list-xl fluid  class="" style="padding: 12px; padding-top: 16px; ">
                <v-layout row wrap>

                    <v-flex xs12 >
                        <v-card >
                            <v-card-title style="padding: 0px 16px; height: 48px;">
                                <buttongroup title="" :items="items" :active=" active " :disabled="this.$store.state.appLoading" @change="getAuthenticateAccounts"></buttongroup>
                                <v-spacer></v-spacer>

                            </v-card-title>
                        </v-card>
                    </v-flex>


                    <v-flex xs2 v-for="(staff, index) in boss.authenticateAccounts" :key="staff._id">

                        <v-card style="">
                                    
                            <v-card-media :src=" staff.headimgurl.substr(0, staff.headimgurl.length-3) + '0' " height="132px">
                            </v-card-media>

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

                                <v-btn class="my-btn text-xs-center" flat small v-bind="{'disabled': staff.realInformation.state !== 1}" @click="openAuthenticateDialog(index)">
                                    <span v-if="staff.realInformation.state === 0" class="grey--text caption">未认证</span>
                                    <span v-else-if="staff.realInformation.state === 1" class="red--text caption">审核中</span>
                                    <span v-else class="green--text caption">已认证</span>
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
                                    :length="boss.authenticateAccountsCount" v-model="currentPage" :total-visible="7" @input="getAuthenticateAccounts(active)"></v-pagination>
                                </div>
                            </v-card-title>
                        </v-card>
                    </v-flex>


                </v-layout>
            </v-container>

               <v-dialog v-model="authenticate.dialog" persistent max-width="800px">
                <v-card>
                    <v-card-title>
                        <span class="title" >
                            审核
                        </span>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                            <v-layout wrap>
                                <v-flex xs12>
 
                                    <v-form v-model="authenticate.form" ref="br" lazy-validation>
                                        <!-- <v-text-field label="手机号码" v-model="" :rules="" 
                                        @keyup.enter=""></v-text-field> -->
                                        <!-- 用来消除空格提交 -->
                                        <v-text-field label="姓名" v-model="authenticate.name" placeholder="请输入姓名" :counter="10"  disabled></v-text-field>
                                        <v-text-field label="身份证号码" v-model="authenticate.IDNumber" placeholder="请输入身份证" :counter="18"  disabled></v-text-field>
                                        <v-text-field label="银行卡账号" v-model="authenticate.bankCardAccount" placeholder="XXXX-XXXX-XXXX-XXXX" :counter="20"   disabled></v-text-field>
                                        <v-text-field label="开户行信息" v-model="authenticate.openingBank" placeholder="开户行" :counter="30"  disabled></v-text-field>
                                    </v-form>
                                    
                                    <v-container grid-list-md fluid  class="" >
                                    <v-layout wrap>
                                        <v-flex xs4>

                                            <v-card>
                                                <v-card-media :src="authenticate.IDCardFrontObjectKey " height="160px">

                                                </v-card-media>
                                                <v-card-title primary-title>
                                                    <div>
                                                        <h6 class="subheading mb-0">身份证正面</h6>

                                                    </div>
                                                </v-card-title>
                                            </v-card>

                                        </v-flex>

                                        <v-flex xs4>

                                            <v-card>
                                                <v-card-media :src="authenticate.IDCardReverseObjectKey" height="160px">

                                                </v-card-media>
                                                <v-card-title primary-title>
                                                    <div>
                                                        <h6 class="subheading mb-0">身份证背面</h6>

                                                    </div>
                                                </v-card-title>
                                            </v-card>

                                        </v-flex>
                                        <v-flex xs4 >

                                            <v-card>
                                                <v-card-media :src="authenticate.bankCardFrontObjectKey" height="160px">
                                                </v-card-media>
                                                <v-card-title primary-title>
                                                    <div>
                                                        <h6 class="subheading mb-0">银行卡</h6>

                                                    </div>
                                                </v-card-title>
                                            </v-card>

                                        </v-flex>
                                    </v-layout>
                                    </v-container>
   

                                </v-flex>

                            </v-layout>

                         </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn small flat style="min-width: 0px;"  @click="authenticate.dialog = false" :disabled="this.$store.state.appLoading">取消</v-btn>
                        <v-btn small  color="red darken-1" style="min-width: 0px;" @click="putAuthenticate(0)" :disabled="this.$store.state.appLoading">否决</v-btn>
                        <v-btn small  color="yellow darken-1" style="min-width: 0px;" @click="putAuthenticate(2)" :disabled="this.$store.state.appLoading">通过</v-btn>
                    </v-card-actions>
                </v-card>
            
            </v-dialog>


    </div>
</template>

<script>

import buttongroup from "../Buttongroup";
export default {
    name: 'authenticate',
    components:{buttongroup},
    props: [],
    data() {
        return {
            currentPage: 1,

            items: [
                {name: '审核中', router: 'review', url:'/review'},
                {name: '已认证', router: 'treated', url: '/treated'},
                {name: '未认证', router: 'untreated', url: '/untreated'},
            ],

            active: '',

            //认证状态映射
            map: {
                '/untreated': 0,
                '/review': 1,
                '/treated': 2,
            },

            //审核数据
            authenticate: {
                dialog: false,
                form: true,
                name: '',                           //真实姓名
                IDNumber: '',                       //身份证号码
                bankCardAccount: '',                //银行卡账号
                openingBank: '',                    //开户行
                IDCardFrontObjectKey: '',
                IDCardReverseObjectKey: '',
                bankCardFrontObjectKey: '',
            },
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
        getAuthenticateAccounts(url) {
            if (this.active !== url) this.currentPage = 1;
            this.active = url;
            this.$store.dispatch('getAuthenticateAccounts', {pageSize: 18, currentPage: this.currentPage, state: this.map[url], });
            // this.$router.replace({path:`/boss`});
        },

        //打开审核页面
        async openAuthenticateDialog(index) {
            try {
                let buf = this.boss.authenticateAccounts[index].realInformation;
                this.boss.authenticateAccount = this.boss.authenticateAccounts[index];
                //获取读权限
                await this.$store.dispatch('getReadAccountStsTokenBoss', {_id: this.boss.authenticateAccount._id});

                //表单数据
                this.authenticate.name = buf.name;
                this.authenticate.IDNumber = buf.IDNumber;
                this.authenticate.bankCardAccount = buf.bankCardAccount;
                this.authenticate.openingBank = buf.openingBank;

                //获取授权后的图片地址
                this.authenticate.IDCardFrontObjectKey = this.$store.state.ossFile.client.signatureUrl(buf.IDCardFrontObjectKey, {expires: 600, process:'image/resize,w_500'});
                this.authenticate.IDCardReverseObjectKey = this.$store.state.ossFile.client.signatureUrl(buf.IDCardReverseObjectKey, {expires: 600, process:'image/resize,w_500'});
                this.authenticate.bankCardFrontObjectKey = this.$store.state.ossFile.client.signatureUrl(buf.bankCardFrontObjectKey, {expires: 600, process:'image/resize,w_500'});
    
                //打开模态框
                this.authenticate.dialog = true;
            } catch (err) {
                this.$store.state.errorSnackbar = { state: true, text: err.message };
            }

         },

         //设置审核
        async putAuthenticate(state) {
            try {
                await this.$store.dispatch('putAuthenticate', {_id: this.boss.authenticateAccount._id, state});
                //重新导入数据
                this.getAuthenticateAccounts(this.active);
                //关闭模态框
                this.authenticate.dialog = false;
            } catch (err) {
                this.$store.state.errorSnackbar = { state: true, text: err.message };
            }

        }
    },
    mounted(){
        //初始化，获取账号列表
        this.getAuthenticateAccounts(this.items[0].url);

        //注册成功的回调
        this.$store.state.socketClass.socket.on('staffWechatRegSuccess', (data)=> {
            setTimeout(() => {
                this.$store.state.successSnackbar = {state: true, text: data};
            }, 800);
            this.getAuthenticateAccounts(this.active);
        });

    }, 
    beforeCreate() {

    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 

    .authenticate {
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
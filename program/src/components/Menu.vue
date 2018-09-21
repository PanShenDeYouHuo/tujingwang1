<template>
    <div class="my-menu">


        <!-- 图标 -->
        <v-layout row  align-center>

            <v-flex lg2 >
                <v-layout row wrap justify-start style="margin-left: 100px;">

                    <v-avatar>
                        <img src="../assets/logo2.png" alt="logo" @click="toggleRightSidenav()">
                    </v-avatar>

                </v-layout>
            </v-flex>

            <!-- 导航按钮 -->

            <v-flex lg8>
                <v-layout justify-center align-content-space-between>
                    <v-btn v-for=" text in menuText"
                    class="menu-btn"
                    flat
                    :key="text.title"
                    v-bind:class="{'menu-active': text.url === active}"
                    @click="urlChange(text.url)">
                        {{text.title}}
                     </v-btn>
                </v-layout>
            </v-flex>
         

            <!-- 登入管理 -->

            <v-flex lg2 >
                <v-layout row justify-end style=" margin-right: 100px;">
                    <!-- 未登入显示 -->
                    <v-btn flat style="margin-right: 0px; min-width: 10px; color: #aaa" v-show="!user._id"  @click="to_login()">登入</v-btn>
                   
                    <!-- <v-btn flat style="margin-left: 0px;  min-width: 10px; color: #aaa" v-show="!user._id">注册</v-btn> -->

                    <!-- 登入且客服显示显示 -->
                    <v-btn v-if="user._id && user.authority.indexOf('service') !== -1" flat @click="urlChange('/publish')"  class="menu-btn-o">
                        <i class="material-icons">cloud_upload</i>
                        <!-- <span>发布</span> -->
                    </v-btn>

                    <!-- 通知 -->
                    <v-menu offset-y left min-width="310" max-width="310" v-if="user._id" >
                        <v-btn flat slot="activator" class="menu-btn-o">
                            <v-badge color="red" v-model="this.notifyShow">
                                    <span slot="badge">{{this.notifyNumber}}</span>
                                    <i class="material-icons">notifications</i>
                                    <!-- <span>通知</span> -->
                            </v-badge>
                        </v-btn>

                        <v-card flat>
                            <v-card-title style="">
                                <span class="subheading" style="">消息盒</span>
                            </v-card-title>
     
                            <v-divider></v-divider>

            

                            <v-list style="height: 230px; overflow-y:auto;">
                                <div v-for="(notify, index) in notifyData" :key="index">

                                    <v-list-tile @click="putNotify(notify)">
                                        <v-list-tile-content>
                                        <v-list-tile-title class="body-2 " v-bind:class="{'grey--text': notify.state === 1}" style="font-weight:bold;">【{{notifyType[notify.ntype]}}】</v-list-tile-title>
                                        <v-list-tile-title class="caption" v-bind:class="{'grey--text': notify.state === 1}" >{{notify.concent}}</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-divider></v-divider>
                                </div>

                            </v-list>
    
                        <v-divider></v-divider>

                            <v-card-actions>
                                <v-flex xs12 class="text-xs-center" >
                                    <v-btn flat @click="urlChange('/notify')">

                                    <span class="body-2" style=" ">查看全部</span>
                                    </v-btn>
                                </v-flex>
                            </v-card-actions>
                        </v-card>
                    </v-menu> 


                    <v-menu offset-y left v-if="user._id">
                        <!-- 头像按钮 -->
                        <v-btn flat  slot="activator" class="menu-btn-o"  style="height: 50px; width: 64px; min-width: 20px; margin: 0px; padding: 0px;">

                            <v-avatar size="38px">
                                <img :src=" user.headimgurl " alt="Avatar" >
                            </v-avatar>

                        </v-btn>
                        <!-- 菜单 -->
                        <v-list dense>


                            <!-- <v-list-tile v-for="item in items" :key="item.title"  @click="urlChange(item.url)">
                                <v-list-tile-title class="body-1">{{ item.title }}</v-list-tile-title>
                            </v-list-tile> -->

                            <!-- <v-divider v-else-if="item.divider" :key="index"></v-divider>

                            <v-list-tile v-else :key="index" @click="signOut()">
                                <v-list-tile-title class="body-1">{{ item.signOut }}</v-list-tile-title>
                            </v-list-tile> -->

                            <v-list-tile v-if="user.authority.indexOf('render') !== -1"  @click="urlChange('/works')">
                                <v-list-tile-title class="body-1">我的任务</v-list-tile-title>
                            </v-list-tile>

                            <v-list-tile v-if="user.authority.indexOf('service') !== -1"  @click="urlChange('/projects')">
                                <v-list-tile-title class="body-1">项目管理</v-list-tile-title>
                            </v-list-tile>

                            <!-- <v-list-tile v-if="user.authority.indexOf('leder') !== -1"  @click="urlChange('/temas')">
                                <v-list-tile-title class="body-1">我的团队</v-list-tile-title>
                            </v-list-tile> -->

                            <v-list-tile v-if="user.authority.indexOf('customerManager') !== -1"  @click="urlChange('/customer')">
                                <v-list-tile-title class="body-1">客户管理</v-list-tile-title>
                            </v-list-tile>

                            <v-list-tile v-if="user.authority.indexOf('financial') !== -1"  @click="urlChange('/financial')">
                                <v-list-tile-title class="body-1">财务管理</v-list-tile-title>
                            </v-list-tile>

                            <v-list-tile v-if="user.authority.indexOf('boss') !== -1"  @click="urlChange('/boss/statistics')">
                                <v-list-tile-title class="body-1">公司管理</v-list-tile-title>
                            </v-list-tile>

                            <v-list-tile v-if="user.authority.indexOf('admin') !== -1"  @click="urlChange('/admin/sd')">
                                <v-list-tile-title class="body-1">系统管理</v-list-tile-title>
                            </v-list-tile>

                            <!-- <v-list-tile v-if="user.authority.indexOf('admin') !== -1"  @click="urlChange('/admin/sd')">
                                <v-list-tile-title class="body-1">我的统计</v-list-tile-title>
                            </v-list-tile> -->

                            <v-list-tile @click="urlChange('/account/personalData')">
                                <v-list-tile-title class="body-1">账号管理</v-list-tile-title>
                            </v-list-tile>

                            <v-divider></v-divider>

                            <v-list-tile @click="signOut()">
                                <v-list-tile-title class="body-1">退出登入</v-list-tile-title>
                            </v-list-tile>

                        </v-list>
                    </v-menu>

                </v-layout>
            </v-flex>

        </v-layout>


    </div>
</template>

<script>
export default {
    name: 'my-menu',
    props: [],
    data() {
        return {
            dialog: false,
            text:'首页',
            menuText: [
                { title: '首页',router: '/', url: '/' },
                // { title: '项目',router: 'works', url: '/works'},
                { title: '资讯',router: 'login', url: '/login'},
                { title: '活动',router: 'activity', url: '/statistics'},
                { title: '素材',router: 'material', url: '/material'},
            ],

            items: [
                // { title: '我的作品', router: 'works' },
                // { title: '我的项目', router: 'projects', url: '/projects' },
                { title: '我的统计', router: 'statistics', url: '/statistics' },
                { title: '账号管理', router: 'account', url: '/account/personalData' },
            ],
            show: false,

            //notify类型映射
            notifyType: [ '','系统', '任务']
        }
    },
    computed: {
        user() {
            // let url = this.$store.state.user.headimgurl;
            // let l = url.length;
            // this.$store.state.user.headimgurl = url.substr(0, l-1) + '132';
            return this.$store.state.user;

        },

        notifyData() {
            return this.$store.state.user.notify.reverse();
        },

        //当前路由
        active() {
            return this.$store.state.url[0];
        },

        //当前未读通知个数
        notifyNumber() {
            return this.$store.state.user.notifyNumber;
        },

        //0个是不显示个数
        notifyShow() {
            return this.$store.state.user.notifyNumber > 0 ? true : false;
        }
    },
    methods: {

        //路由跳转
        urlChange(path) {
            this.$router.push({path});
        },

        //查看通知
        async putNotify(notify){
            try {
                console.log(notify);
                await this.$store.dispatch('putNotify', {_id: notify._id});
                this.urlChange(notify.router);
                this.$store.dispatch('getNotify', {notifyType: 0, currentPage:1});
            } catch (err) {
                console.log(err);                
            }
        },

        //登入侧边导航开事件
        to_login() {
            this.$emit('toLogin');
        },
        signOut() {
            this.$store.dispatch('signOut');
        }
    },
    mounted(){

    },
    beforeCreate() {

    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .my-menu {
        /* width:100%;
        height:50px;
        padding: 10px;
        padding-top: 70px;
        overflow:auto;
        position: absolute; */
        
        margin: 0px auto;
        min-width: 1280px;

  
        z-index:1;

        display: -webkit-flex; /* Safari */
        display: flex;
  }

    .menuButton {
        height:50px;
        padding:0px 35px;
    }

    .md-body-2 {
        font-size: 15px;
        font-weight: 300;
        letter-spacing: .01em;
    }

    .menu-btn {
        color: #999;
        height: 50px;
        margin: 0px;
        font-size: 16px;
        border-radius: 0px;
        /* padding-top: 5px;  */
        border-style:solid; border-width: 0px 0px 4px 0px; border-color: rgba(0, 0, 0, 0);
    }

    .menu-btn-o {
        color: #999;
        height: 50px;
        min-width: 64px;
        margin: 0px;
        border-radius: 0px;
    }

    .menu-active {
        color: #000;
        border-style:solid; border-width: 0px 0px 4px 0px; border-color: #FDD835;
        
        
    }
    
    .menu-btn:hover {
        color: #000;
        background-color: rgba(99, 99, 99, 0.3)  !important;
    }

    .menu-btn-o:hover {
        color: #000;
    }

    .v-badge {
        height: 24px;
        display: inline-block;
        position: relative;
    }


    /* .btn--flat {
        border-radius: 0px;
    } */

    /* .btn--flat:hover {
        color: #fff;
        background-color:black  !important;
    } */

    /* .md-button-toggle > .md-button:not([disabled]) {
        color: rgba(0, 0, 0, 0.99);
    }

    .md-theme-default.md-button-toggle .md-toggle {
        color: rgba(255, 255, 255, 1);
        background-color: rgba(0, 0, 0, .77);
    } */





</style>

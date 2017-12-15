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
                    <v-btn v-for=" (text, index) in menuText" 
                    class="menu-btn"
                    flat
                    :key="text.name"
                    v-bind:class="{'menu-active': active[index]}"
                    @click="change(text.router)">
                        {{text.name}}
                     </v-btn>
                </v-layout>
            </v-flex>
         

            <!-- 登入管理 -->

            <v-flex lg2 >
                <v-layout row justify-end style=" margin-right: 100px;">
                    <!-- 未登入显示 -->
                    <v-btn flat style="margin-right: 0px; min-width: 10px; color: #aaa" v-show="!user._id"  @click="to_login()">登入</v-btn>
                   
                    <v-btn flat style="margin-left: 0px;  min-width: 10px; color: #aaa" v-show="!user._id">注册</v-btn>

                    <!-- 登入显示 -->
                    <v-btn v-if="user._id" flat @click="change('publish')"  class="menu-btn-o">
                        <i class="material-icons">backup</i>
                        <!-- <span>发布</span> -->
                    </v-btn>

                    <v-menu offset-y left v-if="user._id">
                        <!-- 头像按钮 -->
                        <v-btn flat  slot="activator"  style="height: 50px; width: 50px; min-width: 20px; margin: 0px; padding: 0px;">

                            <v-avatar size="38px">
                                <img :src="user.headimgurl" alt="Avatar" >
                            </v-avatar>

                        </v-btn>
                        <!-- 菜单 -->
                        <v-list dense>
                            <div v-for="(item, index) in items" :key="item.title">

                                <v-list-tile v-if="item.title"  :key="index" @click="change(item.router)">
                                    <v-list-tile-title class="body-1">{{ item.title }}</v-list-tile-title>
                                </v-list-tile>

                                <!-- <v-divider v-else-if="item.divider" :key="index"></v-divider>

                                <v-list-tile v-else :key="index" @click="signOut()">
                                    <v-list-tile-title class="body-1">{{ item.signOut }}</v-list-tile-title>
                                </v-list-tile> -->

                            </div>

                            <v-list-tile v-if="user.authority.indexOf('admin') !== -1"  @click="change('admin')">
                                <v-list-tile-title class="body-1">系统管理</v-list-tile-title>
                            </v-list-tile>

                            <v-list-tile v-if="user.authority.indexOf('boss') !== -1"  @click="change('boss')">
                                <v-list-tile-title class="body-1">公司管理</v-list-tile-title>
                            </v-list-tile>

                            <v-list-tile v-if="user.authority.indexOf('financial') !== -1"  @click="change('financial')">
                                <v-list-tile-title class="body-1">财务管理</v-list-tile-title>
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
                { name: '首页',router: '/' },
                { name: '项目',router: 'works' },
                { name: '资讯',router: 'login' },
                { name: '活动',router: 'activity' },
                { name: '素材',router: 'material'},
            ],
            active: [],
            items: [
                // { title: '我的作品', router: 'works' },
                { title: '我的项目', router: 'projects' },
                { title: '我的团队', router: 'temas' },
                { title: '我的统计', router: 'statistics' },
                { title: '账号管理', reuter: 'account' },
            ]
        }
    },
    computed: {
        user() {
            let url = this.$store.state.user.headimgurl;
            let l = url.length;
            this.$store.state.user.headimgurl = url.substr(0, l-1) + '132';
            return this.$store.state.user;
        }
    },
    methods: {

        activeSelection(router) {
            let result = [];
            for (var index in this.menuText) {
                if (this.menuText[index].router === '/') {
                    result[index] = this.menuText[index].router === router ? true : false;
                    continue;
                }
                result[index] = '/' + this.menuText[index].router === router ? true : false; 
            }
            this.active = result;
        },
        change(routerName) {
            console.log(routerName);
            this.$router.replace({name:routerName});
            // this.$emit('change',aa);
        },
        // //用户侧变导航开事件
        // toggleRightSidenav() {
        //     this.$emit('toggleRightSidenav');
        // },
        //登入侧边导航开事件
        to_login() {
            this.$emit('toLogin');
        },
        signOut() {
            this.$store.dispatch('signOut');
        }
    },
    mounted(){
        //初始化
        this.activeSelection(window.location.pathname);
        //捕捉路由变化改变菜单
        this.$router.beforeEach((to, from, next) => {
            this.activeSelection(to.path);
			next();
		});
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

        background-color: #000;
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
        padding-top: 5px; 
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
        color: #fff;
        border-style:solid; border-width: 0px 0px 4px 0px; border-color: #ffeb3b;
        
        
    }
    
    .menu-btn:hover {
        color: #ffffff;
        background-color: rgba(99, 99, 99, 0.3)  !important;
    }

    .menu-btn-o:hover {
        color: #ffffff;
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

<template>
    <div class="menu">


        <!-- 图标 -->
        <v-layout row  align-center>

            <v-flex lg2 >
                <v-layout row wrap justify-start style="margin-left: 100px;">

                    <v-avatar>
                        <img src="../assets/logo1.png" alt="logo" @click="toggleRightSidenav()">
                    </v-avatar>

                </v-layout>
            </v-flex>


            <!-- 导航按钮 -->

            <v-flex lg8>
                <v-layout justify-center>
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
                <v-layout row justify-end style="margin-right: 100px;">
                    <!-- 未登入显示 -->
                    <v-btn flat style="margin-right: 0px; min-width: 10px; color: #aaa" v-if="!user._id"  @click="to_login()">登入</v-btn>
                   
                    <v-btn flat style="margin-left: 0px;  min-width: 10px; color: #aaa" v-if="!user._id">注册</v-btn>

                    <!-- 登入显示 -->
                    <v-btn flat v-if="user._id"  style="height: 50px; width: 50px; min-width: 20px; margin: 0px; padding: 0px;">

                        <v-avatar size="32px">
                            <img :src="user.headimgurl" alt="Avatar" @click="toggleRightSidenav()">
                        </v-avatar>

                    </v-btn>

                </v-layout>
            </v-flex>

        </v-layout>


            <!-- <v-dialog v-model="dialog" persistent>
                <v-card>
                    <v-card-title class="headline">Use Google's location service?</v-card-title>
                    <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click.native="dialog = false">Disagree</v-btn>
                    <v-btn color="green darken-1" flat @click.native="dialog = false">Agree</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog> -->



    </div>
</template>

<script>
export default {
    name: 'menu',
    props: [],
    data() {
        return {
            dialog: false,
            text:'首页',
            menuText: [
                { 
                    name: '首页',
                    router: '/',
                },
                {
                    name: '项目',
                    router: 'works',
                },
                {
                    name: '资讯',
                    router: 'login',
                },
                {
                    name: '活动',
                    router: 'activity',
                },
                {
                    name: '素材',
                    router: 'material',
                },
                {
                    name: '发布任务',
                    router: 'PublishingTasks',
                },
            ],
            active: [],
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
            console.log(this.active)
        },
        change(routerName) {
            
            this.$router.push(routerName);
            // this.$emit('change',aa);
        },
        // //用户侧变导航开事件
        // toggleRightSidenav() {
        //     this.$emit('toggleRightSidenav');
        // },
        //登入侧边导航开事件
        to_login() {
            this.$emit('toLogin');
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
    .menu {
        /* width:100%;
        height:50px;
        padding: 10px;
        padding-top: 70px;
        overflow:auto;
        position: absolute; */
        
        margin: 0px auto;
 
        min-width: 920px;
        width: 100%;
        background-color: #fff;
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
        color: #777;
        height: 50px;
        margin: 0px;
    }

    .menu-active {
        color: #111;
        font-weight: 600;
    }

    .btn--flat {
        border-radius: 0px;
    }

    .btn--flat:hover {
        color: #fff;
        background-color:black  !important;
    }

    /* .md-button-toggle > .md-button:not([disabled]) {
        color: rgba(0, 0, 0, 0.99);
    }

    .md-theme-default.md-button-toggle .md-toggle {
        color: rgba(255, 255, 255, 1);
        background-color: rgba(0, 0, 0, .77);
    } */





</style>

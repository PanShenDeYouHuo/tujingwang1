<template>
    <div class="menu">

        <md-layout md-gutter>
            <!-- 图标 -->
            <md-layout md-flex="20">
                <div style="margin: auto; margin-left: 20px; ">
                    <img src="../assets/logo1.png" alt="标志" style="height: 50px; padding-top: 0px;" >
                </div>
            </md-layout>

            <!-- 导航按钮 -->
            <md-layout md-flex="60">
                <md-button-toggle md-single>
                    <md-button v-for=" (text, index) in menuText" 
                    :key="text.name" @click="change(text.router)"
                    class="menuButton" v-bind:class="{'md-toggle': active[index]}">
                        <span class="md-body-2">{{text.name}}</span>
                    </md-button>
                </md-button-toggle>
            </md-layout>

            <!-- 登入管理 -->
            <md-layout md-flex="20" md-align="end">

                <!-- 未登入显示 -->
                <md-button style=" float: right;  min-width: 30px; color: #aaa" v-if="!user._id" @click="to_login()">登入</md-button>
                <div style="border-style:solid; border-width: 0px 0px 0px 2px; border-color: #dddee1; margin: 10px 0px;" v-if="!user._id"></div>
                <md-button style=" float: right;  min-width: 30px; color: #aaa" v-if="!user._id">注册</md-button>

                <!-- 登入显示 -->
                <md-avatar style="margin-right: 20px;" v-if="user._id">
                    <img :src="user.headimgurl" alt="Avatar" @click="toggleRightSidenav()">
                </md-avatar>
            </md-layout>

        </md-layout>

    </div>
</template>

<script>
export default {
    name: 'menu',
    props: [],
    data() {
        return {
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
        },
        change(routerName) {
            
            this.$router.push(routerName);
            // this.$emit('change',aa);
        },
        //用户侧变导航开事件
        toggleRightSidenav() {
            this.$emit('toggleRightSidenav');
        },
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
        margin: auto;
        max-width: 1220px;
        min-width: 920px;
        background-color: #fff;
        z-index:1;
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

    .md-button-toggle > .md-button:not([disabled]) {
        color: rgba(0, 0, 0, 0.99);
    }

    .md-theme-default.md-button-toggle .md-toggle {
        color: rgba(255, 255, 255, 1);
        background-color: rgba(0, 0, 0, .77);
    }





</style>

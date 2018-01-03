<template>
    <div class="my-buttongroup">


        
        <v-layout row  align-center>

            <!-- 导航按钮 -->

            <v-flex xs12>
                <v-layout justify-center align-content-space-between align-center>
                    <span class="grey--text" style="margin-right: 20px;">{{title}}</span>
                    <v-btn v-for=" (item, index) in items" 
                    class="menu-btn"
                    flat small
                    :key="item.name"
                    v-bind:class="{'menu-active': item.name === nowActive}"
                    @click="change(item)">
                        {{item.name}}
                     </v-btn>

                </v-layout>
            </v-flex>
            
        </v-layout>


    </div>
</template>

<script>
export default {
    name: 'buttongroup',
    props: ['items', 'title', 'active'],
    data() {
        return {
            nowActive: '',
        }
    },
    computed: {

    },
    methods: {

        // activeSelection(router) {
        //     let result = [];
        //     for (var index in this.menuText) {
        //         if (this.menuText[index].router === '/') {
        //             result[index] = this.menuText[index].router === router ? true : false;
        //             continue;
        //         }
        //         result[index] = '/' + this.menuText[index].router === router ? true : false; 
        //     }
        //     this.active = result;
        // },
        change(active) {
            this.nowActive = active.name;
            // this.$router.replace({name:routerName});
            this.$emit('change',active);
        },

        // //登入侧边导航开事件
        // to_login() {
        //     this.$emit('toLogin');
        // },

    },
    mounted(){
        this.nowActive = this.active;
        // //初始化
        // this.activeSelection(window.location.pathname);
        // //捕捉路由变化改变菜单
        // this.$router.beforeEach((to, from, next) => {
        //     this.activeSelection(to.path);
		// 	next();
		// });
    },
    beforeCreate() {

    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .my-buttongroup {

        background-color: #fff;
        padding: 8px;

  }

    /* .menuButton {
        height:50px;
        padding:0px 35px;
    } */

    /* .md-body-2 {
        font-size: 15px;
        font-weight: 300;
        letter-spacing: .01em;
    } */

    .menu-btn {
        margin-left: 0px;
        margin-right: 0px;
        min-width: 0px;
        /* height: 50px; */
        /* margin: 0px; */
        /* font-size: 16px; */
        /* border-radius: 0px; */
        /* padding-top: 5px;  */
        /* border-style:solid; border-width: 0px 0px 4px 0px; border-color: rgba(0, 0, 0, 0); */
    }

    /* .menu-btn-o {
        color: #999;
        height: 50px;
        min-width: 64px;
        margin: 0px;
        border-radius: 0px;
    } */

    .menu-active {
        color: #e53935;
        /* border-style:solid; border-width: 0px 0px 4px 0px; border-color: #ffeb3b; */
        
        
    }
    
    /* .menu-btn:hover {
        color: #ffffff;
        background-color: rgba(99, 99, 99, 0.3)  !important;
    } */

    /* .menu-btn-o:hover {
        color: #ffffff;
    } */


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


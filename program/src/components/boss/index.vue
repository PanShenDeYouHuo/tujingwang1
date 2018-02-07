<template>
    <div class="boss">
        <div  style="background-color: #333; height: 50px;  position: absolute; width: 100%; z-index:5; ">
            <v-layout align-center style="height: 100%;" >

                
                <v-flex xs2>

                    <v-btn flat icon @click="quit('projects')" color="yellow">
                        <v-icon>arrow_back</v-icon>
                    </v-btn>
                </v-flex>

                <v-flex xs8 class="text-xs-center">
                    <span style="font-weight:bold;" class="white--text">
                        公司管理
                    </span>
                </v-flex>
                
                <v-flex xs2>

                </v-flex>

            </v-layout>
        </div>



        <v-content style="padding-top: 55px; height:100%;"> 
            <v-container grid-list-xl fluid style="height: 100%; " class="">
                <v-layout row wrap >

                    <!-- 导航页 -->
                    <v-flex xs12 class="py-2">
                        <v-card >
                            <v-card-title style="padding: 0px 16px; height: 48px;">
                                <buttongroup title="" :items="items" :active="this.$store.state.url[1]" @change="urlChange"></buttongroup>
                                <v-spacer></v-spacer>

                            </v-card-title>
                        </v-card>
                    </v-flex>

                    <!-- 路由页面 -->

                    <keep-alive>
                        <router-view class="" v-if="$route.meta.keepAlive">
                            <!-- 这里是会被缓存的视图组件，比如 Home！ -->
                        </router-view>
                    </keep-alive>

                    <router-view class="" v-if="!$route.meta.keepAlive">
                        <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
                    </router-view>
                </v-layout>
            </v-container>
        </v-content>

    </div>
</template>

<script>
import buttongroup from "../Buttongroup";
export default {
    name: 'boss',
    components:{buttongroup},
    props: [],
    data() {
        return {

            items: [
                {name: '统计', router: 'statistics', url: '/statistics'},
                {name: '权限', router: 'authority', url: '/authority'},
                {name: '认证', router: 'authenticate', url: '/authenticate'},
                {name: '设置', router: 'setting', url: '/setting'},
            ],

        }
    },
    computed: {

    },
    methods: {
        quit() {
        //    this.$router.go(-1)
            this.$router.replace({name:'/'});
        },

        urlChange( url ) {
            this.$router.push({path: `/boss${url}`});
        }

    },
    mounted(){
        // this.change(this.items[0]);
    },
    beforeCreate() {
        
        // this.change(this.items[0]);
    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 

  .boss {
      width: 100%;
      background-color: rgb(244, 244, 244);


  }

    .menu-active {
        background-color: #bbb;
    }

    .container.fluid {
        max-width: 1280px;
    }

</style>
<template>
    <div class="account">
        <div  style="background-color: #333; height: 50px;  position: absolute; width: 100%; z-index:5; ">
            <v-layout align-center style="height: 100%;" >
                <v-flex xs2>

                <v-btn flat icon @click="quit('projects')" color="yellow">
                    <v-icon>arrow_back</v-icon>
                </v-btn>
                </v-flex>

                <v-flex xs8 class="text-xs-center">
                    <span style="font-weight:bold;" class="white--text">
                        账号管理
                    </span>
                </v-flex>
                
                <v-flex xs2>

                </v-flex>

            </v-layout>
        </div>



        <v-content style="padding-top: 55px; height:100%;"> 
            <v-container grid-list-xl fluid style="height: 100%; max-width: 1200px;" class="">
                <v-layout row wrap>

                    <!-- 导航页 -->
                    <v-flex xs12 class="py-2">
                        <v-card >
                            <v-card-title style="padding: 0px 16px; height: 48px;">
                                <buttongroup title="" :items="items" :active="this.$store.state.url[1]" @change="change"></buttongroup>
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
    name: 'account',
    components:{buttongroup},
    props: [],
    data() {
        return {

            items: [
                {name: '个人资料', router: 'personalData', url: '/personalData'},
                {name: '账号安全', router: 'accountSecurity', url: '/accountSecurity'},
            ],

            active: {},
        }
    },
    computed: {

    },
    methods: {
        quit() {
            this.$router.replace({name:'/'});
        },
        change(url) {
            this.$router.replace({path:`/account${url}`});
        },

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

  .account {
      width: 100%;
  }

  .menu-active {
      background-color: #bbb;
  }

</style>
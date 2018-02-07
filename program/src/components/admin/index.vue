<template>
    <div class="admin">
        <div  style="background-color: #333; height: 50px;  position: absolute; width: 100%; z-index:5; ">
            <v-layout align-center style="height: 100%;">
                <v-btn flat icon @click="quit('projects')" color="yellow">
                    <v-icon>arrow_back</v-icon>
                </v-btn>
                <v-spacer></v-spacer>

            </v-layout>
        </div>

        <!-- <v-navigation-drawer :width="250" style="padding-top: 50px;">
            <v-list>
                <v-list-tile v-for="item in items" :key="item.title" @click="change(item)" v-bind:class="{'menu-active': item.title === active}">
                    <v-list-tile-action>
                        <v-icon dark >{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer> -->


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
    name: 'admin',
    components:{buttongroup},
    props: [],
    data() {
        return {
            items: [
                { name: '系统', icon: 'dashboard', router: 'sd', url: '/sd' },
                { name: '用户', icon: 'account_box', router: 'aam', url: '/aam' },
            ],

            active: '',
        }
    },
    computed: {

    },
    methods: {
        quit() {
            this.$router.replace({name:'/'});
        },

        urlChange( url ) {
            this.$router.push({path: `/admin${url}`});
        },

        // change(item) {
        //     this.active = item.title;
        //     this.$router.replace({path:`/admin/${item.router}`});
        // },
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

  .admin {
        width: 100%;
        background-color: rgb(244, 244, 244);
  }

    .menu-active {
        /* color: red; */
        background-color: #bbb;
    }

    .container.fluid {
        max-width: 1280px;
    }

</style>
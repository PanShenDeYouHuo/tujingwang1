<template>
    <div class="admin">
        <div  style="background-color: #000; height: 50px;  position: absolute; width: 100%; z-index:5; ">
            <v-layout align-center style="height: 100%;">
                <v-btn flat icon @click="quit('projects')" color="yellow">
                    <v-icon>arrow_back</v-icon>
                </v-btn>
                <v-spacer></v-spacer>

            </v-layout>
        </div>

        <v-navigation-drawer :width="250" style="padding-top: 50px;">
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
        </v-navigation-drawer>

        <v-content style="padding-top: 50px; padding-left: 250px; height:100%;"> 
            <v-container fluid fill-height class="">
                <v-layout>
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
export default {
    name: 'admin',
    props: [],
    data() {
        return {
            items: [
                { title: '系统', icon: 'dashboard', router: 'sd' },
                { title: '用户', icon: 'account_box', router: 'aam' },
                { title: 'Admin', icon: 'gavel' }
            ],

            active: '系统详情',
        }
    },
    computed: {

    },
    methods: {
        quit() {
            this.$router.replace({name:'/'});
        },
        change(item) {
            this.active = item.title;
            this.$router.replace({path:`/admin/${item.router}`});
        },
    },
    mounted(){
        this.change(this.items[0]);
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
  }

  .menu-active {
      /* color: red; */
      background-color: #bbb;
  }

</style>
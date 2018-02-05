<template>
    <div class="notify">
        <div  style="background-color: #333; height: 50px;  position: absolute; width: 100%; z-index:5; ">
            <v-layout align-center style="height: 100%;" >

                
                <v-flex xs2>

                    <v-btn flat icon @click="quit('projects')" color="yellow">
                        <v-icon>arrow_back</v-icon>
                    </v-btn>
                </v-flex>

                <v-flex xs8 class="text-xs-center">
                    <span style="font-weight:bold;" class="white--text">
                        通知
                    </span>
                </v-flex>
                
                <v-flex xs2>

                </v-flex>

            </v-layout>
        </div>



        <v-content style="padding-top: 55px; height:100%; overflow-y:auto;" > 
            <v-container grid-list-xl fluid style="height: 100%; " class="">
                <v-layout row wrap >

                    <!-- 导航页 -->
                    <v-flex xs12 class="py-2">
                        <v-card >
                            <v-card-title style="padding: 0px 16px; height: 48px;">
                                <buttongroup title="" :items="items" :active="active" :disabled="this.$store.state.appLoading" @change="getNotifi"></buttongroup>
                                <v-spacer></v-spacer>

                            </v-card-title>
                        </v-card>
                    </v-flex>

  
                        
                    <v-flex xs12 class="py-2" v-for="(notify, index) in notifys" :key="index">
                        <v-card>


                                <v-card-title>
                                                
                                    <span style="font-weight:bold;" v-bind:class="{'grey--text': notify.state === 1}">
                                        【{{notifyType[notify.ntype]}}】  
                                    </span> 
                                    <span class="caption" v-bind:class="{'grey--text': notify.state === 1}">{{createTime(notify._id)}}</span>


                                    <v-spacer></v-spacer>
                                    <v-btn small :disabled="notify.state === 1" style="min-width: 0px;" @click="putNotify(notify)">
                                        查看
                                    </v-btn>

                                    <v-list-tile-title class="caption" v-bind:class="{'grey--text': notify.state === 1}" >
                                        {{notify.concent}}
                                    </v-list-tile-title>
                                </v-card-title>

                        </v-card>
                    </v-flex>
                        



                    <v-flex xs12 class="py-2" v-if="nextState">
                        <v-card>
  
                            <div class="text-xs-center" style="width: 100%;">
                                <v-btn flat @click="getNotifi( active )">查看更多</v-btn>
                            </div>

                        </v-card>
                    </v-flex>

                </v-layout>
            </v-container>
        </v-content>

    </div>
</template>

<script>
import buttongroup from "../Buttongroup";
export default {
    name: 'notify',
    components:{buttongroup},
    props: [],
    data() {
        return {
            currentPage: 0,
            nextState: false,

            items: [
                {name: '全部', router: 'all', url: '/all', ntype: 0},
                {name: '系统', router: 'system', url: '/system', ntype: 1},
                {name: '团队', router: 'team', url: '/team', ntype: 2},
                {name: '任务', router: 'task', url: '/task', ntype: 3},
            ],
            active: '',
            //通知类型映射
            ntypeMap: {
                '/all': 0,
                '/system': 1,
                '/team': 2,
                '/task': 3
            },

            notifys: [],		//通知数据

            //notify类型映射
            notifyType: [ '','系统', '团队', '任务']

        }
    },
    computed: {

    },
    methods: {
        quit() {
            this.$router.replace({name:'/'});
        },

        //路由跳转
        urlChange(path) {
            this.$router.push({path});
        },


        //获取通知列表
        async getNotifi( url ) {
            try {
                if (this.active !== url) {
                    this.currentPage = 0;
                    this.notifys = [];
                }
                this.active = url;
                this.currentPage = this.currentPage + 1;
                let result = await this.$store.dispatch('getNotifyReturn', {notifyType: this.ntypeMap[url], currentPage: this.currentPage });
                for( let index in result) {
                    this.notifys.push(result[index])
                }
                if(result.length !== 8 ) return this.nextState = false;
                this.nextState = true;
            } catch (err) {
                console.log(err);
            }
        },

        //查看通知
        async putNotify(notify){
            try {
                await this.$store.dispatch('putNotify', {_id: notify._id});
                this.urlChange(notify.router);
                notify.state = 1;
            } catch (err) {
                console.log(err);             
            }
        },
        
        createTime(_id) {
            let createTime = new Date(parseInt(_id.substr(0, 8),16)*1000);
            return `${createTime.getFullYear()}/${createTime.getMonth() + 1}/${createTime.getDate()} ${createTime.getHours()}:${createTime.getMinutes()}`;
        },

    },
    mounted(){
        this.getNotifi('/all');
        // this.change(this.items[0]);
    },
    beforeCreate() {
        
        // this.change(this.items[0]);
    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 

    .notify {
        width: 100%;
        background-color: rgb(244, 244, 244);
    }

    .menu-active {
        background-color: #bbb;
    }

    .container.fluid {
        max-width: 1180px;
    }

</style>
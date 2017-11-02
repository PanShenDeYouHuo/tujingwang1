<template>
    <div class="task">
        <v-container fluid grid-list-lg>
            <v-layout row wrap>
                    <v-flex xs9 >
                        <v-card >
                            <v-card-title>
                                <div>
                                    <span class="headline">北京四合院</span>
                                    <br>
                                    <span class="grey--text caption">一年前</span>
                                </div>  
                            </v-card-title>
                        </v-card>
                    </v-flex> 

                    <v-flex xs3 d-flex>
                        <v-card >
                            <!-- <v-list>
                                <v-list-tile>
                                    <v-list-tile-avatar>
                                        <img src="../../assets/bb.jpg" alt="Avatar" >
                                    </v-list-tile-avatar>
                                </v-list-tile>
                            </v-list> -->
                        <v-card-title>
                            <v-avatar size="53px">
                                <img src="../../assets/bb.jpg" alt="Avatar" >
                            </v-avatar>
                            <span>peter pan</span>
                        </v-card-title>
                        </v-card>
                    </v-flex> 

                    
                    <v-flex xs12>
                        <v-card>
                            <v-card-title style="padding: 0px 16px;">
                                <span>共有{{cards.length}}个任务</span>
                                <v-spacer></v-spacer>
                                <v-btn color="yellow">
                                    添加任务
                                </v-btn>
                                <v-btn color="yellow">
                                    参考资料
                                </v-btn>

                            </v-card-title>
                        </v-card>
                    </v-flex> 

                    <v-flex xs12>
                        <v-layout row wrap>
                            <!-- <v-flex xs12>
                                <span>共有{{cards.length}}张图片</span>
                            </v-flex> -->

                            <v-flex v-bind="{ [`xs${card.flex}`]: true }"  v-for="(card, index) in cards" :key="card.title">
                            <div class="big">
                                <v-card>
                                    <v-card-media :src="card.src" height="195px">
                                        <v-container fill-height fluid>
                                            <v-layout fill-height>
                                                <v-flex xs12 align-end flexbox>
                                                <span class="title white--text" v-text="`${index+1}-${card.title}`"></span>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </v-card-media>
                                </v-card>
                            </div>
                            </v-flex>
                            
                        </v-layout>

                        
                        
                    </v-flex>

 
            </v-layout>                  
        </v-container>
        
    </div>
</template>

<script>
export default {
    name: 'task',
    props: [],
    data() {
        return {
            ha: this.$route.params.tid,
            cards:[
                { title: '客厅', src: require('../../assets/1.jpg'), flex: 4 },
                { title: '餐厅', src: require('../../assets/2.jpg'), flex: 2 },
                { title: '厨房', src: require('../../assets/3.jpg'), flex: 2 },
                { title: '卧室', src: require('../../assets/3.jpg'), flex: 2 }
            ]
        }
    },
    computed: {
    },
    methods: {
    },
    mounted(){
    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .task {
        /* width:100%;
        height:50px;
        overflow:auto;
        position: absolute; */

        overflow: auto;
        min-width: 1080px;
        padding-top: 50px;
        background-color: rgb(255, 255, 255);
        /* background-position:center;  */
        /* max-width: 1220px; */
        /* min-width: 965px;
        background-color: #fff;
        z-index:1; */
    }

    .container.fluid {
        max-width: 1260px;
    }

    .card {

        border-radius: 4px;
        /* box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12); */
    }






</style>

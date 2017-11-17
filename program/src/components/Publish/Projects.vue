<template>
    <div class="projects">

        <div  style="background-color: #000; height: 50px;  position: absolute; width: 100%; min-width: 1280px; z-index:3; ">
            <v-layout align-center style="height: 100%;">
                <v-flex xs1>
                <v-btn flat icon @click="" color="yellow">
                    <v-icon>arrow_back</v-icon>
                </v-btn>
                </v-flex>
                <v-layout justify-center>
                <span class="subheading white--text">我的项目</span>
                </v-layout>
                <v-flex xs1>
                </v-flex>

            </v-layout>
        </div>


        <div style=" overflow:auto; ">
            <v-container grid-list-lg fluid style=" background-color: #fff; padding-top: 66px;" >

                <v-layout row wrap v-if="projectList.length">

                    <!-- 状态筛选 -->
                    <v-flex xs12 class="py-2">
                        <v-card>
                            <v-card-title style="padding: 0px 16px;">
                                <buttongroup title="状态" :items="items" active="全部"></buttongroup>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                    
                    <!-- 项目列表 -->
                    <v-flex xs2 v-for="(project , index) in projectList" :key="project.name">

                        <v-card>
                            <v-card-media
                            class="white--text"
                            height="165px"
                            :src="workingImage"
                            >
                                <v-container fill-height fluid>
                                    <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="headline">制作中</span>
                                    </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-media>
                            <v-card-title>
                            <div>
                                <span>{{project.name}}</span><br>
                                <span class="grey--text">Whitehaven Beach</span>
                            </div>
                            </v-card-title>
                            <v-card-actions>
                                <v-btn flat small color="orange">Share</v-btn>
                                <v-btn flat small color="orange">Explore</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>

                                        <!-- 状态筛选 -->
                    <v-flex xs12 class="py-2">
                        <v-card>
                            <v-card-title style="padding: 0px 16px;">
                                <buttongroup title="状态" :items="items" active="全部"></buttongroup>
                            </v-card-title>
                        </v-card>
                    </v-flex>

                </v-layout>

                

                <!-- <v-layout row wrap v-else align-center>
                    <v-flex xs12>
                        <v-layout justify-center>
                        <img src="../../assets/nothing.png"  alt="没有找到符合条件的结果" />
                        </v-layout>
                    </v-flex>

                    <v-flex xs12>
                    <v-layout justify-center>
                        <p>没有找到符合条件的结果</p>
                        </v-layout>
                    </v-flex>

                </v-layout> -->

            </v-container>
        </div>
       
        
    </div>
</template>

<script>
import buttongroup from "../Buttongroup";
export default {
    name: 'projects',
    components:{buttongroup},
    props: [],
    data() {
        return {
            text: 'center',
            icon: 'justify',
            toggle_none: null,
            toggle_one: 0,
            toggle_exclusive: 2,
            toggle_multiple: [0, 1, 2],

            workingImage: require('../../assets/working.jpg'),
            items: [
                {name: '全部'},
                {name: '完成'},
                {name: '未完成'}
            ]
        }
    },
    computed: {
        projectList() {
            console.log(this.$store.state.project.listData)
            return this.$store.state.project.listData;
        }
    },
    methods: {
        toTask() {
            this.$router.push('/publish/task');
        }
    },
    mounted(){
        this.$store.dispatch('getProjects', {pageSize: 16, currentPage: 1});
    },
    beforeCreate() {

    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .projects {
        /* width:100%;
        height:50px;
        padding: 10px;
        padding-top: 70px;
        overflow:auto;
        position: absolute; */
        /* margin: auto; */

        /* padding: 16px; */
        /* padding-top: 50px; */
        min-width: 1280px;
        background-color: #fff;
        /* display: flex; */
        /* background-position:center;  */
        /* max-width: 1220px; */
        /* min-width: 965px;
        background-color: #fff;
        z-index:1; */
    }

    .container.fluid {
        max-width: 1320px;
        overflow:visible
    }

    .card__title {
        padding: 4px;
    }
    .card__actions {
        padding: 4px;
    }


</style>

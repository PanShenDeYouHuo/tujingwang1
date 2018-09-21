<template>
    <div class="projects">

        <div  style="background-color: #fff; ">
            <v-layout align-center style="height: 100%;">
                <v-flex xs1>
                    <v-btn flat icon @click="change('/')" color="yellow">
                        <v-icon>arrow_back</v-icon>
                    </v-btn>
                </v-flex>

                <v-layout justify-center>
                    <span class="subheading">我的任务</span>
                </v-layout>

                <v-flex xs1>
                </v-flex>

            </v-layout>
        </div>


        <div style=" overflow:auto; ">
            <v-container grid-list-lg fluid >

                <v-layout row wrap >

                    <!-- 状态筛选 -->
                    <v-flex xs12 class="py-2">
                        <v-card flat>
                            <v-card-title style="padding: 0px 16px;">
                                <buttongroup title="" :items="items" :active="active" :disabled="this.$store.state.appLoading" @change="getProjects"></buttongroup>
                                <!-- <buttongroup title="状态" :items="items" active="全部"></buttongroup> -->
                            </v-card-title>
                        </v-card>
                    </v-flex>
                    
                    <!-- 项目列表 -->
                    <v-flex xs2 v-for="project  in projectList" :key="project._id">
                        
                        <v-card hover flat>
                            <v-card-media
                            class="white--text"
                            height="200px"
                            :src="(project.isFinish === 1 && project.image[0].picture ? true : false) ? project.workingImage : workingImage"
                            @click="editProject(project._id)"
                            >
                                <v-container fill-height fluid>
                                    <v-layout fill-height>
                                    <v-flex xs12 >
                                        <span class="title">{{project.name}}</span><br>
                                        <span v-if="!project.isFinish" class="body-2 ">制作中</span>
                                        <span v-else class="body-2 green--text" >完成</span>
                                    </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-media>
                        </v-card>
                    </v-flex>


                    <!-- 没有数据 -->
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

                    <!-- 页面 -->
                    <v-flex xs12 class="py-2" v-if="projectCount > 1">
                        <v-card>
                            <v-card-title style="padding: 0px 16px;" >
                                 <div class="text-xs-center" style="width: 100%;">
                                    <v-pagination  
                                    v-bind="{'disabled': getProjectsLoading}"
                                    :length="projectCount" v-model="currentPage" :total-visible="7" @input="getProjects(active)"></v-pagination>
                                </div>
                            </v-card-title>
                        </v-card>
                    </v-flex>

                </v-layout>

                
            </v-container>
        </div>
       
        
    </div>
</template>

    <script>
    import buttongroup from "../Buttongroup";
    export default {
    name: "projects",
    components: { buttongroup },
    props: [],
    data() {
        return {
            text: "center",
            icon: "justify",
            toggle_none: null,
            toggle_one: 0,
            toggle_exclusive: 2,
            toggle_multiple: [0, 1, 2],

            workingImage: require("../../assets/working1.jpg"),
           
            items: [
                { name: '全部', url:'/all' },
                { name: '完成',  url: '/finish'}, 
                { name: "未完成", url: '/unfinished'}
            ],
            active: "",
            currentPage: 1
        };
    },
    computed: {
        // currentPage: {
        //         get: function () {
        //             return this.$store.state.project.work.currentPage;
        //         },
        //         set: function () {
        //         }
        // },
        projectList() {
            let projectList = this.$store.state.project.listData;
            for( let index in projectList ) {
                if (projectList[index].isFinish === 1 && projectList[index].image[0].picture ? true : false) {
                    projectList[index].workingImage = this.$store.state.ossFile.readClient.signatureUrl(projectList[index].image[0].picture.object, {expires: 600, process:'image/resize,w_132'});
                }
            }
            return projectList;
        },
        projectCount() {
            return this.$store.state.project.listCount;
        },
        getProjectsLoading() {
            return this.$store.state.project.getProjectsLoading;
        },
    },
    methods: {
        test() {
            console.log(1);
        },

        toTask() {
            this.$router.push("/publish/task");
        },

        createTime(_id) {
            let nowYear = new Date();
            let createTime = new Date(parseInt(_id.substr(0, 8), 16) * 1000);
            return `${createTime.getFullYear()}/${createTime.getMonth() +
                1}/${createTime.getDate()}`;

            let timeDifference =
                new Date().getTime() - parseInt(_id.substr(0, 8), 16) * 1000;

            let dayDifference = Math.round(timeDifference / 1000 / 86400);

            if (dayDifference > 0 && dayDifference < 365) {
                return `${dayDifference}天前`;
            } else if (dayDifference > 365) {
                let year = nowYear.getFullYear() - createTime.getFullYear();
                return `${year}年前`;
            }

            let hoursDifference = Math.round(timeDifference / 1000 / 3600);

            if (hoursDifference > 0) {
                return `${hoursDifference}小时前`;
            }

            let minutesDifference = Math.round(timeDifference / 1000 / 60);

            return minutesDifference !== 0 ? `${minutesDifference}分钟前` : "1分钟前";
        },

        change(routerName) {
            console.log(routerName);
            this.$router.replace({ name: routerName });
        },  

        //获取项目列表数据 state："all"全部， 1完成， 2未完成
        async getProjects(url) {

                //判断是否切换页面，如果切换重置当前页数
                if (this.active !== url) {
                    this.currentPage = 1;
                    this.active = url;
                }
                await this.$store.dispatch('getRenderProjects', {pageSize: 18, currentPage: this.currentPage, state: url.slice(1)});        

        },
        //删除项目
        async deleteProject(pid) {

            await this.$store.dispatch('deleteProject', pid);
            //重新载入
            await this.$store.dispatch('getProjects', {pageSize: 18, currentPage: this.currentPage, state: this.active.slice(1)});
 
        },
        //编辑项目
        async editProject(pid) {
            // //获取读写权限
            // await this.$store.dispatch('getWriteAndReadProjectStsToken', {pid});
            this.$store.state.router.replace({name: 'work', params:{pid}});
        }
    },

    async mounted() {
        //获得列表图片读取权限
        await this.$store.dispatch('getAllWriteAndReadProjectStsToken', {});
        this.getProjects(this.items[0].url);

    },

    beforeCreate() {}
    };
    </script>

    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
        .projects {

            min-width: 1280px;
            background-color: rgb(244, 244, 244);
            position: absolute; width: 100%; min-width: 1280px; z-index:3;

        }

        .container.fluid {
            max-width: 1320px;
            overflow: visible;
        }

        .card__title {
            padding: 4px 8px 4px 10px;
        }
        .card__actions {
            border-style: solid;
            border-width: 1px 0px 0px 0px;
            border-color: #ddd;
            padding: 4px 8px 4px 6px;
        }

        .my-btn {
            margin-left: 0px;
            margin-right: 0px;
            min-width: 0px;
        }

        .my-a {
            text-decoration: none;
        }
    </style>

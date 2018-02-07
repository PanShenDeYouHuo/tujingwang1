<template>
    <div class="projects">

        <div  style="background-color: #000; height: 50px;  position: absolute; width: 100%; min-width: 1280px; z-index:3; ">
            <v-layout align-center style="height: 100%;">
                <v-flex xs1>
                <v-btn flat icon @click="change('/')" color="yellow">
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
            <v-container grid-list-lg fluid style=" padding-top: 66px;" >

                <v-layout row wrap v-if="projectList.length">

                    <!-- 状态筛选 -->
                    <v-flex xs12 class="py-2">
                        <v-card>
                            <v-card-title style="padding: 0px 16px; height: 48px;">
                                <buttongroup title="" :items="items" :active="active" :disabled="this.$store.state.appLoading" @change="getNotifi"></buttongroup>
                                <!-- <buttongroup title="状态" :items="items" active="全部"></buttongroup> -->
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
                                    <span class="body-2">{{project.name}}</span><br>
                                    <!-- <span class="grey--text caption">Whitehaven Beach</span> -->
                                </div>
                            </v-card-title>
                            <v-card-actions>
                                <v-btn class="my-btn text-xs-center" flat small color="orange" @click="editProject(project._id)">
                                    <span class="grey--text caption">编辑</span>
                                </v-btn>
                                <v-btn class="my-btn text-xs-center" flat small color="orange" @click="removeProject(project._id)">
                                    <span class="grey--text caption">删除</span>
                                </v-btn>
                                <v-spacer></v-spacer>

                                <div>
                                    <span class="grey--text caption">{{createTime(project._id)}}</span>
                                </div>

                            </v-card-actions>
                        </v-card>
                    </v-flex>

                    <!-- 页面 -->
                    <v-flex xs12 class="py-2">
                        <v-card>
                            <v-card-title style="padding: 0px 16px;" >
                                 <div class="text-xs-center" style="width: 100%;">
                                    <v-pagination  
                                    v-bind="{'disabled': getProjectsLoading}"
                                    :length="projectCount" v-model="currentPage" :total-visible="7" @input="paginationChange()"></v-pagination>
                                </div>
                            </v-card-title>
                        </v-card>
                    </v-flex>

                </v-layout>

                
                <v-layout row wrap v-else align-center>
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

      items: [{ name: "全部" }, { name: "完成" }, { name: "未完成" }],
      active: "",
      currentPage: 1
    };
  },
  computed: {
    projectList() {
      return this.$store.state.project.listData;
    },
    projectCount() {
      return this.$store.state.project.listCount;
    },
    getProjectsLoading() {
      return this.$store.state.project.getProjectsLoading;
    }
  },
  methods: {
    toTask() {
      this.$router.push("/publish/task");
    },
    paginationChange() {
        this.$store.dispatch("getProjects", {
            pageSize: 18,
            currentPage: this.currentPage
        });
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
      // this.$emit('change',aa);
    },

    editProject(pid) {
      this.$store.dispatch("editProject", pid);
    }
  },
  mounted() {
    this.$store.dispatch("getProjects", {
      pageSize: 18,
      currentPage: this.currentPage
    });
  },
  beforeCreate() {}
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
  background-color: rgb(244, 244, 244);
  /* display: flex; */
  /* background-position:center;  */
  /* max-width: 1220px; */
  /* min-width: 965px;
        background-color: #fff;
        z-index:1; */
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

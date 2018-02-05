<template>
    <div class="publish">
        <v-container grid-list-lg text-xs-center>
            <v-layout row wrap align-center>
                    <!-- <v-flex xs6>
                        <v-layout justify-end>
                            <v-card dark style=" height: 300px; width: 300px;">
                                <v-btn flat dark style="width: 100%; height: 100%; margin: 0px; font-size: 32px;">
                                    <i class="material-icons" style="font-size: 40px;">photo</i>
                                    作品
                                </v-btn>
                            </v-card>
                        </v-layout>
                    </v-flex>  -->

                    <v-flex xs12>
                        <v-layout justify-center>
                            <v-card dark style=" height: 300px; width: 300px;">
                                <v-btn flat dark style="width: 100%; height: 100%; margin: 0px; font-size: 32px;" @click="projectDialogOpen()">
                                    <i class="material-icons" style="font-size: 40px;">event_note</i>
                                    创建项目
                                </v-btn>
                            </v-card>
                        </v-layout>
                    </v-flex>
 
            </v-layout>
        </v-container>

        <v-dialog v-model="nproject.dialog" persistent max-width="500px">
            <v-card>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-form v-model="nproject.valid" ref="projectForm" lazy-validation>
                                    <v-text-field label="任务名称" v-model="nproject.name" :rules="nproject.rules" color="yellow darken-1" 
                                    @keyup.enter="projectCreate(nproject.name)"></v-text-field>
                                    <!-- 用来消除空格提交 -->
                                    <v-text-field v-show="false" label="任务名称"></v-text-field>
                                </v-form>
                            </v-flex>
 
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small flat @click="projectDialogClose()">取消</v-btn>
                    <v-btn small flat :loading="this.$store.state.appLoading" @click="projectCreate(nproject.name)">创建</v-btn>
                </v-card-actions>
            </v-card>
         
        </v-dialog>
       
        
    </div>
</template>

<script>
export default {
    name: 'publish',
    props: [],
    data() {
        return {
            nproject: {
                dialog: false,
                name: '',
                valid: false,
                rules: [
                    (v) => !!v || '请填写任务名称',
                ]
            },
        }
    },
    computed: {
        project() {
            return this.$store.state.project;
        },

    },
    methods: {

        //打开创建任务模态框
        projectDialogOpen() {
            this.nproject.dialog = true;
        },
        
        //关闭创建任务模态框
        projectDialogClose() {
            //清空form数据
            this.$refs.projectForm.reset();
            this.nproject.dialog = false;
        },

        //创建项目
        async projectCreate(taskName) {
            //验证表单数据
            if(!this.$refs.projectForm.validate()) return;
            //路由跳转
            await this.$store.dispatch('postProject',taskName);
            //关闭模态框
            this.projectDialogClose();
        }
    },
    mounted(){
    },
    beforeCreate() {

    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .publish {
        /* width:100%;
        height:50px;
        padding: 10px;
        padding-top: 70px;
        overflow:auto;
        position: absolute; */
        /* margin: auto; */

        /* padding: 16px; */
        padding-top: 50px;
        display: flex;
        /* background-position:center;  */
        /* max-width: 1220px; */
        /* min-width: 965px;
        background-color: #fff;
        z-index:1; */
    }

    .mycard {
        height: 500px;
    }



   


</style>

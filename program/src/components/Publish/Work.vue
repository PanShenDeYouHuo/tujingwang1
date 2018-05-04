<template>
    <div class="work">
        <div  style="background-color: #fff; ">
            <v-layout align-center style="height: 100%;">
                <v-btn flat icon @click="quit('projects')" color="yellow darken-1">
                    <v-icon>arrow_back</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <!-- <v-btn depressed @click="savaProject()" color="yellow darken-1">
                    发布
                </v-btn> -->
            </v-layout>
        </div>


        <v-container fluid grid-list-lg >
            <v-layout row wrap>
                    <v-flex xs6 d-flex>
                        <v-card flat>
                            <v-card-title style=" height: 100%;">
                
                                    <v-text-field
                                    v-model="project.name"
                                    label="项目名"
                                    id="testing"
                                    disabled
                                    ></v-text-field>
         
                            </v-card-title>
                        </v-card>
                    </v-flex>

                    <v-flex xs3 d-flex>
                        <v-card flat>
                            <v-card-title style=" height: 100%;">
                
                                    <v-text-field
                                    value="***"
                                    label="客户名"
                                    id="testin"
                                    disabled
                                    ></v-text-field>
         
                            </v-card-title>
                        </v-card>
                    </v-flex>

                    <v-flex xs3 d-flex >
                        <v-card flat>
                            <v-card-title style=" height: 100%;" >
                                     <v-text-field
                                    :value="createTime1(project._id)"
                                    label="创建时间"
                                    disabled
                                    ></v-text-field>
                            </v-card-title>
                        </v-card>
                    </v-flex>

<!-- 项目 -->
                    <v-flex xs12>
                        <v-card flat>
                            <v-card-title style="padding: 0px 16px; height: 48px;">
                                <span class="grey--text caption">有 {{workLength}} 个任务</span>
                            </v-card-title>
                        </v-card>
                    </v-flex> 

<!-- 项目任务区 -->
                    <v-flex xs12 v-if="project.image ? project.image.length || 0 : 100">
                        <v-layout row wrap>
                        <v-flex v-if="user.realInformation.name === image.renderName || user.realInformation.name === image.modelName" xs6 v-for="(image, index) in project.image" :key="image._id">
                            <v-card flat>
                                <v-container fluid grid-list-lg>
                                    <v-layout row>
                                        <v-flex xs3>
                                            <v-card-media
                                            height="131.5px"
                                            >
                                            <upload :pid="project._id" :image="image"></upload>
                                            <!-- <v-card  style="width: 100%; background-color:  rgba(0,0,0,0.4)">
                                          
                                            </v-card> -->
                                            </v-card-media>
                                        </v-flex>
                                        <v-flex xs9>
                                            <div >
                                                <div class="subheading" style=" display: flex; align-items: center; ">{{`${image.style}-${image.designType}-${image.space}-${image.area}-${image.imageType}视角-${index+1}`}}
                                                <v-spacer></v-spacer>
                                                <span class="grey--text caption">{{createTime1(image._id)}}</span>
                                                </div>

                                                <v-divider style="margin-top: 12px; margin-bottom: 10px;"></v-divider>
                                                

                                                <div v-if="image.isFinish !== 1" style=" display: flex; align-items: center; height: 28px;" class="grey--text  caption">
                                                    {{`状态：未完成`}}
                                                </div>
                                                <div v-else style=" display: flex; align-items: center; height: 28px;" class="grey--text  caption">
                                                    <span >状态：</span>
                                                    <span style="font-weight:bold;" class="black--text">完成</span>
                                                    <v-spacer></v-spacer>
                                                    <span>{{createTime2(image.finishTime)}}</span>
                                                </div>
            
                                            </div>
                         

                                            <div style=" display: flex; align-items: center; height: 28px;" class="grey--text  caption">
                                                <span >建模：</span>
                                                <span v-if="!image.modelId">无</span>
                                                <span v-else style="font-weight:bold;" class="black--text">{{`${image.modelName}`}}</span>
                                                <v-spacer></v-spacer>
                                                <span >渲染：</span>
                                                <span v-if="!image.renderId">无</span>
                                                <span v-else style="font-weight:bold;" class="black--text">{{`${image.renderName}`}}</span>
                                                <v-spacer></v-spacer>
              
                                            </div>

                                            
                                            <div style=" display: flex; align-items: center; height: 28px;" class="grey--text  caption">
                                                <span>模型：</span>
                                                <span v-if="!image.model">无</span>
                                                <span v-else style="font-weight:bold;" class="black--text">{{`${image.model.name}`}}</span>
                                                <v-spacer></v-spacer>
                                                <v-btn v-if="user.realInformation.name === image.renderName" outline flat small class="my-btn" @click="modelDialogOpen(image.model ? image.model : '', image._id)">
                                                    <span class=" caption">添加</span>
                                                </v-btn>

                                            </div>

                                        </v-flex>

                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>

                     
                        </v-layout>
           
                    </v-flex >
                    
<!-- 相关任务 -->
                    <v-flex xs12>
                        <v-card flat>
                            <v-card-title style="padding: 0px 16px; height: 48px;">
                                <span class="grey--text caption">有 {{project.image ? project.image.length - workLength  : 0}} 个相关任务</span>
                            </v-card-title>
                        </v-card>
                    </v-flex> 

                    <v-flex xs12 v-if="project.image ? project.image.length || 0 : 100">
                        <v-layout row wrap>
                        <v-flex v-if="user.realInformation.name !== image.renderName && user.realInformation.name !== image.modelName" xs6 v-for="(image, index) in project.image" :key="image._id">
                            <v-card flat color="grey lighten-2">
                                <v-container fluid grid-list-lg>
                                    <v-layout row>
                                        <v-flex xs3>
                                            <v-card-media
                                            height="131.5px"
                                            >
                                            <upload :pid="project._id" :image="image"></upload>
                                            <!-- <v-card  style="width: 100%; background-color:  rgba(0,0,0,0.4)">
                                          
                                            </v-card> -->
                                            </v-card-media>
                                        </v-flex>
                                        <v-flex xs9>
                                            <div >
                                                <div class="subheading" style=" display: flex; align-items: center; ">{{`${image.style}-${image.designType}-${image.space}-${image.area}-${image.imageType}视角-${index+1}`}}
                                                <v-spacer></v-spacer>
                                                <span class="grey--text caption">{{createTime1(image._id)}}</span>
                                                </div>

                                                <v-divider style="margin-top: 12px; margin-bottom: 10px;"></v-divider>
                                                

                                                <div v-if="image.isFinish !== 1" style=" display: flex; align-items: center; height: 28px;" class="grey--text  caption">
                                                    {{`状态：未完成`}}
                                                </div>
                                                <div v-else style=" display: flex; align-items: center; height: 28px;" class="grey--text  caption">
                                                    <span >状态：</span>
                                                    <span style="font-weight:bold;" class="black--text">完成</span>
                                                    <v-spacer></v-spacer>
                                                    <span>{{createTime2(image.finishTime)}}</span>
                                                </div>
            
                                            </div>
                         

                                            <div style=" display: flex; align-items: center; height: 28px;" class="grey--text  caption">
                                                <span >{{`建模：${!image.modelId ? '无': image.modelName}`}}</span>
                                                <v-spacer></v-spacer>
                                                <span>{{`渲染：${!image.renderId ? '无': image.renderName}`}}</span>
                                                <v-spacer></v-spacer>
              
                                            </div>

                                            
                                            <div style=" display: flex; align-items: center; height: 28px;" class="grey--text  caption">
                                                <span>模型：</span>
                                                <span v-if="!image.model">无{{image.renderName }}</span>
                                                <span v-else style="font-weight:bold;" class="black--text">{{`${image.model.name}`}}</span>
                                                <v-spacer></v-spacer>

                                            </div>

                                        </v-flex>

                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>

                     
                        </v-layout>
           
                    </v-flex >

<!-- 项目文件 -->
                    <v-flex xs12>
                        <v-card flat>
                            <v-card-title style="padding: 0px 16px; height: 48px;">
                                <span class="grey--text caption">项目文件</span>

                            </v-card-title>
                        </v-card>
                    </v-flex>

                    <v-flex>
                        <modelfilm @close="uploadDialogClose()" :pid="project._id" :fileList="project.modelFile"></modelfilm>
                    </v-flex>
                    
<!-- 参考文件 -->
                    <v-flex xs12>
                        <v-card flat>
                            <v-card-title style="padding: 0px 16px; height: 48px;">
                                <span class="grey--text caption">参考文件</span>

                            </v-card-title>
                        </v-card>
                    </v-flex>

                    <v-flex>
                        <file @close="uploadDialogClose()" :pid="project._id" :fileList="project.referenceFile"></file>
                    </v-flex>

            </v-layout >                  
        </v-container>
        
<!-- 模型选择模态框 -->
        <v-dialog v-model="modelDialog.state" persistent max-width="860px">
            <v-card>
                <v-card-title>
                    <span class="title text-xs-center" style="width: 100%">模型选择</span>
                </v-card-title>
                     <v-divider></v-divider>
                <v-card-text>

 

                <v-container fluid grid-list-sm>
                    <v-layout row wrap>
                        <v-flex
                        xs2
                        v-for="model in project.modelFile" :key="model.name"
                        >
                        <v-card flat >
                            <v-card-media @click="actionModel(model)"
                            v-bind:class="{'action-card': model.name === modelDialog.action.name}"
                            :src="fileIcon"
                            height="133.5px"
                            >
                                <div style="background-color: rgba(0, 0, 0, .7); width: 100%; display: flex; flex-direction: column;  justify-content: flex-end; align-items: center;">

                                    <span class="caption white--text">
                                        {{model.name}}
                                     </span>
                                </div>
                            </v-card-media>
                        </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>

                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn  flat color="deep-orange"  @click="modelDialogClose()">取消</v-btn>
                    <v-btn  flat @click="putProImgMod()" :loading="this.$store.state.appLoading">保存</v-btn>
                </v-card-actions>

            </v-card>
            
        </v-dialog>

    </div>
</template>

<script>
import file from '../file'
import upload from '../file/upload'
import modelfilm from '../file/model'

export default {
    name: 'work',
    components:{ file, modelfilm, upload },
    props: [],
    data() {
        return {


            loading: false,
            noImage: require('../../assets/22.png'),
            fileIcon: require('../../assets/file.png'),

            projectName: this.$route.params.pid,

            modelDialog: {
                state: false,
                action: '',
                iid: ''
            },

            image: {
                state: 0,
                style: '',
                designType: '',
                space:'',
                area: '',
                imageType: '',
                price: ''
            },
            rules: {
                space:  [
                    (v) => !!v || '请选择设计空间',
                ],
                area: [
                    (v) => !!v || '请选择空间区域'
                ],
                price: [
                    (v) => /^[0-9]+$/.test(v) || '价格必须为数字,且不能为空',
                ],
                style: [
                    (v) => !!v || '请选择设计风格',
                ],
                designType: [
                    (v) => !!v || '请选择设计类型'
                ],
                imageType: [
                    (v) => !!v || '请选择图片类型'
                ],
            },
            customer: {
                loading: false,
                items: [],
                select: null,
                idMap: [],
            },
            search: null,
        }
    },

    computed: {
        project() {
             return this.$store.state.project.changeData;
        },
        projects() {
            return this.$store.state.project.listData;
        },
        appLoading() {
            return this.$store.state.appLoading;
        },
        voucher() {
            return this.$store.state.project.voucher;
        },
        user() {
            return this.$store.state.user;
        },
        workLength() {
            
            if ( !this.project.image ) return 0;
            let len = 0;
            for ( let index in this.project.image) {
                if ( this.project.image[index].renderName === this.user.realInformation.name ) {
                    len++;
                }
            }

            return len
        }
    },
    methods: {
        //打开选定模型任务模态框
        modelDialogOpen(model, iid) {
            this.modelDialog.state = true;
            this.modelDialog.action = model;
            this.modelDialog.iid = iid; 
        },

        // //提交修改
        // putProImgMod() {
            
        // },

        //关闭选定模型任务模态框
        modelDialogClose() {

            this.modelDialog.state = false;
            this.modelDialog.action = ''; 
            this.modelDialog.iid = ''; 
        },

        //选定模型
        actionModel(model, iid) {
            this.modelDialog.action = model;
            console.log( this.modelDialog)
        },

        //添加模型文件
        async putProImgMod() {
            console.log(this.modelDialog.action);
            await this.$store.dispatch('putProImgMod',{pid: this.project._id, iid: this.modelDialog.iid, model: this.modelDialog.action});
        },

        //创建时间解析
        createTime1(_id) {

            if(!_id) return '无';

            let nowYear = new Date();
            let createTime = new Date(parseInt(_id.substring(0, 8),16)*1000);

            return `${createTime.getFullYear()}/${createTime.getMonth() + 1}/${createTime.getDate()} ${createTime.getHours()}:${createTime.getMinutes()}`;


        },

        createTime2(time) {
            let createTime = new Date(time);
            return `${createTime.getFullYear()}/${createTime.getMonth() + 1}/${createTime.getDate()} ${createTime.getHours()}:${createTime.getMinutes()}`;

        },

        //离开
        quit(routerName) {
            this.$store.commit('removeChangeDate');
            this.$router.replace({name:'works'});

        },


        //跳转到project
        toProjects() {
            this.change('projects')
        },

         //
        change(routerName) {
            console.log(routerName);
            this.$router.replace({name:routerName});
            // this.$emit('change',aa);
        },

    },
    async mounted(){
        //获取读写权限
        await this.$store.dispatch('getWriteAndReadProjectStsToken', {pid: this.$route.params.pid});
        //载入项目数据
        await this.$store.dispatch('getProject',this.$route.params.pid);

        // //设置客户名
        // this.customer.items.push(this.project.publisherName);
        // this.customer.select = this.project.publisherName;

    },



    beforeCreate() {

    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .work {

        min-width: 1280px;
        background-color: rgb(240, 240, 240);
        position: absolute; width: 100%; z-index:3;

    }

    .container.fluid {
        max-width: 1260px;
    }

    .card {

        border-radius: 4px;
        /* box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12); */
    }

    .action-card {
        border-style:solid;
        border-color: #FFC107;

    }

    

        /* .card__title {
        padding: 2px 4px 2px 4px;
    }
    .card__actions {
        border-style:solid; border-width: 1px 0px 0px 0px; border-color: #ddd;
        padding: 2px 0px 2px 0px;
    } */

    .my-btn {
        margin-left: 2px;
        margin-right: 0px;
        margin-top: 0px;
        margin-bottom: 0px;
        min-width: 0px;
        height: 20px;
        
    }
    .two-btn {
        margin-left: 0px;
        margin-right: 8px;
        min-width: 0px;
        
    }





</style>

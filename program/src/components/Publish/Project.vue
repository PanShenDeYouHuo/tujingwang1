<template>
    <div class="project">
        <div  style="background-color: #000; height: 50px;  position: absolute; width: 100%; z-index:3; ">
            <v-layout align-center style="height: 100%;">
                <v-btn flat icon @click="quit('projects')" color="yellow">
                    <v-icon>arrow_back</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="savaProject()" color="yellow">
                    发布
                </v-btn>
            </v-layout>
        </div>


        <v-container fluid grid-list-lg style="padding-top: 66px;">
            <v-layout row wrap>
                    <v-flex xs12 d-flex>
                        <v-card >
                            <v-card-title style=" height: 100%;">
                                <div>
                                    <span class="title">{{project.name}}</span>
                                    <br>
                                    <span class="grey--text caption">{{createTime1(project._id)}}</span>
                                </div>  
                            </v-card-title>
                        </v-card>
                    </v-flex>

                    <v-flex xs4 d-flex >
                        <v-card >
                            <v-card-title style="padding: 0px 16px;">
                                <v-flex xs12>
                                    <v-layout justify-center align-center>
                                        <v-btn  color="yellow" class="text-xs-center">
                                            设置完成时间
                                        </v-btn>
                                    </v-layout>
                                </v-flex>
                            </v-card-title>
                        </v-card>
                    </v-flex>

                    <!-- 选择发布者 -->
                    <v-flex xs4 d-flex >
                        <v-card >
                            <v-card-title style="padding: 0px 16px;">
                                <v-flex xs12>
                                    <v-layout justify-center align-center>
                                        <v-btn  color="yellow" class="text-xs-center">
                                            选择发布者
                                        </v-btn>
                                    </v-layout>
                                </v-flex>
                            </v-card-title>
                        </v-card>
                    </v-flex>

                    <!-- 选择制作者 -->
                    <v-flex xs4 d-flex>
                        <v-card >
                            <v-card-title style="padding: 0px 16px; height: 100%;">
                                <v-flex xs12>
                                    <v-layout align-center>
                                        <span class="subheading" style="height: 100%;">制作：</span>
                                        <v-avatar size="38px">
                                            <img src="../../assets/bb.jpg" alt="Avatar" >
                                        </v-avatar>

                                        <span class="body-2" style=" padding-left: 8px; white-space: nowrap; display: inline-block; overflow: hidden; width: 185px; text-overflow: ellipsis;">潘神的诱惑</span>
                                    </v-layout>
                                </v-flex>
                            </v-card-title>
                        </v-card>
                    </v-flex> 

                    <!-- 设置按钮 -->
                    <v-flex xs12>
                        <v-card>
                            <v-card-title style="padding: 0px 16px;">
                                <span class="grey--text caption">共有 {{project.image ? project.image.length || 0 : 0}} 个任务</span>
                                <v-spacer></v-spacer>
                                <v-btn color="yellow" @click="imageDialogOpen()">
                                    添加任务
                                </v-btn>
                                <v-btn color="yellow" @click="uploadDialogOpen()">
                                    添加参考
                                </v-btn>

                            </v-card-title>
                        </v-card>
                    </v-flex> 

                    <!-- 项目任务区 -->
                    <v-flex xs12 v-if="project.image">
                        <v-layout row wrap>

                            <v-flex v-bind="{ [`xs${image.imageType === '默认' ? 3 : 3}`]: true }"  v-for="(image, index) in project.image" :key="index + image.name">
                            <div class="big">
                                <v-card>
                                    <v-card-media :src="!!image.iurl || noImage" height="195px">
                                        <v-container fill-height fluid>
                                            <v-layout fill-height align-start>
                                                <v-flex xs12  flexbox style="height: 100%;">
                                                    <span class="subheading white--text" v-text="`${index+1}.${image.space}-${image.area}`"></span><br>
                                                    <span class="caption  white--text" v-text="`${image.designType}-${image.imageType}角度`"></span>
                                                    <br>
                                                    <br>
                                                    <br>
                                                    <br>
                                                    <br>
                                                    <span class="subheading white--text" v-text="`￥${image.price}`"></span>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </v-card-media>
                                    <v-card-actions class="white">
                                        <v-btn flat small class="my-btn">
                                           <span class="grey--text caption">编辑</span>
                                        </v-btn>
                                        <v-btn flat small class="my-btn">
                                            <span class="grey--text caption">删除</span>
                                        </v-btn>
                                        <v-spacer></v-spacer>
                                        <span class="caption">制作中</span>
                                    </v-card-actions>
                                </v-card>
                            </div>                   

                        </v-flex>

                     
                        </v-layout>
           
                    </v-flex >
                    <!-- <input type="file" accept=".doc,.docx" multiple> -->
                    <!-- <input type="file" id="xFile" ref="file" @change="fileChange()" multiple style="position:absolute;clip:rect(0 0 0 0);" > -->
            </v-layout >                  
        </v-container>
        
<!-- 添加image模态框 -->
        <v-dialog v-model="imageDialog" persistent max-width="900px">
            <v-card>
                <v-card-title>
                    <span class="title">添加任务</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-form v-model="imageValid" ref="imageForm" lazy-validation style="width: 100%;">
                            <v-layout wrap>

                                <v-flex xs12 sm6 md4>
                                    <v-select label="设计风格"
                                        :items="styleItems"
                                        v-model="image.style" color="yellow darken-2"
                                        :rules="rules.style"
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-select label="设计类型"
                                        v-bind:items="designTypeItems"
                                        v-model="image.designType" color="yellow darken-2" :rules="rules.designType" @input=" designTypeChange()">
                                    </v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-select label="设计空间" :items="image.designType == '工装' ? workDesignItems : homeDesignItems" v-model="image.space" :rules="rules.space" color="yellow darken-2" 
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-select label="空间区域" :items="image.designType == '工装' ? workSpaceItems : homeSpaceItems" v-model="image.area" :rules="rules.area" color="yellow darken-2" 
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-select label="图片类型" :items="imageTypeItems" v-model="image.imageType" color="yellow darken-2" :rules="rules.imageType"></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field
                                    label="价格" color="yellow darken-2" :rules="rules.price" v-model="image.price"
                                    ></v-text-field>
                                </v-flex>

 
                            </v-layout>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn  flat color="deep-orange"  @click="imageDialogClose()">取消</v-btn>
                    <v-btn color="yellow" @click="addImage( image )">添加</v-btn>
                </v-card-actions>
            </v-card>
         
        </v-dialog>

<!-- 添加upload模态框 -->
        <v-dialog v-model="uploadDialog" persistent max-width="1300px">
            <file @close="uploadDialogClose()"></file>
        </v-dialog>

 <!-- 添加是否保存修改模态框 -->       
    <v-dialog v-model="saveDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">是否保存已修改项目？</v-card-title>
        <v-card-actions>
            <v-layout justify-center>
                <v-btn color="yellow darken-1" flat="flat" @click.native="saveDialog = false; savaProject(); toProjects();">保存</v-btn>
                <v-btn color="deep-orange darken-1" flat="flat" @click.native="saveDialog = false; toProjects();">放弃</v-btn>
                </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>       
        

    </div>
</template>

<script>
import file from '../file'

export default {
    name: 'task',
    components:{ file },
    props: [],
    data() {
        return {
            loading: false,
            noImage: require('../../assets/22.png'),

            projectName: this.$route.params.pid,
            cards:[
                { title: '客厅', src: require('../../assets/1.jpg'), flex: 4 },
                { title: '餐厅', src: require('../../assets/2.jpg'), flex: 2 },
                { title: '厨房', src: require('../../assets/3.jpg'), flex: 2 },
                { title: '卧室', src: require('../../assets/3.jpg'), flex: 2 }
            ],
            imageDialog: false,
            imageValid: false,
            uploadDialog: false,
            uploadValid: false,
            saveDialog: false,
            designTypeItems: [
                { text: '家装', value: '家装'},
                { text: '工装', value: '工装'}
            ],
            homeDesignItems: [     
                { text: '平层', value: '平层'},
                { text: '跃层', value: '跃层'},
                { text: '排屋', value: '排屋'},
                { text: '别墅', value: '别墅'}
            ],
            homeSpaceItems: [
                { text: '客厅', value: '客厅'},
                { text: '餐厅', value: '餐厅'},
                { text: '厨房', value: '厨房'},
                { text: '卧室', value: '卧室'},
                { text: '书房', value: '书房'},
                { text: '阳台', value: '阳台'},
                { text: '卫生间', value: '卫生间'},
                { text: '建筑外观', value: '建筑外观'},
                { text: '其他', value: '其他'}
            ],
            workDesignItems: [
                { text: '公共空间', value: '公共空间'},
                { text: '酒店会所', value: '酒店会所'},
                { text: '商业展示', value: '商业展示'},
                { text: '餐饮娱乐', value: '餐饮娱乐'},
                { text: '办公会议', value: '办公会议'},
                { text: '休闲养生', value: '休闲养生'}
            ],
            workSpaceItems: [
                { text: '大厅', value: '大厅'},
                { text: '前台', value: '前台'},
                { text: '过道', value: '过道'},
                { text: '套房', value: '套房'},
                { text: '包间', value: '包间'},
                { text: '休息区', value: '休息区'},
                { text: '工作区', value: '工作区'},
                { text: '办公室', value: '办公室'},
                { text: '接待室', value: '接待室'},
                { text: '会议室', value: '会议室'},
                { text: '建筑外观', value: '建筑外观'},
                { text: '其他', value: '其他'}
            ],

            styleItems: [
                { text: '现代', value: '现代'},
                { text: '后现代', value: '后现代'},
                { text: '中式', value:'中式'},
                { text: '新中式', value:'新中式'},
                { text: '欧式', value: '欧式'},
                { text: '简欧', value: '简欧'},
                { text: '法式', value: '法式'},
                { text: '新古典', value: '新古典'},
                { text: '地中海', value: '地中海'},
                { text: '美式', value: '美式'},
                { text: '简美', value: '简美'},
                { text: '东南亚', value: '东南亚'},
                { text: '日式', value: '日式'},
                { text: '混搭', value: '混搭'}
            ],
            imageTypeItems: [
                { text: '默认视角', value: '默认'},
                { text: '全景视角', value: '全景'}
            ],
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
        }
    },
    computed: {
        project() {
            return this.$store.state.project.changeData;
        },
        projects() {
            return this.$store.state.project.listData;
        }
    },
    methods: {
        //打开创建任务模态框
        imageDialogOpen() {
            this.imageDialog = true;
        },
        //关闭创建任务模态框
        imageDialogClose() {
            //清空form数据
            this.$refs.imageForm.reset();
            this.imageDialog = false;
        },
        //添加任务
        addImage( image ) {
            //验证表单数据
            if(!this.$refs.imageForm.validate()) return;
            //插入数据
            this.$store.commit('addImage', image);
            //同步到数据库
            this.$store.dispatch('putProject')
                .then((res)=> {
                    //关闭模态框
                    this.imageDialogClose();
                })
                .catch((err)=> {
                    //关闭模态框
                    this.imageDialogClose();
                })

        },

        //设计类型发生改变
        designTypeChange() {
                this.image.space = '';
                this.image.area = '';
        },


        //打开文件模态框
        uploadDialogOpen() {
            this.uploadDialog = true;
            //获取ststoken
            this.$store.dispatch('getWriteStsToken');
        },
        //关闭文件模态框
        uploadDialogClose() {
            this.uploadDialog = false;
        },

        //创建时间解析
        createTime1(_id) {

            if(!_id) return '无';

            let nowYear = new Date();
            let createTime = new Date(parseInt(_id.substring(0, 8),16)*1000);

            let year = nowYear.getFullYear() - createTime.getFullYear();     
            if( year >= 1 ) {
                return  `${year}年前`
            }

            let timeDifference = (new Date().getTime()) - (parseInt(_id.substring(0, 8),16)*1000)

            let dayDifference = Math.round( timeDifference / 1000 / 86400);

            if( dayDifference > 0) {
                return `${dayDifference}天前`
            }

            let hoursDifference = Math.round( timeDifference / 1000 / 3600);

            if(hoursDifference > 0) {
                return `${hoursDifference}小时前`
            }

            let minutesDifference = Math.round( timeDifference / 1000 / 60);
             
            return  minutesDifference !== 0 ? `${minutesDifference}分钟前` : '1分钟前';

        },

        quit(routerName) {
            this.$router.replace({name:'projects'});
            this.$store.commit('removeChangeDate');

        },

        //保存项目
        savaProject() {
            this.$store.dispatch('putProject');
        },

        //跳转到project
        toProjects() {
            this.change('projects')
        },

        change(routerName) {
            console.log(routerName);
            this.$router.replace({name:routerName});
            // this.$emit('change',aa);
        },

    },
    mounted(){
        // this.$store.dispatch('getProject',this.$route.params.pid);
    },

    beforeCreate() {
        this.$store.dispatch('getProject',this.$route.params.pid);
    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .project {
        /* width:100%;
        height:50px;
        overflow:auto;
        position: absolute; */

        overflow: auto;
        min-width: 1280px;
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

        /* .card__title {
        padding: 2px 4px 2px 4px;
    }
    .card__actions {
        border-style:solid; border-width: 1px 0px 0px 0px; border-color: #ddd;
        padding: 2px 0px 2px 0px;
    } */

        .my-btn {
        margin-left: 0px;
        margin-right: 0px;
        min-width: 0px;
        
    }





</style>

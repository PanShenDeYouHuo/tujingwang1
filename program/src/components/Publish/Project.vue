<template>
    <div class="project">
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
                                    v-model="project.publisherName"
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

                    <!-- 项目设置按钮 -->
                    <v-flex xs12>
                        <v-card flat>
                            <v-card-title style="padding: 0px 16px;">
                                <span class="grey--text caption">共有 {{project.image ? project.image.length || 0 : 0}} 个任务</span>
                                <v-spacer></v-spacer>
                                <v-btn flat @click="imageDialogOpen()" color="grey" style="min-width: 0px;">
                                    <v-icon>add</v-icon>
                                </v-btn>
                            </v-card-title>
                        </v-card>
                    </v-flex> 

                    <!-- 项目任务区 -->
                    <v-flex xs12 v-if="project.image ? project.image.length || 0 : 100">
                        <v-layout row wrap>
                        <v-flex xs6 v-for="(image, index) in project.image" :key="image._id">
                            <v-card flat>
                                <v-container fluid grid-list-lg>
                                    <v-layout row>
                                        <v-flex xs3>
                                            <v-card-media
                                            height="131.5px"
                                            >
                                            <upload :pid="project._id" :image="image"></upload>
                                            </v-card-media>
                                        </v-flex>
                                        <v-flex xs9>
                                            <div >
                                                <div class="subheading" style=" display: flex; align-items: center; ">{{`${image.style}-${image.designType}-${image.space}-${image.area}-${image.imageType}视角-${index+1}`}}
                                                <v-spacer></v-spacer>
                                                <span class="grey--text caption">{{createTime1(image._id)}}</span>
                                                </div>

                                                <v-divider style="margin-top: 12px; margin-bottom: 10px;"></v-divider>
                                                
                                                <div v-if="image.isSettlement !== 1" style=" display: flex; align-items: center; height: 28px;" class="grey--text  caption">
                                                    <span  class="">{{`价格：￥${image.price}，已收：`}}</span>
                                                    <span style="font-weight:bold;" class="black--text">{{`￥${image.payment}`}}</span>
                                                    <v-spacer></v-spacer>
                                                    <v-btn outline flat small class="my-btn" @click="modifyImageDialogPriceOpen(image)">
                                                        <span class=" caption">修改</span>
                                                    </v-btn>
                                                    <v-btn outline flat small class="my-btn" @click="proPayDialogOpen(image)">
                                                        <span class=" caption">收款</span>
                                                    </v-btn>
                                                </div>
                                                <div v-else style="  display: flex; align-items: center; height: 28px;" class="grey--text  caption">
                                                    <span class="green--text">已结算：</span>
                                                    <span style="font-weight:bold;" class="black--text">{{`￥${image.payment}`}}</span>
                                                    <v-spacer></v-spacer>
                                                    <span>{{createTime2(image.settlementTime)}}</span>
                                                </div>

                                                <div v-if="image.isFinish !== 1" style=" display: flex; align-items: center; height: 28px;" class="grey--text  caption">
                                                    {{`状态：未完成`}}
                                                    <v-spacer></v-spacer>
                                                    <v-btn outline flat small class="my-btn" @click="putProImageFinish(image)">
                                                        <span class=" caption">完成</span>
                                                    </v-btn>
                                                    <v-btn outline flat small class="my-btn" @click="modifyImageDialogOpen(image)" >
                                                        <span class=" caption">编辑</span>
                                                    </v-btn>
                                                    <v-btn outline flat small class="my-btn" @click="deleteProImage( image._id )" :loading="appLoading">
                                                        <span class=" caption">删除</span>
                                                    </v-btn>
                                                </div>
                                                <div v-else style=" display: flex; align-items: center; height: 28px;" class="grey--text  caption">
                                                    <span  class="green--text">状态：</span>
                                                    <span style="font-weight:bold;" class="black--text">完成</span>
                                                    <v-spacer></v-spacer>
                                                    <span>{{createTime2(image.finishTime)}}</span>
                                                </div>
            
                                            </div>
                         

                                            <div style=" display: flex; align-items: center; height: 28px;" class="grey--text  caption">
                                                <span v-if="!image.modelId">建模：</span>
                                                <span v-else class="green--text">建模：</span>
                                                <span v-if="!image.modelId">无</span>
                                                <span v-else style="font-weight:bold;" class="black--text">{{`${image.modelName}`}}</span>
                                                <v-spacer></v-spacer>
                                                <v-btn v-if="image.isFinish !== 1" outline flat small class="my-btn" @click="arrangeDialogOpen(image, 'model')">
                                                    <span class=" caption">设置</span>
                                                </v-btn>
                                                <span>，</span>
                                                <span v-if="!image.renderId">渲染：</span>
                                                <span v-else class="green--text">渲染：</span>
                                                <span v-if="!image.renderId">无</span>
                                                <span v-else style="font-weight:bold;" class="black--text">{{`${image.modelName}`}}</span>
                                                 <v-spacer></v-spacer>
                                                <v-btn v-if="image.isFinish !== 1" outline flat small class="my-btn" @click="arrangeDialogOpen(image, 'render')">
                                                    <span class=" caption">设置</span>
                                                </v-btn>
                                            </div>

                                        </v-flex>

                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>

                     
                        </v-layout>
           
                    </v-flex >
                    
                    <!-- 参考文件 -->
                    <v-flex xs12>
                        <v-card flat>
                            <v-card-title style="padding: 0px 16px; height: 48px;">
                                <span class="grey--text caption">参考文件</span>

                            </v-card-title>
                        </v-card>
                    </v-flex>
                    <!-- 参考文件操作区 -->
                    <v-flex>
                        <file @close="uploadDialogClose()" :pid="project._id" :fileList="project.referenceFile"></file>
                    </v-flex>

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
                    <v-btn color="yellow" @click="addImage( image )" :loading="this.$store.state.appLoading">添加</v-btn>
                </v-card-actions>
            </v-card>
         
        </v-dialog>

<!-- 修改image模态框 -->
        <v-dialog v-model="modifyDialog" persistent max-width="900px">
            <v-card>
                <v-card-title>
                    <span class="title">修改任务</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-form v-model="modifyValid" ref="modifyImageForm" lazy-validation style="width: 100%;">
                            <v-layout wrap>

                                <v-flex xs12 sm6 md4>
                                    <v-select label="设计风格"
                                        :items="styleItems"
                                        v-model="modifyImage.style" color="yellow darken-2"
                                        :rules="rules.style"
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-select label="设计类型"
                                        v-bind:items="designTypeItems"
                                        v-model="modifyImage.designType" color="yellow darken-2" :rules="rules.designType" @input=" designTypeChange()">
                                    </v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-select label="设计空间" :items="modifyImage.designType == '工装' ? workDesignItems : homeDesignItems" v-model="modifyImage.space" :rules="rules.space" color="yellow darken-2" 
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-select label="空间区域" :items="modifyImage.designType == '工装' ? workSpaceItems : homeSpaceItems" v-model="modifyImage.area" :rules="rules.area" color="yellow darken-2" 
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-select label="图片类型" :items="imageTypeItems" v-model="modifyImage.imageType" color="yellow darken-2" :rules="rules.imageType"></v-select>
                                </v-flex>
                                <!-- <v-flex xs12 sm6 md4>
                                    <v-text-field
                                    label="价格" color="yellow darken-2" :rules="rules.price" v-model="modifyImage.price"
                                    ></v-text-field>
                                </v-flex> -->

 
                            </v-layout>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn  flat color="deep-orange"  @click="modifyImageDialogClose()">取消</v-btn>
                    <v-btn color="yellow" @click="putProImage()" :loading="this.$store.state.appLoading">保存</v-btn>
                </v-card-actions>
            </v-card>
         
        </v-dialog>


<!-- 修改image模态框,只修改价格 -->
        <v-dialog v-model="modifyDialogPrice" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="title">修改金额</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-form v-model="modifyValid" ref="modifyImageForm" lazy-validation style="width: 100%;">
                            <v-layout wrap>

                                <v-flex xs12 sm12 md12>
                                    <v-text-field label="价格" color="yellow darken-2" :rules="rules.price" v-model="modifyImage.price" ></v-text-field>
                                    <!-- 用来消除空格提交 -->
                                    <v-text-field label="手机号码" v-show="false"></v-text-field>
                                </v-flex>

                             </v-layout>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn  flat color="deep-orange"  @click="modifyImageDialogPriceClose()">取消</v-btn>
                    <v-btn color="yellow" @click="putProImage()" :loading="this.$store.state.appLoading">保存</v-btn>
                </v-card-actions>
            </v-card>
         
        </v-dialog>

<!-- 收款模态框 -->
        <v-dialog v-model="proPayDialog" persistent max-width="350px">
            <v-card>
                <v-card-title>
                    <span class="title text-xs-center" style="width: 100%">收款</span>
                </v-card-title>
                     <v-divider></v-divider>
                <v-card-text>
                                                       
                    <v-flex xs12 sm12 md12>
                            <payfilm :pid="project._id" :image="proPayImage" @close="proPayDialogClose()"></payfilm>
                    </v-flex>

                </v-card-text>

            </v-card>
            
        </v-dialog>

<!-- 安排工作模态框 -->
        <v-dialog v-model="arrangeDialog" persistent max-width="350px">
            <v-card>
                <v-card-title>
                    <span class="title text-xs-center" style="width: 100%">工作安排</span>
                </v-card-title>
                     <v-divider></v-divider>
                <v-card-text>
                    <v-form v-model="arrangeValid" ref="arrangeForm" lazy-validation style="width: 100%;">                                
                    <v-flex xs12 sm12 md12>
                        <!-- 选择工作人员 -->
                        <v-select
                            label="渲染师"
                            autocomplete
                            :loading="customer.loading"
                            cache-items
                            :items="customer.items"
                            :rules="[v => !!v || '请选择渲染师']"
                            :search-input.sync="search"
                            v-model="customer.select"
                        ></v-select>

                    </v-flex>
                    </v-form>

                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn  flat color="deep-orange"  @click="arrangeDialogClose()">取消</v-btn>
                    <v-btn  flat @click="putProImgArrange(workType)" :loading="this.$store.state.appLoading">保存</v-btn>
                </v-card-actions>

            </v-card>
            
        </v-dialog>

        

    </div>
</template>

<script>
import file from '../file'
import payfilm from '../file/pay'
import upload from '../file/upload'

export default {
    name: 'project',
    components:{ file, payfilm, upload },
    props: [],
    data() {
        return {


            loading: false,
            noImage: require('../../assets/22.png'),

            projectName: this.$route.params.pid,

            imageDialog: false,         //任务模态框
            imageValid: false,

            modifyDialog: false,        //修改任务模态框
            modifyDialogPrice: false,   //修改价格模态框
            modifyValid: false,
            modifyImage: {
                style: '',
                designType: '',
                space:'',
                area: '',
                imageType: '',
            },

            proPayDialog: false,        //收款模态框
            proPayValid: false,                
            proPayImage: {},

            arrangeDialog: false,       //安排模态框
            arrangeValid: false,        
            arrangeImage: {},     
            workType:'',                //工作类型，model， render

            saveDialog: false,          //保存模态框

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
            customer: {
                loading: false,
                items: [],
                select: null,
                idMap: [],
            },
            search: null,
        }
    },
    watch: {
        async search (val) {

            if (!val) return; 

            let re=/[^\u4e00-\u9fa5]/;  
            if(re.test(val)) return;

            let items = await this.$store.dispatch('getRender', {pageSize: 50, currentPage: 1, authority: 'render',  search: this.search });
            console.log(items);
            if (items.count === 0) return;
            this.customer.items = [];
            this.customer.idMap = [];
            for ( let index in items.users) {
                this.customer.items.push(items.users[index].realInformation.name);
                this.customer.idMap.push(items.users[index]._id);
            }

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

        //打开修改任务模态框
        modifyImageDialogOpen(image) {
            this.modifyImage = JSON.parse(JSON.stringify(image));

            this.modifyDialog = true;
        },

        //关闭修改任务模态框
        modifyImageDialogClose() {
            //清空form数据
            // this.$refs.modifyImageForm.reset();
            this.modifyDialog = false;
        },

        //打开修改任务价格模态框
        modifyImageDialogPriceOpen(image) {

            this.modifyImage = JSON.parse(JSON.stringify(image));

            this.modifyDialogPrice = true;
            console.log(this.modifyDialogPrice);
        },

        //关闭修改任务价格模态框
        modifyImageDialogPriceClose() {
            //清空form数据
            // this.$refs.modifyImageForm.reset();
            this.modifyDialogPrice = false;
        },

        //打开收款模态框
        proPayDialogOpen(image) {
            this.proPayImage = JSON.parse(JSON.stringify(image));
            this.proPayDialog = true;
        },

        //关闭修改任务模态框
        proPayDialogClose() {
            this.proPayDialog = false;
            // this.$refs.proPayForm.reset();
        },

        //打开安排模态框
        arrangeDialogOpen(image, workType) {
            this.arrangeImage = JSON.parse(JSON.stringify(image));
            this.workType = workType
            this.arrangeDialog = true;
        },

        //关闭安排任务模态框
        arrangeDialogClose() {
            this.arrangeDialog = false;
            this.$refs.arrangeForm.reset();
        },

        //添加任务
        async addImage( image ) {
            
            //验证表单数据
            if(!this.$refs.imageForm.validate()) return;

            //同步到数据库
            await this.$store.dispatch('postProImage', {pid: this.project._id, image});
            //数据库同步到本地
            await this.$store.dispatch('getProImage', this.project._id);

            this.imageDialogClose();
        },

        //删除任务
        async deleteProImage( iid ) {
            console.log(iid);
            //删除任务
            await this.$store.dispatch('deleteProImage', {pid: this.project._id, iid});
            //同步数据
            await this.$store.dispatch('getProImage', this.project._id);
        },

        //修改任务
        async putProImage() {
            //修改任务
            await this.$store.dispatch('putProImage', {pid: this.project._id, image: this.modifyImage});
            //同步数据
            await this.$store.dispatch('getProImage', this.project._id);
            
            this.modifyImageDialogClose();
            this.modifyImageDialogPriceClose();
        },

        //完成任务
        async putProImageFinish(image) {

            //设置为完成任务状态
            await this.$store.dispatch('putProImageFinish', {pid: this.project._id, image});
            //同步数据
            await this.$store.dispatch('getProImage', this.project._id);
        },

        //安排工作
        async putProImgArrange() {
            let uid = this.customer.idMap[this.customer.items.indexOf(this.customer.select)];
            console.log(uid);
             //设置工作人员
            await this.$store.dispatch('putProImgArrange', { workType: this.workType, pid: this.project._id, iid: this.arrangeImage._id, uid });
            //同步数据
            await this.$store.dispatch('getProImage', this.project._id)

            this.arrangeDialogClose();
        },

        //项目付款
        async projectPay() {
            //收款
            await this.$store.dispatch('projectPay', {pid: this.project._id, image: this.proPayImage});
        },

        //设计类型发生改变
        designTypeChange() {
            if (this.image.space) this.image.space = '';
            if (this.image.area) this.image.area = '';
        },


        //创建时间解析
        createTime1(_id) {

            if(!_id) return '无';

            let nowYear = new Date();
            let createTime = new Date(parseInt(_id.substring(0, 8),16)*1000);

            return `${createTime.getFullYear()}/${createTime.getMonth() + 1}/${createTime.getDate()} ${createTime.getHours()}:${createTime.getMinutes()}`;

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

        createTime2(time) {
            let createTime = new Date(time);
            return `${createTime.getFullYear()}/${createTime.getMonth() + 1}/${createTime.getDate()} ${createTime.getHours()}:${createTime.getMinutes()}`;

        },

        //离开
        quit(routerName) {
            this.$store.commit('removeChangeDate');
            this.$router.replace({name:'projects'});

        },

        // //保存项目
        // savaProject() {
        //     this.$store.dispatch('putProject');
        // },

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
    .project {
        /* width:100%;
        height:50px;
        overflow:auto;
        position: absolute; */
        /* overflow: auto; */
        min-width: 1280px;
        background-color: rgb(240, 240, 240);
        position: absolute; width: 100%; z-index:3;
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

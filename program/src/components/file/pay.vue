<template>
    <div class="payfile">

        <v-layout wrap>
            
            <input type="file" id="yFile" ref="payfile" @change="fileChange()"  style="position:absolute; clip:rect(0 0 0 0); " v-show="false" >
            <v-flex xs12 sm12 md12>
                <v-form v-model="proPayValid" ref="proPayForm" lazy-validation style="width: 100%;">
                    <v-layout wrap>

                        <v-flex xs12 sm12 md12>
                            <v-text-field label="金额" color="yellow darken-2" :rules="rules.price" v-model="price" ></v-text-field>
                            <!-- 用来消除空格提交 -->
                            <v-text-field label="手机号码" v-show="false"></v-text-field>
                        </v-flex>
                        
                    </v-layout>
                </v-form>
            </v-flex>

            <v-flex xs12 v-if="nowfile.state === 0">

                <v-btn depressed @click="openFile"  style="height: 217px; width: 100%; padding: 0px; margin: 0px;">
                    <v-flex xs12>
                        <div  style=" margin: 8px; display: flex; justify-content: center; align-items: center;">
                                <v-icon color="grey">add</v-icon>
                        </div>
                        <div  style=" margin: 8px; display: flex; justify-content: center; align-items: center;">
                            <span class="grey--text caption">点击添加文件</span>
                        </div>
    
                    </v-flex>
                </v-btn>

            </v-flex>

                
                <v-flex xs12 v-else-if="nowfile.state === 1">

                    <v-card>
                        <v-card-media :src=" nowfile.src" height="185px">
                            <div  style="background-color: rgba(0, 0, 0, .7); width: 100%; display: flex; flex-direction: column;  justify-content: center; align-items: center;">
                                <v-progress-circular
                                    :size="100"
                                    :width="15"
                                    :rotate="270"
                                    :value="nowfile.progress*100"
                                    color="yellow"      
                                    >
                                    {{ nowfile.progress*100 }}%
                                </v-progress-circular>
                                <br>
                                <span class="title white--text">
                                    {{nowfile.file.name.substring(nowfile.file.name.lastIndexOf('.')+1)}}
                                </span>
                            </div>

                        </v-card-media>
                        <v-container fill-height fluid style="padding: 8px;">
                            <v-layout >
                                <v-flex xs10 align-end flexbox style=" padding-top: 8px; padding-bottom: 0px;">
                                    <span class="lengthLimit" >{{nowfile.file.name}}</span>

                                </v-flex>
                                
                            </v-layout>
                        </v-container>
                    </v-card>
        
                </v-flex>

                <v-flex xs12  v-else>

                    <v-card>
                        <v-card-media :src="nowfile.src" height="185px">
                        </v-card-media>
                        <v-container fill-height fluid style="padding: 8px;">
                            <v-layout >
                                <v-flex xs10 align-end flexbox style=" padding-top: 8px; padding-bottom: 0px;">
                                    <span class="lengthLimit" >{{voucher.name }}</span>

                                </v-flex>
                                <v-flex xs2 >
                                    <v-layout justify-end fill-height>
                                        <v-menu offset-y>
                                        <v-btn icon small light style="margin: 0px; margin-top: 4px;" dark slot="activator"><v-icon color="grey darken-2" >more_vert</v-icon></v-btn>
                                        <v-list>
                                            <v-list-tile @click="openFile" >
                                                <v-list-tile-title class="body-1">重新上传</v-list-tile-title>
                                            </v-list-tile>

                                        </v-list>
                                        </v-menu>
                                    </v-layout>
                                </v-flex>
                                
                            </v-layout>
                        </v-container>
                        
                    </v-card>
                </v-flex>
                <p v-if="!nowfile.validate"  class="subheading mb-0 red--text">请上传图片</p>
                <v-flex xs12 class="text-xs-center">
                    <v-btn flat color="deep-orange"  @click="close()">取消</v-btn>
                    <v-btn flat  @click="submit()" :loading="this.$store.state.appLoading">提交</v-btn>
                </v-flex>

        </v-layout>
        
    </div>
</template>

<script>

export default {
    name: 'payfile',
    components:{},
    props: ['pid', 'image'],
    data() {
        return {
            fileIcon: require('../../assets/file.png'),
            // referenceFileList: [],
            value: 0,

            nowfile: {
                state: 0,
                validate: true,
            },    //读取文件的格式
            voucher: {},    //凭证信息

            proPayValid: false,
            price:'',
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
        ossFile() {
            return this.$store.state.ossFile.client;

        },

    },
    methods: {
        
        //选取上传文件完成时触发
        async fileChange() {

            for( let file of this.$refs.payfile.files ) {
                

                //判断如果是图片，读取图片文件保存到src属性
                if(file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp' || file.type === 'image/jpg') {

                    //缓存区
                    let buf = {
                        state: 1,       //是否上次成功
                        progress: 0,    //进度
                        src: '',        //二进制文件，文件过大是不会读取
                        file: file,     //上传文件的地址和信息
                        validate: true
                    };
                    //读取图片
                    let oFReader = new FileReader();
                    //设置回调
                    oFReader.onloadend = async (oFRevent) => {
                        //图片二进制文件
                        buf.src = oFRevent.target.result;
                    };
                    //根据inputfile的files读取文件
                    oFReader.readAsDataURL(file);

                    this.nowfile = buf;

                    let name = buf.file.name;


                    let res = await this.$store.dispatch(
                                    'uploadFile',
                                    {
                                        callbackUrl:'60.205.225.197/osscallback',
                                        objectKey:`temporaryFile/payment/${Number(Math.random().toString().substr(3,6) + Date.now()).toString(36)}.${name.substring(name.lastIndexOf('.')+1)}`,
                                        buf,
                                    });

                    // console.log(res);
                    this.voucher = res.data;
                    // console.log(this.voucher);
                    console.log(this.voucher);

                }
    
            }
                    
        },

        //选择上传的文件
        openFile() {
            this.$refs.payfile.click();
        },

        //关闭
        close() {
            this.nowfile.state = 0;
            this.nowfile.validate = true;
            this.$refs.proPayForm.reset();
            this.$refs.payfile.value = '';
            this.$emit('close');
        },

        //提交
        async submit() {
            let formValidate = this.$refs.proPayForm.validate();
            this.nowfile.validate = this.nowfile.state === 2;
            if( !formValidate || !this.nowfile.validate) return;

            await this.$store.dispatch('projectPay', {pid: this.pid, image: this.image, money: this.price, voucher: this.voucher });
            //同步数据
            await this.$store.dispatch('getProImage', this.pid);
            this.close();
        },

        //删除文件
        async deleteRefFile(name) {
            await this.$store.dispatch('deleteRefFile', {pid: this.pid, name});
            for (let index in this.fileList) {
                if(this.fileList[index].name !== name) continue;

                // console.log(this.fileList[index].name);
                this.fileList.splice(index, 1);
            }
        },

        //下载文件
        downRefFile(object, name) {
            let url = this.$store.state.ossFile.client.signatureUrl(object);

            window.open(url,'_blank');

        },

    },
    mounted(){

    },
    beforeCreate() {

    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .payfile {
        /* width:100%;
        height:50px;
        padding: 10px;
        padding-top: 70px;
        overflow:auto;
        position: absolute; */
        /* margin: auto; */
        /* padding-top: 50px;
        min-width: 1080px; */
        display: flex;
        /* width: 1300px; */
        /* background-color: #fff; */
        /* background-position:center;  */
        /* max-width: 1220px; */
        /* min-width: 965px;
        background-color: #fff;
        z-index:1; */
    }

    .lengthLimit {
        white-space: nowrap;
        display: inline-block;
        overflow: hidden;
        width: 142px;
        text-overflow: ellipsis;
    }

    .big {
        padding-top: 8px;
        padding-left: 8px;
    }



</style>

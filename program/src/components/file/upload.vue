<template>
    <div class="payfile">
        <v-layout wrap>
            <input type="file" id="yFile" ref="payfile" @change="fileChange()"  style="position:absolute; clip:rect(0 0 0 0); " v-show="false" >

            <v-flex xs12 v-if="image.picture && nowfile.state < 1">

                <v-card @mouseenter="enter" @mouseleave="leave" >
                    <v-card-media :src="picture" height="131.5px" style="width: 131.5px;">
                        <transition name="fade">
                        <div v-if="isHover"  style="background-color: rgba(0, 0, 0, .7); width: 100%; display: flex; justify-content: center; align-items: center;">
                            <v-btn v-if=" this.user.realInformation.name === image.renderName" small color="grey" class="my-btn" @click="openFile()">
                                <span class=" caption">更换</span>
                            </v-btn>
                            <v-btn  small color="grey" class="my-btn" @click="downRefFile(image.picture.object, image.picture.name)">
                                <span class=" caption">下载</span>
                            </v-btn>

                        </div>
                        </transition>
                    </v-card-media>
                </v-card>
    
            </v-flex>
               
            <v-flex xs12 v-else-if="nowfile.state === 1">

                <v-card style="width: 100%;" >
                    <v-card-media :src=" nowfile.src" height="131.5px" style="width: 131.5px;">
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

                        </div>

                    </v-card-media>

                </v-card>
    
            </v-flex>

            <v-flex xs12 v-else-if="nowfile.state === 2" >

                <v-card @mouseenter="enterOne" @mouseleave="leaveOne" style="width: 100%;">
                    <v-card-media :src="nowfile.src" height="131.5px" style="width: 131.5px;" >
                        <transition name="fade">
                        <div v-if="isHoverOne"  style="background-color: rgba(0, 0, 0, .7); width: 100%; display: flex; justify-content: center; align-items: center;">
                            <v-btn v-if=" this.user.realInformation.name === image.renderName" small color="grey" class="my-btn" @click="openFile()">
                                <span class=" caption">更换</span>
                            </v-btn>
                            <v-btn  small color="grey" class="my-btn" @click=" downRefFile(voucher.object, voucher.name)">
                                <span class=" caption">下载</span>
                            </v-btn>

                        </div>
                        </transition>
                    </v-card-media>
                        
                </v-card>
            </v-flex>

            <v-flex xs12 v-else>

                <v-card @mouseenter="enter" @mouseleave="leave" style="width: 100%;">
                    <v-card-media  @mouseenter="enter" @mouseleave="leave"  :src=" noImage " height="131.5px" style="width: 131.5px;">
                        <transition name="fade">
                        <div v-if="isHover && this.user.realInformation.name === image.renderName && image.isFinish === 1"  style="background-color: rgba(0, 0, 0, .7); width: 100%; display: flex; justify-content: center; align-items: center;">
                            <v-btn small color="grey" class="my-btn" @click="openFile()">
                                <span class=" caption">上传</span>
                            </v-btn>

                        </div>
                        </transition>
                    </v-card-media>
                </v-card>
    
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
            noImage: require('../../assets/22.png'),

            picture: this.image.picture ? this.$store.state.ossFile.client.signatureUrl(this.image.picture.object, {expires: 600, process:'image/resize,w_132'}) : null,

            isHover: false,
            isHoverOne: false,
   
            nowfile: {
                state: 0,
                validate: true,
            },                      //读取文件的格式
            voucher: {},            //凭证信息

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
        user() {
            return this.$store.state.user;
        },

    },
    methods: {

        enter() {
            this.isHover = true;
        },
        leave() {
            this.isHover = false;
        },

        enterOne() {
            this.isHoverOne = true;
        },
        leaveOne() {
            this.isHoverOne = false;
        },
        
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
                                    'uploadprojectFile',
                                    {
                                        callbackUrl:'60.205.225.197/osscallback/picFileUpload',
                                        objectKey:`temporaryFile/project/${ this.pid }/picture/${Number(Math.random().toString().substr(3,6) + Date.now()).toString(36)}.${name.substring(name.lastIndexOf('.')+1)}`,
                                        buf,
                                        pid: this.pid,
                                        iid: this.image._id
                                    });

                    // console.log(res);
                    this.voucher = res.data;
                    buf.state = 2;
                    //同步数据
                    // await this.$store.dispatch('getProImage', this.pid);
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

        test() {
            console.log(1);
        },

        //提交
        // async submit() {
        //     let formValidate = this.$refs.proPayForm.validate();
        //     this.nowfile.validate = this.nowfile.state === 2;
        //     if( !formValidate || !this.nowfile.validate) return;

        //     await this.$store.dispatch('projectPay', {pid: this.pid, image: this.image, money: this.price, voucher: this.voucher });
        //     //同步数据
        //     await this.$store.dispatch('getProImage', this.pid);
        //     this.close();
        // },



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
        display: flex;
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

    .my-btn {
        margin-left: 2px;
        margin-right: 0px;
        margin-top: 0px;
        margin-bottom: 0px;
        min-width: 0px;
        height: 20px;
        
    }



</style>

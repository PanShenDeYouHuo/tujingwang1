<template>
    <div class="fileEdir">



        <!-- <v-card style="width: 100%;"> -->
            <!-- <v-toolbar color="white" flat>
                <v-btn icon light @click="close()">
                    <v-icon color="grey darken-2" >arrow_back</v-icon>
                </v-btn>
                <v-toolbar-title class="grey--text text--darken-4">参考文件</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn  color="light-blue lighten-2 " @click="openFile()">
                    从本地添加文件
                </v-btn>
            </v-toolbar> -->
            <!-- <v-card-text > -->
                <!-- <div style=" width: 100%; height:650px; border-radius: 4px; overflow-y: auto; padding-right: 8px; padding-bottom: 8px;" class="elevation-2"> -->
                    <v-layout wrap>
                        <input type="file" id="xFile" ref="file" @change="fileChange()" multiple style="position:absolute; clip:rect(0 0 0 0); " v-show="false" >
                        <v-flex xs2>

        

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
                                <!-- </v-card-media>

                            </v-card> -->
                        </v-flex>
                        <!-- 参考文件列表 -->
                        <!-- <v-flex xs2  v-for="(file, index) in referenceFileList" :key="index+'上传'">
                            <div >
                                <v-card>
                                    <v-card-media :src=" file.src !== '' ? file.src : fileIcon " height="185px">
                                        <div v-if=" file.src === ''" style="width: 100%; margin: 8px; display: flex; justify-content: center; align-items: flex-end;">
                                            <span class="title white--text">
                                                {{file.file.name.substring(file.file.name.lastIndexOf('.')+1)}}
                                            </span>
                                        </div>
                                    </v-card-media>
                                    <v-container fill-height fluid style="padding: 8px;">
                                        <v-layout >
                                            <v-flex xs10 align-end flexbox style=" padding-top: 8px; padding-bottom: 0px;">
                                                <span class="body-1 lengthLimit" v-text="file.name"></span>

                                            </v-flex>
                                            <v-flex xs2 >
                                                <v-layout justify-end fill-height>

                                                    <v-btn icon small light style="margin: 0px; margin-top: 4px;" @click="">
                                                        <v-icon color="grey darken-2" >more_vert</v-icon>
                                                    </v-btn>

                                                </v-layout>
                                            </v-flex>
                                            
                                        </v-layout>
                                    </v-container>
                                </v-card>
                            </div>
                        </v-flex> -->
                         <v-flex xs2  v-for="(file, index) in fileList" :key="index">
                            <div>
                                  <v-card>
                                    <v-card-media :src="ossFile.signatureUrl(file.object, {expires: 600, process:'image/resize,w_500'})" height="185px">
                                        <div v-if="false" style="background-color: rgba(0, 0, 0, .7); width: 100%; display: flex; flex-direction: column;  justify-content: center; align-items: center;">
                                            <v-progress-circular
                                                :size="100"
                                                :width="15"
                                                :rotate="270"
                                                :value="1"
                                                color="yellow"      
                                                >
        
                                            </v-progress-circular>
                                            <br>
                                            <span class="title white--text">
                                                {{file}}
                                            </span>
                                        </div>
                                        <div v-else style="background-color: rgba(0, 0, 0, .0); width: 100%; display: flex; flex-direction: column;  justify-content: center; align-items: center;">
                   
                                            <br>
                                            <span class="title white--text" v-if="file.src === ''">
                                                {{file.name}}
                                            </span>
                                        </div>
                                    </v-card-media>
                                    <v-container fill-height fluid style="padding: 8px;">
                                        <v-layout >
                                            <v-flex xs10 align-end flexbox style=" padding-top: 8px; padding-bottom: 0px;">
                                                <span class="lengthLimit" >{{file.name}}</span>

                                            </v-flex>
                                            <v-flex xs2 >
                                                <v-layout justify-end fill-height>

                                                    <v-btn icon small light style="margin: 0px; margin-top: 4px;" @click="">
                                                        <v-icon color="grey darken-2" >more_vert</v-icon>
                                                    </v-btn>

                                                </v-layout>
                                            </v-flex>
                                            
                                        </v-layout>
                                    </v-container>
                                </v-card>
                            </div>
                        </v-flex>

                        <!-- 需要上传文件列表 -->
                        <v-flex xs2  v-for="(file, index) in uploadFileList" :key="index">
                            <div>
                                  <v-card>
                                    <v-card-media :src=" file.src !== '' ? file.src : fileIcon " height="185px">
                                        <div v-if="file.progress !== 1" style="background-color: rgba(0, 0, 0, .7); width: 100%; display: flex; flex-direction: column;  justify-content: center; align-items: center;">
                                            <v-progress-circular
                                                :size="100"
                                                :width="15"
                                                :rotate="270"
                                                :value="file.progress*100"
                                                color="yellow"      
                                                >
                                                {{ file.progress*100 }}%
                                            </v-progress-circular>
                                            <br>
                                            <span class="title white--text">
                                                {{file.file.name.substring(file.file.name.lastIndexOf('.')+1)}}
                                            </span>
                                        </div>
                                        <div v-else style="background-color: rgba(0, 0, 0, .0); width: 100%; display: flex; flex-direction: column;  justify-content: center; align-items: center;">
                   
                                            <br>
                                            <span class="title white--text" v-if="file.src === ''">
                                                {{file.file.name.substring(file.file.name.lastIndexOf('.')+1)}}
                                            </span>
                                        </div>
                                    </v-card-media>
                                    <v-container fill-height fluid style="padding: 8px;">
                                        <v-layout >
                                            <v-flex xs10 align-end flexbox style=" padding-top: 8px; padding-bottom: 0px;">
                                                <span class="lengthLimit" >{{file.file.name}}</span>

                                            </v-flex>
                                            <v-flex xs2 >
                                                <v-layout justify-end fill-height>

                                                    <v-btn icon small light style="margin: 0px; margin-top: 4px;" @click="">
                                                        <v-icon color="grey darken-2" >more_vert</v-icon>
                                                    </v-btn>

                                                </v-layout>
                                            </v-flex>
                                            
                                        </v-layout>
                                    </v-container>
                                </v-card>
                            </div>
                        </v-flex>

                     </v-layout>
                    
                <!-- </div> -->
            <!-- </v-card-text> -->
            <!-- <v-card-actions>
                <v-layout justify-center>
                    <v-btn  color="yellow " @click="upload(uploadFileList)">上传</v-btn>
                </v-layout>
            </v-card-actions> -->
        <!-- </v-card> -->

        
    </div>
</template>

<script>

export default {
    name: 'fileEdir',
    components:{},
    props: ['pid','fileList'],
    data() {
        return {
            fileIcon: require('../../assets/file.png'),
            // referenceFileList: [],
            value: 0,

            //上传文件列表
            uploadFileList: [],
        }
    },
    computed: {
        ossFile() {
            return this.$store.state.ossFile.client;

        },
    },
    methods: {
        
        // //关闭文件窗口
        // close() {
        //     this.$emit('close');
        // },

        //选取上传文件完成时触发
        async fileChange() {
            
            // //实例文件载入列表用于异步操作
            // let uploadFileList = this.uploadFileList;

            for( let file of this.$refs.file.files ) {

                //缓存区
                let buf = {
                    state: false,   //是否上次成功
                    progress: 0,    //进度
                    src: '',        //二进制文件，文件过大是不会读取
                    file: file      //上传文件的地址和信息
                };

                //文件是否同名
                for (let key of this.uploadFileList) {
                    if(file.name === key.name) continue;
                }

                //判断如果是图片，读取图片文件保存到src属性
                if(file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp' || file.type === 'image/jpg') {
                    //读取图片
                    let oFReader = new FileReader();
                    //设置回调
                    oFReader.onloadend = async (oFRevent) => {
                        //图片二进制文件
                        buf.src = oFRevent.target.result;
                    };
                    //根据inputfile的files读取文件
                    oFReader.readAsDataURL(file);

                }

                this.uploadFileList.push(buf);

                this.$store.dispatch(
                    'uploadprojectFile',
                    {
                        callbackUrl:'60.205.225.197/osscallback/refFileUpload',
                        objectKey:`temporaryFile/project/${ this.pid }/reference/${ buf.file.name }`,
                        buf,
                        pid: this.pid
                    })
                    .then((res)=> {
                        console.log(res);
                    })
                    .catch((err)=> {
                        //从数组中移除
                    })
    
            }

            // for (let i = 0; i < this.uploadFileList.length; i++) {
            //     let buf = this.uploadFileList[i];
            //     console.log(buf)
            //     this.$store.dispatch(
            //         'uploadprojectFile',
            //         {
            //             callbackUrl:'60.205.225.197/osscallback/refFileUpload',
            //             objectKey:`temporaryFile/project/${ this.pid }/reference/${ buf.file.name }`,
            //             buf,
            //             pid: this.pid
            //         })
            //         .then((res)=> {
            //             console.log(res);
            //         })
            //         .catch((err)=> {
            //             //从数组中移除
            //         })
            // }
                    
        },

        //选择上传的文件
        openFile() {
            this.$refs.file.click();
        },

        //上传文件
        upload(files) {
            this.$store.dispatch('getWriteStsToken');

            for(let index in files) {
                
                this.$store.dispatch('uploadFile',{callbackUrl:'60.205.225.197/osscallback', objectKey:`productionProject/${this.$store.state.user._id}`, file: files[index]});
            }

           
        },

    },
    mounted(){
        // setTimeout(async() => {
        //     await this.$store.dispatch('getWriteAndReadProjectStsToken', {pid: this.pid});
        // }, 100);
        // this.$store.dispatch('')
    },
    beforeCreate() {

    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .fileEdir {
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

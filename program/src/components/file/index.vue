<template>
    <div class="fileEdir">

        <v-layout wrap>
                 
            <input type="file" id="xFile" ref="file" @change="fileChange()" multiple style="position:absolute; clip:rect(0 0 0 0); " v-show="false" >
            <v-flex xs2 v-if="user.authority.indexOf('service') !== -1">

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

            <v-flex xs2 v-if="file.state !== 2"  v-for="(file, index) in newFileList" :key="index">

                <v-card flat  v-if="!file.state">
                    <v-card-media :src="file.src ? file.src : fileIcon" height="185px">
                        <div v-if="!file.src"  style="background-color: rgba(0, 0, 0, .7); width: 100%; display: flex; flex-direction: column;  justify-content: center; align-items: center;">

                            <br>
                            <span class="title white--text">
                                {{file.name.substring(file.name.lastIndexOf('.')+1)}}
                            </span>
                        </div>

                    </v-card-media>
                    <v-container fill-height fluid style="padding: 8px;">
                        <v-layout >
                            <v-flex xs10 align-end flexbox style=" padding-top: 8px; padding-bottom: 0px;">
                                <span class="lengthLimit" >{{file.name }}</span>

                            </v-flex>
                            <v-flex xs2 >
                                <v-layout justify-end fill-height>
                                    <v-menu offset-y>
                                    <v-btn icon small light style="margin: 0px; margin-top: 4px;" dark slot="activator"><v-icon color="grey darken-2" >more_vert</v-icon></v-btn>
                                    <v-list>
                                        <v-list-tile v-if="user.authority.indexOf('service') !== -1" @click="deleteRefFile(file.name)">
                                            <v-list-tile-title class="body-1">删除</v-list-tile-title>
                                        </v-list-tile>

                                        <v-list-tile  @click=" downRefFile(file.object, file.name)">
                                            <v-list-tile-title class="body-1">下载</v-list-tile-title>
                                        </v-list-tile>
                                    </v-list>
                                    </v-menu>
                                </v-layout>
                            </v-flex>
                            
                        </v-layout>
                    </v-container>
                </v-card>

                <v-card v-else>
                    <v-card-media :src=" file.src ? file.src : fileIcon " height="185px">
                        <div  style="background-color: rgba(0, 0, 0, .7); width: 100%; display: flex; flex-direction: column;  justify-content: center; align-items: center;">
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

                    </v-card-media>
                    <v-container fill-height fluid style="padding: 8px;">
                        <v-layout >
                            <v-flex xs10 align-end flexbox style=" padding-top: 8px; padding-bottom: 0px;">
                                <span class="lengthLimit" >{{file.file.name}}</span>

                            </v-flex>
                            <v-flex xs2 >
                                <v-layout justify-end fill-height>

                                    <!-- <v-btn icon small light style="margin: 0px; margin-top: 4px;">
                                        <v-icon color="grey darken-2" >more_vert</v-icon>
                                    </v-btn> -->

                                </v-layout>
                            </v-flex>
                            
                        </v-layout>
                    </v-container>
                </v-card>
    
            </v-flex>

        </v-layout>
        
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
        user() {
            return this.$store.state.user;
        },
        ossFile() {
            return this.$store.state.ossFile.client;

        },

        newFileList() {
            for (let index in this.fileList) {
                if (!this.fileList[index].name) continue;
                if (this.fileList[index].src) continue;
                let type = this.fileList[index].name.substring(this.fileList[index].name.lastIndexOf('.')+1);
                if(type === 'jpeg' || type === 'png' || type === 'gif' || type === 'bmp' || type === 'jpg') {
                    this.fileList[index].src = this.$store.state.ossFile.client.signatureUrl(this.fileList[index].object, {expires: 600, process:'image/resize,w_185'});
                 }
            }
            return this.fileList;
        }
    },
    methods: {
        
        //选取上传文件完成时触发
        async fileChange() {
            
            for( let file of this.$refs.file.files ) {

                //缓存区
                let buf = {
                    state: 1,   //是否上次成功
                    progress: 0,    //进度
                    src: '',        //二进制文件，文件过大是不会读取
                    file: file      //上传文件的地址和信息
                };

                //文件是否同名
                let repeat = false;
                for (let key of this.fileList) {
                    if(file.name === key.name) {
                        repeat = true;
                        // console.log(file.name);
                        break;
                    }
                }
                if (repeat) continue;

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
                this.fileList.push(buf);
                console.log(11)
                this.$store.dispatch(
                    'uploadprojectFile',
                    {
                        callbackUrl:'60.205.225.197/osscallback/refFileUpload',
                        objectKey:`temporaryFile/project/${ this.pid }/reference/${ buf.file.name }`,
                        buf,
                        pid: this.pid
                    })
                    .then((res)=> {
                        for (let index in this.fileList) {
                            if(!this.fileList[index].file) continue;
                            if(this.fileList[index].file.name !== res.data.name) continue;
                            
                            // console.log(this.fileList[index].name);
                            this.fileList.splice(index, 1, res.data);
                        }
 
                    })
                    .catch((err)=> {
                                  console.log(err)
                        //从数组中移除
                        buf.state = 2;
                    })
    
            }
                    
        },

        //选择上传的文件
        openFile() {
            this.$refs.file.click();
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

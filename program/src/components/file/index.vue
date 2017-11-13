<template>
    <div class="fileEdir">

        <input type="file" id="xFile" ref="file" @change="fileChange()" multiple style="position:absolute;clip:rect(0 0 0 0);" >

        <v-card style="width: 100%;">
            <v-toolbar color="white" flat>
                <v-btn icon light @click="upload()">
                    <v-icon color="grey darken-2" >arrow_back</v-icon>
                </v-btn>
                <v-toolbar-title class="grey--text text--darken-4">参考文件</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn  color="light-blue lighten-2 " @click="upload()">
                    从本地添加文件
                </v-btn>
            </v-toolbar>
            <v-card-text >
                <div style=" width: 100%; height:650px; border-radius: 4px; overflow-y: auto; padding-right: 8px; padding-bottom: 8px;" class="elevation-2">
                    <v-layout wrap>

                        <!-- 参考文件列表 -->
                        <v-flex xs2  v-for="(file, index) in referenceFileList" :key="index+'上传'">
                            <div class="big">
                                <v-card>
                                    <v-card-media :src=" file.src !== '' ? file.src : fileIcon " height="195px">
                                        <div v-if=" file.src === ''" style="width: 100%; margin: 8px; display: flex; justify-content: center; align-items: flex-end;">
                                            <span class="title white--text">
                                                {{file.name.substring(file.name.lastIndexOf('.')+1)}}
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
                        </v-flex>
                        
                        <!-- 需要上传文件列表 -->
                        <v-flex xs2  v-for="(file, index) in uploadFileList" :key="index+'上传'">
                            <div class="big">
                                <v-card>
                                    <v-card-media :src=" file.src !== '' ? file.src : '' " height="195px">
                                        <div style="background-color: rgba(0, 0, 0, .7); width: 100%; display: flex; flex-direction: column;  justify-content: center; align-items: center;">
                                            <v-progress-circular
                                                v-bind:size="100"
                                                v-bind:width="15"
                                                v-bind:rotate="270"
                                                v-bind:value="value"
                                                color="yellow"      
                                                >
                                                {{ value }}%
                                            </v-progress-circular>
                                            <br>
                                            <span class="title white--text">
                                                {{file.name.substring(file.name.lastIndexOf('.')+1)}}
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
                        </v-flex>

                    </v-layout>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-layout justify-center>
                    <v-btn  color="yellow " @click="upload()">上传</v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>

        
    </div>
</template>

<script>

export default {
    name: 'fileEdir',
    components:{},
    props: [],
    data() {
        return {
            fileIcon: require('../../assets/file.png'),
            referenceFileList: [],
            uploadFileList: [],
            value: 0,
        }
    },
    computed: {
    },
    methods: {

        //选取上传文件完成时触发
        fileChange() {
            
            //实例文件载入列表用于异步操作
            let uploadFileList = this.uploadFileList;


            // //检查文件是否选择
            // if(!this.$refs.file.value){
            //     console.log('取消选择');
            //     return;
            // }


            for( let file of this.$refs.file.files ) {

                //文件是否同名
                for (let key of uploadFileList) {
                    if(file.name === key.name) continue;
                }
                //判断是否是图片
                if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/bmp' && file.type !== 'image/jpg') {
                    file.src = '';
                    uploadFileList.push(file);
                    continue;
                }
                
                console.log('读取文件')
                //读取文件类
                let oFReader = new FileReader();

                oFReader.onloadend = function(oFRevent){
                    file.src = oFRevent.target.result;
                    console.log(file)
                    uploadFileList.push(file);
                };
                //根据inputfile的files读取文件
                oFReader.readAsDataURL(file);


            }

        },

        //上传文件
        upload() {
            this.$store.dispatch('getReadStsToken')
                // .then((res)=> {
                //     console.log(res);
                // })
                // .catch((err)=> {
                //     this.$store.state.errorSnackbar = {
                //         state: true,
                //         text: err.toString()
                //     }
                // })
            this.$refs.file.click();
           
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
        width: 1300px;
        background-color: #fff;
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
        width: 162px;
        text-overflow: ellipsis;
    }

    .big {
        padding-top: 8px;
        padding-left: 8px;
    }



</style>

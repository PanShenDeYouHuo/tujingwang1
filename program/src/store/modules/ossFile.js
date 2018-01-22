// import  oss from 'ali-oss' //阿里云oss SDK

let state = {
    referenceFileList: [],
    uploadFileList: [],

    clientOption: { 
        region: 'oss-cn-beijing',
        accessKeyId: '',
        accessKeySecret: '',
        stsToken: '',
        bucket: 'tujingcloud',
    },

    client: {}
};

let mutations = {

    setStsToken(state, newToken) {
        console.log(newToken);
        state.clientOption.accessKeyId = newToken.credentials.AccessKeyId;
        state.clientOption.accessKeySecret = newToken.credentials.AccessKeySecret;
        state.clientOption.stsToken = newToken.credentials.SecurityToken;

        state.client = new OSS.Wrapper(state.clientOption)
	},
    setProgress(state, data) {
        let buf = state.uploadFileList[data.index]; 
        buf.progress = data.p;
        state.uploadFileList.splice(data.index, 1, buf);
    },
    removeUploadFile(state, index) {
        state.uploadFileList.splice(index, 1);
    }
};

let actions = {


/////////////////////******写权限*******////////////////////

    //获得oss productionProject写权限的sts临时token
    getWriteStsToken({commit, state, rootState}) {
        return new Promise((resolve, reject)=> {
            rootState.socketClass.myEmit( 'getWriteStsToken',rootState.user._id)
                .then((stsToken)=> {
                    commit('setStsToken', stsToken);
                    resolve();
                })
                .catch((err)=> {
                    reject(err);
                 });
        });
    },

    //获得oss Account写权限的sts临时token
    getWriteAccountStsToken({commit, state, rootState}) {
        return new Promise((resolve, reject)=> {
            rootState.socketClass.myEmit( 'getWriteAccountStsToken',{})
                .then((stsToken)=> {
                    console.log(stsToken);
                    commit('setStsToken', stsToken);
                    resolve();
                })
                .catch((err)=> {
                    reject(err);
                });
        });
    },


/////////////////////******写操作*******////////////////////

    //上传文件
    uploadFile({commit, state, rootState}, data) {
        return new Promise((resolve, reject)=> {

            //回调服务器头
            let callBack = {
                callbackUrl:data.callbackUrl,
                callbackHost:"tujingcloud.oss-cn-beijing.aliyuncs.com",
                callbackBody:"{\"mimeType\":${mimeType},\"size\":${size}}",
                callbackBodyType:"application/json"
            }
    
            //转化成字符串
            callBack = new Buffer(JSON.stringify(callBack));
    
            //转化成base64编码
            callBack = callBack.toString('base64');

   
            state.client.multipartUpload(data.objectKey, data.file.file, {
                progress: function* (p) {

                    data.file.progress = p;
                },
                headers: {
                    'x-oss-callback': callBack
                }
            })
            .then((res)=> {
                data.file.state = true;
                resolve();
            })
            .catch((err)=> {
                reject(err);
            });
        });
    },


/////////////////////******读权限*******////////////////////

    //获得oss Account写权限的sts临时token
    getReadAccountStsTokenBoss({commit, state, rootState}, data) {
        return new Promise((resolve, reject)=> {
            rootState.socketClass.myEmit( 'getReadAccountStsTokenBoss',data._id)
                .then((stsToken)=> {
                    commit('setStsToken', stsToken);
                    resolve();
                })
                .catch((err)=> {
                    reject(err);
                });
        });
    },




};

let getters = {

};


const ossFile = {
	state,
	mutations,
	actions,
	getters
};

export default ossFile
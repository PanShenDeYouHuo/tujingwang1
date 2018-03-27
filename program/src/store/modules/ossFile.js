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

    //获得oss project读写权限的sts临时token
    async getWriteAndReadProjectStsToken({commit, state, rootState}, data) {
        try {
            let stsToken = await rootState.socketClass.myEmit( 'getWriteAndReadProjectStsToken',{ pid: data.pid});
            commit('setStsToken', stsToken);
        } catch (err) {
            rootState.errorSnackbar = { state: true, text: err.message};
        }
    },

    //获得oss Account写权限的sts临时token
    async getWriteAccountStsToken({commit, state, rootState}) {
        try {
            let stsToken = await rootState.socketClass.myEmit('getWriteAccountStsToken', {});
            commit('setStsToken', stsToken);
        } catch (err) {
            rootState.errorSnackbar = { state: true, text: err.message};
        }
    },


/////////////////////******上传操作*******////////////////////

    //上传文件
    async uploadFile({commit, state, rootState}, data) {
        try {
            
            //回调服务器头
            let callBack = {
                callbackUrl:data.callbackUrl,
                callbackHost:"tujingcloud.oss-cn-beijing.aliyuncs.com",
                callbackBody : "bucket=${bucket}&object=${object}&etag=${etag}&size=${size}&mimeType=${mimeType}&var1=${x:var1}&var2=${x:var2}",
                callbackBodyType:"application/json",
            }
            //转化成字符串
            callBack = new Buffer(JSON.stringify(callBack));
            //转化成base64编码
            callBack = callBack.toString('base64');
                      
            let res = await state.client.multipartUpload(data.objectKey, data.buf.file, {
                progress: function* (p) {
                    data.buf.progress = p;
                },
                headers: {
                    'x-oss-callback': callBack,
                }
            });

            return res;
        } catch (err) {
            console.log(err);
            rootState.errorSnackbar = { state: true, text: err.message};
        }



    },

    //project文件上传
    async uploadprojectFile({commit, state, rootState}, data) {
        // try {
        return new Promise((resolve, reject)=> {
            //回调服务器头
            let callBack = {
                callbackUrl:data.callbackUrl,
                callbackHost:"tujingcloud.oss-cn-beijing.aliyuncs.com",
                callbackBody : "bucket=${bucket}&object=${object}&etag=${etag}&size=${size}&mimeType=${mimeType}&pid=${x:pid}",
                callbackBodyType:"application/json",
            }
            //转化成字符串
            callBack = new Buffer(JSON.stringify(callBack));
            //转化成base64编码
            callBack = callBack.toString('base64');
            
            let callBackVar = {'x:pid': data.pid};
            callBackVar = new Buffer(JSON.stringify(callBackVar))
            callBackVar = callBackVar.toString('base64');
            
            state.client.multipartUpload(data.objectKey, data.buf.file, {
                progress: function* (p) {
                    data.buf.progress = p;
                },
                headers: {
                    'x-oss-callback': callBack,
                    'x-oss-callback-var': callBackVar,
                }
            })
            .then((res)=> {
                resolve(res);
            })
            .catch((err)=> {
                reject(err);
            })

        });
        

    },


/////////////////////******读权限*******////////////////////

    //获得oss Account读权限的sts临时token
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
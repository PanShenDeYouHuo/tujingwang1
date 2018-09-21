import oss from 'ali-oss' //阿里云oss SDK

let state = {
    referenceFileList: [],
    uploadFileList: [],

    clientOption: { 
        region: 'oss-cn-hangzhou',
        accessKeyId: '',
        accessKeySecret: '',
        stsToken: '',
        bucket: 'tujing',
    },

    callbackUrl:'47.97.215.115/',

    client: {},
    readClient: {}
};

let mutations = {

    setStsToken(state, newToken) {
        console.log(newToken);
        state.clientOption.accessKeyId = newToken.credentials.AccessKeyId;
        state.clientOption.accessKeySecret = newToken.credentials.AccessKeySecret;
        state.clientOption.stsToken = newToken.credentials.SecurityToken;

        state.client = new oss.Wrapper(state.clientOption)

        console.log (state.client);
    },
    
    setReadClient(state, newToken) {
        state.clientOption.accessKeyId = newToken.credentials.AccessKeyId;
        state.clientOption.accessKeySecret = newToken.credentials.AccessKeySecret;
        state.clientOption.stsToken = newToken.credentials.SecurityToken;

        state.readClient = new oss.Wrapper(state.clientOption)

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

    //获得oss project读权限的sts临时token
    async getAllWriteAndReadProjectStsToken({commit, state, rootState}, data) {
        try {
            let stsToken = await rootState.socketClass.myEmit( 'getAllWriteAndReadProjectStsToken',{});
            commit('setReadClient', stsToken);
         
        } catch (err) {
            rootState.errorSnackbar = { state: true, text: err.message};
        }
    },

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
                callbackUrl:`${state.callbackUrl}${data.callbackUrl}`,
                callbackHost:`${state.clientOption.bucket}.${state.clientOption.region}.aliyuncs.com`,
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
            //完成状态
            data.buf.state = 2;
            return res;
        } catch (err) {
            console.log(err);
            rootState.errorSnackbar = { state: true, text: err.message};
        }



    },

    //project文件上传
    async uploadprojectFile({commit, state, rootState}, data) {
        try {
            //回调服务器头
            let callBack = {
                callbackUrl:`${state.callbackUrl}${data.callbackUrl}`,
                callbackHost:`${state.clientOption.bucket}.${state.clientOption.region}.aliyuncs.com`,
                callbackBody : "bucket=${bucket}&object=${object}&etag=${etag}&size=${size}&mimeType=${mimeType}&pid=${x:pid}&iid=${x:iid}",
                callbackBodyType:"application/json",
            }
            //转化成字符串
            callBack = new Buffer(JSON.stringify(callBack));
            //转化成base64编码
            callBack = callBack.toString('base64');
            
            let callBackVar = {'x:pid': data.pid, 'x:iid': data.iid};
            callBackVar = new Buffer(JSON.stringify(callBackVar))
            callBackVar = callBackVar.toString('base64');
            
            let res = await state.client.multipartUpload(data.objectKey, data.buf.file, {
                progress: function* (p) {
                    data.buf.progress = p;
                },
                headers: {
                    'x-oss-callback': callBack,
                    'x-oss-callback-var': callBackVar,
                }
            })

            return res;

        } catch (err) {
            console.log(err);
            rootState.errorSnackbar = { state: true, text: err.message};
        }
        
    },
    
    //删除参考文件
    async deleteRefFile({commit, state, rootState}, data) {
        try {
            rootState.appLoading = true;
            await rootState.socketClass.myEmit('deleteRefFile', {pid: data.pid, name: data.name});
            rootState.appLoading = false;
        } catch (err) {
            rootState.appLoading = false;
            rootState.errorSnackbar = { state: true, text: err.message };
        }
    },

        
    //删除项目文件
    async deleteModFile({commit, state, rootState}, data) {
        try {
            rootState.appLoading = true;
            await rootState.socketClass.myEmit('deleteModFile', {pid: data.pid, name: data.name});
            rootState.appLoading = false;
            return true;
        } catch (err) {
            rootState.appLoading = false;
            rootState.errorSnackbar = { state: true, text: err.message };
            return false;
        }
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
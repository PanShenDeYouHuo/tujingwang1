import { resolve } from "url";

// import  oss from 'ali-oss' //阿里云oss SDK

let state = {
    referenceFileList: [],
    uploadFileList: [],
    stsToken: {},
};

let mutations = {

    setStsToken(state, newToken) {
        state.stsToken = newToken;
        console.log(state.stsToken);
	},
	// //手机或者邮箱登入
    // toAccount(state) {
    //     state.loginType = 0;
    // },
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
    //获得oss productionProject写权限的sts临时token
    getWriteStsToken({commit, state, rootState}) {

        rootState.socketClass.myEmit( 'getWriteStsToken',rootState.user._id)
            .then((stsToken)=> {
                commit('setStsToken', stsToken);
            })
            .catch((err)=> {
                rootState.errorSnackbar = { state: true, text: err.message };
            });
    },

    //获得oss Account写权限的sts临时token
    getWriteAccountStsToken({commit, state, rootState}) {
        return new Promise((resolve, reject)=> {
            rootState.socketClass.myEmit( 'getWriteAccountStsToken',rootState.user._id)
                .then((stsToken)=> {
                    commit('setStsToken', stsToken);
                    resolve();
                })
                .catch((err)=> {
                    rootState.errorSnackbar = { state: true, text: err.message };
                });
        });
    },
    

    // //上传文件
    // uploadFile({commit, state, rootState} ) {

    //     //回调服务器头
    //     let callBack = {
    //         callbackUrl:"60.205.225.197/osscallback",
    //         callbackHost:"tujingcloud.oss-cn-beijing.aliyuncs.com",
    //         callbackBody:"{\"mimeType\":${mimeType},\"size\":${size}}",
    //         callbackBodyType:"application/json"
    //     }

    //     //转化成字符串
    //     callBack = new Buffer(JSON.stringify(callBack));

    //     //转化成base64编码
    //     callBack = callBack.toString('base64');
        

    //     let client = new OSS.Wrapper({ 
    //         region: 'oss-cn-beijing', 
    //         accessKeyId: state.stsToken.credentials.AccessKeyId, 
    //         accessKeySecret: state.stsToken.credentials.AccessKeySecret,
    //         stsToken: state.stsToken.credentials.SecurityToken,
    //         bucket: 'tujingcloud',
    //      });

    //     client.multipartUpload(data.objectKey, data.file, {
    //         progress: function* (p) {
    //             commit('setProgress', {index, p});
    //             console.log('Progress: ' + p);
    //         },
    //         headers: {
    //             'x-oss-callback': callBack
    //         }
    //     })
    //     .then((res)=> {
    //         // commit('removeUploadFile', index);
    //         // console.log(new Buffer(res.data, 'base64'));
    //         console.log(res);
    //     })
    //     .catch((err)=> {
    //         // commit('setProgress', {index, p:'失败'});
    //         console.log(err);
    //     });


    // },
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
    
            let client = new OSS.Wrapper({ 
                region: 'oss-cn-beijing',
                accessKeyId: state.stsToken.credentials.AccessKeyId,
                accessKeySecret: state.stsToken.credentials.AccessKeySecret,
                stsToken: state.stsToken.credentials.SecurityToken,
                bucket: 'tujingcloud',
            });
    
            client.multipartUpload(data.objectKey, data.file.file, {
                progress: function* (p) {

                    data.file.progress = p;
                    // splice(data.index, 1, buf);
                    // Vue.$set(data.file,'progress',p)
                    // console.log(data.file);
                    console.log('Progress: ' + p);
                },
                headers: {
                    'x-oss-callback': callBack
                }
            })
            .then((res)=> {
                data.file.state = true;
                console.log(data);
                resolve();
                // commit('removeUploadFile', index);
                // console.log(new Buffer(res.data, 'base64'));
                console.log(res);
            })
            .catch((err)=> {
                console.log(err);
            });
        });
    }

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
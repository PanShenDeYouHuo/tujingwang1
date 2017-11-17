import  oss from 'ali-oss' //阿里云oss SDK

let state = {
    referenceFileList: [],
    uploadFileList: [],
    stsToken: {},
};

let mutations = {
    //登陆状态改成微信登入
    setStsToken(state, newToken) {
        state.stsToken = newToken;
        console.log(state.stsToken);
	},
	//手机或者邮箱登入
    toAccount(state) {
        state.loginType = 0;
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
    //获得oss写权限的sts临时token
    getWriteStsToken({commit, state, rootState}) {

        rootState.socketClass.myEmit( 'getWriteStsToken',rootState.user._id)
            .then((stsToken)=> {
                commit('setStsToken', stsToken);
            })
            .catch((err)=> {
                this.$store.state.errorSnackbar = { state: true, text: err.toString() };
            });
    },

    //上传文件
    uploadFile({commit, state, rootState}) {

        let client = new oss.Wrapper({ 
            region: 'oss-cn-beijing', 
            accessKeyId: state.stsToken.credentials.AccessKeyId, 
            accessKeySecret: state.stsToken.credentials.AccessKeySecret,
            stsToken: state.stsToken.credentials.SecurityToken,
            bucket: 'tujingcloud'
        });
        console.log(client); 

        for ( let index in state.uploadFileList) {

            client.multipartUpload(`productionProject/${state.uploadFileList[index].name}`, state.uploadFileList[index], {
                progress: function* (p) {
                    commit('setProgress', {index, p});
                    console.log('Progress: ' + p);
                }
            })
            .then((res)=> {
                // commit('removeUploadFile', index);
                console.log(res);
            })
            .catch((err)=> {
                // commit('setProgress', {index, p:'失败'});
                console.log(err);
            });
        }
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
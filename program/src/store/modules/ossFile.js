import {Wrapper as oss} from 'ali-oss' //阿里云oss SDK

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
        state.loginType = 0
    },
};

let actions = {
    //获得oss写权限的sts临时token
    getReadStsToken({commit, state, rootState}) {
        console.log(oss);
        rootState.socketClass.myEmit( 'getReadStsToken',rootState.user._id)
            .then((stsToken)=> {
                commit('setStsToken', stsToken);
            })
            .catch((err)=> {
                this.$store.state.errorSnackbar = { state: true, text: err.toString() };
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
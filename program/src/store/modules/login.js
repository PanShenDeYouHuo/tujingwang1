
let state = {
    loginType: 1,
};

let mutations = {
    //登陆状态改成微信登入
    toWechat(state) {
        state.loginType = 1
    },
    toAccount(state) {
        state.loginType = 0
    },
};

let actions = {
    //微信登入
    wechatLogin({commit, state, rootState}) {
        commit('toWechat');
        let obj = new WxLogin({
            id:"wechatLoginView", 
            appid: "wx578ee588948c8fcc",
            scope: "snsapi_login", 
            redirect_uri: "http://cloud.tujingwang.cn",
            state: "helloworld",
            style: "white",
            href: ""
        });
    },
    //切换到账号登入
    accountLogin({commit, state, rootState}) {
        commit('toAccount');
    }
};

let getters = {

};


const login = {
	state,
	mutations,
	actions,
	getters
};

export default login

let state = {
    loginType: 0,
};

let mutations = {
    //登陆状态改成微信登入
    toWechat(state) {
        state.loginType = 1
	},
	//手机或者邮箱登入
    toAccount(state) {
        state.loginType = 0
    },
};

let actions = {
    //微信登入
    wechatLogin({commit, state, rootState}) {
        commit('toWechat');
    },
    //切换到账号登入
    accountLogin({commit, state, rootState}) {
        commit('toAccount');
    },

    // //登入接口
	// loginApi({ commit, state, rootState }) {
	// 	//登入成功是返回的结果
	// 	rootState.socketClass.socket.on('loginSuccess', (data) => {

	// 		// rootState.router.push('home');
	// 		commit('setUser', data);

	// 		// //用于判读登入还是重连 0登入 1重新链接
	// 		// let loginState = sessionStorage.getItem('state');
	// 		if (loginState !== '1') {
	// 			//sessionStorage token用于刷新重连
	// 			sessionStorage.setItem('token', state.token);
	// 			//保存账号
	// 			localStorage.setItem('ruser', state.account);
	// 			//是否记住密码
	// 			if (state.isRemember) {
	// 				localStorage.setItem('rpassword', state.password);
	// 			}
	// 			else {
	// 				localStorage.removeItem('rpassword');
	// 			}
	// 			//设置为登入状态
	// 			sessionStorage.setItem('state', 1);
	// 		}
	// 		state.loading = true;

    //     });
        

	// },

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
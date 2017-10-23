
let state = {
	_id: '',					//账户唯一id
	token: '',					//令牌
	nickname: '',				//用户昵称
	sex: '',					//性别
	headimgurl: '',				//头像地址
	province: '',				//省份
	city: '',					//城市
	country: '',				//国家

	loading: true,				//登入时是等待状态
	isRemember: false,			//是否记住密码
};

let mutations = {
	setUser(state, newUser) {
		for (var key in newUser) {
			state[key] = newUser[key];
		}
	},
};

let actions = {
	//启动app时，载入用户数据
	loadUserData({ commit, state, rootState }) {
		//登入检测sessionstotage
		let stoken = sessionStorage.getItem('token');
		if (stoken) {
			rootState.socketClass.opt.query = { token: stoken };
			rootState.socketClass.socket.open();
			return;
		}
		//登入检测localstotage
		let raccount = localStorage.getItem('ruser');
		let rpassword = localStorage.getItem('rpassword');

		state.account = raccount;

		if (rpassword) {
			state.password = rpassword;
			state.isRemember = true;
		}
		// setTimeout(()=> {
		// rootState.router.push('login');
		// }, 1500);
	},
	//登入接口
	loginIn({ commit, state, rootState }) {
		state.loading = false;
		rootState.socketClass.connect(state.account, state.password);
	},
	//登入成功接口
	loginSuccess({ commit, state, rootState }) {
		//登入成功是返回的结果
		rootState.socketClass.socket.on('loginOk', (data) => {

			commit('setUser', data);

			// //用于判读登入还是重连 0登入 1重新链接
			// let loginState = sessionStorage.getItem('state');
			if (loginState !== '1') {
				//sessionStorage token用于刷新重连
				localStorage.setItem('ltoken', state.token);
				//保存账号
				localStorage.setItem('luser', state.account);
				//是否记住密码
				if (state.isRemember) {
					localStorage.setItem('lpassword', state.password);
				}
				else {
					localStorage.removeItem('lpassword');
				}
				// //设置为登入状态
				// sessionStorage.setItem('state', 1);
			}
			state.loading = true;

		});

	},
	// //登录失败接口
	// loginFail({ commit, state, rootState }) {
	// 	//socket.io 拒绝链接接口
	// 	rootState.socketClass.socket.on("error", (data) => {
	// 		sessionStorage.setItem('state', -1);
	// 		state.loading = true;
	// 		rootState.message.error(data);
	// 	});
	// },
	loginSuccess({commit, state, rootState}) {
		rootState.socketClass.socket.on('loginSuccess', (data)=> {
			console.log(data);
			commit('setUser', data);
			// for(let index in data) {
			// 	localStorage.setItem(index, data[index]);
			// }
			localStorage.setItem('accessToken', data.accessToken);
		});
	},

	//错误返回接口
	error({commit, state, rootState}) {
		rootState.socketClass.socket.on('appError', (err)=> {
			console.log('appError');
			rootState.message.error({
				content: err,
                duration: 5
			});
		});
	}


};

let getters = {

};


const user = {
	state,
	mutations,
	actions,
	getters
};

export default user
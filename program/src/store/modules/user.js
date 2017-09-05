
let state = {
	name: '',
	account: '',
	password: '',
	token: '',

	loading: true,
	isRemember: false,
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
	loadUserData({commit, state, rootState}) {
		rootState.router.beforeEach((to, from, next) => {
			next();
			rootState.loading.finish();
		})
		//登入检测sessionstotage
		let stoken = sessionStorage.getItem('token');
		if (stoken) {
		  	rootState.socketClass.opt.query = {token: stoken};
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
		rootState.router.push('login');
		// }, 1500);
	},
	//登入接口
	loginIn({commit, state, rootState}) {
		state.loading = false;
		rootState.socketClass.connect(state.account, state.password);
	},
	//登入成功接口
	loginSuccess({commit, state, rootState}) {
		//登入成功是返回的结果
		rootState.socketClass.socket.on('loginOk', (data)=> {

			rootState.router.push('home');
			commit('setUser', data);

			//用于判读登入还是重连 0登入 1重新链接
			let loginState = sessionStorage.getItem('state');
			if (loginState !== '1') {
				// rootState.router.push('/home');
				//sessionStorage token用于刷新重连
				sessionStorage.setItem('token', state.token);
				//保存账号
				localStorage.setItem('ruser', state.account);
				//是否记住密码
				if (state.isRemember) {
				  	localStorage.setItem('rpassword', state.password);
				}
				else {
				  	localStorage.removeItem('rpassword');
				}
				//设置为登入状态
				sessionStorage.setItem('state', 1);
			}
			state.loading = true;

		});
	},
	//登录失败接口
	loginFail({commit, state, rootState}) {
		//socket.io 拒绝链接接口
		rootState.socketClass.socket.on("error", (data)=> {
		  sessionStorage.setItem('state', -1);
		  state.loading = true;
		  rootState.message.error(data);
		});
	},
	

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
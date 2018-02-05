
let state = {
	_id: '',					//账户唯一id
	token: '',					//令牌
	nickname: '',				//用户昵称
	sex: '',					//性别
	headimgurl: '',				//头像地址
	province: '',				//省份
	city: '',					//城市
	country: '',				//国家

	contactInformation:{		//联系信息
        QQ:'',       			//qq账号
        wechat:'',   			//微信账号
	},
	
	realInformation:{			//真实信息
		state: 0,				//0未认证， 1审核中， 2已认证
		name:'',				//真实姓名
	},

	notify: [],					//通知
	notifyType: '',				//请求通知类型

	loading: true,				//登入时是等待状态
	isRemember: false,			//是否记住密码
};

let mutations = {
	setUser(state, newUser) {
		console.log(newUser);
		for (var key in newUser) {
			state[key] = newUser[key];
		}
	},

	setNotify(state, data) {
		state.notify = data; 
	}
};

let actions = {


	//退出登入
	signOut({commit, state, rootState}) {
		//删除accessToken
		localStorage.removeItem('accessToken');
		state._id = '';
	},


	//登入成功接口
	loginSuccess({commit, state, rootState}) {
		rootState.socketClass.socket.on('loginSuccess', (data)=> {
			//储存accessToken到localStorage
			// localStorage.setItem('accessToken', data.accessToken);
			//进行身份认证，根据权限开启api
			rootState.socketClass.socket.emit('authentication', data.accessToken);
			//登入界面关闭
			rootState.loginDialog = false;
			//用户数据保存
			commit('setUser', data);
			console.log(data);
		});

	},

	//验证成功
	authenticationSuccess({commit, state, rootState}) {
		rootState.socketClass.socket.on('authenticationSuccess', (data)=> {
			//储存accessToken到localStorage
			localStorage.setItem('accessToken', data.accessToken);
			//用户数据保存
			commit('setUser', data);

			// //获取通知信息
			// rootState.socketClass.myEmit('getNotify', {ntype: state.notifyType})
			// .then((res)=> {
			// 	commit('setNotify', res);
			// })
			// .catch((err)=> {
			// 	console.log(err);
			// });
		});
	},

	//错误返回接口
	appError({commit, state, rootState}) {
		rootState.socketClass.socket.on('appError', (err)=> {

			rootState.errorSnackbar = {
				state: true,
				text: err
			}

		});
	},



//////////////////////////////////////////////////////////////////////////////////////////////////////


	//通知接口
	notify({commit, state, rootState}) {
		rootState.socketClass.socket.on('notify', ()=> {
			rootState.socketClass.myEmit('getNotify', {notifyType: state.notifyType})
			.then((res)=> {
				commit('setNotify', res);
				rootState.infoSnackbar = {state: true, text: '您有新的通知'};
			})
			.catch((err)=> {
				console.log(err);
			});
		});
	},

	//获取通知
	getNotify({commit, state, rootState}, data) {
		return new Promise((resolve, reject)=> {

			rootState.socketClass.myEmit('getNotify', {notifyType: data.notifyType})
			.then((res)=> {
				commit('setNotify', res);

				resolve();
			})
			.catch((err)=> {
				console.log(err);
			})
		});
	},

	//获取通知
	getNotifyReturn({commit, state, rootState}, data) {
		return new Promise((resolve, reject)=> {
			rootState.appLoading = true;
			rootState.socketClass.myEmit('getNotify', {notifyType: data.notifyType,  currentPage: data.currentPage})
			.then((res)=> {
				// commit('setNotify', res);
				rootState.appLoading = false;
				resolve(res);
			})
			.catch((err)=> {
				rootState.appLoading = false;
			})
		});
	},

	//修改通知阅读状态
	putNotify({commit, state, rootState}, data) {
		return new Promise((resolve, reject)=> {
			rootState.socketClass.myEmit('putNotify', {_id: data._id})
			.then((res)=> {
				resolve();
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

export default user;
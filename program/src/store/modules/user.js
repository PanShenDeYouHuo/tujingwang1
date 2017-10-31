
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


	//退出登入
	signOut({commit, state, rootState}) {
		//删除accessToken
		localStorage.removeItem('accessToken');
		state._id = '';
	},


	//登入成功接口
	loginSuccess({commit, state, rootState}) {
		rootState.socketClass.socket.on('loginSuccess', (data)=> {
			//储存accessToken
			localStorage.setItem('accessToken', data.accessToken);
			//登入界面关闭
			rootState.loginDialog = false;
			console.log(data);
			commit('setUser', data);
		});
	},

	//错误返回接口
	appError({commit, state, rootState}) {
		rootState.socketClass.socket.on('appError', (err)=> {
			console.log('appError');

			rootState.errorSnackbar = {
				state: true,
				text: err
			}
			// rootState.message.error({
			// 	content: err,
            //     duration: 5
			// });
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
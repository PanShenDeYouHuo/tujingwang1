import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import login from './modules/login';
import project from './modules/project';
import ossFile from './modules/ossFile';
import admin from './modules/admin';
import boss from './modules/boss';
import account from './modules/account';
import customer from './modules/customer';

import socketClass from '../socket.io';

Vue.use(Vuex);

const state = {
	socketClass,
	router: {},
	loginDialog: false,
	//错误提示栏
	errorSnackbar: {
		state: false,
		text: 'what are you doing',
	},
	//成功提示栏
	successSnackbar: {
		state: false,
		text: 'what are you doing',
	},
	//成功提示栏
	infoSnackbar: {
		state: false,
		text: 'what are you doing',
	},

	appLoading: false,
	//路由拆解
	url:[],

};

const mutations = {

};

const actions = {
	//获取路由
	getRouter({commit, state}, router) {
		state.router = router;
	},
	//app初始化
	initialize({commit, state}) {
		//路由初始化
		state.router.beforeEach((to, from, next) => {
			state.url = [];
			let routerStr = to.path;
			let pos = 0;
			let epos = 0;
			let i = 0;
			while (i < 10) {
				i = i + 1;
				epos = to.path.indexOf('/', pos + 1)
				if (epos == -1)	{
					state.url.push(routerStr);
					break;
				};
				let buf = routerStr.slice(pos, epos);
				state.url.push(buf);
				routerStr = routerStr.slice(epos++);
				pos = epos++;

			}
			console.log(state.url);
			next();
		});

		//连接成功接口
		state.socketClass.socket.on("connect", ()=> {
			console.log("连接成功");
	
			//载入用户数据
			let accessToken = localStorage.getItem('accessToken');
			console.log(accessToken);
			if(accessToken) {
				//进行账号验证
				state.socketClass.socket.emit('authentication', accessToken);
			}
			
		});
	},

	//初始化路由
	initRouter({commit, state}, path) {
		state.url = [];
		let routerStr = path;
		let pos = 0;
		let epos = 0;
		let i = 0;
		while (i < 10) {
			i = i + 1;
			epos = path.indexOf('/', pos + 1)
			if (epos == -1)	{
				state.url.push(routerStr);
				break;
			};
			let buf = routerStr.slice(pos, epos);
			state.url.push(buf);
			routerStr = routerStr.slice(epos++);
			pos = epos++;

		}
	}

};

const getters = {

};

const modules = {
	user,
	login,
	project,
	ossFile,
	admin,
	boss,
	account,
	customer
};


export default new Vuex.Store({
	state,
	mutations,
	actions,
	modules
});
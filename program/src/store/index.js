import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import login from './modules/login';
import project from './modules/project';
import ossFile from './modules/ossFile';

import socketClass from '../socket.io';

Vue.use(Vuex);

const state = {
	socketClass,
	router: {},
	loginDialog: false,
	errorSnackbar: {
		state: false,
		text: 'what are you doing',
	}

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
			next();
		});

		//短线重连接口
		state.socketClass.socket.on("connect", ()=> {
			console.log("连接成功");
	
			//载入用户数据
			let accessToken = localStorage.getItem('accessToken');
			if(accessToken) {
					state.socketClass.socket.emit('authentication', accessToken);
			}
			
		});
	}

};

const getters = {

};

const modules = {
	user,
	login,
	project,
	ossFile
};


export default new Vuex.Store({
	state,
	mutations,
	actions,
	modules
});
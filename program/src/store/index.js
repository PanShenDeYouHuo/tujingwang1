import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user'
import login from './modules/login'
import finance from './modules/finance'
import statistics from './modules/statistics'
import socketClass from '../socket.io';

Vue.use(Vuex);

const state = {
	socketClass,
	router: {},

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

		//载入用户数据
		let accessToken = localStorage.getItem('accessToken');

		if(accessToken) {
				state.socketClass.socket.emit('login', accessToken);
		}
		console.log(state.user);
	}
};

const getters = {

};

const modules = {
	user,
	login,
	finance,
	statistics
};


export default new Vuex.Store({
	state,
	mutations,
	actions,
	modules
});
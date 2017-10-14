import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user'
import finance from './modules/finance'
import statistics from './modules/statistics'
import socketClass from '../socket';

Vue.use(Vuex);

const state = {
	socketClass,
	router: {},
	message: {},
	loading: {},

};

const mutations = {

};

const actions = {
	//获取路由
	getRouter({commit, state}, router) {
		state.router = router;
	},
	//获取全局提示
	getMessage({commit, state}, message) {
		state.message = message;
	},
	//获取页面加载静读条
	getLoading({commit, state}, loading) {
		state.loading = loading;
	},
};

const getters = {

};

const modules = {
	user,
	finance,
	statistics
};


export default new Vuex.Store({
	state,
	mutations,
	actions,
	modules
});
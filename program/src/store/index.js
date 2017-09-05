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
	loading:{},

};

const mutations = {

};

const actions = {
	getRouter({commit, state}, router) {
		state.router = router;
	},
	getMessage({commit, state}, message) {
		state.message = message;
	},
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
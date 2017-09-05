import Vue from 'vue';
import Vuex from 'vuex';
import socketClass from './socket';

Vue.use(Vuex);

const state = {
	socketClass,
	login: {
		name: '',
		account: '',
		password: '',
		loading: true,
		isRemember: false,
		token: '',
	},
	error: {
		content: '测试',
		duration: 10,
	},
	financeEmployee: {
		employeeList: '',
	}
};

const mutations = {
	//设置员工工资单
	setFinanceEmployee(state, { list }) {
		state.financeEmployee.employeeList = list;
	}
};

const actions = {
	//获得员工工资单
	getFinanceEmployee({commit}) {
		socketClass.myEmit('GET/finance/employee', {})
			.then((res)=> {
				console.log(res);
				commit('setFinanceEmployee', {list: res});
			})
			.catch((err)=> {
				console.log(err);
			})
	},
	//登入api
	login({commit,state}) {

	},
	//登入失败接受接口
	loginFail({commit,state}, message) {
		//socket.io 拒绝链接接口
		state.socketClass.socket.on("error", (data)=> {
		  sessionStorage.setItem('state', -1);
		  message.error(data);
		});
	}
};

const getters = {

};

const modules = {
};


export default new Vuex.Store({
	state,
	mutations,
	actions
});
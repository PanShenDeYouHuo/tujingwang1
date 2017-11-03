
let state = {

	renderList: [],
	allList: [],
	allListFinish: [],
	monthList: [],
	monthListFinish: [],
	renderLoading: false,
	renderDetails: [],
	renderTime: new Date(),
	serviceList: [],
	serviceTime: new Date(),
	salesmanList: [],
	salesmanTime: new Date(),
	othenList: [],
	othenTime: new Date(),

	customer: {
		list: [],
		idData:[],
		loading: false
	}
};

let mutations = {
	//设置渲染师工资单
	setFinanceRender(state, { list }) {
		// for(let key in list) {
		// 	console.log("key")
		// 	state.employeeList[key] = list[key];
		// }
		state.renderList = list;
	},
	//设置客服工资单
	setFinanceService(state, {list}) {
		state.serviceList = list;
	}
	// //修改工资单
	// deleteFinanceEmployee(state, {index}) {
	// }
};

let actions = {
	//获得全部渲染师工资单
	getFinanceRender({commit, state, rootState}) {
		rootState.loading.start();
		rootState.socketClass.myEmit('GET/finance/employee', {time: state.renderTime, job: '渲染师'})
			.then((res)=> {
				commit('setFinanceRender', {list: res});
				rootState.loading.finish();
			})
			.catch((err)=> {
				console.log(err);
				rootState.loading.error();
			});
	},

	//获得当月全部排图
	getFinanceMonth({commit, state, rootState}) {
		rootState.loading.start();
		rootState.socketClass.myEmit('GET/finance/employee/month', {time: state.renderTime, job: '渲染师'})
			.then((res)=> {
				state.monthList = res;
				rootState.loading.finish();
			})
			.catch((err)=> {
				console.log(err);
				rootState.loading.error();
			});
	},
	//获得当月全部出图
	getFinanceMonthFinish({commit, state, rootState}) {
		rootState.loading.start();
		rootState.socketClass.myEmit('GET/finance/employee/monthFinish', {time: state.renderTime, job: '渲染师'})
			.then((res)=> {
				state.monthListFinish = res;
				rootState.loading.finish();
			})
			.catch((err)=> {
				console.log(err);
				rootState.loading.error();
			});
	},
	//获得全部排图
	getFinanceAll({commit, state, rootState}) {
		rootState.loading.start();
		rootState.socketClass.myEmit('GET/finance/employee/all', {time: state.renderTime, job: '渲染师'})
			.then((res)=> {
				state.allList = res;
				rootState.loading.finish();
			})
			.catch((err)=> {
				console.log(err);
				rootState.loading.error();
			});
	},
	//获得全部出图
	getFinanceAllFinish({commit, state, rootState}) {
		rootState.loading.start();
		rootState.socketClass.myEmit('GET/finance/employee/allFinish', {time: state.renderTime, job: '渲染师'})
			.then((res)=> {
				state.allListFinish = res;
				rootState.loading.finish();
			})
			.catch((err)=> {
				console.log(err);
				rootState.loading.error();
			});
	},
	//获取渲染师工资单详情
	getFinanceRenderId({commit, state, rootState}, index) {
		rootState.loading.start();
		rootState.socketClass.myEmit('GET/finance/employee/:id', {time: state.renderTime, name: state.renderList[index]._id})
			.then((res)=> {
				state.renderDetails = res;
				rootState.loading.finish();
				state.renderLoading = true;
			})
			.catch((err)=> {
				console.log(err);
				rootState.loading.error();
			});
	},
	//获得客服工资单
	getFinanceService({commit, state, rootState}) {
		rootState.loading.start();
		rootState.socketClass.myEmit('GET/finace/employee', {time: state.serviceTime, job: '客服'})
			.then((res)=> {
				commit('setFinanceService', {list: res});
				rootState.loading.finish();
			})
			.catch((err)=> {
				console.log(err);
				rootState.loading.error();
			});
	},

	/////////////////////////////////////////////////////////
	
	//查询客户未结算账单
	getFinanceCustomer({commit, state, rootState}) {
		rootState.loading.start();
		rootState.socketClass.myEmit('GET/finance/customer', {})
			.then((res)=> {
				state.customer.list = res;
				rootState.loading.finish();
			})
			.catch((err)=> {
				console.log(err);
				rootState.loading.error()
			});
	},
	//查询客户未结账单详情
	getFinanceCustomerId({commit, state, rootState}, index) {
		state.customer.idData = state.customer.list[index].image;
		state.customer.loading = true;
	}
};

let getters = {

};


const finance = {
	state,
	mutations,
	actions,
	getters
};

export default finance

let state = {
	regional: {
		image: {
			Changsha: {},
			Ningbo: {},
			Taizhou: {}
		},
		project: {
			Changsha: {},
			Ningbo: {},
			Taizhou: {}
		}
	},
};

let mutations = {
	//设置regional/project
	setRegionalProject(state, {regionalData}) {
		for (let key in regionalData) {
			state.regional.project[key] = regionalData[key];
		}
	},
	//设置regional/image
	setRegionalImage(state, {regionalData}) {
		for (let key in regionalData) {
			state.regional.image[key] = regionalData[key];
		}
	},
};

let actions = {
	//获取regional/project
	getStatisticsRegionalProject({commit, state, rootState}) {
		rootState.socketClass.myEmit('get/statistics/regional/project',{})
			.then((res)=> {
				commit('setRegionalProject', {regionalData: res});
			})
			.catch((err)=> {
				console.log(err);
			});
	},
	//获取regional/image
	getStatisticsRegionalImage({commit, state, rootState}) {
		rootState.socketClass.myEmit('get/statistics/regional/image',{})
			.then((res)=> {
				commit('setRegionalImage', {regionalData: res});
			})
			.catch((err)=> {
				console.log(err);
			});
	},
};

let getters = {
	//长沙接图总数
	allChangsha(state) {
		let res = {
			total: 0,
			totalPrice: 0
		};
		let all = state.regional.image.Changsha;
		for (let i = 0; i < all.length; i++) {
			res.total += all[i].total;
			res.totalPrice += all[i].totalPrice;
		}
		return res;
	},

	//台州接图总数
	allTaizhou(state) {
		let res = {
			total: 0,
			totalPrice: 0
		};
		let all = state.regional.image.Taizhou;
		for (let i = 0; i < all.length; i++) {
			res.total += all[i].total;
			res.totalPrice += all[i].totalPrice;
		}
		return res;
	},

	//宁波接图总数
	allNingbo(state) {
		let res = {
			total: 0,
			totalPrice: 0
		};
		let all = state.regional.image.Ningbo;
		for (let i = 0; i < all.length; i++) {
			res.total += all[i].total;
			res.totalPrice += all[i].totalPrice;
		}
		return res;
	},

	//公司接图总数
	all(state) {
		let res = {
			total: 0,
			totalPrice: 0,
			array1: [
				{
					_id: 0,
					total: 0,
					totalPrice: 0
				},
				{
					_id: 1,
					total: 0,
					totalPrice: 0
				},
				{
					_id: 2,
					total: 0,
					totalPrice: 0
				},
				{
					_id: 3,
					total: 0,
					totalPrice: 0
				},
				{
					_id: 4,
					total: 0,
					totalPrice: 0
				}
			]

		};
		let all = state.regional.image.Changsha;
		for (let i = 0; i < all.length; i++) {
			res.array1[all[i]._id].total += all[i].total;
			res.array1[all[i]._id].totalPrice += all[i].totalPrice;
			res.total += all[i].total;
			res.totalPrice += all[i].totalPrice;

		}
		all = state.regional.image.Taizhou;
		for (let i = 0; i < all.length; i++) {
			res.array1[all[i]._id].total += all[i].total;
			res.array1[all[i]._id].totalPrice += all[i].totalPrice;
			res.total += all[i].total;
			res.totalPrice += all[i].totalPrice;
		}
		all = state.regional.image.Ningbo;
		for (let i = 0; i < all.length; i++) {
			res.array1[all[i]._id].total += all[i].total;
			res.array1[all[i]._id].totalPrice += all[i].totalPrice;
			res.total += all[i].total;
			res.totalPrice += all[i].totalPrice;
		}
		return res;
	}
	//
};


const statistics = {
	state,
	mutations,
	actions,
	getters
};

export default statistics
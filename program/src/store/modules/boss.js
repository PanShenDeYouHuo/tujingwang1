
let state = {
    totalAccount: 0, //总注册账号数

    staffAccounts: [],       //账号列表
    staffAccountsCount: 0,   //账号总页数
    staffAccount: {},        //账号

    //状态
    
};

let mutations = {
	setUser(state, newUser) {

    },
    
    setBossAccounts(state, data) {
        state.bossAccounts = data.users;
        state.bossAccountsCount = data.count;
    },

    setBossAccountStatistics(state, data) {
        state.totalAccount = data.total;
        state.disableAccount = data.disable;
    }
};

let actions = {


	//退出登入
	// signOut({commit, state, rootState}) {

    // },
    



};

let getters = {

};


const admin = {
	state,
	mutations,
	actions,
	getters
};

export default admin;
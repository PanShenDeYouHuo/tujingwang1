let state = {
    totalAccount: 0, //总注册账号数

    staffAccounts: [],       //账号列表
    staffAccountsCount: 0,   //账号总页数
    staffAccount: {},        //账号

    //状态
    getStaffAccountsLoading: false,        //获取staff账号列表
};

let mutations = {
	setUser(state, newUser) {

    },
    
    setStaffAccounts(state, data) {
        state.staffAccounts = data.users;
        state.staffAccountsCount = data.count;
    },

    setStaffAccountStatistics(state, data) {
        state.totalAccount = data.total;
        state.disableAccount = data.disable;
    }
};

let actions = {


	//退出登入
	// signOut({commit, state, rootState}) {

    // },
    /**
     * 获取staff账号列表
     * 
     * @param {any} {commit, state, rootState} 
     * @param {any} data 
     */
    getStaffAccounts({commit, state, rootState}, data) {
        state.getStaffAccountsLoading = true;

        rootState.socketClass.myEmit('getStaffAccounts', {pageSize: data.pageSize, currentPage: data.currentPage, authority: data.authority, _id: rootState.user._id})
        .then((res)=> {
            commit('setStaffAccounts', res);
            state.getStaffAccountsLoading = false;
        })
        .catch((err)=> {
            setTimeout(() => {
                state.getStaffAccountsLoading = false;
                rootState.errorSnackbar = { state: true, text: err.message };
            }, 800);
        });
    },

    /**
     * 注册成功回掉
     * 
     * @param {any} {commit, state, rootState} 
     * @returns 
     */
    staffWechatRegSuccess({commit, state, rootState}) {

        return new Promise((resolve, reject)=> {

            rootState.socketClass.socket.on('staffWechatRegSuccess', (data)=> {
                setTimeout(() => {
                    rootState.successSnackbar = {state: true, text: data};
                }, 800);
                resolve('success');
            });
        });
    }


};

let getters = {

};


const boss = {
	state,
	mutations,
	actions,
	getters
};

export default boss;
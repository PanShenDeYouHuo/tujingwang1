//"vuetify": "^0.16.9",
let state = {
    totalAccount: 0,        //总注册账号数
    disableAccount: 0,      //禁止使用账号数

    bossAccounts: [],       //账号列表
    bossAccountsCount: 0,   //账号总页数
    bossAccount: {},        //账号

    //状态
    getBossAccountsLoading: false,          //获取boss账号列表
    getBossAccountStatisticsLoading: false, //获取boss账号统计
    putBossAccountLoading: false,           //跟新账号
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
    
    /**
     * 获取boss账号列表
     * 
     * @param {any} {commit, state, rootState} 
     * @param {any} data data.pageSize页面显示总数, data.currentPage当前页面, data.state账户状态
     */
    getBossAccounts({commit, state, rootState}, data) {
        state.getBossAccountsLoading = true;
        rootState.socketClass.myEmit('getBossAccounts', {pageSize: data.pageSize, currentPage: data.currentPage, isDisable: data.isDisable})
        .then((res)=> {
            commit('setBossAccounts', res);
            state.getBossAccountsLoading = false;
        })
        .catch((err)=> {
            setTimeout(()=> {
                state.getBossAccountsLoading = false;
                rootState.errorSnackbar = { state: true, text: err.message };
            }, 800);
        })
    },

    /**
     * 获取boss账号统计
     * 
     * @param {any} {commit, state, rootState} 
     * @param {any} data 
     */
    getBossAccountStatistics({commit, state, rootState}) {
        state.getBossAccountStatisticsLoading = true;
        rootState.socketClass.myEmit('getBossAccountStatistics', {})
        .then((res)=> {
            commit('setBossAccountStatistics', res);
            state.getBossAccountStatisticsLoading = false;
        })
        .catch((err)=> {
            setTimeout(()=> {
                state.getBossAccountStatisticsLoading = false;
                rootState.errorSnackbar = { state: true, text: err.message};
            }, 800);
        });
    },

    /**
     * 修改boss账号数据
     * 
     * @param {any} {commit, state, rootState} 
     * @param {any} data 
     */
    putBossAccount({commit, state, rootState}, data) {
        return new Promise((resolve, reject)=> {
            state.putBossAccountLoading = true;
            rootState.socketClass.myEmit('putBossAccount', data)
            .then((res)=> {
                setTimeout(() => {
                    rootState.successSnackbar = {state: true, text:'保存成功'};
                    state.putBossAccountLoading = false;
                }, 800);
                resolve('success');
            })
            .catch((err)=> {
                setTimeout(()=> {
                    state.putBossAccountLoading = false;
                    console.log(err)
                    rootState.errorSnackbar = {state: true, text: err.message};
                }, 800);
            });
        });
    },

    // /**
    //  * 注册成功回掉
    //  * 
    //  * @param {any} {commit, state, rootState} 
    //  * @param {any} data 
    //  */
    // bossWechatRegSuccess({commit, state, rootState}) {

    //     return new Promise((resolve, reject)=> {
            
    //         rootState.socketClass.socket.on('bossWechatRegSuccess',(data)=> {
    //             setTimeout(() => {
    //                 rootState.successSnackbar = {state: true, text: data};
    //             }, 800);
    //             resolve('success');
    //         });


    //     });

    // }


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
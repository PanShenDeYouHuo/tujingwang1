import { resolve } from "path";

let state = {
    totalAccount: 0, //总注册账号数

    //账号权限设置
    staffAccounts: [],          //账号列表
    staffAccountsCount: 0,      //账号总页数
    staffAccount: {},           //当前处理账号

    //认证账号
    authenticateAccounts:[],                //账号列表
    authenticateAccountsCount: 0,           //账号总页数
    authenticateAccount: {},                //当前处理账号

    //状态
    getStaffAccountsLoading: false,        //获取staff账号列表
};

let mutations = {
	setUser(state, newUser) {

    },
    
    setStaffAccounts(state, data) {
        state.staffAccounts = [];
        for (let i in data.users) {
            setTimeout(() => {
                state.staffAccounts.push(data.users[i]);
            }, i*25);
        }
        state.staffAccountsCount = data.count;
    },

    setAuthenticateAccounts(state, data) {
        state.authenticateAccounts = [];
        for ( let i in data.users) {
                state.authenticateAccounts[i] = data.users[i];
            }
        state.authenticateAccountsCount = data.count;
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
        rootState.appLoading = true;
        rootState.socketClass.myEmit('getStaffAccounts', {pageSize: data.pageSize, currentPage: data.currentPage, authority: data.authority, _id: rootState.user._id})
        .then((res)=> {
            setTimeout(() => {
                commit('setStaffAccounts', res);
                rootState.appLoading = false;
            }, 300);
        })
        .catch((err)=> {
            setTimeout(() => {
                rootState.appLoading = false;
                rootState.errorSnackbar = { state: true, text: err.message };
            }, 300);
        });
    },

    /**
     * 获取需要账号认证的账号列表
     * 
     * @param {any} {commit, state, rootState} 
     * @param {any} data 
     */
    getAuthenticateAccounts({commit, state, rootState}, data) {
        rootState.appLoading = true;
        rootState.socketClass.myEmit('getAuthenticateAccounts', {pageSize: data.pageSize, currentPage: data.currentPage, state: data.state})
        .then((res)=> {
            commit('setAuthenticateAccounts', res);
            setTimeout(() => {
                rootState.appLoading = false;
            }, 300);
        })
        .catch((err)=> {
            setTimeout(() => {
                rootState.appLoading = false;
                rootState.errorSnackbar = { state: true, text: err.message };
            }, 300);
        });
    },

    /**
     * 进行审核
     * 
     * @param {any} {commit, state, rootState} 
     * @param {any} data 
     */
    putAuthenticate({commit, state, rootState}, data) {
        return new Promise((resolve, reject)=> {
            rootState.appLoading = true;
            rootState.socketClass.myEmit('putAuthenticate', {_id: data._id, state: data.state})
            .then((res)=> {
                resolve()
                setTimeout(() => {
                    rootState.appLoading = false;
                }, 300);
            })
            .catch((err)=> {
                reject(err);
                setTimeout(() => {
                    rootState.appLoading = false;
                    // rootState.errorSnackbar = { state: true, text: err.message };
                }, 300);
            });

        });
    },
    /**
     * 修改员工权限
     * 
     * @param {any} {commit, state, rootState} 
     * @param {any} data 
     * @returns 
     */
    putAuthority({commit, state, rootState}, data) {
            return new Promise((resolve, reject)=> {
                rootState.appLoading = true;
                rootState.socketClass.myEmit('putAuthority', {_id: data._id, authority: data.authority})
                .then((res)=> {
                    resolve();
                    setTimeout(() => {
                        rootState.appLoading = false;
                        rootState.successSnackbar = {state: true, text: '权限设置成功'};
                    }, 300);
                })
                .catch((err)=> {
                    reject(err);
                    setTimeout(() => {
                        rootState.appLoading = false;
                        rootState.errorSnackbar = {state: true, text: err.message};
                    }, 300);
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
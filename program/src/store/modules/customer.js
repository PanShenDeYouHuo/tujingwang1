
let state = {
    customers: [],		//客户数据
    count: 0,           //总页数
};

let mutations = {

    //设置项目列表数据
    setcustomers(state, data) {
        state.customers = data.customers;
        state.count = data.count;
    },
};

let actions = {
    //微信登入
    wechatLogin({commit, state, rootState}) {
        commit('toWechat');
    },

    //添加客户
    postCustomer ({commit, state, rootState}, data) {
        rootState.appLoading = true;
        return new Promise((resolve, reject)=> {
            rootState.socketClass.myEmit('postCustomer', data)
            .then((res)=> {
                setTimeout(() => {
                    rootState.successSnackbar = {state: true, text: '添加成功'};
                    rootState.appLoading = false;
                    resolve();
                }, 300);
            })
            .catch((err)=> {
                setTimeout(() => {
                    rootState.appLoading = false;
                    rootState.errorSnackbar = {state: true, text: err.message};
                }, 300);
            });
        });
    },

    //获取客户列表
    getCustomers({commit, state, rootState}, data) {
        rootState.appLoading = true;
        console.log(data);
        return new Promise((resolve, reject)=> {
            rootState.socketClass.myEmit('getCustomers', data)
            .then((res)=> {
                setTimeout(() => {
                    rootState.appLoading = false;
                    commit('setcustomers', res);
                    resolve();
                }, 300);
            })
            .catch((err)=> {
                setTimeout(() => {
                    rootState.appLoading = false;
                    rootState.errorSnackbar = {state: true, text: err.message};
                }, 300);
            });
        });
    },

    //跟新客户数据
    putCustomer({commit, state, rootState}, data) {
        rootState.appLoading = true;
        return new Promise((resolve, reject)=> {
            rootState.socketClass.myEmit('putCustomer', data)
            .then((res)=> {
                setTimeout(() => {
                    rootState.appLoading = false;
                    resolve();
                }, 300);
            })
            .catch((err)=> {
                setTimeout(() => {
                    rootState.appLoading = false;
                    rootState.errorSnackbar = {state: true, text: err.message};
                }, 300);
            });
        });
    },

    //删除客户
    deleteCustomer({commit, state, rootState}, data) {
        rootState.appLoading = true;
        return new Promise((resolve, reject)=> {
            rootState.socketClass.myEmit('deleteCustomer', data)
            .then((res)=> {
                setTimeout(() => {
                    rootState.appLoading = false;
                    resolve();
                }, 300);
            })
            .catch((err)=> {
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


const customer = {
	state,
	mutations,
	actions,
	getters
};

export default customer
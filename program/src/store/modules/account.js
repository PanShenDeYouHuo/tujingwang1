
let state = {

    //状态
    putContactInformationLoading: false,    //跟新联系人
    putRealInformationLoading: false,       //提交认证
};

let mutations = {
	setUser(state, newUser) {
		for (var key in newUser) {
			state[key] = newUser[key];
		}
	},
};

let actions = {

	//保存跟新联系方式
	putContactInformation({commit, state, rootState}) {
        state.putContactInformationLoading = true;
        rootState.socketClass.myEmit('putContactInformation', {_id: rootState.user._id, QQ: rootState.user.contactInformation.QQ, wechat: rootState.user.contactInformation.wechat})
        .then((res)=> {
            // commit('setBossAccounts', res);
            rootState.successSnackbar = {state: true, text: '保存成功'};
            state.putContactInformationLoading = false;
        })
        .catch((err)=> {
            setTimeout(()=> {
                state.putContactInformationLoading = false;
                rootState.errorSnackbar = { state: true, text: err.message };
            }, 800);
        })
    },
    
    //账号认证
    putRealInformation({commit, state, rootState},data) {
        return new Promise((resolve,reject)=> {
            
            rootState.appLoading = true;
            rootState.socketClass.myEmit('putRealInformation', {name: data.name, IDNumber: data.IDNumber, bankCardAccount: data.bankCardAccount, openingBank: data.openingBank})
            .then((res)=> {
                rootState.user.realInformation.state = 1;
                resolve();
                setTimeout(() => {
                    rootState.appLoading = false;
                    rootState.successSnackbar = {state: true, text: '提交成功'};
                }, 300);
            })
            .catch((err)=> {
                setTimeout(() => {
                    rootState.appLoading = false;
                    rootState.errorSnackbar = {state: true, text: err.message};
                }, 300);
            })
        });
    },

    //获取渲染师
    async getRender({commit, state, rootState}, data) {
        try {
            let res = await rootState.socketClass.myEmit( 'getRender',{pageSize: data.pageSize, currentPage: data.currentPage, authority: data.authority, search: data.search});
            return res;
        } catch (err) {
            rootState.errorSnackbar = { state: true, text: err.message };
        }
    }


};

let getters = {

};


const account = {
	state,
	mutations,
	actions,
	getters
};

export default account;
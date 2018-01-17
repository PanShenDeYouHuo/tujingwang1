
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
        state.putRealInformationLoading = true;
        rootState.socketClass.myEmit('putRealInformation', {name: data.name, IDNumber: data.IDNumber, bankCardAccount: data.bankCardAccount, openingBank: data.openingBank})
        .then((res)=> {
            rootState.successSnackbar = {state: true, text: '提交成功'};
            state.putRealInformationLoading = false;
        })
        .catch((err)=> {
            setTimeout(() => {
                state.putRealInformationLoading = false;
                rootState.errorSnackbar = {state: true, text: err.message};
            }, 800);
        })
    },


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
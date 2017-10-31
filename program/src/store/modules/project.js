let state = {
    createDialog: false,
};

let mutations = {
    closeCreateDialog(state) {
        state.createDialog = false;
    },
    openCreateDialog(state) {
        state.createDialog = true;
    }
};

let actions = {
    taskCreateDialogOpen({commit, state, rootState}) {
        commit('openCreateDialog');
    },
    taskCreateDialogClose({commit, state, rootState}) {
        commit('closeCreateDialog');
    },
    taskCreate({commit, state, rootState}, projectName) {
        console.log('haha')
        console.log(projectName);
        rootState.router.replace({name: 'project', params:{pid: 1231231}});
        commit('closeCreateDialog');
    }

};

let getters = {

};

const project = {
    state,
    mutations,
    actions,
    getters
};

export default project;
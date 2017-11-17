let state = {

    _id: '',
    name: '我的项目名称',
    publisher: {},
    service: {},
    manager: {},
    referenceFile: [],
    projectFile: [],
    image: [
        {
            state: 0,
            designType: '工装',
            space: '别墅',
            style: '现代',
            area: '客厅',
            imageType: '全景',
            price: 300,
            murl: '',
            iurl: '',
            productionsGroup: []
            
        }
    ],

    listData:[],
    listCount: '',
    changeData: {}, //项目设置内存区
    oldData: {},    //旧数据

    //状态
    postProjectLoading: false,  //创建项目状态

    getProjectLoading: false,   //获取项目状态
    getProjectsLoading: false,  //获取项目列表状态

    putProjectLoading: false,   //保存跟新项目状态

};

let mutations = {
    setChangeProject(state, project) {
        state.changeData = project;
    },

    setProjectList(state, data) {
        state.listData = data.projects;
        state.listCount = data.count;
    }
};

let actions = {

    // //根据项目id载入项目进行编辑
    // taskCreate({commit, state, rootState}, projectName) {
    //     rootState.router.replace({name: 'project', params:{pid: 1231231}});
    // },

    //添加image
    addImage({commit, state, rootState}, image) {
        let newImage = {};
        for( let key in image) {
            newImage[key] = image[key];
        }
        state.changeProject.image.push(newImage);
    },

    //移除image
    reImage({commit, state, rootState}, index) {
        state.changeProject.image.splice(index, 1);
    },


    //创建项目
    postProject({commit, state, rootState}, projectName) {
        state.postProjectLoading = true;
        rootState.socketClass.myEmit( 'postProject',{name: projectName, uid:rootState.user._id})
        .then((pid)=> {
            rootState.router.replace({name: 'project', params:{pid}});
        })
        .catch((err)=> {
            setTimeout(() => {
                state.postProjectLoading = false;
                rootState.errorSnackbar = { state: true, text: err.message };
            }, 800);
        });

    },

    //保存项目
    putProject({commit, state, rootState}) {
        state.putProjectLoading = true;
        rootState.socketClass.myEmit('putProject', state.changeProject)
        .then((res)=> {
            rootState.successSnackbar = { state: true, text: '保存成功'}
        })
        .catch((err)=> {
            console.log(err);
            setTimeout(()=> {
                state.putProjectLoading = true;
                rootState.errorSnackbar = { state: true, text: err.message };
            }, 800);
        });
    },

    //根据pid获取项目
    getProject({commit, state, rootState}, pid) {
        rootState.socketClass.myEmit('getProject', {pid})
        .then((res)=> {
            commit('setChangeProject', res);
        })
        .catch((err)=> {
            console.log(err);
            setTimeout(()=> {
                rootState.errorSnackbar = { state: true, text: err.message };
            }, 800);
        });
    },




    //根据发布人id查询项目列表
    getProjects({commit, state, rootState}, data) {
        rootState.socketClass.myEmit('getProjects', {uid: rootState.user._id, currentPage: data.currentPage, pageSize: data.pageSize})
        .then((res)=> {
            commit('setProjectList', res);
        })
        .catch((err)=> {
            setTimeout(()=> {
                rootState.errorSnackbar = { state: true, text: err.message };
            }, 800);
        });
    },



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
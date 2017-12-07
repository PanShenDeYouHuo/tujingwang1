import { setTimeout } from "timers";

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
    listCount: 0,

    changeData: {}, //项目设置内存区
    // oldChangeData: {},    //旧数据判断是否更改

    //状态
    postProjectLoading: false,  //创建项目状态

    getProjectLoading: false,   //获取项目状态
    getProjectsLoading: false,  //获取项目列表状态

    putProjectLoading: false,   //保存项目状态

    deleteProjectLoading: false, //删除项目状态

};

let mutations = {
    //设置编辑项目的数据
    setChangeProject(state, project) {
        // let newProject =JSON.parse( JSON.stringify(project) );
        state.changeData = project;
        // state.oldChangeData = newProject;
    },

    //设置项目列表数据
    setProjectList(state, data) {
        state.listData = data.projects;
        state.listCount = data.count;
    },

    //删除项目数据
    deleteProjectList(state, data) {
        state.listData
    },

    //添加image
    addImage(state, data) {
        let newImage = {};
        for( let key in data) {
            newImage[key] = data[key];
        }
        state.changeData.image.push(newImage);
    },

    //移除image
    reImage(steta, index) {
        state.changeData.image.splice(index, 1);
    },

    //重置changeData
    removeChangeDate(steta, index) {
        state.changeData = {};
    }

};

let actions = {

    // //根据项目id载入项目进行编辑
    // taskCreate({commit, state, rootState}, projectName) {
    //     rootState.router.replace({name: 'project', params:{pid: 1231231}});
    // },

    // //添加image
    // addImage({commit, state, rootState}, image) {
    //     let newImage = {};
    //     for( let key in image) {
    //         newImage[key] = image[key];
    //     }
    //     state.changeData.image.push(newImage);

    // },

    // //移除image
    // reImage({commit, state, rootState}, index) {
    //     state.changeProject.image.splice(index, 1);
    // },

    //判断编辑项目数据是否更改
    isChangeProject({commit, state, rootState}, routerName) {

        if (JSON.stringify(state.changeData) === JSON.stringify(state.oldChangeData)) {
            rootState.router.replace({name: routerName});
            return false;
        } else {
            return true;
        }
    },

    //创建项目
    postProject({commit, state, rootState}, projectName) {
        state.postProjectLoading = true;
        rootState.socketClass.myEmit( 'postProject',{name: projectName, uid:rootState.user._id})
        .then((pid)=> {
            rootState.router.replace({name: 'project', params:{pid}});
            state.postProjectLoading = false;
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
        rootState.socketClass.myEmit('putProject', state.changeData)
        .then((res)=> {
            // rootState.successSnackbar = { state: true, text: '保存成功'}
            commit('setChangeProject', state.changeData);
            state.putProjectLoading = false;

        })
        .catch((err)=> {
            console.log(err);
            setTimeout(()=> {
                state.putProjectLoading = false;
                rootState.errorSnackbar = { state: true, text: err.message };
            }, 800);
        });
    },

    //根据pid获取项目
    getProject({commit, state, rootState}, pid) {
        state.getProjectsLoading = true;
        rootState.socketClass.myEmit('getProject', {pid})
        .then((res)=> {
            commit('setChangeProject', res);
            setTimeout(()=> {
                state.getProjectsLoading = false;
            },1000)

        })
        .catch((err)=> {
            console.log(err);
            setTimeout(()=> {
                rootState.errorSnackbar = { state: true, text: err.message };
                state.getProjectsLoading = false;
            }, 800);
        });
    },


    //根据发布人id查询项目列表
    getProjects({commit, state, rootState}, data) {
        state.getProjectsLoading = true;
        rootState.socketClass.myEmit('getProjects', {uid: rootState.user._id, currentPage: data.currentPage, pageSize: data.pageSize})
        .then((res)=> {
            commit('setProjectList', res);
            state.getProjectsLoading = false;

        })
        .catch((err)=> {
            setTimeout(()=> {
                state.getProjectsLoading = false;
                rootState.errorSnackbar = { state: true, text: err.message };
            }, 800);
        });
    },

    //根据项目_id删除项目
    deleteProject({commit, state, rootState}, index) {
        state.deleteProjectLoading = true;
        rootState.socketClass.myEmit('deleteProjects', {pid})
        .then((res)=> {
            commit('deleteProjectList', index)
            state.deleteProjectLoading = false;
        })
        .catch((err)=> {
            setTimeout(()=> {
                state.deleteProjectLoading = false;
                rootState.errorSnackbar = { state: true, text: err.message};
            }, 800)
        });
    },

    //在项目列表中编辑项目
    editProject({commit, state, rootState}, pid) {
        rootState.router.replace({name: 'project', params:{pid}});
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
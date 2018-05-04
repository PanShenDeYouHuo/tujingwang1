import { setTimeout } from "timers";

let state = {

    pid: {},        //当前项目id

    listData:[],
    listCount: 0,

    changeData: {}, //项目设置内存区
    voucher: {      //付款凭证
        bucket: '',
        name: '',
        object: '',
    },
    
    currentPage: 1,

    work: {
        currentPage: 1,
    }

};

let mutations = {
    //设置编辑项目的数据
    setChangeProject(state, project) {
        // let newProject =JSON.parse( JSON.stringify(project) );
        state.changeData = project;
        // state.oldChangeData = newProject;
    },
    //设置任务数据
    setChangeProjectImage(state, project) {
        state.changeData.image = project.image; 
    },

    //当前项目id
    setPid(state, pid) {
        state.pid = pid;
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

    //客服创建项目
    async postProject({commit, state, rootState}, project) {
        try {
            rootState.appLoading = true;
            let pid = await rootState.socketClass.myEmit( 'postProject',{name: project.name, publisherId: project.publisherId, uid:rootState.user._id});
            rootState.appLoading = false;
            rootState.router.replace({name: 'project', params:{pid}});
        } catch (err) {
            rootState.appLoading = false;
            rootState.errorSnackbar = { state: true, text: err.message };
        }

    },

    //保存项目
    async putProject({commit, state, rootState}) {
        try {
            rootState.appLoading = true;
            console.log(state.changeData);
            let res = await rootState.socketClass.myEmit('putProject', state.changeData)
            commit('setChangeProject', state.changeData);

            rootState.appLoading = false;
        } catch (err) {
            rootState.appLoading = false;
            rootState.errorSnackbar = { state: true, text: err.message};
        }
    },

    //根据pid获取项目
    async getProject({commit, state, rootState}, pid) {
        try {
            rootState.appLoading = true;
            let res = await rootState.socketClass.myEmit('getProject', {pid})
            commit('setChangeProject', res);
            rootState.appLoading = false;
        } catch (err) {
            rootState.appLoading = false;
            rootState.errorSnackbar = { state: true, text: err.message };
        }
    },


    //根据客服id查询项目列表
    async getProjects({commit, state, rootState}, data) {
        try {
            rootState.appLoading = true;
            let res = await rootState.socketClass.myEmit('getProjects', {uid: rootState.user._id, state: data.state, currentPage: data.currentPage, pageSize: data.pageSize});
            commit('setProjectList', res);
            rootState.appLoading = false;
        } catch (err) {
            rootState.appLoading = false;
            rootState.errorSnackbar = { state: true, text: err.message };
        }


    },

    //根据渲染师id查询项目列表
    async getRenderProjects({commit, state, rootState}, data) {
        try {
            rootState.appLoading = true;
            let res = await rootState.socketClass.myEmit('getRenderProjects', {uid: rootState.user._id, state: data.state, currentPage: data.currentPage, pageSize: data.pageSize});
            commit('setProjectList', res);
            rootState.appLoading = false;
        } catch (err) {
            rootState.appLoading = false;
            rootState.errorSnackbar = { state: true, text: err.message };
        }


    },

    //根据项目_id删除项目
    async deleteProject({commit, state, rootState}, pid) {
        try {
            rootState.appLoading = true;
            await rootState.socketClass.myEmit('deleteProjectById', {pid});
            rootState.appLoading = false;
            rootState.successSnackbar = { state: true, text: '删除成功' };

        } catch (err) {
            rootState.appLoading = false;
            rootState.errorSnackbar = { state: true, text: err.message };
        }
    },

    //在项目列表中编辑项目
    editProject({commit, state, rootState}, pid) {
        rootState.router.replace({name: 'project', params:{pid}});
    },

//////////////////////////任务///////////////////////////
    //创建任务
    async postProImage({commit, state, rootState}, data) {
        try {
            rootState.appLoading = true;
            await rootState.socketClass.myEmit('postProImage', {pid: data.pid, iid: data.iid, image: data.image});
            rootState.appLoading = false;
        } catch (err) {
            rootState.appLoading = false;
            rootState.errorSnackbar = { state: true, text: err.message };
        }
    },

    //更新任务
    async putProImage({commit, state, rootState}, data) {
        try {
            rootState.appLoading = true;
            await rootState.socketClass.myEmit('putProImage', {pid: data.pid, iid: data.iid, image: data.image});
            rootState.appLoading = false;

        } catch (err) {
            rootState.appLoading = false;
            rootState.errorSnackbar = { state: true, text: err.message };
        }
    },

    //设置完成任务
    async putProImageFinish({commit, state, rootState}, data) {
        try {
            rootState.appLoading = true;
            await rootState.socketClass.myEmit('putProImageFinish', {pid: data.pid, image: data.image});
            rootState.appLoading = false;

        } catch (err) {
            rootState.appLoading = false;
            rootState.errorSnackbar = { state: true, text: err.message };
        }
    },

    //删除任务
    async deleteProImage({commit, state, rootState}, data) {
        try {
            rootState.appLoading = true;
            await rootState.socketClass.myEmit('deleteProImage', {pid: data.pid, iid: data.iid});
            rootState.appLoading = false;

        } catch (err) {
            rootState.appLoading = false;
            rootState.errorSnackbar = { state: true, text: err.message };
        }
    },

    //查询任务
    async getProImage({commit, state, rootState}, pid) {
        try {
            rootState.appLoading = true;
            let res = await rootState.socketClass.myEmit('getProject', {pid})
            commit('setChangeProjectImage', res);
            rootState.appLoading = false;
        } catch (err) {
            rootState.appLoading = false;
            rootState.errorSnackbar = { state: true, text: err.message };
        }
    },

    //添加模型文件
    async putProImgMod({commit, stata, rootState}, data) {
        try {
            rootState.appLoading = true;
            console.log(data);
            await rootState.socketClass.myEmit('putProImgMod', { model: data.model, pid: data.pid, iid: data.iid});
            rootState.appLoading = false;

        } catch (err) {
            rootState.appLoading = false;
            rootState.errorSnackbar = { state: true, text: err.message};
        }
    },

    //安排工作
    async putProImgArrange({commit, state, rootState}, data) {
        try {
            rootState.appLoading = true;

            await rootState.socketClass.myEmit('putProImgArrange', { workType: data.workType, pid: data.pid, iid: data.iid, uid: data.uid});
            rootState.appLoading = false;
        } catch (err) {
            rootState.appLoading = false;
            rootState.errorSnackbar = { state: true, text: err.message};
        }
    },

    //项目付款
    async projectPay({commit, stata, rootState}, data) {
        try {
            rootState.appLoading = true;
            let res = await rootState.socketClass.myEmit('projectPay', {pid: data.pid, image: data.image, money: data.money, voucher: data.voucher});
            console.log(res);
            rootState.appLoading = false;
        } catch (err) {
            rootState.appLoading = false;
            rootState.errorSnackbar = { state: true, text: err.message };
        }
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
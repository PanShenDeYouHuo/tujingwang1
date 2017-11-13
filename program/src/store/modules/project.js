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

    oldData: {},

};

let mutations = {
};

let actions = {

    //根据项目id载入项目进行编辑
    taskCreate({commit, state, rootState}, projectName) {
        rootState.router.replace({name: 'project', params:{pid: 1231231}});
    },

    //添加image
    addImage({commit, state, rootState}, image) {
        let newImage = {};
        for( let key in image) {
            newImage[key] = image[key];
        }
        state.image.push(newImage);
    },

    //移除image
    reImage({commit, state, rootState}, index) {
        state.image.splice(index, 1);
    },

    // //上传参考文件
    // uploadReferenceFile({commit, state, rootState}, flies) {

    //     return 'chenggong';
    // }



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
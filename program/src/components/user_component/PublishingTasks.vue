<template>
    <div class="publishingTasks">
        <md-whiteframe md-elevation="4" style="padding: 0px;">
            
            <md-layout md-gutter style="height: 48px;">
                <md-layout md-gutter md-vertical-align="center" md-align="center" md-flex="10" style="background-color: #f44336; width: 120px; margin-right: 16px;">
                    <span class="md-body-2" style="color: #fff;  padding: 12px;">任务名称</span>
                </md-layout>

                <md-layout md-align="center">
                    <md-input-container md-inline style="margin: 4px 0 4px">
                        <label>项目名称</label>
                        <md-input></md-input>
                    </md-input-container>
                </md-layout>

            </md-layout>
        </md-whiteframe>
        <br>
        <md-layout md-gutter>
            <md-layout md-gutter md-vertical-align="center" md-align="center" md-flex="10" style="background-color: #f44336; width: 120px; margin-right: 16px;">
                <span class="md-body-2" style="color: #fff;  padding: 12px;">设计风格</span>
            </md-layout>

            <md-layout >
                <md-button-toggle  class="md-primary" style="flex-wrap: wrap; heigth:300px;">
                    <md-button class="md-toggle">现代</md-button>
                    <md-button>现代奢华</md-button>
                    <md-button>后现代</md-button>
                    <md-button>中式</md-button>
                    <md-button>新中式</md-button>
                    <md-button>欧式</md-button>
                    <md-button>简欧</md-button>
                    <md-button>法式</md-button>
                    <md-button>新古典</md-button>
                    <md-button>地中海</md-button>
                    <md-button>美式</md-button>
                    <md-button>简美</md-button>
                    <md-button>东南亚</md-button>
                    <md-button>日式</md-button>
                    <md-button>混搭</md-button>
                </md-button-toggle>
            </md-layout>
        </md-layout>

        <br>
        <md-layout md-gutter="16">

            <md-layout md-flex="75">

                    <md-whiteframe md-elevation="4" style="width: 100%; padding: 0px; ">
                        <md-layout md-flex="100">
                            <span class="md-body-2" style="background-color: #f44336; color: #fff; width: 100%; text-align:center">角度</span>
                        </md-layout>
                        <br>

                        <md-layout style="padding-left: 16px;">

                            <md-card md-with-hover class="card">
                                <md-card-area md-inset>
                                    <md-card-header>
                                        <md-card-header-text>
                                            <h2 class="md-body-2">家装-客厅-1</h2>
                                            <span class="md-caption">单帧</span>
                                        </md-card-header-text>

                                    </md-card-header>

                                    <md-card-media md-ratio="16:9">
                                    <img src="../../assets/bb.jpg" alt="Coffee House">
                                    </md-card-media>

                                    <md-card-content style="min-height: 75px;">
                                        <span class="md-caption">我的世界送到附近上空的附件是垃圾</span>
                                    </md-card-content>

                                </md-card-area>

                                <md-speed-dial md-mode="scale" md-direction="bottom" class="md-fab-top-right md-accent">
                                    <md-button class=" md-icon-button md-clean md-dense" md-fab-trigger>
                                        <md-icon md-icon-morph>event</md-icon>
                                        <md-icon>more_vert</md-icon>
                                    </md-button>

                                    <md-button class="md-fab md-icon-button  md-dense ">
                                        <md-icon>mode_edit</md-icon>
                                    </md-button>

                                    <md-button class="md-fab  md-icon-button  md-dense ">
                                        <md-icon>delete_forever</md-icon>
                                    </md-button>
                                </md-speed-dial>

                                      <md-card-content>
                                        <span class="md-caption">4天前</span>
                                    </md-card-content>
                            </md-card>

                            <Button type="dashed" long @click="handleAdd" style="width: 250px; height: 320px;"><md-icon class="md-size-2x">add</md-icon></Button>
                        </md-layout>
                    </md-whiteframe>


            </md-layout>

            <md-layout md-gutter>

                    <md-whiteframe md-elevation="4" style="width: 100%; padding: 0px;">

                        <md-layout >
                            <md-layout md-flex="100">
                                <span class="md-body-2" style="background-color: #f44336; color: #fff; width: 100%; text-align:center">资料</span>
                            </md-layout>
                            </md-layout>
                        <br>
                        <Upload
                            multiple
                            type="drag"
                            action="//jsonplaceholder.typicode.com/posts/">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>点击或将文件拖拽到这里上传</p>
                            </div>
                        </Upload>
                    </md-whiteframe>

            </md-layout>

        </md-layout>
    </div>
</template>

<script>
export default {
    name: 'publishingTasks',
    props: [],
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
    },
    mounted(){
    },
    beforeCreate() {

    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .publishingTasks {
        /* width:100%;
        height:50px;
        padding: 10px;
        padding-top: 70px;
        overflow:auto;
        position: absolute; */
        margin: auto;
        padding: 16px;
        padding-top: 66px;
        /* max-width: 1220px; */
        min-width: 965px;
        background-color: #fff;
        z-index:1;
    }

    .card {
        width: 250px; height: 320px; margin-right: 16px; margin-bottom: 16px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.08), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.08);
    }

    .md-caption {
        font-size: 12px;
        font-weight: 300;
        letter-spacing: .02em;
        line-height: 15px;
    }

    .md-card .md-card-header {
        padding: 16px;
        padding-top: 12px;
        padding-bottom: 12px;
    }

    .md-card .md-card-content {
        padding: 16px;
        padding-top: 8px;
        padding-bottom: 8px;
        font-size: 14px;
        line-height: 22px;
    }

    .md-fab.md-fab-top-right, .md-speed-dial.md-fab-top-right {
        top: 16px;
        right: 16px;
    }


   


</style>

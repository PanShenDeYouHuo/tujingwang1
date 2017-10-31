<template>
  <div class="works">
    <Row  type="flex" justify="space-around">
        <Col span="5">
            <Card >
                <div>
                <h2>
                    <Icon type="ios-keypad"></Icon>
                    风格
                </h2>
                <a href="javascript:open(' ', '_self').close();" ></a>
                <br>
                <Col :span="12" style=" padding-bottom: 20px; padding-left: 0px;">
                    <Button type="ghost" long>现代简约</Button>
                </Col>
                <Col :span="12" style=" padding-bottom: 20px; padding-right: 0px;">
                    <Button type="ghost" long>现代奢华</Button>
                </Col>
                <Col :span="12" style=" padding-bottom: 20px; padding-left: 0px;">
                    <Button type="ghost" long>后现代</Button>
                </Col>
                <Col :span="12" style=" padding-bottom: 20px; padding-right: 0px;">
                    <Button type="ghost" long>北欧</Button>
                </Col>
                <Col :span="12" style="padding-bottom: 20px; padding-left: 0px;">
                    <Button type="ghost" long>中式</Button>
                </Col>
                <Col :span="12" style=" padding-bottom: 20px; padding-right: 0px;">
                    <Button type="ghost" long>新中式</Button>
                </Col>
                <Col :span="12" style=" padding-bottom: 20px; padding-left: 0px;">
                    <Button type="ghost" long>欧式</Button>
                </Col>
                <Col :span="12" style=" padding-bottom: 20px; padding-right: 0px;">
                    <Button type="ghost" long>简欧</Button>
                </Col>
                <Col :span="12" style=" padding-bottom: 20px; padding-left: 0px;">
                    <Button type="ghost" long>法式</Button>
                </Col>
                <Col :span="12" style=" padding-bottom: 20px; padding-right: 0px;">
                    <Button type="ghost" long>新古典</Button>
                </Col>
                <Col :span="12" style=" padding-bottom: 20px; padding-left: 0px;">
                    <Button type="ghost" long>地中海</Button>
                </Col>
                <Col :span="12" style=" padding-bottom: 20px; padding-right: 0px;">
                    <Button type="ghost" long>美式</Button>
                </Col>
                <Col :span="12" style=" padding-bottom: 20px; padding-left: 0px;">
                    <Button type="ghost" long>简美</Button>
                </Col>
                <Col :span="12" style=" padding-bottom: 20px; padding-right: 0px;">
                    <Button type="ghost" long>东南亚</Button>
                </Col>
                <Col :span="12" style="padding-left: 0px;">
                    <Button type="ghost" long>日式</Button>
                </Col>
                <Col :span="12" style="padding-right: 0px;">
                    <Button type="ghost" long>混搭</Button>
                </Col>
                <div style="clear:both;"></div>
                </div>
            </Card>
            <br>
            <Card>
                <div>
                    <h2>
                        <Icon type="ios-keypad"></Icon>
                        类型
                    </h2>
                    <br>
                    <Col :span="12" style="padding-left: 0px;">
                        <Button type="ghost" long >家装</Button>
                    </Col>
                    <Col :span="12" style="padding-right: 0px;">
                        <Button type="ghost" long >工装</Button>
                    </Col>
                    <div style="clear:both;"></div>
                </div>
            </Card>
        </Col>
        <Col span="8">
            <Card >
                <div style="">
                    <h2>
                        <Icon type="ios-keypad"></Icon>
                        角度
                    </h2>
                    <br>
                    <Form ref="form" :model="form" inline >
                                <FormItem style="width: 80%;"
                                    v-for="(image, index) in form.images"
                                    :key="index"
                                    :prop="'images.' + index + '.value'"
                                    :rules="{required: true, message: '项目' + (index + 1) +'不能为空', trigger: 'blur'}">
                                        <Cascader :data="data" v-model="image.value"></Cascader>
                                </FormItem>
                                <FormItem>
                                        <Button type="ghost" long @click="handleRemove(index)">删除</Button>
                                </FormItem>
                    </Form>
                    <Form>
                        <FormItem>
                            <Button type="dashed" long icon="plus-round" @click="handleAdd" >新增</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </Col>
        <Col span="5">
            <Card >
                <div >
                    <h2>
                        <Icon type="ios-keypad"></Icon>
                        项目说明
                    </h2>
                    <br>
                    <Input v-model="value" type="textarea" :rows="10" placeholder="请输入..." style="margin-bottom: 20px;"></Input>
                </div>
            </Card>
            <br>
            <Card>
                <div>
                    <h2>
                        <Icon type="ios-keypad"></Icon>
                        图片参考
                    </h2>
                    <br>
                </div>
            </Card>
        </Col>
        <Col span="5">
            <Card>
                <div>
                    <h2>
                        <Icon type="ios-keypad"></Icon>
                        项目资料
                    </h2>
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
                </div>
            </Card>
        </Col>

    </Row>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
        value: "",
        form: {
            images: [
                {
                    value: [],
                }
            ]     
        },
        data: [{
                value: 'beijing',
                label: '家装',
                children: [
                    {
                        value: '单帧',
                        label: '单帧',
                        children: [
                            {
                                value: '客厅',
                                label: '客厅'
                            },
                            {
                                value: '餐厅',
                                label: '餐厅' 
                            },
                            {
                                value: '卧室',
                                label: '卧室'
                            }
                        ]
                    },
                    {
                        value: '全景',
                        label: '全景',
                        children: [
                            {
                                value: '客厅',
                                label: '客厅'
                            },
                            {
                                value: '餐厅',
                                label: '餐厅' 
                            },
                            {
                                value: '卧室',
                                label: '卧室'
                            }
                        ]
                    }
                ]
            }, {
                value: 'jiangsu',
                label: '工装',
                children: [
                    {
                        value: 'nanjing',
                        label: '南京',
                        children: [
                            {
                                value: 'fuzimiao',
                                label: '夫子庙',
                            }
                        ]
                    },
                    {
                        value: 'suzhou',
                        label: '苏州',
                        children: [
                            {
                                value: 'zhuozhengyuan',
                                label: '拙政园',
                            },
                            {
                                value: 'shizilin',
                                label: '狮子林',
                            }
                        ]
                    }
                ],
            }]
    }
  },
  methods:{
    handleAdd () {
        this.form.images.push({
            value: []
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .works {
    width:100%;
    height:100%;
    padding: 10px;
    padding-top: 70px;
    background-color: #fff;
    overflow:auto;
    position: absolute;
    z-index:1;
  }

  .ivu-card {
    font-size: 12px;
}



</style>

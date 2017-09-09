<template>
    <div class="service">
    <transition name="fade">
    <div v-if="loading">
      <Row :gutter="20">
        <Col span="12">
          <Card :bordered="false">

            <Row slot="title" type="flex" align="middle" style="font-size: 12px;">
              <Col span="9">
                <P>渲染师</P>
              </Col>
              <Col span="3">
                <label style="float: right">建模提成：</label>
              </Col>
<!--               <Col span="10" style="min-width: 320px; font-size: 12px;"> -->
              <Col span="2">
                <InputNumber style="width: 100%;" size="small" :step="0.1" :max="1" :min="0" v-model="modelValue"></InputNumber>
              </Col>
              <Col span="3">
                <label style="float: right">渲染提成：</label>
              </Col>
              <Col span="2">
                <InputNumber style="width: 100%;" size="small" :step="0.1" :max="1" :min="0" v-model="randerValue"></InputNumber>
              </Col>
                
              <Col span="2">
                <label style="float: right">月份：</label>
              </Col> 
              <Col span="3">
                <Date-picker style="width: 100%;" size="small" type="month" v-model="financeData.renderTime" :clearable="false" :editable="false" @on-change="renderChange" placeholder="选择月" > </Date-picker>
              </Col>
            </Row>
            <Table border height="352" size="small" :columns="columns1" no-data-text="height" :data="financeData.renderList" ></Table>

          </Card>
        </Col>
        <Col span="12">
          <Card :bordered="false">
              <Row slot="title" type="flex" align="middle">
                <Col span="21">
                  <P>客服</P>
                </Col>
                <Col span="3">
                  <Date-picker size="small" placement="bottom-end" v-model="financeData.serviceTime" type="month" placeholder="选择月" ></Date-picker>
                </Col>
              </Row>
              <Table border height="352" size="small" :columns="columns1" :data="financeData.serviceList" ></Table>
          </Card>
        </Col>
      </Row>
      <br>
      <Row :gutter="20">

        <Col span="12">
          <Card :bordered="false">
            <Row slot="title" type="flex" align="middle">
              <Col span="21">
                <P>业务员</P>
              </Col>
              <Col span="3">
                <Date-picker size="small" v-model="financeData.salesmanTime" type="month" placeholder="选择月"></Date-picker>
              </Col>
            </Row>
            <Table border height="352" size="small" :columns="columns1" :data="financeData.salesmanList" ></Table>
          </Card>
        </Col>

        <Col span="12">
          <Card :bordered="false">
              <Row slot="title" type="flex" align="middle">
                <Col span="21">
                  <P>其他</P>
                </Col>
                <Col span="3">
                  <Date-picker size="small" placement="bottom-end" v-model="financeData.othenTime" type="month" placeholder="选择月"></Date-picker>
                </Col>
              </Row>
              <Table border height="352" size="small" :columns="columns1" :data="financeData.othenList" ></Table>
          </Card>
        </Col>

      </Row>
    </div>
    </transition>

    <Modal v-model="financeData.renderLoading" width="80%">
        <p slot="header" style="text-align:center">
            <Icon type="ios-list"></Icon>
            <span>详细表单</span>
        </p>
        <Table border height="750" size="small" :columns="columns2" :data="financeData.renderDetails" ref="customerList"></Table>
        <div slot="footer">
			    <Button type="primary" size="large" @click="exportData()">导出</Button>
			  </div>
<!--         <div style="text-align:center">
            <p>此任务删除后，下游 10 个任务将无法执行。</p>
            <p>是否继续删除？</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long :loading="financeData.renderLoading" @click="">删除</Button>
        </div> -->
    </Modal>

    </div>
</template>

<script>
  export default {
    name:'FinanceEmployee',
    data () {
      return {
        modal3: true,
        loading: false,
        randerValue: 0.2,
        modelValue: 0.2,
        columns1: [
          {
            title: '名字',
            key: '_id'
          },
          {
            title: '模型个数',
            key: 'totalModel'
          },
          {
            title: '模型总价',
            key: 'totalModelPrice'
          },
          {
            title: '渲染个数',
            key: 'totalRender'
          },
          {
            title: '渲染总价',
            key: 'totalRenderPrice'
          },
          {
            title: '提成',
            key: "all",
            render: (h, params) => {
              return h('div', [
                h('p', {

                }, params.row.totalModelPrice * this.modelValue + params.row.totalRenderPrice * this.randerValue)
              ]);
            }
          },
          {
            title: '操作',
            key: 'totalFinance',
            width: 140,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                  h('Button', {
                      props: {
                          type: 'primary',
                          size: 'small'
                      },
                      style: {
                          marginRight: '5px'
                      },
                      on: {
                          click: () => {
                              this.$store.dispatch("getFinanceRenderId",params.index);
                          }
                      }
                  }, '详情'),
                  h('Button', {
                      props: {
                          type: 'error',
                          size: 'small'
                      },
                      on: {
                          click: () => {
                              this.remove(params.index)
                          }
                      }
                  }, '确认')
              ]);
            }
          },
        ],
        columns2: [
          {
            title: '项目编号',
            key: '_id',
            width: 220
          },
          {
            title: '空间名',
            key: 'iname'
          },
          {
            title: '客户',
            key: 'customer'
          },
          {
            title: '图片类型',
            key: 'itype'
          },
          {
            title: '价格',
            key: 'price'
          },
          {
            title: '客服',
            key: 'service'
          },
          {
            title: '工作类型',
            key: 'jtype'
          },
          {
            title: '制作人',
            key: 'name'
          }
        ],
      }
    },
    computed: {
      financeData() {
        return this.$store.state.finance;
      }
    },
    methods: {
        remove (index) {
            this.financeData().splice(index, 1);
        },
        renderChange(date) {
          // this.financeData.renderTime = date;
          setTimeout(()=> {
          this.$store.dispatch('getFinanceRender');
          }, 500);
        },
        exportData () {
          console.log('in')
              this.$refs.customerList.exportCsv({
                  filename: `工资单`,
                  original: false
              });
        }
    },
    mounted() {
      this.$store.dispatch('getFinanceRender');
      
      setTimeout(()=> {
        this.loading = true;
      }, 1000);
    }
  };
</script>

<style>
	.service {
    width:100%;
    height:100%;
    box-sizing:border-box;
    overflow:auto;
    position: absolute;
    z-index:1;
	}
</style>
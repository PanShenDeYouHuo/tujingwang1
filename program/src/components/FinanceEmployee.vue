<template>
    <div class="service">
    <transition name="fade">
    <div v-if="loading">
      <Row :gutter="20">
        <Col span="12">
          <Card :bordered="false">

            <Row slot="title" type="flex" align="middle" style="font-size: 12px;">
              <Col span="17">
                <P>本月排图</P>
              </Col>

              <Col span="2">
                 <Button type="primary" size="large" @click="exportMonth()">导出</Button>
              </Col>
                
              <Col span="2">
                <label style="float: right">月份：</label>
              </Col> 
              <Col span="3">
                <Date-picker style="width: 100%;" size="small" type="month" v-model="financeData.renderTime" :clearable="false" :editable="false" @on-change="renderChange" placeholder="选择月" > </Date-picker>
              </Col>
            </Row>
            <Table border height="470" size="small" :columns="columns1" no-data-text="height" :data="financeData.monthList" ref="monthList"></Table>

          </Card>
        </Col>

        <Col span="12" style="margin-bottom: 20px;">
          <Card :bordered="false">

            <Row slot="title" type="flex" align="middle" style="font-size: 12px;">
              <Col span="22">
                <P>本月出图</P>
              </Col>

              <Col span="2">
                 <Button type="primary" size="large" @click="exportMonthFinish()">导出</Button>
              </Col>
                
            </Row>
            <Table border height="470" size="small" :columns="columns1" no-data-text="height" :data="financeData.monthListFinish" ref="monthListFinish"></Table>

          </Card>
        </Col>


        <Col span="12">
          <Card :bordered="false">

            <Row slot="title" type="flex" align="middle" style="font-size: 12px;">
              <Col span="22">
                <P>全部排图</P>
              </Col>

              <Col span="2">
                 <Button type="primary" size="large" @click="exportAll()">导出</Button>
              </Col>

            </Row>
            <Table border height="470" size="small" :columns="columns1" no-data-text="height" :data="financeData.allList" ref="allList"></Table>

          </Card>
        </Col>

                <Col span="12">
          <Card :bordered="false">

            <Row slot="title" type="flex" align="middle" style="font-size: 12px;">
              <Col span=22>
                <P>全部出图</P>
              </Col>

              <Col span="2">
                 <Button type="primary" size="large" @click="exportAllFinish()">导出</Button>
              </Col>
            </Row>
            <Table border height="470" size="small" :columns="columns1" no-data-text="height" :data="financeData.allListFinish" ref="allListFinish"></Table>

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
          // {
          //   title: '提成',
          //   key: "all",
          //   render: (h, params) => {
          //     return h('div', [
          //       h('p', {

          //       }, params.row.totalModelPrice * this.modelValue + params.row.totalRenderPrice * this.randerValue)
          //     ]);
          //   }
          // },
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
            title: '排图时间',
            key: 'cpt',
          },
          {
            title: '出图时间',
            key: 'bigTime',
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
          },
          {
            title: '结算状态',
            key: 'state'
          },
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
          this.$store.dispatch('getFinanceMonth');
          this.$store.dispatch('getFinanceMonthFinish');

          }, 500);
        },
        exportData () {
          console.log('in')
              this.$refs.customerList.exportCsv({
                  filename: `工资单`,
                  original: false
              });
        },
        exportMonth () {
          this.$refs.monthList.exportCsv({
              filename: `本月排图`,
              original: false
          });
        },
        exportMonthFinish () {
          this.$refs.monthListFinish.exportCsv({
              filename: `本月出图`,
              original: false
          });
        },
        exportAll () {
          this.$refs.allList.exportCsv({
              filename: `全部排图`,
              original: false
          });
        },
        exportAllFinish () {
          this.$refs.allListFinish.exportCsv({
              filename: `全部出图`,
              original: false
          });
        },
    },
    mounted() {
      this.$store.dispatch('getFinanceRender');
      this.$store.dispatch('getFinanceMonth');
      this.$store.dispatch('getFinanceMonthFinish');
      this.$store.dispatch('getFinanceAll');
      this.$store.dispatch('getFinanceAllFinish');
      
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
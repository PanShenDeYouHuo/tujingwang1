<template>
    <div class="service">
		<Row :gutter="20">
			<Col span="24">
				<Card :bordered="false">

					<Row slot="title" type="flex" align="middle">
						<Col span="21">
						  	<P>客户</P>
						</Col>
					</Row>
					<Table border size="small" :columns="columns" no-data-text="height" :data="customer.list" ></Table>
				</Card>
			</Col>
		 </Row>

		<Modal v-model="customer.loading" width="80%">
			<p slot="header" style="text-align:center">
				<Icon type="ios-list"></Icon>
				<span>账单详细</span>
			</p>
			<Table border height="750" size="small" :columns="columns1" :data="customer.idData" ref="customerList" ></Table>
			<div slot="footer">
			    <Button type="primary" size="large" @click="exportData()">导出</Button>
			</div>
		</Modal>
    </div>
</template>

<script>
  	export default {
	    name:'FinanceCustomer',
	    data () {
	      	return {
	      		columns: [
	      			{
	      			  title: '客户',
	      			  key: '_id',
	      			},
	      			{
	      			  title: '数量',
	      			  key: 'total',
	      			},
	      			{
	      			  title: '总金额',
	      			  key: 'totalPrice',
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
	      			                    this.$store.dispatch("getFinanceCustomerId",params.index);
	      			                }
	      			            }
	      			        }, '详情'),
	      			        // h('Button', {
	      			        //     props: {
	      			        //         type: 'error',
	      			        //         size: 'small'
	      			        //     },
	      			        //     on: {
	      			        //         click: () => {
	      			        //             this.remove(params.index)
	      			        //         }
	      			        //     }
	      			        // }, '确认')
	      			    ]);
	      			  }
	      			},
	      		],
	      		columns1: [
	      			{
	      				title: "图片名称",
	      				key: "iname"
	      			},
	      			{
	      				title: "图片类型",
	      				key: "itype"
	      			},
	      			{
	      				title: "建模",
	      				key: "mname"
	      			},
	      			{
	      				title: "渲染",
	      				key: "rname"
	      			},
	      			{
	      				title: "价格",
	      				key: "price"
	      			},
	      			{
	      			  title: '图片',
	      			  key: 'url',
	      			  render: (h, params)=> {
	      			  	return h('div', [
	      			  		h('img',{
	      			  			attrs: {
	      			  				src: params.row.url[0] ? params.row.url[0].url : "a"
	      			  			},
	      			  			style: {
	      			  				width: '200px'
	      			  			}
	      			  		}),
	      			  	]);
	      			  }
	      			},
	      			// {
	      			// 	title: '编辑',
	      			// 	key: 'url',
	      			// 	render: (h, params)=> {
	      			// 		return h('div', [
	      			// 			h('Button', {
	      			// 				props: {
	      			// 					type: 'primary',
	      			// 					size: 'small'
	      			// 				},
	      			// 				on: {
	      			// 					click: ()=> {
	      			// 						exportData(params.row._id);
	      			// 					}
	      			// 				}
	      			// 			}, '导出')
	      			// 		]);
	      			// 	}
	      			// }
	      		]
	      	}
	    },
	    computed: {
	    	customer() {
	    		return this.$store.state.finance.customer;
	    	}
	    },
	    methods: {
	    	exportData () {
	    		console.log('in')
    	        this.$refs.customerList.exportCsv({
    	            filename: `收款账单`,
    	            original: false
    	        });
	    	}
	    },
	    mounted() {
	      this.$store.dispatch('getFinanceCustomer');
	      
	      setTimeout(()=> {
	        this.loading = true;
	      }, 500);

	    }
	}
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
<template>
    <div class="customer">
        <div  style="background-color: #333; height: 50px;  position: absolute; width: 100%; z-index:5; ">
            <v-layout align-center style="height: 100%;" >

                
                <v-flex xs2>

                    <v-btn flat icon @click="quit('projects')" color="yellow">
                        <v-icon>arrow_back</v-icon>
                    </v-btn>
                </v-flex>

                <v-flex xs8 class="text-xs-center">
                    <span style="font-weight:bold;" class="white--text">
                        客户管理
                    </span>
                </v-flex>
                
                <v-flex xs2>

                </v-flex>

            </v-layout>
        </div>



        <v-content style="padding-top: 55px; height:100%; overflow-y:auto;" > 
            <v-container grid-list-xl fluid style="height: 100%; " class="">
                <v-layout row wrap >

                    <!-- 导航页 -->
                    <v-flex xs12 >
                        <v-card >
                            <v-card-title style="padding: 0px 16px; height: 48px;">
                                <v-text-field
                                label="客户搜索"
                                v-model="search"
                                single-line
                                full-width
                                hide-details
                                ></v-text-field>
                                
                                <!-- <v-spacer></v-spacer> -->
                                <v-btn outline  color="black" @click="getCustomers()">
                                    搜索
                                </v-btn>
                                <v-btn outline  color="black" @click="openCustomerDialog()">
                                    添加
                                </v-btn>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                       
                    <v-flex xs12  v-for="(customer, index) in customer.customers" :key="index">
                        <v-layout row wrap >
                            <v-flex xs2 >

                                    <v-card flat>


                                            <v-card-title style="padding: 0px 16px; height: 48px;">
                                                            
                                                <!-- <span style="font-weight:bold;" >
                                                    {{customer}}
                                                </span>  -->
                                                <span style="font-weight:bold;" >
                                                    客户名：
                                                </span> 
                                                <v-text-field
                                                label="无"
                                                v-model="customer.name"
                                                single-line
                                                full-width
                                                hide-details
                                                disabled                                                
                                                ></v-text-field>

                                            </v-card-title>

                                    </v-card>
                            </v-flex>
                            <v-flex xs2 >

                                <v-card flat>
                                        <v-card-title style="padding: 0px 16px; height: 48px;">
                                                        

                                            <span style="font-weight:bold;" >
                                                公司：
                                            </span> 
                                            <v-text-field
                                            label="无"
                                            v-model="customer.companyName"
                                            single-line
                                            full-width
                                            hide-details
                                            disabled                                            
                                            ></v-text-field>
                                        </v-card-title>

                                </v-card>
                            </v-flex>
                            <v-flex xs2 >

                                <v-card flat>
                                        <v-card-title style="padding: 0px 16px; height: 48px;">
                                                        

                                            <span style="font-weight:bold;" >
                                                电话：
                                            </span> 
                                            <v-text-field
                                            label="无"
                                            v-model="customer.phone"
                                            single-line
                                            full-width
                                            hide-details
                                            disabled                                            
                                            ></v-text-field>
                                        </v-card-title>

                                </v-card>
                            </v-flex>
                            <v-flex xs2 >

                                <v-card flat>
                                        <v-card-title style="padding: 0px 16px; height: 48px;">
                                                        

                                            <span style="font-weight:bold;" >
                                                QQ：
                                            </span> 
                                            <v-text-field
                                            label="无"
                                            v-model="customer.QQ"
                                            single-line
                                            full-width
                                            hide-details
                                            disabled                                           
                                            ></v-text-field>
                                        </v-card-title>

                                </v-card>
                            </v-flex>
                            <v-flex xs2 >

                                <v-card flat>
                                        <v-card-title style="padding: 0px 16px; height: 48px;">
                                                        

                                            <span style="font-weight:bold;" >
                                                微信：
                                            </span> 
                                            <v-text-field
                                            label="无"
                                            v-model="customer.wechat"
                                            single-line
                                            full-width
                                            hide-details
                                            disabled
                                            ></v-text-field>
                                        </v-card-title>

                                </v-card>
                            </v-flex>

                            <v-flex xs2 >

                                <v-card flat>
                                    <v-card-title style="padding: 0px 16px; height: 48px;">
                                        <v-btn  small   @click="openPutCustomerDialog(customer)" style="min-width: 77px;">
                                            修改
                                        </v-btn>

                                        <v-btn small   @click="openDelCustomerDialog(customer)" style="min-width: 77px;">
                                            删除
                                        </v-btn>
                                    </v-card-title>

                                </v-card>
                            </v-flex>
                

                        </v-layout>
                    </v-flex>
                        

                    <!-- 页面 -->
                    <v-flex xs12 class="py-2">
                        <v-card>
                            <v-card-title style="padding: 0px 16px;" >
                                 <div class="text-xs-center" style="width: 100%;">
                                    <v-pagination  
                                    v-bind="{'disabled': this.$store.state.appLoading}"
                                    :length="customer.count" v-model="currentPage" :total-visible="7" @input="getCustomers()"></v-pagination>
                                </div>
                            </v-card-title>
                        </v-card>
                    </v-flex>



                </v-layout>
            </v-container>
        </v-content>

        <!-- 添加客户模态框 -->
        <v-dialog v-model="customerDialog" persistent max-width="900px">
            <v-card>
                <v-card-title>
                    <span class="title">添加客户</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-form v-model="customerValid" ref="customerForm" lazy-validation style="width: 100%;">
                            <v-layout wrap>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                    label="客户名" color="yellow darken-2" v-model="name"  :rules="rules.name"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                    label="公司" color="yellow darken-2" v-model="companyName" :rules="rules.companyName"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                    label="电话" color="yellow darken-2" v-model="phone" :rules="rules.phone" :counter="11"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                    label="QQ" color="yellow darken-2" v-model="QQ" 
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                    label="微信" color="yellow darken-2" v-model="wechat" 
                                    ></v-text-field>
                                </v-flex>

 
                            </v-layout>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn  flat color="deep-orange"  @click="closeCustomerDialog()">取消</v-btn>
                    <v-btn color="yellow" @click="postCustomer()">添加</v-btn>
                </v-card-actions>
            </v-card>
         
        </v-dialog>

        <!-- 修改客户信息模态框 -->
        <v-dialog v-model="putCustomerDialog" persistent max-width="900px">
            <v-card>
                <v-card-title>
                    <span class="title">修改客户信息</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-form v-model="putCustomerValid" ref="putCustomerForm" lazy-validation style="width: 100%;">
                            <v-layout wrap>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                    label="客户名" color="yellow darken-2" v-model="name1"  :rules="rules.name"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                    label="公司" color="yellow darken-2" v-model="companyName1" :rules="rules.companyName"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                    label="电话" color="yellow darken-2" v-model="phone1" :rules="rules.phone"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                    label="QQ" color="yellow darken-2" v-model="QQ1" 
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                    label="微信" color="yellow darken-2" v-model="wechat1" 
                                    ></v-text-field>
                                </v-flex>

 
                            </v-layout>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn  flat color="deep-orange"  @click="closePutCustomerDialog()">取消</v-btn>
                    <v-btn color="yellow" @click="putCustomer()">保存</v-btn>
                </v-card-actions>
            </v-card>
         
        </v-dialog>

        <!-- 删除客户信息模态框 -->
        <v-dialog v-model="delCustomerDialog" persistent max-width="900px">
            <v-card>
                <v-card-title >
                    <span class="title">是否删除客户?</span>
                </v-card-title>
                <v-card-text>
                    
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn  flat color="deep-orange"  @click="closeDelCustomerDialog()">取消</v-btn>
                    <v-btn color="yellow" @click="deleteCustomer()">确定</v-btn>
                </v-card-actions>
            </v-card>
         
        </v-dialog>

    </div>
</template>

<script>
import buttongroup from "../Buttongroup";
export default {
    name: 'customer',
    components:{buttongroup},
    props: [],
    data() {
        return {
            search: '',
            currentPage: 1,
            nextState: false,

            customerDialog: false,
            customerValid: false,

            putCustomerDialog: false,
            putCustomerValid: false,

            delCustomerDialog: false,
            delId:'',

            name: '',         //客户名
            companyName: '',  //所属公司
            QQ: '',              //qq
            wechat: '',         //微信
            phone:'',            //手机号码

            name1: '',         //客户名
            companyName1: '',  //所属公司
            QQ1: '',              //qq
            wechat1: '',         //微信
            phone1:'',            //手机号码
            _id:'',                 //id

            rules: {
                name: [
                    (v) => !!v || '姓名不能为空',

                ],
                companyName: [
                    (v) => !!v || '公司不能为空',

                ],
                phone: [
                    (v) => !!v || '手机号码不能为空',
                    (v) =>  v.length === 11 || '手机号码长度为11位'
                ],

            },

        }
    },
    computed: {
        customer(){
            return this.$store.state.customer;
        }
    },
    methods: {
        quit() {
            this.$router.replace({name:'/'});
        },

        // //路由跳转
        // urlChange(path) {
        //     this.$router.push({path});
        // },

        //打开注册模态框
        openCustomerDialog() {



            this.customerDialog = true;
        },
        //关闭注册模态框
        closeCustomerDialog() {
            //清空form数据
            
            this.customerDialog = false;
            this.$refs.customerForm.reset();
        },

        //打开修改模态框
        openPutCustomerDialog( data ) {
                        this.$refs.putCustomerForm.reset();
            this.name1 = data.name;
            this.companyName1 = data.companyName;
            this.QQ1 = data.QQ;
            this.wechat1 = data.wechat;
            this.phone1 = data.phone.toString();
            this._id = data._id;
            this.putCustomerDialog = true;
        },
        //关闭修改模态框
        closePutCustomerDialog() {
            //清空form数据
            this.$refs.putCustomerForm.reset();
            this.putCustomerDialog = false;
        },


        openDelCustomerDialog( data ) {
            this.delId = data._id;
            this.delCustomerDialog = true;
        },

        closeDelCustomerDialog() {
            this.delCustomerDialog = false;
        },

        //添加客户
        async postCustomer () {
            try {
                //验证表单数据
                if(!this.$refs.customerForm.validate()) return;
                //添加
                await this.$store.dispatch('postCustomer', {name: this.name, companyName: this.companyName, phone: this.phone, QQ: this.QQ, wechat: this.wechat});
                //重新获取客户列表
                this.getCustomers();
                //关闭模态框
                this.customerDialog = false;
                this.$refs.customerForm.reset();
                
            } catch (err) {
                console.log(err);
            }
        },


        //获取客户列表
        async getCustomers() {
            try {   
                await this.$store.dispatch('getCustomers', {pageSize: 11, currentPage: this.currentPage, search: this.search});
            } catch (err) {
                console.log(err);
            }
        },

        //跟新客户数据
        async putCustomer() {
            try {   
                await this.$store.dispatch('putCustomer', {_id: this._id, name: this.name1, companyName: this.companyName1, phone: this.phone1, QQ: this.QQ1, wechat: this.wechat1});
                await this.$store.dispatch('getCustomers', {pageSize: 11, currentPage: this.currentPage, search: this.search});
                this.putCustomerDialog = false;
            } catch (err) {
                console.log(err);
            }
        },

        //删除客户
        async deleteCustomer() {
            try {   
                await this.$store.dispatch('deleteCustomer',  {_id: this.delId});
                await this.$store.dispatch('getCustomers', {pageSize: 11, currentPage: this.currentPage, search: this.search});
                this.delCustomerDialog = false;
            } catch (err) {
                console.log(err);
            }
        }


        
        // createTime(_id) {
        //     let createTime = new Date(parseInt(_id.substr(0, 8),16)*1000);
        //     return `${createTime.getFullYear()}/${createTime.getMonth() + 1}/${createTime.getDate()} ${createTime.getHours()}:${createTime.getMinutes()}`;
        // },

    },
    mounted(){
        this.getCustomers();

    },
    beforeCreate() {
        

    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 

    .customer {
        width: 100%;
        background-color: rgb(244, 244, 244);
    }

    .menu-active {
        background-color: #bbb;
    }

    .container.fluid {
        max-width: 1480px;
    }

</style>
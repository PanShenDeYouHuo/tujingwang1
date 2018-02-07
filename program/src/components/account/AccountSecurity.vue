<template>
    <div class="accountSecurity">

            <!-- 文件上传 -->
            <input type="file" id="xFile" ref="file" @change="fileChange()" style="position:absolute;clip:rect(0 0 0 0);" >

            <v-container grid-list-xl fluid class="" style="padding: 12px; padding-top: 16px;">
                <v-layout row wrap>
                    <v-flex xs12 >
                        <v-card style="padding: 24px;">
                            <v-layout row wrap>

                                <v-flex xs2 class="text-xs-right" >
                                    <v-card-text class="grey--text">手机绑定</v-card-text> 
                                </v-flex>
                                <v-flex xs8 class="">
                                    <v-card-text>可以使用手机登入</v-card-text>
                                </v-flex>
                                <v-flex xs2 class="text-xs-left">
                                    <v-btn small  color="yellow darken-1 " style="min-width: 0px;" :disabled="accountSecurity.buttonDisabled === !accountSecurity.bottonLoading2 ">绑定</v-btn>
                                </v-flex>

                                
                                <v-flex xs2 class="text-xs-right" >
                                    <v-card-text class="grey--text">账号认证</v-card-text> 
                                </v-flex>
                                <v-flex xs8 class="">
                                    <v-card-text>用于工作人员的身份认证</v-card-text>
                                </v-flex>
                                <v-flex xs2 class="text-xs-left">
                                    <v-btn v-if="true" small  color="yellow darken-1" style="min-width: 0px;" @click="openAccountSecurityDialog()" :disabled="accountSecurity.buttonDisabled === !accountSecurity.bottonLoading1 ">认证</v-btn>
                                    <v-btn v-else-if="user.realInformation.state === 1" small  color="yellow darken-1" style="min-width: 0px;" :loading="accountSecurity.bottonLoading1"  :disabled="true">审核中</v-btn>
                                    <v-btn v-else small  color="green " style="min-width: 0px;" @click="1" >已认证</v-btn>
                                </v-flex>


                            </v-layout>
                        </v-card>
                    </v-flex>

                </v-layout>
            </v-container>


            
            <v-dialog v-model="accountSecurity.dialog" persistent max-width="800px">
                <v-card>
                    <v-card-title>
                        <span class="title" >
                            认证
                        </span>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                            <v-layout wrap>
                                <v-flex xs12>
 
                                    <v-form v-model="accountSecurity.form" ref="br" lazy-validation>
                                        <!-- <v-text-field label="手机号码" v-model="" :rules="" 
                                        @keyup.enter=""></v-text-field> -->
                                        <!-- 用来消除空格提交 -->
                                        <v-text-field label="姓名" v-model="accountSecurity.name" placeholder="请输入姓名" :counter="10" :rules="rules.name"></v-text-field>
                                        <v-text-field label="身份证号码" v-model="accountSecurity.IDNumber" placeholder="请输入身份证" :counter="18" :rules="rules.IDNumber"></v-text-field>
                                        <v-text-field label="银行卡账号" v-model="accountSecurity.bankCardAccount" placeholder="XXXX-XXXX-XXXX-XXXX" :counter="20" :rules="rules.bankCardAccount" ></v-text-field>
                                        <v-text-field label="开户行信息" v-model="accountSecurity.openingBank" placeholder="开户行" :counter="30" :rules="rules.openingBank"></v-text-field>
                                    </v-form>
                                    
                                    <v-container grid-list-md fluid  class="" >
                                    <v-layout wrap>
                                        <v-flex xs4>

                                            <v-card>
                                                <v-card-media :src="IDCardFront.src" height="160px">
                                                    <div v-if="IDCardFront.progress > -1 && IDCardFront.progress < 1 " style="background-color: rgba(0, 0, 0, .7); width: 100%; display: flex; flex-direction: column;  justify-content: center; align-items: center;">
                                                        <v-progress-circular
                                                            :size="100"
                                                            :width="15"
                                                            :rotate="270"
                                                            :value="IDCardFront.progress*100"
                                                            color="yellow"      
                                                            >
                                                            {{ Math.floor(IDCardFront.progress*100) }}%
                                                        </v-progress-circular>
                                                        <br>
                                                    </div>
                                                </v-card-media>
                                                <v-card-title primary-title>
                                                    <div>
                                                        <h3 v-if="IDCardFront.validate" class="subheading mb-0">身份证正面</h3>
                                                        <h3 v-else class="subheading mb-0 red--text">请上传图片</H3>
                                                        <div class="caption grey--text">
                                                            ①.该信息仅用于管理员审核之用，身份信息完全保密。 <br>
                                                            ②.请上传彩色二代身份证<br>
                                                            ③.要求姓名、证件号码、脸部、地址都清晰可见。<br>
                                                            ④.支持JPG，PNG格式<br>
                                                            ⑤.文件须小于5M。
                                                        </div>
                                                    </div>
                                                </v-card-title>
                                                <v-card-actions>
                                                    <v-btn flat color="orange" @click="openFile('IDCardFront')">选择文件</v-btn>
                                                </v-card-actions>
                                            </v-card>

                                        </v-flex>

                                        <v-flex xs4>

                                            <v-card>
                                                <v-card-media :src="IDCardReverse.src" height="160px">
                                                    <div v-if="IDCardReverse.progress > -1 && IDCardReverse.progress < 1 " style="background-color: rgba(0, 0, 0, .7); width: 100%; display: flex; flex-direction: column;  justify-content: center; align-items: center;">
                                                        <v-progress-circular
                                                            :size="100"
                                                            :width="15"
                                                            :rotate="270"
                                                            :value="IDCardReverse.progress*100"
                                                            color="yellow"      
                                                            >
                                                            {{ Math.floor(IDCardReverse.progress*100) }}%
                                                        </v-progress-circular>
                                                        <br>
                                                    </div>
                                                </v-card-media>
                                                <v-card-title primary-title>
                                                    <div>
                                                        <h3 v-if="IDCardReverse.validate" class="subheading mb-0">身份证背面</h3>
                                                        <h3 v-else class="subheading mb-0 red--text">请上传图片</H3>
                                                        <div class="caption grey--text">
                                                            ①.该信息仅用于管理员审核之用，身份信息完全保密。 <br>
                                                            ②.请上传彩色二代身份证<br>
                                                            ③.要求姓名、证件号码、脸部、地址都清晰可见。<br>
                                                            ④.支持JPG，PNG格式<br>
                                                            ⑤.文件须小于5M。
                                                        </div>
                                                    </div>
                                                </v-card-title>
                                                <v-card-actions>
                                                    <v-btn flat color="orange" @click="openFile('IDCardReverse')" >选择文件</v-btn>
                                                </v-card-actions>
                                            </v-card>

                                        </v-flex>
                                        <v-flex xs4 >

                                            <v-card>
                                                <v-card-media :src="bankCardFront.src" height="160px">
                                                    <div v-if="bankCardFront.progress > -1 && bankCardFront.progress < 1 " style="background-color: rgba(0, 0, 0, .7); width: 100%; display: flex; flex-direction: column;  justify-content: center; align-items: center;">
                                                        <v-progress-circular
                                                            :size="100"
                                                            :width="15"
                                                            :rotate="270"
                                                            :value="bankCardFront.progress*100"
                                                            color="yellow"      
                                                            >
                                                            {{ Math.floor(bankCardFront.progress*100) }}%
                                                        </v-progress-circular>
                                                        <br>
                                                    </div>
                                                </v-card-media>
                                                <v-card-title primary-title>
                                                    <div>
                                                        <h3 v-if="bankCardFront.validate" class="subheading mb-0">银行卡正面</h3>
                                                        <h3 v-else class="subheading mb-0 red--text">请上传图片</H3>
                                                        <div class="caption grey--text">
                                                            ①.该信息仅用于管理员审核之用，卡片信息完全保密。 <br>
                                                            ②.请上传彩色银行卡图片<br>
                                                            ③.要求时间、证件号码、卡片字体都清晰可见。<br>
                                                            ④.支持JPG，PNG格式<br>
                                                            ⑤.文件须小于5M。
                                                        </div>
                                                    </div>
                                                </v-card-title>
                                                <v-card-actions>
                                                    <v-btn flat color="orange" @click="openFile('bankCardFront')">选择文件</v-btn>
                                                </v-card-actions>
                                            </v-card>

                                        </v-flex>
                                    </v-layout>
                                    </v-container>
   

                                </v-flex>

                            </v-layout>

                         </v-card-text>
                    <v-card-actions v-if="accountSecurity.btnState">
                        <v-spacer></v-spacer>
                        <v-btn small flat @click="accountSecurity.dialog = false" :disabled="this.$store.state.appLoading">取消</v-btn>
                        <v-btn small  color="yellow darken-1" style="min-width: 0px;" @click="accountSecurity.dialog = true; InfoAuth()" :disabled="this.$store.state.appLoading">申请认证</v-btn>
                    </v-card-actions>
                </v-card>
            
            </v-dialog>


    </div>
</template>

<script>
import buttongroup from "../Buttongroup";
export default {
    name: 'accountSecurity',
    components:{buttongroup},
    props: [],
    data() {
        return {
            accountSecurity: {
                dialog: false,
                form: true,
                buttonDisabled: false,
                bottonLoading1: false,   //审核按钮
                bottonLoading2: false,   //手机绑定按钮
                name: '',               //真实姓名
                IDNumber: '',           //身份证号码
                bankCardAccount: '',    //银行卡账号
                openingBank: '',        //开户行

                btnState: true,         //是否显示按钮
            },
            //身份证正面
            IDCardFront: {
                state: false,                           //是否上次成功
                src: require('../../assets/blank1.jpg'),//二进制文件，文件过大时不会读取
                progress: -1,                           //进度
                validate: true,                        
                file: {}                                //上次的文件所在，被加密无法读取路径
            },
            //身份证反面
            IDCardReverse: {
                state: false,                           //是否上次成功
                src: require('../../assets/blank3.jpg'),//二进制文件，文件过大时不会读取
                progress: -1,                           //进度
                validate: true,
                file: {}                                //上次的文件所在，被加密无法读取路径
                        
            },
            //银行卡正面
            bankCardFront: {
                state: false,                           //是否上次成功
                src: require('../../assets/blank.jpg'), //二进制文件，文件过大时不会读取
                progress: -1,                           //进度
                validate: true,
                file: {}                                //上次的文件所在，被加密无法读取路径

            },
            //上传文件确定
            uploadMap: '',   //IDCardFront、IDCardReverse、bankCardFront
            rules: {
                name: [
                    (v) => !!v || '姓名不能为空',
                    (v) => v.length <= 10 || '名字不能超过10位'
                ],
                IDNumber: [
                    (v) => !!v || '身份证不能为空',
                    (v) =>  v.length === 18 || '身份证号码长度为18位'
                ],
                bankCardAccount: [
                    (v) => /^[0-9]+$/.test(v) || '银行账号必须为数字,且不能为空',
                    (v) =>  v.length <= 20 || '银行账号过长'
                ],
                openingBank: [
                    (v) => !!v || '请填写开户银行',
                    (v) =>  v.length < 30 || '信息不能超过30位'
                ],
            },

        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    methods: {
        quit() {
            this.$router.replace({name:'/'});
        },
        change(item) {
            this.active = item.title;
            this.$router.replace({path:`/boss`});
        },

        //选择上传的文件
        openFile(name) {
            this.uploadMap = name;
            this.$refs.file.click();
        },

        //选取上传文件完成时触发
        fileChange() {

            let uploadMap = this.uploadMap;
            let buf = this[uploadMap];
            let store = this.$store;

            for( let file of this.$refs.file.files ) {
                
                //判断是否是图片
                if(file.type !== 'image/jpeg' && file.type !== 'image/png') {
                    // file.src = '';
                    // uploadFileList.push(file);
                    continue;
                }
                
                //读取文件类
                let oFReader = new FileReader();

                oFReader.onloadend = function(oFRevent){
                    buf.src = oFRevent.target.result;
                    buf.file = file;
                    buf.progress = 0;
                    buf.validate = true;
                    store.dispatch(
                        'uploadFile',
                        {
                            callbackUrl:'60.205.225.197/osscallback',
                            objectKey:`temporaryFile/account/${store.state.user._id}/authenticate/${uploadMap}.${ file.type === 'image/jpeg' ? 'jpg' : 'png'}`,
                            file: buf
                        });
                };
                //根据inputfile的files读取文件
                oFReader.readAsDataURL(file);
                    
            }

        },
        //打开审核页面
        async openAccountSecurityDialog() {
            try {
                this.accountSecurity.buttonDisabled = true;
                this.accountSecurity.bottonLoading1 = true;
                await this.$store.dispatch('getWriteAccountStsToken');
                this.accountSecurity.dialog = true;
                this.accountSecurity.buttonDisabled = false;
                this.accountSecurity.bottonLoading1 = false;
                
            } catch (err) {
                this.$store.state.errorSnackbar = { state: true, text: err.message };
                this.accountSecurity.buttonDisabled = false;
                this.accountSecurity.bottonLoading1 = false;
            }

        },
        //提交审核
        async InfoAuth() {
            try {
                let formValidate = this.$refs.br.validate();
                this.IDCardFront.validate = this.IDCardFront.state; 
                this.IDCardReverse.validate = this.IDCardReverse.state; 
                this.bankCardFront.validate = this.bankCardFront.state; 
                if(!formValidate || !this.IDCardFront.validate || !this.IDCardReverse.validate || !this.bankCardFront.validate) return;

                await this.$store.dispatch('putRealInformation', {
                    name: this.accountSecurity.name, 
                    IDNumber: this.accountSecurity.IDNumber,
                    bankCardAccount: this.accountSecurity.bankCardAccount,
                    openingBank: this.accountSecurity.openingBank
                });

                this.accountSecurity.dialog = false;
                
            } catch (err) {
                console.log(err);
            }
          
        }

    },
    mounted(){

    },
    beforeCreate() {
        // this.change(this.items[0]);
    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 

  .accountSecurity {
      width: 100%;
  }

  .menu-active {
      /* color: red; */
      background-color: #bbb;
  }

</style>
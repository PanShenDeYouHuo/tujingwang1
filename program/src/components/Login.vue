
<template >
  <div class="login">
  <transition name="fade">
    <Form ref="formInline" :model="form" :rules="ruleInline" class="box_relative" v-if="loading">
      <Row >
        <Col span="8" class="white">
          <Form-item prop="user">
              <Input type="text" v-model="form.account" placeholder="Username">
              </Input>
          </Form-item>
        </Col>
        <Col span="8" class="white">
          <Form-item prop="password">
              <Input type="password" v-model="form.password" placeholder="Password">
              </Input>
          </Form-item>
        </Col>
        <Col span="1" class="swhite">
          <Form-item >
              <Checkbox v-model="form.isRemember"> </Checkbox>
          </Form-item>
        </Col>
        <Col span="2" class="black">
          <Form-item>
              <Button :loading="!form.loading" type="text"  @click="handleSubmit('formInline')" style="text-align: center;">
                <span v-if="form.loading">登录</span>
              </Button>
          </Form-item>
        </Col>
      </Row>
    </Form>
  </transition>
  </div>
</template>


<script>
  export default {
    name:'login',
    data () {
      return {
        ruleInline: {
          name: [
              { required: true, message: '请填写用户名', trigger: 'blur' }
          ],
          password: [
              { required: true, message: '请填写密码', trigger: 'blur' },
              { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
          ]
        },
        loading: false,
      }
    },
    computed:{
      form() {
        return this.$store.state.user;
      }
    },
    methods: {
      handleSubmit(name) {
        let state = this.$store.state;
        this.$refs[name].validate((valid) => {
          if (valid) {
            setTimeout(()=> {
              let state = sessionStorage.getItem('state');
              if (state !== '1') {
                this.$Message.error('登入超时');
                this.$store.state.user.loading = true;
              }
            }, 20000);
            this.$store.dispatch('loginIn', this.$router);
          }
        });
      },

    },
    mounted(){
      setTimeout(()=> {
        this.loading = true;
      }, 3000);
    }
  }
</script>

<style >
  .login{
    background: url('../assets/bg.jpg'); 
    height: 100%; width: 100%; 
    position:absolute; 
    z-index:3; 
    left: 0px; top: 0px; /*background-image:url(../assets/logo.png);*/ 
    background-position:center; 
  }

  .white{
    padding-left: 5px;
    padding-right: 10px;
    min-height: 80px;
    min-width: 65px;
    padding-top: 23px;
    background-color: rgba(255, 255, 255,1);
  }

  .swhite{
    padding-left: 5px;
    padding-right: 10px;
    min-height: 80px;
    min-width: 25px;
    max-width: 25px;
    padding-top: 23px;
    background-color: rgba(150, 150, 150,0.5);
  }

  .black{
    padding-left: 5px;
    padding-right: 5px;
    min-height: 80px;
    min-width: 65px;
    padding-top: 23px;
    background-color: rgba(10, 10, 10,0.5);
  }

  .login .ivu-input {
/*    display: inline-block;*/
/*    width: 90%;*/
/*    height: 32px;*/
/*    line-height: 1.5;*/
/*    padding: 4px 7px;
    font-size: 12px;*/
    border: 0px solid #dddee1;
    border-radius: 0px;

    border-style: solid;
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 0px;
    border-left-width: 2px;

  }

  .login .ivu-btn {
    width: 100%;
/*    padding: 7px 15px;*/
    border: 0px solid #dddee1;
    border-radius: 0px; 
    color: #ddd;
  }

  .login .ivu-btn:hover{
    color: #08f;
  }

  .box_relative {
    width:40%;
    margin-left: 60%;
    position: relative; /*脱离文档流*/
    top: 45%; /*偏移*/
  }
	
</style>
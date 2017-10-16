<template>
    <div class="wechatLogin">
        <md-layout md-vertical-align="top" md-align="center" style="height: 100%; padding-top: 100px;">
            <div id="wechatLoginView">
            </div>
        </md-layout>
        <md-button class="md-fab md-mini md-fab-bottom-right" style="background-color: #000" @click="accountLogin()">
            账号
        </md-button>
    </div>
</template>

<script>
export default {
    name: 'wechatLogin',
    props: [],
    data() {
        return {

        }
    },
    computed: {
    },
    methods: {
        accountLogin() {
            this.$store.dispatch('accountLogin');
        }
    },
    mounted(){
        let obj = new WxLogin({
            id:"wechatLoginView", 
            appid: "wx578ee588948c8fcc",
            scope: "snsapi_login", 
            redirect_uri: "http://cloud.tujingwang.cn",
            state: "",
            style: "white",
            href: ""
        });

    },
    beforeCreate() {
    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .wechatLogin {
        background-color: rgba(0, 0, 0, .5);
        height: 100%; width: 100%; 
        background-position:center; 
    }


</style>

<style>
iframe:not(.md-image) {
    height: 400px;
}
</style>

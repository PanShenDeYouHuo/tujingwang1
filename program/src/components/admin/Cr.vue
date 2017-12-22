<template>
    <div class="cr">
    <p>cr</p>
    </div>
</template>

<script>
export default {
    name: 'cr',
    props: [],
    data() {
        return {
        }
    },
    computed: {

    },
    methods: {
        quit() {
            this.$router.replace({name:'/'});
        },
        change(item) {
            this.active = item.title;
            this.$router.replace({path:`/admin/${item.router}`});
        },
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

    .cr {
        width: 100%;
    }


</style>
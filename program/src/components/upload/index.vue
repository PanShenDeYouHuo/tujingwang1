<template>
    <div class="tasks">
        <v-container grid-list-lg text-xs-center>
            <v-layout row wrap align-center>
                    <v-flex xs6>
                        <v-layout justify-end>

                                <v-btn >
                                    upload
                                </v-btn>

                        </v-layout>
                    </v-flex> 
            </v-layout>
        </v-container>
       
        
    </div>
</template>

<script>
export default {
    name: 'tasks',
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
    .tasks {
        /* width:100%;
        height:50px;
        padding: 10px;
        padding-top: 70px;
        overflow:auto;
        position: absolute; */
        /* margin: auto; */
        padding-top: 50px;
        min-width: 1080px;
        display: flex;
        /* background-position:center;  */
        /* max-width: 1220px; */
        /* min-width: 965px;
        background-color: #fff;
        z-index:1; */
    }


</style>

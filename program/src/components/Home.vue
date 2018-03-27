<template>
  <div class="home">

    <v-layout row justify-center>
      <p>hello</p>
    </v-layout>

  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      value: 0
    };
  },
  methods:{
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .home {
    width:100%;
    height:100%;
    min-width: 1280px;
    padding: 0px;
    padding-top: 50px;
    background-color: rgb(240, 240, 240);
    box-sizing:border-box;
    overflow:auto;
    position: absolute;
    z-index:1;
  }

  /* .slide {
    color: #fff;
    height: 300px;
    position: relative;
  } */



  
</style>


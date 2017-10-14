<template>
  <div class="home">
      <div style="text-align: center; background-color: rgba(255, 255, 255,1); height: 850px;">
      <Carousel v-model="value">
          <CarouselItem>
                <img src="http://img.zcool.cn/community/014562599406f90000002129322a54.jpg@1280w_1l_2o_100sh.png" style=" height:850px;">
          </CarouselItem>
          <CarouselItem>

                <img src="http://img.zcool.cn/community/0177cd599406faa801215603abcfa8.jpg@1280w_1l_2o_100sh.png" style="height:850px;">

          </CarouselItem>
          <CarouselItem>

                <img src="http://img.zcool.cn/community/01746c599406fb000000212922344c.jpg@1280w_1l_2o_100sh.png" style="height:850px;">

          </CarouselItem>
          <CarouselItem>
                <img src="http://img.zcool.cn/community/018849599406fca80121560343bd42.jpg@1280w_1l_2o_100sh.jpg" style="height:850px;">

          </CarouselItem>
      </Carousel>
      </div>
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
<style scoped>
  .home {
    width:100%;
    height:100%;
    padding: 0px;
    padding-top: 105px;
    background-color: #fff;
    box-sizing:border-box;
    overflow:auto;
    position: absolute;
    z-index:1;
  }
</style>


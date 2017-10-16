<template>
  <div class="home">

    <agile :arrows="false" :speed="750"
    :timing="'linear'" :fade="true"
    :autoplay="true" :pauseOnHover="false">
      <div class="slide slide--1">
        <md-card>
          <md-card-media-cover md-text-scrim >
            <md-card-media md-ratio="16:16">
              <img src="../assets/1.jpg" alt="Skyscraper">
            </md-card-media>

            <md-card-area>
              <md-card-header>
                <div class="md-title">Title goes here</div>
                <div class="md-subhead">Subtitle here</div>
              </md-card-header>
            </md-card-area>
          </md-card-media-cover>
        </md-card>
      </div>
      <div class="slide slide--2">
        <md-card>
          <md-card-media-cover md-text-scrim >
            <md-card-media md-ratio="16:16">
              <img src="../assets/2.jpg" alt="Skyscraper">
            </md-card-media>

            <md-card-area>
              <md-card-header>
                <div class="md-title">Title goes here</div>
                <div class="md-subhead">Subtitle here</div>
              </md-card-header>
            </md-card-area>
          </md-card-media-cover>
        </md-card>
      </div>
      <div class="slide slide--3">
        <md-card>
          <md-card-media-cover md-text-scrim >
            <md-card-media md-ratio="16:16">
              <img src="../assets/3.jpg" alt="Skyscraper">
            </md-card-media>

            <md-card-area>
              <md-card-header>
                <div class="md-title">Title goes here</div>
                <div class="md-subhead">Subtitle here</div>
              </md-card-header>
            </md-card-area>
          </md-card-media-cover>
        </md-card>
      </div>
    </agile>

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
    min-width: 920px;
    padding: 0px;
    padding-top: 50px;
    background-color: #fff;
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

  .agile__dots {
        bottom: 0;
        display: block;
        right: 10px;
        position: absolute;
        width: 30px;
  }

  .agile__dot {
    margin-bottom: 10px;
  }

  .agile__dot button {
    /* background-color: transparent; */
    border: 1px solid #555;
    margin-top: 10px;
  }

  .agile__dot button :hover {
    background-color: #555;
  }

  .agile__dot--current button {
    background-color: #555;
  }

  /* .slide {
    background-color: #000;
    height: 640px;
  } */

  /* .slide--1 {
    background-image: url(../assets/1.jpg);
  }

  .slide--2 {
    background-image: url(../assets/2.jpg);
  }

  .slide--3 {
    background-image: url(../assets/3.jpg);
  } */
  
</style>


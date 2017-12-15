<template>
  <div class="aam">


    <v-btn color="yellow" @click="imageDialogOpen()">
      添加用户
    </v-btn>

    <v-tabs v-model="active">
      <v-tabs-bar class="witet" dark>
        <v-tabs-item
          v-for="tab in tabs"
          :key="tab"
          :href="'#' + tab"
          ripple
        >
           {{ tab }}
        </v-tabs-item>
        <v-tabs-slider color="yellow"></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content
          v-for="tab in tabs"
          :key="tab"
          :id="tab"
        >
          <v-card flat>
            <v-card-text>{{ text }}</v-card-text>
          </v-card>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
    

  </div>
</template>

<script>
export default {
  name: 'aam',
  data() {
    return {
      value: 0,
      tabs: ['用户', '注册'],
      active: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    };
  },
  methods:{
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .aam {

  }

  
</style>
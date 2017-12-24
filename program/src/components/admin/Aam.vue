<template>
  <div class="aam">

    <v-container grid-list-lg fluid >
      <v-layout row wrap>

        <v-flex xs12 class="py-2">

          <v-card>

            <v-card-title style="padding: 0px 16px;">
              <buttongroup title="状态" :items="items" active="全部"></buttongroup>
              <v-spacer></v-spacer>
              <v-btn color="yellow" @click="change('cr')">
                    企业注册
              </v-btn>
              <v-btn color="yellow" @click="">
                  用户管理
              </v-btn>
            </v-card-title>

          </v-card>

          
        </v-flex>

        <v-flex xs12 class="py-2">
          <v-card style="height: 840px;">
            
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>

  </div>
</template>

<script>
import buttongroup from "../Buttongroup";
export default {
  name: 'aam',
  components:{buttongroup},
  data() {
    return {
      value: 0,
      items: [
        {name: '全部'},
        {name: '使用'},
        {name: '暂停'}
      ],
    };
  },
  methods: {
    quit() {
        this.$router.replace({name:'/'});
    },
    change(item) {

      this.$router.replace({path:`/admin/${item}`});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .aam {
    width:100%;
  }

  
</style>
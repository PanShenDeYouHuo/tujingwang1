<template>
    <div class="statisticsRegional">

        <Card :bordered="false">
        <Row  type="flex" justify="center" align="middle" :gutter="16">

          <Col span="4">
          <i-circle
              :size="185"
              :trail-width="4"
              :stroke-width="5"
              :percent="100"
              stroke-linecap="round"
              stroke-color="#43a3fb">
              <div class="demo-i-circle-custom">
                  <h1>{{$store.getters.all.total}}</h1>
              </div>
          </i-circle>
          </Col>

          <Col span="4">
          <i-circle
              :size="185"
              :trail-width="4"
              :stroke-width="5"
              :percent=" 100"
              stroke-linecap="round"
              stroke-color="#43a3fb">
              <div class="demo-i-circle-custom">
                  <h1>{{$store.getters.all.totalPrice}}￥</h1>
              </div>
          </i-circle>
          </Col>
          <Col v-for="p in $store.getters.all.array1" :key="p._id" span="3" :order="parseInt(p._id + 3)">
            <i-circle
                :size="130"
                :trail-width="4"
                :stroke-width="5"
                :percent="p.total/$store.getters.all.total * 100"
                stroke-linecap="round"
                stroke-color="#5cadff">
                <div class="demo-i-circle-custom">
                    <h3>{{p.total}}</h3>
                    <p v-if="p._id == 0">未开始</p>
                    <p v-else-if="p._id == 1">建模完成</p>
                    <p v-else-if="p._id == 2">小图完成</p>
                    <p v-else-if="p._id == 3">渲染完成</p>
                    <p v-else-if="p._id == 4">结算完成</p>

                </div>
            </i-circle>
          </Col>

        </Row>
        </Card>

        <br>

        <Card :bordered="false">
          <Row  type="flex" justify="center" align="middle" :gutter="16">
            <Col span="4" :order="1">
            <i-circle
                :size="185"
                :trail-width="4"
                :stroke-width="5"
                :percent="$store.getters.allChangsha.total/$store.getters.all.total * 100"
                stroke-linecap="round"
                stroke-color="#43a3fb">
                <div class="demo-i-circle-custom">
                    <h1>{{$store.getters.allChangsha.total}}</h1>
                    <p>长沙地区</p>
                    <span>
                        总占张数：{{($store.getters.allChangsha.total/$store.getters.all.total * 100).toFixed(1)}}%
                        <i></i>
                    </span>
                </div>
            </i-circle>
            </Col>

            <Col span="4" :order="2">
            <i-circle
                :size="185"
                :trail-width="4"
                :stroke-width="5"
                :percent="$store.getters.allChangsha.totalPrice/$store.getters.all.totalPrice * 100"
                stroke-linecap="round"
                stroke-color="#43a3fb">
                <div class="demo-i-circle-custom">
                    <h1>{{$store.getters.allChangsha.totalPrice}}￥</h1>
                    <p>长沙地区</p>
                    <span>
                        总占张数：{{($store.getters.allChangsha.totalPrice/$store.getters.all.totalPrice * 100).toFixed(1)}}%
                        <i></i>
                    </span>
                </div>
            </i-circle>
            </Col>

            </Col>

              <Col v-for="p in $store.state.statistics.regional.image.Changsha" :key="p._id" span="3" :order="parseInt(p._id + 3)">
                <i-circle
                    :size="130"
                    :trail-width="4"
                    :stroke-width="5"
                    :percent="p.total/$store.getters.allChangsha.total * 100"
                    stroke-linecap="round"
                    stroke-color="#5cadff">
                    <div class="demo-i-circle-custom">
                        <h3>{{p.total}}</h3>
                        <p v-if="p._id == 0">未开始</p>
                        <p v-else-if="p._id == 1">建模完成</p>
                        <p v-else-if="p._id == 2">小图完成</p>
                        <p v-else-if="p._id == 3">渲染完成</p>
                        <p v-else-if="p._id == 4">结算完成</p>

                    </div>
                </i-circle>
              </Col>

          </Row>
          </Card>

          <br>

          <Card :bordered="false">
          <Row  type="flex" justify="center" align="middle" :gutter="16">
            <Col span="4">
            <i-circle
                :size="185"
                :trail-width="4"
                :stroke-width="5"
                :percent="$store.getters.allTaizhou.total/$store.getters.all.total * 100"
                stroke-linecap="round"
                stroke-color="#43a3fb">
                <div class="demo-i-circle-custom">
                    <h1>{{$store.getters.allTaizhou.total}}</h1>
                    <p>台州地区</p>
                    <span>
                        总占张数：{{($store.getters.allTaizhou.total/$store.getters.all.total * 100).toFixed(1)}}%
                        <i></i>
                    </span>
                </div>
            </i-circle>
            </Col>
            <Col span="4">
            <i-circle
                :size="185"
                :trail-width="4"
                :stroke-width="5"
                :percent="$store.getters.allTaizhou.totalPrice/$store.getters.all.totalPrice * 100"
                stroke-linecap="round"
                stroke-color="#43a3fb">
                <div class="demo-i-circle-custom">
                    <h1>{{$store.getters.allTaizhou.totalPrice}}￥</h1>
                    <p>长沙地区</p>
                    <span>
                        总占张数：{{($store.getters.allTaizhou.totalPrice/$store.getters.all.totalPrice * 100).toFixed(1)}}%
                        <i></i>
                    </span>
                </div>
            </i-circle>
            </Col>

            <Col v-for="p in $store.state.statistics.regional.image.Taizhou" :key="p._id" span="3" :order="parseInt(p._id + 3)">
              <i-circle
                  :size="130"
                  :trail-width="4"
                  :stroke-width="5"
                  :percent="p.total/$store.getters.allTaizhou.total * 100"
                  stroke-linecap="round"
                  stroke-color="#5cadff">
                  <div class="demo-i-circle-custom">
                      <h3>{{p.total}}</h3>
                      <p v-if="p._id == 0">未开始</p>
                      <p v-else-if="p._id == 1">建模完成</p>
                      <p v-else-if="p._id == 2">小图完成</p>
                      <p v-else-if="p._id == 3">渲染完成</p>
                      <p v-else-if="p._id == 4">结算完成</p>

                  </div>
              </i-circle>
            </Col>
            
          </Row>
          </Card>

          <br>

          <Card :bordered="false">
          <Row  type="flex" justify="center" align="middle" :gutter="16">

            <Col span="4">
            <i-circle
                :size="185"
                :trail-width="4"
                :stroke-width="5"
                :percent="$store.getters.allNingbo.total/$store.getters.all.total * 100"
                stroke-linecap="round"
                stroke-color="#43a3fb">
                <div class="demo-i-circle-custom">
                    <h1>{{$store.getters.allNingbo.total}}</h1>
                    <p>宁波地区</p>
                    <span>
                        总占张数：{{($store.getters.allNingbo.total/$store.getters.all.total * 100).toFixed(1)}}%
                        <i></i>
                    </span>
                </div>
            </i-circle>
            </Col>

            <Col span="4">
            <i-circle
                :size="185"
                :trail-width="4"
                :stroke-width="5"
                :percent="$store.getters.allNingbo.totalPrice/$store.getters.all.totalPrice * 100"
                stroke-linecap="round"
                stroke-color="#43a3fb">
                <div class="demo-i-circle-custom">
                    <h1>{{$store.getters.allNingbo.totalPrice}}￥</h1>
                    <p>宁波地区</p>
                    <span>
                        总占张数：{{($store.getters.allNingbo.totalPrice/$store.getters.all.totalPrice * 100).toFixed(1)}}%
                        <i></i>
                    </span>
                </div>
            </i-circle>
            </Col>
            <Col v-for="p in $store.state.statistics.regional.image.Ningbo" :key="p._id" span="3" :order="parseInt(p._id + 3)">
              <i-circle
                  :size="130"
                  :trail-width="4"
                  :stroke-width="5"
                  :percent="p.total/$store.getters.allNingbo.total * 100"
                  stroke-linecap="round"
                  stroke-color="#5cadff">
                  <div class="demo-i-circle-custom">
                      <h3>{{p.total}}</h3>
                      <p v-if="p._id == 0">未开始</p>
                      <p v-else-if="p._id == 1">建模完成</p>
                      <p v-else-if="p._id == 2">小图完成</p>
                      <p v-else-if="p._id == 3">渲染完成</p>
                      <p v-else-if="p._id == 4">结算完成</p>

                  </div>
              </i-circle>
            </Col>

          </Row>
          </Card>

    </div>
</template>

<script>
  export default {
    name:'statisticsRegional',
    mounted() {
      this.$store.dispatch('getStatisticsRegionalProject');
      this.$store.dispatch('getStatisticsRegionalImage');
    }
  };
</script>

<style>
	.statisticsRegional {
		width:100%;
		height:100%;
    min-width: 1300px;
		box-sizing:border-box;
/*    position:absolute;*/
    overflow:auto;
	}
</style>

<style>

  .demo-i-circle-custom h1{
      color: #3f414d;
      font-size: 28px;
      font-weight: normal;
  }
  .demo-i-circle-custom p{
      color: #657180;
      font-size: 14px;
      margin: 10px 0 15px;
  }
  .demo-i-circle-custom span{
      display: block;
      padding-top: 0px;
      color: #657180;
      font-size: 14px;
  }
  .demo-i-circle-custom span :before{
          content: '';
          display: block;
          width: 50px;
          height: 1px;
          margin: 0 auto;
          background: #ccc;
          position: relative;
          top: -20px;
  }
  .demo-i-circle-custom span i{
      font-style: normal;
      color: #3f414d;
  }
</style>
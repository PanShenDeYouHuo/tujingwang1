<template>
    <div class="spin-container">
      <div>
        <Spin fix size="large"></Spin>
      </div>
    </div>
</template>

<script>
  export default {
    name:'loadPage',
  };
</script>

<style>
	.spin-container {
/*		width:100%;
		height:100%;
		box-sizing:border-box;
    background-color: #000;
    position:absolute;*/

    background-color:rgb(239, 239, 239);
    height: 100%;
    width: 100%;
    position:absolute; /*z-index:0;*/
    overflow:auto;
    padding-top: 10px;
    box-sizing:border-box;
	}
</style>
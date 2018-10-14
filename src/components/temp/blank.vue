<template>
<div id="blank">
	<div :style="{'height':datas.params.height}" style="height: 8px;"></div>
</div>
</template>
<script>
  export default {
    props: ['datas'],
    mounted(){

    },
    methods:{

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	#blank{
		background: #FFFFFF;
	}
</style>
<template>
<div id="richtext" class="diyrichtext" :style="{'background-color':datas.params.bgcolor}">
    <div v-html="datas.content"></div>
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
	#richtext{text-align: left;}

</style>